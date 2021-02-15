import { ApolloLink, Observable } from "@apollo/client";
import { getMainDefinition, hasDirectives } from "@apollo/client/utilities";

class LiveLink extends ApolloLink {
  constructor(pusherChannel, operationPolicies) {
    super();

    this.pusher = pusherChannel;
    this.operationPolicies = operationPolicies;
  }

  processEvents(operation, cache) {
    const { operationName, query } = operation;
    const mainDefinition = getMainDefinition(query);
    const liveDirective = mainDefinition.directives.find(
      (directive) => directive.name.value === "_live"
    );
    const {
      value: { values: eventValues },
    } = liveDirective.arguments.find((arg) => arg.name.value === "events");
    const eventNames = eventValues.map((event) => event.value);

    eventNames.forEach((eventName) => {
      if (this.pusher) {
        this.pusher.bind(eventName, (data) => {
          const policy = this.operationPolicies[operationName].events[
            eventName
          ];

          if (policy) {
            policy(cache, data);
          } else {
            console.warn(
              `No policy available for the ${operationName} operation for the ${eventName} event`
            );
          }
        });
      }
    });
  }

  request(operation, forward) {
    const { query } = operation;
    const isSubscribedQuery = hasDirectives(["_live"], query);

    if (!isSubscribedQuery) {
      return forward(operation);
    }

    const observable = forward(operation);
    const { cache } = operation.getContext();

    this.processEvents(operation, cache);

    return new Observable((observer) => {
      // Pass the request down the chain
      const subscription = observable.subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }
}

export default LiveLink;

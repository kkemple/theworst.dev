import { ApolloLink, Observable } from "@apollo/client";
import { getMainDefinition, hasDirectives } from "@apollo/client/utilities";

class RealtimeLink extends ApolloLink {
  constructor(pusherChannel, operationPolicies) {
    super();

    this.pusher = pusherChannel;
    this.operationPolicies = operationPolicies;
  }

  processEvents(operation, cache) {
    const { operationName, query } = operation;
    const mainDefinition = getMainDefinition(query);

    // find the @_live directive
    const liveDirective = mainDefinition.directives.find(
      (directive) => directive.name.value === "_live"
    );

    // get the event names that will be used to register for pusher events
    const {
      value: { values: eventValues },
    } = liveDirective.arguments.find((arg) => arg.name.value === "events");
    const eventNames = eventValues.map((event) => event.value);

    // for each event in the live directive arguments for this operation
    // set up the proper event handlers for pusher events
    eventNames.forEach((eventName) => {
      if (this.pusher) {
        this.pusher.bind(eventName, (data) => {
          // fetch policy (update function) to update cache
          const policy = this.operationPolicies[operationName].events[
            eventName
          ];

          // if an update function has been defined for event type, call it
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

    // check to see if a live directive is in the operation
    const isSubscribedQuery = hasDirectives(["_live"], query);

    // if not, skip execution
    if (!isSubscribedQuery) {
      return forward(operation);
    }

    // get reference to observable
    const observable = forward(operation);

    // get reference to apollo cache
    const { cache } = operation.getContext();

    // process live directives
    this.processEvents(operation, cache);

    // return observable for linking
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

export default RealtimeLink;

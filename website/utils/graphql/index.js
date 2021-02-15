import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import Pusher from "pusher-js";

import RealtimeLink from "./realtime-link";
import operationPolicies from "./operation-policies";

// pusher is used to recieve incoming realtime data
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

// subscribe to the proper pusher channel
const channel = pusher.subscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL);

// create our
const realtimeLink = new RealtimeLink(channel, operationPolicies);

// Create terminating HTTP link
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

export const client = new ApolloClient({
  link: realtimeLink.concat(httpLink),
  cache: new InMemoryCache(),

  // make sure we enable devtools
  connectToDevTools: process.env.NODE_ENV === "development",

  // name our client to improve observability in Apollo Studio
  name: "website",
});

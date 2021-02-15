import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import Pusher from "pusher-js";

import LiveLink from "./live-link";
import operationPolicies from "./operation-policies";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});
const channel = pusher.subscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL);

const liveLink = new LiveLink(channel, operationPolicies);

// Create terminating HTTP link
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

export const client = new ApolloClient({
  link: liveLink.concat(httpLink),
  cache: new InMemoryCache(),
});

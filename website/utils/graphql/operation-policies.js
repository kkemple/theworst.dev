import { gql } from "@apollo/client";

const operationPolicies = {
  Post: {
    events: {
      // subscribe to the POST_UPDATED event on the Post query
      // example:
      // query Post($slug: String!) @_live(events: [POST_UPDATED]) {...}
      POST_UPDATED(cache, data) {
        const id = cache.identify({
          ...data,
          __typename: "Post",
        });

        cache.writeFragment({
          id,
          data,
          fragment: gql`
            fragment PostUpdated on Post {
              id
              count
              slug
            }
          `,
        });
      },
    },
  },
};

export default operationPolicies;

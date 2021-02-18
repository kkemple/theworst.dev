import { gql } from "@apollo/client";

const operationPolicies = {
  Post: {
    events: {
      // subscribe to the POST_UPDATED event on the Post query
      // example:
      // query Post($slug: String!) @_live(events: [POST_UPDATED]) {...}
      POST_UPDATED(cache, data) {
        // let Apollo cache figure out which item in the cache to update
        const id = cache.identify({
          ...data,
          __typename: "Post",
        });

        // get post with key Post:<post_id>
        // update the count of post likes
        cache.writeFragment({
          id,
          data,
          fragment: gql`
            fragment PostUpdated on Post {
              count
            }
          `,
        });
      },
    },
  },
};

export default operationPolicies;

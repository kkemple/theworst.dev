const operationPolicies = {
  Post: {
    events: {
      // subscribe to the POST_UPDATED event on the Post query
      // example:
      // query Post($slug: String!) @_live(events: [POST_UPDATED]) {...}
      POST_UPDATED(cache, data, query) {
        cache.writeQuery({
          query,
          data,
          variables: {
            slug: data.slug,
          },
        });
      },
    },
  },
};

export default operationPolicies;

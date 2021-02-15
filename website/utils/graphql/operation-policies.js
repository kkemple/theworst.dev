const operationPolicies = {
  Post: {
    events: {
      // subscribe to the POST_LIKE event on the Post query
      // example:
      // query Post($slug: String!) @_live(events: [POST_LIKE]) {...}
      POST_LIKE(cache, data) {
        // get post from the cache by typename and id
        const id = cache.identify({
          __typename: "Post",
          id: data.id,
        });

        // modify count field on Post in cache
        // apollo cache is flat key/value pairs
        // the key is made up of it's keyFields which defaults to <__typename>:<id>
        // id is equal to its key <__typename>:<id> (i.e. Post:1)
        cache.modify({
          id,
          fields: {
            // can override any field value
            // function is passed current value in cache
            // example:
            // count(value) {...}
            count() {
              return data.count;
            },
          },
        });
      },
    },
  },
};

export default operationPolicies;

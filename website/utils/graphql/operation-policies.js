const operationPolicies = {
  Post: {
    events: {
      POST_LIKE(cache, data) {
        const id = cache.identify({
          __typename: "Post",
          id: data.id,
        });

        cache.modify({
          id,
          fields: {
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

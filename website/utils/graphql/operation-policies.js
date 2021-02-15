const operationPolicies = {
  Post: {
    events: {
      POST_LIKE(_, data) {
        const { id, slug, count } = data;

        console.log({ id, slug, count });
      },
    },
  },
};

export default operationPolicies;

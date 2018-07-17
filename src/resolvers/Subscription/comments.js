module.exports = {
  newComments: {
    subscribe: async (_, { postId }, ctx, info) => {
      return ctx.db.comments.post(
        {
          where: {
            mutation_in: ['CREATED'],
            node: {
              post: {
                id: postId
              }
            }
          }
        },
        info
      )
    }
  }
}

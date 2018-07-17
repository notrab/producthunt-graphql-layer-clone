module.exports = {
  newPosts: {
    subscribe: async (_, args, ctx, info) => {
      return ctx.db.subscription.post(
        {
          where: {
            mutation_in: ['CREATED']
          }
        },
        info
      )
    }
  }
}

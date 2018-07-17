module.exports = {
  async postsToday(_, args, ctx, info) {
    const createdAt_gte = new Date(
      new Date().setHours(0, 0, 0, 0)
    ).toISOString()

    return ctx.db.query.posts(
      {
        createdAt_gte,
        orderBy: 'createdAt_ASC'
      },
      info
    )
  },

  async posts(_, { topics }, ctx, info) {
    return ctx.db.query.posts(
      {
        where: {
          topics_some: {
            slug_in: topics
          }
        }
      },
      info
    )
  }
}

const { getUserId } = require('../../utils')

module.exports = {
  async upvote(_, { id }, ctx, info) {
    const userId = await getUserId(ctx)

    const [vote] = await ctx.db.query.votes({
      user: { id: userId },
      post: { id },
      limit: 1
    })

    if (vote) {
      return ctx.db.mutation.deleteVote({ where: { id: vote.id } })
    }

    return ctx.db.mutation.createVote(
      {
        data: {
          user: {
            connect: {
              id: userId
            }
          },
          post: {
            connect: {
              id
            }
          }
        }
      },
      info
    )
  }
}

const { getUserId } = require('../../utils')

module.exports = {
  async createComment(_, { postId, ...args }, ctx, info) {
    const userId = await getUserId(ctx)

    return ctx.db.mutation.createComment(
      {
        data: {
          user: {
            connect: {
              id: userId
            }
          },
          post: {
            connect: {
              id: postId
            }
          },
          ...args
        }
      },
      info
    )
  },

  async editComment(_, { id, message }, ctx, info) {
    return ctx.db.mutation.updateComment({ where: { id }, data: { message } })
  },

  async deleteComment(_, { id }, ctx, info) {
    return ctx.db.mutation.deleteComment({ where: { id } }, info)
  }
}

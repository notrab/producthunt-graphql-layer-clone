const { getUserId } = require('../../utils')

module.exports = {
  me(_, args, ctx, info) {
    const userId = getUserId(ctx)

    if (!userId) return null

    return ctx.db.query.user(
      {
        where: { id: userId }
      },
      info
    )
  }
}

const { rule } = require('graphql-shield')
const { getUserId } = require('../utils')

exports.isAuthenticated = rule()(async (_, args, ctx) => {
  const id = getUserId(ctx)

  return ctx.db.exists.User({ id })
})

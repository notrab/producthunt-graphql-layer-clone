const { rule } = require('graphql-shield')
const { getUserId } = require('../utils')

exports.isAuthor = rule()(async (_, { id }, ctx) => {
  const userId = getUserId(ctx)

  return ctx.db.exists.Comment({
    id,
    user: {
      id: userId
    }
  })
})

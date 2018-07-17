const { rule } = require('graphql-shield')

exports.voteOpen = rule()(async (_, { id }, ctx) => {
  const { createdAt: unformattedCreatedAt } = await ctx.db.query.post({
    where: { id }
  })
  const createdAt = new Date(unformattedCreatedAt).toDateString()
  const today = new Date().toDateString()

  return createdAt === today
})

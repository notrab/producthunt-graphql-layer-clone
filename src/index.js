const { GraphQLServer } = require('graphql-yoga')
const bodyParser = require('body-parser')

const db = require('./db')

const resolvers = require('./resolvers')
const permissions = require('./permissions')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  middlewares: [permissions],
  context: req => ({
    ...req,
    db
  })
})

server.express.use(bodyParser.json())

server.express.post(
  '/webhooks/new-post-comment',
  require('./webhooks/newPostComment')
)

server.start(({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
)

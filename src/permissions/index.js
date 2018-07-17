const { shield, and } = require('graphql-shield')

const { isAuthenticated } = require('./auth')
const { voteOpen } = require('./posts')
const { isAuthor } = require('./comments')

module.exports = shield({
  Query: {
    me: isAuthenticated
  },
  Mutation: {
    createPost: and(isAuthenticated),
    upvote: and(isAuthenticated, voteOpen),
    createComment: isAuthenticated,
    editComment: and(isAuthenticated, isAuthor),
    deleteComment: and(isAuthenticated, isAuthor)
  }
})

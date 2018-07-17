const auth = require('./auth')
const posts = require('./posts')
const votes = require('./votes')
const comments = require('./comments')

module.exports = {
  ...auth,
  ...posts,
  ...votes,
  ...comments
}

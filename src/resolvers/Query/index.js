const auth = require('./auth')
const posts = require('./posts')

module.exports = {
  ...auth,
  ...posts
}

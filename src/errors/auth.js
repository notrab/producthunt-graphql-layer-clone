const { createError } = require('apollo-errors')

exports.InvalidEmailFormat = createError('InvalidEmailFormat', {
  message: 'Invalid email provided'
})

exports.EmailExistsError = createError('EmailExistsError', {
  message: 'An account already exists. Did you mean to signin?'
})

exports.InvalidPassword = createError('InvalidPassword', {
  message: 'Invalid email/password combination'
})

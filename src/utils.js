const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')

const { APP_SECRET } = process.env

exports.isEmailValid = email => isEmail(email)

exports.generateHash = value => bcrypt.hash(value, 10)

exports.signUserToken = userId => jwt.sign({ userId }, APP_SECRET)

exports.compareHash = (current, target) => bcrypt.compare(current, target)

exports.getUserId = ctx => {
  const Authorization = ctx.request.get('Authorization')

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)

    return userId
  }

  return null
}

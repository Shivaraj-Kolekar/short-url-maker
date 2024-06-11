const { getUser } = require('../service/auth') //imports
/*
function checkAuthorize (req, res, next) {
  const authToken = req.cookies?.token
  if (!authToken) return next()
  const token = authToken
  const user = getUser(token)
  req.user = user
  return next()
}

function restrictToUser (roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect('/login')
    if (!roles.includes(req.user.role)) return res.end('unauthorized')
    return next()
  }
}
*/
async function restrictToLoggedInUserOnly (req, res, next) {
  const userUid = req.cookies?.uid
  if (!userUid) {
    return res.redirect('/login')
  }
  const user = await getUser(userUid)
  if (!user) {
    return res.redirect('/login')
  }
  req.user = user
  next()
} //authorization

async function checkAuth (req, res, next) {
  const userUid = req.cookies?.uid

  const user = getUser(userUid)

  req.user = user
  next()
} //authentication
/*
module.exports = {
  checkAuthorize,
  restrictToUser
} //exports*/

module.exports = {
  checkAuth,
  restrictToLoggedInUserOnly
}

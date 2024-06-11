const sessionIdToUserMap = new Map()

function setUser (id, user) {
  sessionIdToUserMap.set(id, user)
} // Set user for cookies

function getUser (id) {
  return sessionIdToUserMap.get(id)
} // get user from cookies

module.exports = {
  setUser,
  getUser
}

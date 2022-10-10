export const data = [
  {
    id: 1,
    name: 'user1',
    email: 'user1@testmail.com'
  },
  {
    id: 2,
    name: 'user2',
    email: 'user2@testmail.com'
  }
]

class User {
  constructor (d) {
    this.users = d
  }

  getAllUsers () {
    return this.users
  }

  addNewUser (user) {
    this.users.push(user)
  }

  updateUser (user, userId) {
    const output = this.users.filter(userObj => {
      if (userObj.id === userId) userObj = user
    })

    return output
  }

  updateUserById (userId, data) {
    const userIndex = this.users.findIndex(user => user.id == userId)
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...data
      }
    } else {
      let newUser = {
        id: userId,
        ...data
      }

      this.addNewUser(newUser)
    }
  }

  getUserById (userId) {
    let resultedUser = this.users.find(user => {
      return user.id == userId
    })
    return resultedUser
  }

  removeUserById (userId) {
    const resultedUsers = this.users.filter(user => user.id != userId)
    this.users = resultedUsers
  }
}

export default new User(data)

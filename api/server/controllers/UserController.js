import Util from '../utils/Utils'
import UserService from '../services/UserService'
import helper from '../utils/validations'
import database from '../src/models'

const util = new Util()

class UserController {
    static async getAllUsers(req, res) {
        try {
            const allUsers = await UserService.getAllUsers()
            if (allUsers.length > 0) {
                util.setSuccess(200, 'Users retrieved', allUsers)
            } else {
                util.setSuccess(200, 'No users found')
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, 'error')
            return util.send(res)
        }
    }

    static async getAUser(req, res) {
        const {id} = req.params   

        if (!Number(id)) {
            util.setError(400, 'Please input a numeric value')
            return util.send(res)
        } 

        try {
            const theUser = await UserService.getAUser(id)

            if (!theUser) {
                util.setError(404, `Cannot find the User with id ${id}`)
            } else {
                util.setSuccess(200, 'Found the User', theUser)
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, error)
            return util.send(res)
        }
    }

    static async createUser(req, res) {

        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
            util.setError(400, 'Please provide complete details')
            return util.send(res)
        }

        if (!helper.isValidEmail(req.body.email)) {
            util.setError(400, 'Please enter a valid email address')
            return util.send(res)
        } 

        if (!helper.isValidPassword(req.body.password)) {
            util.setError(400, 'Password must be more than 5 characters')
            return util.send(res)
        }
         const email = req.body.email
         const newUser = req.body
        try { 
            const createdUser = await UserService.createUser(email, newUser)
            if (createdUser) {
                util.setSuccess(201, 'User Successfully created', createdUser)
            } else {
                util.setError(404, 'User wasn\'t created ')
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }

    static async updateUser(req, res) {
        const updatedUser = req.body
        const {id} = req.params

        if (!Number(id)) {
            util.setError(400, 'input a valid numeric id')
            return util.send(res)
        }

        try {
            const updateUser = await UserService.updateUser(id, updatedUser)
            if (!updateUser) {
                util.setError(404, 'Cannot find User')
            } else {
                util.setSuccess(200, 'User Updated', updatedUser)
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, 'error')
            return util.send(res)
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params

        if(!Number(id)) {
            util.setError(400, 'Please provide a numeric value')
            return util.send(res)
        }

        try {
            const userToDelete = await UserService.deleteUser(id)

            if (userToDelete) {
                util.setSuccess(200, 'User Deleted')
            } else {
                util.setError(404, `User with the id ${id} cannot be found`)
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, 'error')
            return util.send(res)
        }
    }

    /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */

   static async login(req, res) {
       if (!req.body.email || !req.body.password) {
           return util.setError(400, 'Some values are missing')
       }

       if (!helper.isValidEmail(req.body.email)) {
        util.setError(400, 'Please enter a valid email address')
    }

       const password = req.body.password
       const email = req.body.email

       try {
           const theUser = await UserService.login(email)
           
           if (!theUser) {
                util.setError(400, 'Incorrect email')
           } else if (password !== theUser.password) {
                util.setError(400, 'Incorrect password')
           } else {
               util.setSuccess(200, 'Login successful', theUser)
           }
           return util.send(res)
       } catch (error) {
           util.setError(400, error.message)
           return util.send(res)
       }
   }

}

export default UserController
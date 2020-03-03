import database from '../src/models'

class UserService {
    static async getAllUsers() {
        try {
            return await database.Employee.findAll()
        } catch (error) {
            throw(error)
        }
    }

    static async getAUser(id) {
        try {
            const theUser = await database.Employee.findOne({
                where: {
                    id:  Number(id)
                }
            }) 
            return theUser
        } catch (error) {
            throw(error)
        }
    }

    static async createUser(email, newUser) {
        try { 

            const emailExists = await database.Employee.findOne({
                where: {
                    email: email
                }
            })

            if(!emailExists) {
                return await database.Employee.create(newUser)
            } return null
        } catch (error) {
            throw(error)
        }
    }

    static async updateUser(id, updateUser) {
        try {
            const userToUpdate = await database.Employee.findOne({
                where : {
                    id : Number(id)
                }
            })

            if (userToUpdate) {
               const updatedUser = await database.Employee.update(updateUser, {
                    where: {
                        id:Number(id)
                    }
                })
                return updatedUser
            }
            return null
        } catch (error) {
            throw(error)
        }
    }

    static async deleteUser(id) {
        try {
            const userToDelete = await database.Employee.findOne({
                where: { 
                    id: Number(id)
                }     
            })

            if (userToDelete) {
                const deletedUser = await database.Employee.destroy({
                    where: {
                         id: Number(id)
                    }
                })
                return deletedUser
            }
            return null
        } catch (error) {
            throw(error)
        }
    }

    static async login(email) {
        try {
            const theUser =  await database.Employee.findOne({
                where: {
                    email: email
                }
        })
        return theUser
        } catch (error) {
            throw(error)
        }
    }
}

export default UserService
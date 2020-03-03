import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
require ('dotenv').config()

const helper = {
    /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */

    isValidEmail(email) {
    const regEx = /\S+@\S+\.\S+/
    return regEx.test(email)
},

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */

    isValidPassword(password) {
       if (password.length <= 5 || password === '') {
           return false
       }
       return true
   },

   /**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */

   isEmpty(input) {
        if (input === undefined || input === '') {
            return true
        }
   },

   /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */

    hashPassword(password) {
       const salt = bcrypt.genSaltSync(10)
       const hashedPassword = bcrypt.hashSync(password, salt)
       return hashedPassword
   },

   /**
   * comparePassword
   * @param {string} hashPassword 
   * @param {string} password 
   * @returns {Boolean} return True or False
   */

    comparePassword(hashPassword, password) {
        const cpassword = bcrypt.compareSync(password, hashPassword)
        return cpassword
   },

   /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */

    generateToken(id) {
       const token = jwt.sign({
           userId: id
       }, 
       process.env.SECRET, { expiresIn: '7d'}
       )
       return token
   }
}

export default helper

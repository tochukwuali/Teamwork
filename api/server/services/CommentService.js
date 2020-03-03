import database from '../src/models'

class CommentService {
    static async getAllComments() {
        try {
            return await database.Comment.findAll()
        } catch (error) {
            throw(error)
        }
    }

    static async getAComment(id) {
        try {
            const theComment = await database.Comment.findOne({
                where: {
                    id: Number(id)
                }
            })
            return theComment
        } catch (error) {
            throw(error)
        }
    }

    static async createComment(newComment) {
        try {
            return await database.Comment.create(newComment)
        } catch (error) {
            throw(error)
        }
    }

    static async updateComment(id, updateComment) {
        try {
            const commentToUpdate = await database.Comments.findOne({
                where: {
                    id: Number(id)
                }
            })
            if (commentToUpdate) {
               const updatedComment = await database.Comment.update(updateComment, {
                    where: {
                        id: Number(id)
                    }
                }) 
                return updatedComment
            }
            return null
        } catch (error) {
            throw(error)
        }
    }

    static async deleteComment(id) {
        try {
            const commentToDelete = await database.Comment.findOne({
                where: {
                    id: Number(id)
                }
            })

            if (commentToDelete) {
                const deletedComment = await database.Comment.destroy({
                    where: {
                        id: Number(id)
                    }
                })
                return deletedComment
            }
            return null

        } catch (error) {
            throw(error)
        }
    }
}

export default CommentService
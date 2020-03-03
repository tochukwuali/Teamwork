import Util from '../utils/Utils'
import CommentService from '../services/CommentService'

const util = new Util()

class CommentController {
    static async getAllComments(req, res) {
        try {
            const allComments = await CommentService.getAllComments()
            if (allComments.length > 0) {
                util.setSuccess(200, 'Comment retrieved', allComments)
            } else {
                util.setError(200, 'No commment found')
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, 'error')
            return util.send(res)
        }
    }

    static async getAComment(req, res) {
        const { id } = req.params

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric id')
            return util.send(res)
        }

        try {
            const theComment = await CommentService.getAComment

            if (!theComment) {
                util.setError(404, `Cannot find the comment with id ${id}` )
            } else {
                util.setSuccess(200, 'Found the Comment', theComment)
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, 'error')
            return util.send(res)
        }
    }

    static async createComment(req, res) {

        if (!req.body.postId || !req.body.comment || !req.body.userId) {
            util.setError(400, 'Incomplete details')
            return util.send(res)
        }

        const newComment = req.body

        try {
            const createdComment = await CommentService.createComment(newComment)
            util.setSuccess(201, 'Comment Created', createdComment)
            return util.send(res)
        } catch (error) {
            util.setError(400, error)
            return util.send(res)
        }
    }

    static async updateComment(req, res) {
        const updatedComment = req.body
        const {id} = req.params

        if (!Number(id)) {
            util.setError(400, 'input a valid numeric value of id')
            return util.send(res)
        }

        try {
            const updateComment = await CommentService.updateComment(id, updatedComment)
            if (!updateComment) {
                util.setError(404, `Cannot find the comment with id ${id}`)
            } else {
                util.setSuccess(200, 'Comment Updated', updateComment)
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, error)
            return util.send(res)
        }
    }

    static async deleteComment(req, res) {
        const {id} = req.params

        if (!Number(id)) {
            util.setError(400, 'Comment Deleted')
            return util.send(res)
        }

        try {
            const commentToDelete = await CommentService.deleteComment(id)

            if (postToDelete) {
                util.setSuccess(200, 'Comment Deleted')
            } else {
                util.setError(404, `Comment with id ${id} cannot be found`)    
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, error)
            return util.send(res)
        }
    }
}

export default CommentController
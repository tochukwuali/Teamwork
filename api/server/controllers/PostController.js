import PostService from '../services/PostService'
import Util from '../utils/Utils'
const database = require ('../src/models')

const util = new Util()

class PostController {
    static async getAllPosts(req, res) {
        try {
            const allPosts = await PostService.getAllPosts()
            if (allPosts.length > 0) {
                util.setSuccess(200, 'Posts retrieved', allPosts)
            } else {
                util.setSuccess(200, 'No Post found')
            }
            return util.send(res) 
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }

    static async getAPost(req, res) {
        const { id } = req.params

        // if (!Number(postId)) {
        //     util.setError(400, 'Please input a valid numeric value')
        //     return util.send(res)
        // }

        try {
            const thePost = await database.Post.findOne({
                where: {
                    id: Number(id)
                },
                include:[ {
                    model: database.Comment,
                    as: 'comments',
                    include: {
                        model: database.Employee,
                        as: 'author'
                    }
                },
                {
                    model: database.Employee,
                    as: 'author'
                }]
            })
            if (!thePost) {
                util.setError(404, `Cannot find the post with id ${postId}`)
            } else {
                util.setSuccess(200, 'Found the Post', thePost)
            }
            return util.send(res)
        } catch (error) {
            util.setError(404, error.message)
            return util.send(res)
        }
    }

    static async addPost(req, res) {

        if (!req.body.title || !req.body.content) {
            util.setError(400, 'Please provide complete details')
            return util.send(res)
        }

        const newPost = req.body

        try {
            const createdPost = await PostService.addPost(newPost)
            util.setSuccess(201, 'Post added!', createdPost)
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }

     static async updatePost(req, res) {
        const editedPost = req.body
        const {id} = req.params

        if (!Number(id)) {
            util.setError(400, 'input a valid numeric value')
            return util.send(res) 
        }

        try {
            const updatePost = await PostService.updatePost(id, editedPost)
            if (!updatePost) {
                util.setError(404, `Cannot find Post with id: ${id} `)
            } else {
                util.setSuccess(200, 'Post Updated', updatePost)
            }
            return util.send(res)
        } catch (error) {
            util.setError(404, 'error')
            return util.send(res)
        }
    }

    static async deletePost(req, res) {
        const { id } = req.params

        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value')
            return util.send(res)
        }

        try {
            const postToDelete = await PostService.deletePost(id)

            if (postToDelete) {
                util.setSuccess(200, 'Post Deleted')
            } else {
                util.setError(404, `Post with the id: ${id} cannot be found`)
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, error)
            return util.send(res)
        }
    }
}

export default PostController
import database from '../src/models'

class PostService {
    static async getAllPosts() {
        try {
            return await database.Post.findAll({
                include: [
                    {
                        model: database.Comment,
                        as: 'comments',
                        include: {
                            model: database.Employee,
                            as: 'author'
                        }
                    },
                    { 
                        model: database.Employee, 
                        as : 'author', 
                    } 
                ]           
            })
        } catch (error) {
            throw(error) 
        }
    }

    static async getAPost(id) {
        try {
            const thePost = await database.Post.findOne({
                where: {
                    id: Number(id)
                } 
                
            })
            return thePost
        } catch (error) {
            throw(error)
        }
    }

    static async addPost(newPost) {
        try {
            return await database.Post.create(newPost)
        } catch (error) {
            throw(error)
        } 
    } 

    static async updatePost(id, updatePost) {
        try {
            const postToUpdate = await database.Post.findOne({
                where : {
                    id: Number(id)
                }
            })

            if (postToUpdate) {
             const updatedPost = await database.Post.update(updatePost, {
                    where: {
                        id: Number(id)
                    }
                })
                return updatedPost
            } 
            return null
        } catch (error) {
            throw(error)
        }
    }
    
    static async deletePost(id) {
        try {
            const postToDelete = await database.Post.findOne({
                where: { 
                    id: Number(id)
                }     
            })

            if (postToDelete) {
                const deletedPost = await database.Post.destroy({
                    where: { 
                        id: Number(id)
                    }
                })
                return deletedPost
            }
            return null
        } catch (error) {
            throw(error)
        }
    }
}

export default PostService
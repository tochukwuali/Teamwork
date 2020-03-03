import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'
import { read } from 'fs'
import { runInNewContext } from 'vm'

chai.use(chatHttp)
const { expect } = chai 

describe('Testing the post endpoints:', () => {
    it('It should create a post', (done) => {
        const post = {
            title: 'Increase in salary',
            content: 'Lorem ipsum dolor sit amet',
            userId: '1'

        }
        chai.request(app)
            .post('/api/v1/posts')
            .set('Accept', 'application/json')
            .send(post)
            .end((err, res) => {
                expect(res.status).to.equal(201)
                expect(res.body.data).to.include({
                    id: 1,
                    title: post.title,
                    content: post.content,
                    userId: post.userId
                })
                done()
            })
    })

    it('It should not create a post with incorrect parameters', (done) => {
        const post = {
            title: 'The employees want a raise'
        }
        chai.request(app)
            .post('api/v1/posts')
            .set('Accept', 'application/json')
            .send(post)
            .end((err, res) => {
                expect(res.status).to.equal(400)
                done()
            })
    })
    it('It should get all posts', (done) => {
        chai.request(app)
            .get('api/v1/posts')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200)
                res.body.data[0].should.have.property('id')
                res.body.data[0].should.have.property('title')
                res.body.data[0].should.have.property('content')
                res.body.data[0].should.have.property('userId')
                done()
            })
    })
    it('It should get a particular post', (done) => {
        const postId = 1
        chai.request(app)
            .get(`api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200)
                res.status.data.should.have.property('id')
                res.status.data.should.have.property('title')
                res.status.data.should.have.property('content')
                res.status.data.should.have.property('userId')
                done()
            })
    })

    it('It should not get a particular post with an invalid id', (done) => {
        const postId = 8888
        chai.request(app)
            .get(`api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400)
                res.body.should.have.property('message')
                                    .eql(`Cannot find post with id ${postId}`)
                done()
            })
    })

    it('It should not get a particular post with a non-numeric id', (done) => {
        const postId = 'aaa'
        chai.request(app)
            .get(`api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400)
                res.body.should.have.property('message')
                                    .eql('Please input a valid numeric value')
                done()
            })
    })

    it('It should update post', (done) => {
        const postId = 1
        const updatedPost = {
            id: postId,
            title: 'Some yada yada title',
            content: 'Some yada yada content',
            userId: 1
        }
        chai.request(app)
            .put(`api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .send(updatedPost)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.id).equal(updatedPost.id)
                expect(res.body.title).equal(updatedPost.title)
                expect(res.body.content).equal(updatedPost.content)
                expect(res.body.userId).equal(updatedPost.userId)
                done()
            })
    })

    it('It should not update a post with invalid id', (done) => {
        const postId = 9999
        const updatedPost = {
            id = postId,
            title = 'Some !updated shitty title',
            content = 'Some !updated shitty content',
            userId = 1
        }
        chai.request(app)
            .put(`api/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .send(updatedPost)
            .end((err, res) => {
                expect(res.status).to.equal(404)
                res.body.should.have.property('messae')
                                    .eql(`Cannot find post with id ${postId} `)
                done()
            })
    })

    it('It should not update a post with a non numeric id value', (done) => {
        const postId = 'ggg'
        const updatedPost = {
            id: postId,
            title: 'Some !updated shitty title again',
            content: 'Some !updated shitty content again',
            userId: 1
        }
        chai.request(app)
            .put(`app/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .send(updatedPost)
            .end((err, res) => {
                expect(res.status).to.equal(400)
                res.body.should.have.property('message')
                                    .eql('Please input a valid numeric value')
                done()
            })
    })

    it('It should delete a post', (done) => {
        const postId = 1
        chai.request(app)
               .delete(`api/v1/posts/${postId}`)
               .set('Accept', 'application/json')
               .end((err, res) => {
                   expect(res.status).to.equal(200)
                   expect(res.body.data).to.include({})
                   done()
               })
    })

    it('It should not delete a post with an invalid id', (done) => {
        const postId = 7777
        chai.request(app)
            .delete(`app/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(404)
                res.body.should.have.property('message')
                                    .eql(`Post with id ${postId} cannot be found`)
                done()
            })           
    })

    it('It should not delete a post with non-numeric id', (done) => {
        const postId = 'yyy'
        chai.request(app)
            .delete(`app/v1/posts/${postId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400)
                res.body.should.have.property('message')
                                    .eql('Please provide a valid numeric value')
                done()
            })
    })
})  
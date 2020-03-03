import express from 'express'
import bodyParser from 'body-parser'
import postroutes from './server/routes/PostRoutes'
import userroutes from './server/routes/UserRoutes'
import commentroutes from './server/routes/CommentRoutes'
import authroutes from './server/routes/AuthRoutes'

const app = express() 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const port = process.env.PORT || 5000

app.use('/api/v1/posts', postroutes)
app.use('/api/v1/users', userroutes)
app.use('/api/v1/comments', commentroutes)
app.use('/api/v1/login', authroutes)


app.get('*', (req, res) => {
    res.status(200).send({
        message: 'The app is set up and running correctly'
    })
})

app.listen(port, () => {
    console.log(`Server is running on PORT ${port} `)
    console.log(process.env.NODE_ENV)
})

export default app
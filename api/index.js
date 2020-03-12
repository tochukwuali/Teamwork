import express from 'express'
import bodyParser from 'body-parser'
import postroutes from './server/routes/PostRoutes'
import userroutes from './server/routes/UserRoutes'
import commentroutes from './server/routes/CommentRoutes'
import authroutes from './server/routes/AuthRoutes'
import {multerUploads, dataUri} from './server/middlewares/multer'
import { resolve } from  'path'
import { uploader, cloudinaryConfig } from './server/config/cloudinaryConfig'


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

app.use('*', cloudinaryConfig)

app.post('/upload', multerUploads, (req, res) => {

    if(req.file) {
        const file = dataUri(req).content;
        return uploader.upload(file)
        
        .then((result) => {

            const image = result.url;
            return res.status(200).json({
            message: 'Your image has been uploded successfully to cloudinary',
            result
         })

})
        .catch((err) => res.status(400).json({
            message: 'someting went wrong while processing your request',
            data: { err }
        })
     )
   }

});

app.listen(port, () => {
    console.log(`Server is running on PORT ${port} `)
    console.log(process.env.NODE_ENV)
})

export default app
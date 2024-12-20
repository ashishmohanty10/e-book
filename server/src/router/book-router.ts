import express from 'express'
import { createBook } from '../controller/book-controller'
import multer from 'multer'
import path from 'path'

const bookRouter = express.Router()

const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    limits: { fileSize: 3e7 },
})

bookRouter.post(
    '/add-book',
    upload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'file', maxCount: 1 },
    ]),
    createBook
)

export default bookRouter

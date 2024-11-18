import { NextFunction, Request, Response } from 'express'
import cloudinary from '../config/cloudinary'
import path from 'node:path'
import createHttpError from 'http-errors'

export const createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const files = req.files as { [filefname: string]: Express.Multer.File[] }

    const coverMimeImageType = files.coverImage[0].mimetype.split('/').at(-1)

    const filename = files.coverImage[0].filename
    const filepath = path.resolve(__dirname, '../../public/data', filename)

    try {
        const uplaodResult = await cloudinary.uploader.upload(filepath, {
            filename_override: filename,
            folder: 'book_covers',
            format: coverMimeImageType,
        })

        const bookFileName = files.file[0].filename
        const bookFilePath = path.resolve(
            __dirname,
            '../../public/data/uploads',
            filename
        )

        try {
            const bookFileUpladResult = await cloudinary.uploader.upload(
                bookFilePath,
                {
                    resource_type: 'raw',
                    filename_override: bookFileName,
                    folder: 'book-pdfs',
                    format: 'pdf',
                }
            )
            console.log('bookFileUpladResult', bookFileUpladResult)
        } catch (error) {
            console.log('Error', error)
        }

        console.log('uploadResult', uplaodResult)
        res.json({})
    } catch (error) {
        return next(createHttpError(500, 'Error while uploading the files'))
    }
}

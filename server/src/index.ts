import express, { NextFunction, Request, Response } from 'express'
import createHttpError, { HttpError } from 'http-errors'
import { config } from './config/config'

const app = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    const error = createHttpError(400, 'something went wrong')

    throw error
    res.json({
        message: 'welcome',
    })
})

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        message: err.message,
        errorStack: config.env === 'development' ? err.stack : '',
    })
})

export default app

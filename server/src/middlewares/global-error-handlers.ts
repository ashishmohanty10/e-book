import { Request, Response, NextFunction } from 'express'
import { config } from '../config/config'
import { HttpError } from 'http-errors'

export const globalErrorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        message: err.message,
        errorStack: config.env === 'development' ? err.stack : '',
    })
}

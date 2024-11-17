import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import prisma from '../config/db'

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { firstname, lastname, email, password } = req.body

    if (!firstname || !lastname || !email || !email || !password) {
        const error = createHttpError(400, 'All fields are required')

        return next(error)
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (user) {
            const error = createHttpError(400, 'User already exists')

            return next(error)
        } else {
            const newUser = await prisma.user.create({
                data: {
                    email,
                    firstname,
                    lastname,
                    password,
                },
            })

            return newUser
        }
    } catch (error) {}

    res.json({
        message: 'User created successfully',
    })
}

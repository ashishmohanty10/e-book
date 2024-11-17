import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import prisma from '../config/db'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { config } from '../config/config'

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
            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await prisma.user.create({
                data: {
                    email,
                    firstname,
                    lastname,
                    password: hashedPassword,
                },
            })

            const token = sign(
                { sub: newUser.id },
                config.jwtSecret as string,
                { expiresIn: '7d' }
            )

            res.status(201).json({ accesToken: token })
        }
    } catch (error) {
        console.log('error', error)
    }
}

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body

    if (!email || !password) {
        const error = createHttpError(400, 'All fields are required')

        return next(error)
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (!user) {
            return next(createHttpError(404, 'User not found'))
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return next(createHttpError(401, 'Usernam or password incorrect'))
        }

        const token = sign({ sub: user.id }, config.jwtSecret as string, {
            expiresIn: '7d',
        })
        res.json({ accessToken: token })
    } catch (error) {
        console.log('error', error)
    }
}

import express, { Request, Response } from 'express'
import { createUser } from '../controller/user-controller'

const userRouter = express.Router()

userRouter.post('/register', createUser)

export default userRouter

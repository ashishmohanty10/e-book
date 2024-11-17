import express, { Request, Response } from 'express'
import { createUser, loginUser } from '../controller/user-controller'

const userRouter = express.Router()

userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)

export default userRouter

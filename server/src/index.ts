import express, { Request, Response } from 'express'
import { globalErrorHandler } from './middlewares/global-error-handlers'
import userRouter from './router/user-router'
import bookRouter from './router/book-router'

const app = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'welcome',
    })
})

app.use('/api/user', userRouter)
app.use('/api/book', bookRouter)

// global error handler
app.use(globalErrorHandler)

export default app

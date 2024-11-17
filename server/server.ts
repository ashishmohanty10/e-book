import { config } from './src/config/config'
import app from './src/index'

const startServer = () => {
    const { port } = config || 3000

    app.listen(port, () => {
        console.log(`Server started at port ${port}`)
    })
}

startServer()
import dotenv from 'dotenv'
import express from "express"
import { routes } from './routes'
import { errorHandler } from './errors/error-handler'

dotenv.config()

const app = express()
const port = 3333

app.use(express.json())

app.use("/api", routes)

app.get("/", (_, res) => {
    return res.json({ status: "Online" })
})

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
import config from '../../config'
import express, { Application } from 'express'
import router from './routes/api'

const app: Application = express()

config()

app.use(express.json())
app.use(router)

export { app }
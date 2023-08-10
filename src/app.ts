import express, { type Application } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { SBError, INTERNAL_ERROR, protectRoutes, errorHandler, NOT_FOUND_ERR } from '@shahab5191/shared'
import { createRouter } from './routes/create'

dotenv.config()

const app: Application = express()
if (process.env.JWT_SECRET === undefined) {
  throw new SBError(INTERNAL_ERROR, 'jwt secret was not found')
}

app.set('trust proxy', true)
app.use(express.json())
app.use(morgan('tiny'))

// app.use(protectRoutes)
app.use(createRouter)

app.all('*', () => {
  throw new SBError(NOT_FOUND_ERR, 'Recipe')
})

app.use(errorHandler)
export default app

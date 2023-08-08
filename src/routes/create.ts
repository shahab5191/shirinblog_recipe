import express, { type Request, type Response, type NextFunction } from 'express'

const router = express.Router()
router.post('/api/v1/recipe/create', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('<h1>Create Recipe</h1>')
})

export { router as createRouter }

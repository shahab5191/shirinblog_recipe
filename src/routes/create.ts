import { SBError, VALIDATION_ERR } from "@shahab5191/shared"
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express"
import { validationResult } from "express-validator"
import { createValidator } from "../validators/create"
import Recipe from "../models/recipe"

const router = express.Router()
router.post(
  "/api/v1/recipe/create",
  createValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      next(new SBError(VALIDATION_ERR, errors.array()))
      return
    }
    const {
      name,
      title,
      description,
      difficulty,
      ingredients,
      categories,
      steps,
      status,
      timing,
      servings,
      dietary,
      image,
    } = req.body

    const recipe = new Recipe({
      name,
      title,
      description,
      difficulty,
      ingredients,
      categories,
      steps,
      status,
      timing,
      servings,
      dietary,
      image,
    })

    recipe.save()

    res
      .status(201)
      .send({ data: { id: recipe.id }, success: true, error: [{}] })
  }
)

export { router as createRouter }

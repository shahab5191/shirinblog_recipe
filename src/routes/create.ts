import { SBError, VALIDATION_ERR } from "@shahab5191/shared";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { validationResult } from "express-validator";
import { createValidator } from "../validators/create";

const router = express.Router();
router.post(
  "/api/v1/recipe/create",
  createValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new SBError(VALIDATION_ERR, errors.array()));
      return;
    }

  }
);

export { router as createRouter };

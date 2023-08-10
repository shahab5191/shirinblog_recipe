import { body } from "express-validator"
import {
  isArrayOfAlphaNumerics,
  isValidText,
  nonSpaceLength,
  validateDifficulty,
} from "./custom-validators"

export const createValidator = [
  body("name")
    .custom(isValidText)
    .withMessage("Name should be provided and be a-z A-Z and numbers")
    .isLength({max: 128})
    .withMessage("Name's lentgh should be less than 128 chars")
    .custom(val => {return nonSpaceLength(val, {min: 4})})
    .withMessage("Name's none space characters length should be atleast 4"),
  body("title")
    .custom(isValidText)
    .withMessage("Title should be provided and be a-z A-Z and numbers")
    .isLength({max: 128})
    .withMessage("Title's lentgh should be less than 128 chars")
    .custom(val => {return nonSpaceLength(val, {min: 4})})
    .withMessage("Titles's none space characters length should be atleast 4"),
  body("description")
    .trim()
    .not()
    .isEmpty()
    .escape()
    .withMessage("Description cannot be empty")
    .custom(value => {return nonSpaceLength(value, {min: 4})})
    .withMessage("Description's none space charecters should length of atleast 4"),
  body("difficulty").custom(validateDifficulty),
  body("ingredients")
    .custom(isArrayOfAlphaNumerics)
    .withMessage("Ingredients should be an array of strings"),
  body("categories")
    .custom(isArrayOfAlphaNumerics)
    .withMessage("Categories should be an array of strings"),
  body("steps").isArray().withMessage("Steps should be an array of strings"),
  body("status")
    .isAlpha()
    .withMessage("status should be either DRAFT | PUBLISH | TRASH"),
  body("timing")
    .isObject()
    .withMessage(
      "timing should be an object of 3 ints reperesenting preperation, cooking, additional"
    ),
  body("servings").isInt().withMessage("Servings should be an integer"),
  body("dietary")
    .isAlpha()
    .withMessage("Dietary restriction should be a string"),
]

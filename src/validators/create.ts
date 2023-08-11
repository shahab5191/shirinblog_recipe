import { body } from "express-validator"
import {
  isArrayItemsLength,
  isArrayOfAlphaNumerics,
  isEnum,
  isObjectOfType,
  isValidText,
  nonSpaceLength,
} from "./custom-validators"

export const createValidator = [
  body("name")
    .trim()
    .custom(isValidText)
    .withMessage("Name should be provided and be a-z A-Z and numbers")
    .isLength({ max: 128 })
    .withMessage("Name's lentgh should be less than 128 chars")
    .custom((val) => {
      return nonSpaceLength(val, { min: 4 })
    })
    .withMessage("Name's none space characters length should be atleast 4"),
  body("title")
    .trim()
    .custom(isValidText)
    .withMessage("Title should be provided and be a-z A-Z and numbers")
    .isLength({ max: 128 })
    .withMessage("Title's lentgh should be less than 128 chars")
    .custom((val) => {
      return nonSpaceLength(val, { min: 4 })
    })
    .withMessage("Titles's none space characters length should be atleast 4"),
  body("description")
    .trim()
    .not()
    .isEmpty()
    .escape()
    .withMessage("Description cannot be empty")
    .custom((value) => {
      return nonSpaceLength(value, { min: 4 })
    })
    .withMessage(
      "Description's none space charecters should length of atleast 4"
    ),
  body("difficulty").custom((val) => isEnum(val, ["EASY", "MEDIUM", "HARD"])),
  body("ingredients")
    .custom(isArrayOfAlphaNumerics)
    .withMessage("Ingredients should be an array of strings")
    .custom((val) => isArrayItemsLength(val, { min: 2, max: 128 }))
    .withMessage(
      "Ingredients items should have min length of 2 and max length of 128"
    ),
  body("categories")
    .custom(isArrayOfAlphaNumerics)
    .withMessage("Categories should be an array of strings")
    .custom((val) => isArrayItemsLength(val, { min: 2, max: 128 }))
    .withMessage(
      "Categories items should have min length of 2 and max length of 128"
    ),
  body("steps")
    .custom(isArrayOfAlphaNumerics)
    .withMessage("Steps should be an array of strings")
    .custom((val) => isArrayItemsLength(val, { min: 4, max: 128 }))
    .withMessage(
      "Steps items should have min length of 4 and max length of 128"
    ),
  body("status")
    .custom((val) => isEnum(val, ["DRAFT", "PUBLISH", "TRASH"]))
    .withMessage("status should be either DRAFT | PUBLISH | TRASH"),
  body("timing")
    .custom((val) =>
      isObjectOfType(val, { preparation: 0, cooking: 0, additional: 0 })
    )
    .withMessage(
      "timing should be an object of 3 ints reperesenting preperation, cooking, additional"
    ),
  body("servings").isInt().withMessage("Servings should be an integer"),
  body("dietary")
    .isAlpha()
    .withMessage("Dietary restriction should be a string"),
]

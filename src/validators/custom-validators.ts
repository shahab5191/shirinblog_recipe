import { removeSpaces } from "./utils/utils"

export const validateDifficulty = (val: string) => {
  const lVal = val.toLowerCase()
  if (lVal === "easy" || lVal === "medium" || lVal === "hard") {
    return true
  }
  throw new Error("Difficulty must be either EASY, MEDIUM or HARD")
}

export const isArrayOfAlphaNumerics = (val: Array<string>) => {
  if (val.length < 1) {
    throw new Error("this Array should have atleast 1 item")
  }
  for (let item of val) {
    if (!/^[a-zA-Z0-9 -_]+$/.test(item)) {
      throw new Error("every item of this Array should be alphanumeric")
    }
  }
  return true
}
export const isArrayItemsLength = (
  val: Array<string>,
  options: { min?: number; max?: number }
) => {
  for (let item of val) {
    if (!nonSpaceLength(item, { min: options.min, max: options.max })) {
      throw new Error(
        "every item of this Array should atleast have 2 nonespace chars"
      )
    }
  }
  return true
}
export const isValidText = (val: string) => {
  if (!/^[a-zA-Z0-9 -_]+$/.test(val)) {
    throw new Error("every item of this Array should be alphanumeric")
  }
  return true
}

export const nonSpaceLength = (
  val: string,
  options: { min?: number; max?: number }
) => {
  const trimedVal = removeSpaces(val)
  if (options.min !== undefined) {
    if (trimedVal.length < options.min) {
      throw new Error(
        `this field none space chars cannot be less than ${options.min}`
      )
    }
  }
  if (options.max !== undefined) {
    if (trimedVal.length > options.max) {
      throw new Error(
        `this field none space chars cannot be more than ${options.max}`
      )
    }
  }
  return true
}

export const isEnum = (val: string, enumArray: Array<string>) => {
  if (!enumArray.includes(val)) {
    throw new Error(
      `This field should be either ${enumArray.map((val) => {
        return val + " "
      })}`
    )
  }
  return true
}

export const isObjectOfType = (
  val: Record<string, any>,
  object: Record<string, any>
) => {
  if(Object.keys(object).length !== Object.keys(val).length){
    throw new Error('this field is not the same type as defined!')
  }
  for(let item in val){
    if(!Object.keys(object).includes(item)){
      throw new Error('this field is not the same type as defined!')
    }
    const itemType = typeof val[item];
    const objType = typeof object[item]
    if(itemType !== objType){
      throw new Error("this field's items should have the same type as defined")
    }
  }
  return true
}

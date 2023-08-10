import { removeSpaces } from "./utils/utils";

export const validateDifficulty = (val: string) => {
  const lVal = val.toLowerCase();
  if (lVal === "easy" || lVal === "medium" || lVal === "hard") {
    return true;
  }
  throw new Error("Difficulty must be either EASY, MEDIUM or HARD");
};

export const isArrayOfAlphaNumerics = (val: Array<string>) => {
  if (val.length < 1) {
    throw new Error("this Array should have atleast 1 item");
  }
  for (let item of val) {
    if (!/^[a-zA-Z0-9 ]+$/.test(item)) {
      throw new Error("every item of this Array should be alphanumeric");
    }
  }
  return true;
};

export const isValidText = (val: string) => {
  if (!/^[a-zA-Z0-9 ]+$/.test(val)) {
    throw new Error("every item of this Array should be alphanumeric");
  }
  return true
}

export const nonSpaceLength = (val: string, options: {min?: number,max?:number}) => {
  const trimedVal = removeSpaces(val)
  if(options.min !== undefined){
    if(trimedVal.length < options.min){
      throw new Error(`this field none space chars cannot be less than ${options.min}`)
    }
  }
  if(options.max !== undefined){
    if(trimedVal.length > options.max){
      throw new Error(`this field none space chars cannot be more than ${options.max}`)
    }
  }
  return true
}

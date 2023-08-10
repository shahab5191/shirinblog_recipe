import { randomAlphaNumeric, randomAlphaString } from "./random-gen";

interface CreateRecipeInputs {
  name?: any
  title?: any
  description?: any
  difficulty?: any
  ingredient?: any
  categories?: any
  steps?: any
  status?: any
  timing?: any
  servings?: any
  dietary?: any
}

export const createInput = (inputs: CreateRecipeInputs) => {
  let name = inputs.name !== undefined? inputs.name : randomAlphaNumeric();
  let title = inputs.title !== undefined? inputs.title : randomAlphaNumeric();
  let description = inputs.description !== undefined? inputs.description : randomAlphaNumeric();
  let difficulty = inputs.difficulty !== undefined? inputs.difficulty : "EASY"
  let ingredients = inputs.ingredient !== undefined? inputs.ingredient : [
    randomAlphaNumeric(),
    randomAlphaNumeric(),
    randomAlphaNumeric()
  ]
  let categories = inputs.categories !== undefined? inputs.categories : [
    randomAlphaNumeric(),
    randomAlphaNumeric(),
    randomAlphaNumeric()
  ]
  let steps = inputs.steps !== undefined? inputs.steps : [
    randomAlphaNumeric(),
    randomAlphaNumeric(),
    randomAlphaNumeric()
  ]
  let status = inputs.status !== undefined? inputs.status : "PUBLISH"
  let timing = inputs.timing !== undefined? inputs.timing : {
    preparation: 5,
    cooking: 40,
    additional: 10
  }
  let servings = inputs.servings !== undefined? inputs.servings :  Math.floor(Math.random() * 100)
  let dietary = inputs.dietary !== undefined? inputs.dietary : randomAlphaString()

  return {
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
    dietary
  }
}

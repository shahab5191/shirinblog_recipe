import mongoose, { Schema } from "mongoose"

interface RecipeInputs {
  name: string
  title: string
  description: string
  difficulty: "EASY" | "MEDIUM" | "HARD"
  ingredients: Array<string>
  categories: Array<string>
  steps: Array<string>
  status: "DRAFT" | "PUBLISH" | "TRASH"
  image: string
  timing: { preparation: number; cooking: number; additional: number }
  servings: number
  dietary: string
}

interface RecipeDoc extends mongoose.Document {
  name: string
  title: string
  description: string
  difficulty: "EASY" | "MEDIUM" | "HARD"
  ingredients: Array<string>
  categories: Array<string>
  steps: Array<string>
  status: "DRAFT" | "PUBLISH" | "TRASH"
  image: string
  timing: { preparation: number; cooking: number; additional: number }
  servings: number
  createdAt: Date
  updateAt: Date
  dietary: string
}

interface RecipeModel extends mongoose.Model<RecipeInputs> {
  build: (inputs: RecipeInputs) => RecipeDoc
}

const TimingSchema = new Schema({
  preparation: { type: Number, required: true },
  cooking: { type: Number, required: true },
  additional: { type: Number, required: true },
})

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["EASY", "MEDIUM", "HARD"],
    required: true,
  },
  ingredients: { type: [String], required: true },
  categories: Array<string>,
  steps: Array<string>,
  status: {
    type: String,
    enum: ["DRAFT", "PUBLISH", "TRASH"],
    required: true,
  },
  image: { type: String, required: true },
  timing: {
    preparation: { type: Number, required: true },
    cooking: { type: Number, required: true },
    additional: { type: Number, required: true },
  },
  servings: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
  dietary: { type: String, required: true },
})

RecipeSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

const Recipe = mongoose.model<RecipeDoc, RecipeModel>("Recipe", RecipeSchema)

export default Recipe

import mongoose from "mongoose"
import app from "./app"

let Port = 4001
if (process.env.PORT !== undefined) {
  Port = Number(process.env.PORT)
}

const startService = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/recipe").then(() => {
      console.log("recipe service database connection stablished")
    })
  } catch (error) {
    console.log(error)
    return
  }
  app.listen(Port, () => {
    console.log(`🖥️ is running on port ${Port}!`)
  })
}

void startService()

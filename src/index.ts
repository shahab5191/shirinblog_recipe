import app from './app'

let Port = 4001
if (process.env.PORT !== undefined) {
  Port = Number(process.env.PORT)
}

const startService = async (): Promise<void> => {
  app.listen(Port, () => {
    console.log(`🖥️ is running on port ${Port}!`)
  })
}

void startService()

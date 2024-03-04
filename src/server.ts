import express from 'express'
import prisma from "./utils/prisma";

const app = express()
app.use(express.json())

const port = process.env.PORT ?? 4000

app.get('/sensores', async (request, response) => {
    const sensores = await prisma.sensor.findMany()
    return response.json(sensores)
  })
  
  app.post('/sensores', async (request, response) => {
    const { nome, valor } = request.body
    const sensor = await prisma.sensor.create({
      data: {
        nome,
        valor,
      },
    })
    return response.json(sensor)
  })
  
  app.listen(port, () => console.log('Server is running on port ', port))
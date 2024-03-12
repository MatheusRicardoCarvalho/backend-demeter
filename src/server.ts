import express from "express";
import prisma from "./utils/prisma";
import cron from "node-cron";
import router from "./routes";

const app = express();
app.use(express.json());

app.use(router)

const port = process.env.PORT ?? 4000;

cron.schedule("1 17 * * *", () => {
  console.log("testei");
});



app.get("/sensores", async (request, response) => {
  const sensores = await prisma.sensor.findMany();
  return response.json(sensores);
});

app.post("/sensores", async (request, response) => {
  const { nome, valor } = request.body;
  const sensor = await prisma.sensor.create({
    data: {
      nome,
      valor,
    },
  });
  return response.json(sensor);
});

app.listen(port, () => console.log("Server is running on port ", port));

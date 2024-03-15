import express from "express";
import prisma from "./utils/prisma";
import router from "./routes";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(308, `https://${req.headers.host}${req.url}`);
  }
  return next();
});

app.use(router)

const port = process.env.PORT ?? 4000;


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

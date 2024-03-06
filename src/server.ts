import express from "express";
import prisma from "./utils/prisma";
import cron from "node-cron";
import { create, Whatsapp } from "venom-bot";
const app = express();
app.use(express.json());

const port = process.env.PORT ?? 4000;

cron.schedule("* * * * *", () => {
  console.log("testei");
});

async function connectToWhatsApp() {
  const client: Whatsapp = await create({
    session: "GPZAP",
    disableWelcome: true,
  });

  // Evento para quando uma mensagem é recebida
  client.onMessage(async (message) => {
    console.log("Mensagem recebida:", message.body);
    await client.sendText(message.from, "Oi! Como posso ajudar?");
  });
}

// Inicie a conexão
connectToWhatsApp();

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

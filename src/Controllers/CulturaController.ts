import { Request, Response } from "express";
import prisma from "../utils/prisma";

export class CulturaController {
  async criarCultura(req: Request, res: Response) {
    try {
      const { nome, kc, usuarioId, mm_dia } = req.body;

      const novaCultura = await prisma.cultura.create({
        data: {
          nome,
          kc,
          mm_dia,
          usuario: { connect: { id: usuarioId } },
        },
      });

      return res.status(201).json(novaCultura);
    } catch (error) {
      console.error("Erro ao criar cultura:", error);
      return res.status(500).json({ error: "Erro interno do servidor: \n"+error });
    }
  }

  async lerCulturaPorId(req: Request, res: Response) {
    try {
      const {culturaId} = req.body;

      const cultura = await prisma.cultura.findUnique({
        where: { id: culturaId },
      });

      if (!cultura) {
        return res.status(404).json({ error: "Cultura não encontrada" });
      }

      return res.status(200).json(cultura);
    } catch (error) {
      console.error("Erro ao ler cultura por ID:", error);
      return res.status(500).json({ error: "Erro interno do servidor: \n"+error });
    }
  }

  async listarCulturasPorUsuario(req: Request, res: Response) {
    try {
      const usuarioId = Number(req.params.usuarioId);

      const culturas = await prisma.cultura.findMany({
        where: { usuario_id: usuarioId },
      });

      return res.status(200).json(culturas);
    } catch (error) {
      console.error("Erro ao listar culturas por usuário:", error);
      return res.status(500).json({ error: "Erro interno do servidor: \n"+error });
    }
  }

  async atualizarCultura(req: Request, res: Response) {
    try {
      const culturaId = Number(req.params.culturaId);
      const { nome, kc } = req.body;

      const culturaAtualizada = await prisma.cultura.update({
        where: { id: culturaId },
        data: { nome, kc },
      });

      return res.status(200).json(culturaAtualizada);
    } catch (error) {
      console.error("Erro ao atualizar cultura:", error);
      return res.status(500).json({ error: "Erro interno do servidor: \n"+error });
    }
  }

  async excluirCultura(req: Request, res: Response) {
    try {
      const culturaId = Number(req.params.culturaId);

      await prisma.cultura.delete({
        where: { id: culturaId },
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir cultura:", error);
      return res.status(500).json({ error: "Erro interno do servidor: \n"+error });
    }
  }
}

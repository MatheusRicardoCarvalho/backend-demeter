import { Request, Response } from "express";
import prisma from "../utils/prisma";

export class UsuarioController {
  async criarUsuario(req: Request, res: Response) {
    try {
      const { nome, tel } = req.body;

      const novoUsuario = await prisma.usuario.create({
        data: { nome , tel},
      });

      return res.status(201).json(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: "Erro interno do servidor: \n"+error });
    }
  }

  async lerUsuarioPorId(req: Request, res: Response) {
    try {
      const usuarioId = Number(req.params.usuarioId);

      const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioId },
      });

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      console.error("Erro ao ler usuário por ID:", error);
      return res.status(500).json({ error: "Erro interno do servidor: \n"+error });
    }
  }

  async listarUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await prisma.usuario.findMany();

      return res.status(200).json(usuarios);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return res.status(500).json({ error: "Erro interno do servidor: \n"+error });
    }
  }

  async atualizarUsuario(req: Request, res: Response) {
    try {
      const usuarioId = Number(req.params.usuarioId);
      const { nome, tel } = req.body;
  
      const dataToUpdate: any = {};
      if (nome !== undefined) {
        dataToUpdate.nome = nome;
      }
      if (tel !== undefined) {
        dataToUpdate.tel = tel;
      }
  
      if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ error: "Nenhum campo para atualização fornecido" });
      }
  
      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: usuarioId },
        data: dataToUpdate,
      });
  
      return res.status(200).json(usuarioAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ error: "Erro interno do servidor: \n" + error });
    }
  }
  

  async excluirUsuario(req: Request, res: Response) {
    try {
      const usuarioId = Number(req.params.usuarioId);

      await prisma.usuario.delete({
        where: { id: usuarioId },
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
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
  
}

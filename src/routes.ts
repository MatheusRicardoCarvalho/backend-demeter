// rotas.ts

import express from 'express';
import  {CulturaController}  from './Controllers/CulturaController'; // Importe os controladores que você criou
import {UsuarioController} from './Controllers/UsuarioController';

const router = express.Router();
const culturaController = new CulturaController();
const usuarioController = new UsuarioController();

// Rotas para Cultura
router.post('/cultura/index', culturaController.listarCulturasPorUsuario);

router.post('/culturas', culturaController.criarCultura);

// Rotas para Usuário
router.get('/usuarios', usuarioController.listarUsuarios);

router.post('/usuarios', usuarioController.criarUsuario);

export default router;

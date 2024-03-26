// rotas.ts

import express from 'express';
import  {CulturaController}  from './Controllers/CulturaController'; // Importe os controladores que você criou
import {UsuarioController} from './Controllers/UsuarioController';

const router = express.Router();
const culturaController = new CulturaController();
const usuarioController = new UsuarioController();


// Rotas para Cultura
router.post('/cultura/index_user', culturaController.listarCulturasPorUsuario);

router.post('/cultura/index_unique', culturaController.lerCulturaPorId);

router.post('/culturas', culturaController.criarCultura);

router.get('/culturas', culturaController.listarCulturas)

// Rotas para Usuário
router.get('/usuarios', usuarioController.listarUsuarios);

router.post('/usuarios', usuarioController.criarUsuario);

router.put('/culturas', culturaController.atualizarCultura)

router.post('/usuario/:usuarioId/culturas', usuarioController.listarCulturasPorUsuario);

export default router;

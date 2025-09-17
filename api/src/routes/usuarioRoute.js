import express from 'express';
import * as usuarioController from '../controllers/usuario.js';

const router = express.Router();

router.post('/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.get('/listar', usuarioController.listar);
router.get('/buscar/:id', usuarioController.buscarPorId);
router.get('/buscar-email/:email', usuarioController.buscarPorEmail);
router.put('/atualizar/:id', usuarioController.atualizar);
router.put('/atualizar-tudo/:id', usuarioController.atualizarTudo);
router.delete('/deletar/:id', usuarioController.deletar);
// Nova rota para renovar sessão
router.post('/renovar-sessao', usuarioController.renovarSessao);

export default router;

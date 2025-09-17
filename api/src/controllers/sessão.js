import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';
const TEMPO_EXPIRACAO = '1h'; // 1 hora

// Gera um token JWT para o usuário
export function gerarToken(usuario) {
    return jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: TEMPO_EXPIRACAO });
}

// Valida o token JWT recebido
export function validarToken(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch (err) {
        return null;
    }
}

// Renova o token JWT (gera um novo para o mesmo usuário)
export function renovarToken(usuario) {
    return gerarToken(usuario);
}

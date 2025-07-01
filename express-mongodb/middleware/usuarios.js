import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'un_secreto_muy_seguro';

export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = payload; // guardamos info del usuario en la request
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}
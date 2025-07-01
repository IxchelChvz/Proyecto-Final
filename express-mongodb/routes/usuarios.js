import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verificarToken } from '../middleware/usuarios.js';


const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'un_secreto_muy_seguro';


router.get('/', verificarToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const usuarios = await db.collection('usuarios').find().toArray();
    res.json(usuarios);
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    res.status(500).json({ error: 'Failed to fetch usuarios' });
  }
});
// Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, contrasena } = req.body;
    const db = req.app.locals.db;

    const userExist = await db.collection('usuarios').findOne({ nombre });
    if (userExist) return res.status(400).json({ error: 'Usuario ya existe' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);

    await db.collection('usuarios').insertOne({ nombre, contrasena: hash });

    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { nombre, contrasena } = req.body;
    const db = req.app.locals.db;

    const user = await db.collection('usuarios').findOne({ nombre });
    if (!user) return res.status(400).json({ error: 'Usuario o contraseña inválidos' });

    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) return res.status(400).json({ error: 'Usuario o contraseña inválidos' });

    const token = jwt.sign({ id: user._id, nombre: user.nombre }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;

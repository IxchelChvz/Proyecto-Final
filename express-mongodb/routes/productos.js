import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { verificarToken } from '../middleware/usuarios.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Operaciones sobre productos
 */

/**
 * @swagger
 * /api/v1/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/v1/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreProducto:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/v1/productos/{id}:
 *   delete:
 *     summary: Eliminar producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       500:
 *         description: Error del servidor
 */

// GET productos: solo los del usuario autenticado
router.get('/', verificarToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const usuario = req.usuario.nombre; // asumiendo que en el token guardas 'nombre'

    const productos = await db.collection('productos').find({ usuario }).toArray();
    res.json(productos);
  } catch (error) {
    console.error("Error fetching productos:", error);
    res.status(500).json({ error: 'Failed to fetch productos' });
  }
});

// POST producto: guardamos producto con usuario asociado
router.post("/", verificarToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const producto = req.body;
    producto.usuario = req.usuario.nombre;  // asociamos usuario al producto
    producto.fecha_hora_registro = new Date();

    const result = await db.collection('productos').insertOne(producto);
    res.status(201).json({ message: 'Producto creado', id: result.insertedId });
  } catch (error) {
    console.error("Error creating producto:", error);
    res.status(500).json({ error: 'Failed to create producto' });
  }
});

// DELETE producto: opcionalmente validar usuario antes de eliminar
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params.id;
    const usuario = req.usuario.nombre;

    // Verificamos que el producto pertenece al usuario
    const producto = await db.collection('productos').findOne({ _id: new ObjectId(id) });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    if (producto.usuario !== usuario) {
      return res.status(403).json({ error: 'No autorizado para eliminar este producto' });
    }

    await db.collection('productos').deleteOne({ _id: new ObjectId(id) });
    res.json({ message: `Producto eliminado con ID: ${id}` });
  } catch (error) {
    console.error("Error deleting producto:", error);
    res.status(500).json({ error: 'Failed to delete producto' });
  }
});

// PUT producto: validar usuario antes de actualizar
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params.id;
    const usuario = req.usuario.nombre;
    const { stock_actual } = req.body;

    if (typeof stock_actual !== 'number') {
      return res.status(400).json({ error: 'El stock_actual debe ser un número' });
    }

    // Verificamos que el producto pertenece al usuario
    const producto = await db.collection('productos').findOne({ _id: new ObjectId(id) });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    if (producto.usuario !== usuario) {
      return res.status(403).json({ error: 'No autorizado para actualizar este producto' });
    }

    const result = await db.collection('productos').updateOne(
      { _id: new ObjectId(id) },
      { $set: { stock_actual } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado o sin cambios' });
    }

    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

export default router;
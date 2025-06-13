import { Router } from 'express';

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

// GET /api/v1/productos
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const productos = await db.collection('productos').find().toArray();
    res.json(productos);
  } catch (error) {
    console.error("Error fetching productos:", error);
    res.status(500).json({ error: 'Failed to fetch productos' });
  }
});

router.post("/", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const producto = req.body;
    const result = await db.collection('productos').insertOne(producto);
    res.status(201).json({ message: 'Producto creado', id: result.insertedId });
  } catch (error) {
    console.error("Error creating producto:", error);
    res.status(500).json({ error: 'Failed to create producto' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params.id;

    // Aquí deberías usar ObjectId si el ID lo requiere
    // import { ObjectId } from 'mongodb';
    // const result = await db.collection('productos').deleteOne({ _id: new ObjectId(id) });

    res.json({ message: `DELETE producto with id: ${id}` });
  } catch (error) {
    console.error("Error deleting producto:", error);
    res.status(500).json({ error: 'Failed to delete producto' });
  }
});

export default router;

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import 'dotenv/config';
import { Product } from "./Models/Productos.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.db);

// Ruta para crear un nuevo producto
app.post("/crearproductos", async (req, res) => {
  try {
    const nuevoProducto = req.body;
    const productoGuardado = await Product.create(nuevoProducto);
    console.log('Producto creado exitosamente:', productoGuardado);
    res.json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
});

// Ruta para obtener todos los productos
app.get("/Productos", async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
});

// Escuchar en el puerto
app.listen(process.env.Port, () => {
  console.log(`Servidor escuchando en http://localhost:${process.env.Port}`);
});

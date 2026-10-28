const { Schema, model } = require('mongoose');

/**
 * Modelo de producto. Ver el contrato en docs/api_contracts.md.
 * Los campos no definidos acá se descartan al crear o actualizar (strict mode).
 */
const productSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El campo 'nombre' es obligatorio"],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, "El campo 'precio' es obligatorio"],
      min: [0, "El campo 'precio' no puede ser negativo"],
    },
    categoria: { type: String, trim: true },
    img: { type: String, trim: true },
    destacado: { type: Boolean, default: false },
    stock: {
      type: Number,
      min: [0, "El campo 'stock' no puede ser negativo"],
      validate: {
        validator: Number.isInteger,
        message: "El campo 'stock' debe ser un número entero",
      },
    },
    descripcionCorta: { type: String, trim: true },
    descripcion: { type: String, trim: true },
    medidas: { type: String, trim: true },
    estructura: { type: String, trim: true },
    tapizado: { type: String, trim: true },
    relleno: { type: String, trim: true },
    sostenibilidad: { type: String, trim: true },
    colores: { type: [String] },
  },
  {
    // Sin el campo interno __v, para que la respuesta coincida con el contrato.
    versionKey: false,
  }
);

module.exports = model('Product', productSchema);

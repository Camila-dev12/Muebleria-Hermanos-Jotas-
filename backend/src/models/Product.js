const { Schema, model } = require('mongoose');

/**
 * Por defecto Mongoose convierte valores a número (true -> 1, "5" -> 5).
 * En precio y stock solo aceptamos números de verdad; cualquier otro tipo
 * se rechaza con un error 400 ("tiene un valor inválido").
 */
function soloNumeros(valor) {
  if (valor == null) return valor;
  if (typeof valor !== 'number' || !Number.isFinite(valor)) {
    throw new Error('El valor debe ser numérico');
  }
  return valor;
}

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
      cast: soloNumeros,
      required: [true, "El campo 'precio' es obligatorio"],
      min: [0, "El campo 'precio' no puede ser negativo"],
    },
    categoria: { type: String, trim: true },
    img: { type: String, trim: true },
    destacado: { type: Boolean, default: false },
    stock: {
      type: Number,
      cast: soloNumeros,
      min: [0, "El campo 'stock' no puede ser negativo"],
      validate: {
        // null permite vaciar el stock desde el formulario de edición.
        validator: (valor) => valor == null || Number.isInteger(valor),
        message: "El campo 'stock' debe ser un número entero",
      },
    },
    descripcionCorta: { type: String, trim: true },
    descripcion: { type: String, trim: true },
    colores: { type: [String] },

    // Especificaciones técnicas (opcionales, se muestran en el detalle)
    medidas: { type: String, trim: true },
    materiales: { type: String, trim: true },
    estructura: { type: String, trim: true },
    tapizado: { type: String, trim: true },
    relleno: { type: String, trim: true },
    acabado: { type: String, trim: true },
    capacidad: { type: String, trim: true },
    peso: { type: String, trim: true },
    garantia: { type: String, trim: true },
    sostenibilidad: { type: String, trim: true },
  },
  {
    // Sin el campo interno __v, para que la respuesta coincida con el contrato.
    versionKey: false,
  }
);

module.exports = model('Product', productSchema);

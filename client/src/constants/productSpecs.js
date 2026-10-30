/**
 * Especificaciones técnicas opcionales del modelo Producto (ver docs/api_contracts.md).
 * Se usan para mostrarlas en el detalle y para armar el formulario de alta/edición.
 */
const PRODUCT_SPECS = [
  { key: 'medidas', label: 'Medidas', placeholder: '220 x 90 x 80 cm' },
  { key: 'materiales', label: 'Materiales', placeholder: 'Roble macizo FSC®' },
  { key: 'estructura', label: 'Estructura', placeholder: 'Madera de eucalipto' },
  { key: 'tapizado', label: 'Tapizado', placeholder: 'Lino 100% natural' },
  { key: 'relleno', label: 'Relleno', placeholder: 'Espuma HR' },
  { key: 'acabado', label: 'Acabado', placeholder: 'Aceite natural' },
  { key: 'capacidad', label: 'Capacidad', placeholder: '6 comensales' },
  { key: 'peso', label: 'Peso', placeholder: '42 kg' },
  { key: 'garantia', label: 'Garantía', placeholder: '10 años en estructura' },
  { key: 'sostenibilidad', label: 'Sostenibilidad', placeholder: 'Materiales reciclables' },
];

export default PRODUCT_SPECS;

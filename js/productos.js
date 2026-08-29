// =====================================================
// Mueblería Hermanos Jota — Base de datos local
// Array de objetos de productos (simula un backend)
// =====================================================

const productos = [
  {
    id: 1,
    nombre: 'Sofá Modular "Nórdico" 3 Plazas',
    categoria: 'Salas',
    precio: 3499,
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    destacado: true,
    stock: 12,
    descripcionCorta: 'Diseño nórdico con cojines de pluma y base de madera de pino.',
    descripcion:
      'Un sofá pensado para los momentos en casa. Su estructura de madera de pino y relleno de espuma de alta densidad garantizan firmeza y confort durante años. Incluye dos cojines decorativos y fundas desmontables para un fácil lavado.',
    materiales: 'Madera de pino, espuma de alta densidad, tela chenilla',
    medidasAlto: '0.85 m',
    medidasAncho: '2.20 m',
    medidasProf: '0.90 m',
    garantia: '5 años',
    origen: 'Artesanos de Puebla, México',
    colores: ['Gris', 'Beige', 'Terracota']
  },
  {
    id: 2,
    nombre: 'Cama Queen "Bella"',
    categoria: 'Dormitorios',
    precio: 4299,
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    destacado: true,
    stock: 8,
    descripcionCorta: 'Cama con cabecero tapizado y base de madera sólida.',
    descripcion:
      'La cama Queen "Bella" combina elegancia clásica y resistencia. Cabecero tapizado en tela color arena, base con sistema de rieles reforzados y acabado en barniz mate que resalta la veta natural de la madera.',
    materiales: 'Madera sólida de nogal, tela de lino, barniz mate',
    medidasAlto: '1.20 m',
    medidasAncho: '1.60 m',
    medidasProf: '2.00 m',
    garantia: '10 años',
    origen: 'Taller familiar de Guadalajara, México',
    colores: ['Arena', 'Gris perla', 'Blanco']
  },
  {
    id: 3,
    nombre: 'Mesa de Comedor "Roble Real" 6 Plazas',
    categoria: 'Comedor',
    precio: 5899,
    img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80',
    destacado: true,
    stock: 6,
    descripcionCorta: 'Mesa extensible de roble para reuniones familiares.',
    descripcion:
      'Fabricada con roble seleccionado y un ensamble de cola de milano que asegura durabilidad. Su sistema extensible permite acomodar hasta 8 comensales. Ideal para el corazón del hogar.',
    materiales: 'Tablero de roble macizo, herrajes de acero',
    medidasAlto: '0.75 m',
    medidasAncho: '0.90 m',
    medidasProf: '1.80 m',
    garantia: '10 años',
    origen: 'Aserradero del Bajío, México',
    colores: ['Roble natural', 'Nogal', 'Café']
  },
  {
    id: 4,
    nombre: 'Silla Artesanal "Luna"',
    categoria: 'Comedor',
    precio: 899,
    img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80',
    destacado: false,
    stock: 25,
    descripcionCorta: 'Silla curva de madera con asiento acolchado reversible.',
    descripcion:
      'La silla "Luna" aporta calidez a tu comedor. Su respaldo curvado sigue la ergonomía de la espalda y su asiento acolchado es reversible para renovar el color cuando lo necesites.',
    materiales: 'Madera de fresno, espuma, tela lavable',
    medidasAlto: '0.92 m',
    medidasAncho: '0.45 m',
    medidasProf: '0.52 m',
    garantia: '3 años',
    origen: 'Ebanistería de Oaxaca, México',
    colores: ['Natural', 'Negro', 'Mostaza']
  },
  {
    id: 5,
    nombre: 'Armario "Madrid" 4 Puertas',
    categoria: 'Dormitorios',
    precio: 6499,
    img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80',
    destacado: false,
    stock: 5,
    descripcionCorta: 'Armario con interior modulable y espejo de cuerpo completo.',
    descripcion:
      'Maximiza el espacio de tu habitación con el armario "Madrid". Incluye barras ajustables, cajones con guías de rodamiento y un espejo de cuerpo completo en la puerta central. Interior modulable según tus necesidades.',
    materiales: 'MDF enchapado en cedro, espejo templado',
    medidasAlto: '2.20 m',
    medidasAncho: '1.80 m',
    medidasProf: '0.60 m',
    garantia: '7 años',
    origen: 'Manufactura de Mérida, México',
    colores: ['Cedro', 'Blanco', 'Gris pizarra']
  },
  {
    id: 6,
    nombre: 'Estante Modular "Lima"',
    categoria: 'Oficina',
    precio: 1299,
    img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
    destacado: true,
    stock: 15,
    descripcionCorta: 'Estante versátil con módulos apilables para tu oficina.',
    descripcion:
      'Diseño limpio y funcional. El estante "Lima" se arma sin tornillos gracias a su sistema de encastre y puedes apilar módulos para crear la composición que mejor se adapte a tu espacio.',
    materiales: 'Madera contrachapada de álamo, acabado hidrofugado',
    medidasAlto: '0.40 m',
    medidasAncho: '0.80 m',
    medidasProf: '0.30 m',
    garantia: '3 años',
    origen: 'Cooperativa de Veracruz, México',
    colores: ['Natural', 'Negro', 'Roble']
  },
  {
    id: 7,
    nombre: 'Escritorio Ejecutivo "Prima"',
    categoria: 'Oficina',
    precio: 2999,
    img: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80',
    destacado: false,
    stock: 9,
    descripcionCorta: 'Escritorio amplio con cajonera lateral y pasacables.',
    descripcion:
      'Trabaja con orden y estilo. Cuenta con cajonera lateral con llave, pasacables integrados y superficie amplia para monitores y documentos. Acabado lacado resistente a rayaduras.',
    materiales: 'Panel MDF lacado, herrajes metálicos',
    medidasAlto: '0.78 m',
    medidasAncho: '1.40 m',
    medidasProf: '0.70 m',
    garantia: '5 años',
    origen: 'Fábrica de Tijuana, México',
    colores: ['Blanco', 'Wengué', 'Roble claro']
  },
  {
    id: 8,
    nombre: 'Velador "Noche"',
    categoria: 'Dormitorios',
    precio: 749,
    img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    destacado: false,
    stock: 20,
    descripcionCorta: 'Velador compacto con cajón y puerta corrediza.',
    descripcion:
      'El velador perfecto para dormitorios y recámaras juveniles. Su formato compacto aprovecha el espacio vertical con un cajón y una puerta corrediza. Base redondeada a prueba de golpes.',
    materiales: 'Madera de parota, madera contrachapada',
    medidasAlto: '0.55 m',
    medidasAncho: '0.45 m',
    medidasProf: '0.40 m',
    garantia: '2 años',
    origen: 'Carpintería comunitaria de Chiapas, México',
    colores: ['Natural', 'Café', 'Blanco']
  }
];
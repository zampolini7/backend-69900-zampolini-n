export default function productValidate(req, res, next) {
  const producto = req.body;

  // Verificar que todos los campos obligatorios estén presentes
  const camposObligatorios = ['title', 'description', 'code', 'price', 'stock', 'category'];
  for (let campo of camposObligatorios) {
    if (!(campo in producto)) {
      return res.status(400).json({ error: `Falta el campo obligatorio: ${campo}` });
    }
  }

  // Verificar el tipo de dato de cada campo
//   const tipoDatos = {
//     id: 'string',
//     title: 'string',
//     description: 'string',
//     code: 'string',
//     price: 'number',
//     status: 'boolean',
//     stock: 'number',
//     category: 'string'
//   };
//   for (let campo in tipoDatos) {
//     if (typeof producto[campo] !== tipoDatos[campo]) {
//       return res.status(400).json({ error: `El campo ${campo} debe ser de tipo ${tipoDatos[campo]}` });
//     }
//   }

  next();
}


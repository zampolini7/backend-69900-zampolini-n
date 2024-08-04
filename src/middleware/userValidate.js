export default function validarUsuario(req, res, next) {
  const usuario = req.body

  const camposObligatorios = [
    'first_name',
    'last_name',
    'email',
    'password',
    'cart',
    'role',
  ]
  for (let campo of camposObligatorios) {
    if (!(campo in usuario)) {
      return res
        .status(400)
        .json({ error: `Falta el campo obligatorio: ${campo}` })
    }
  }

  const tipoDatos = {
    first_name: 'string',
    last_name: 'string',
    email: 'string',
    role: 'string',
    cart: 'string',
    password: 'string',
  }

  for (let campo in tipoDatos) {
    if (usuario[campo] && typeof usuario[campo] !== tipoDatos[campo]) {
      return res.status(400).json({
        error: `El campo ${campo} debe ser de tipo ${tipoDatos[campo]}`,
      })
    }
  }

  next()
}

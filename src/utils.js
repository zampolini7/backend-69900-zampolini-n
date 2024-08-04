import passport from 'passport'

export function passportCall(strategy) {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      console.log(user, 'user')
      if (err) return next(err)
      if (!user)
        return res
          .status(401)
          .send({ message: info.message ? info.message : info.toString() })

      req.user = user
      next()
    })(req, res, next)
  }
}

export function authorization(roles) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No autorizado' })

    console.log(req.user)

    // if (req.user.role !== role) {
    //   return res.status(401).json({ message: "No tienes permisos" });
    // }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({ message: 'No tienes permisos' })
    }

    next()
  }
}

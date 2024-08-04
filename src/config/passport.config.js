import passport from 'passport'
import jwt from 'passport-jwt'

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

export function initializePassport() {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 's3cr3t',
      },
      async (payload, done) => {
        try {
          return done(null, payload)
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  passport.use(
    'current',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 's3cr3t',
      },
      async (payload, done) => {
        try {
          // Aquí puedes ajustar la lógica para devolver el usuario asociado al token
          const user = { email: payload.email, name: 'Fictitious User' } // Ejemplo de usuario ficticio
          return done(null, user)
        } catch (error) {
          return done(error)
        }
      }
    )
  )
}

export function initializeCurrentStrategy() {
  passport.use(
    'current',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 's3cr3t', // La misma clave que usas para firmar los tokens
      },
      async (payload, done) => {
        try {
          return done(null, payload)
        } catch (error) {
          return done(error)
        }
      }
    )
  )
}

function cookieExtractor(req) {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['access_token']
  }
  console.log('Extracted token:', token) // Agrega un log para verificar el valor del token
  return token
}

const isAnyRoleByList = (role) => {
console.log(role)

  return (req, res, next) => {
    try {
      const { username } = req.body
      const result = '1'
      // se pide la consulta al servicio y se detecta si es admin o no .
      // luego se hace next

      if (result) {
        next()
      } else {
        res.json({ message: 'Not Admin User' })
      }
    } catch (error) {
      next(error)
    }
  }
}
const isAdminOrSameUser = (req, res, next) => {
  try {
    const { username } = req.body
    const result = '1'
    // se pide la consulta al servicio y se detecta si es admin o no .
    // luego se hace next

    if (result) {
      next()
    } else {
      res.json({ message: 'Not Admin User' })
    }
  } catch (error) {
    next(error)
  }
}

const isTheSameUser = (req, res, next) => {
  try {
    const { username } = req.body
    const result = '1'
    // se pide la consulta al servicio y se detecta si es admin o no .
    // luego se hace next

    if (result) {
      next()
    } else {
      res.json({ message: 'Not Admin User' })
    }
  } catch (error) {
    next(error)
  }
}

const isAdminRole = (req, res, next) => {
  try {
    const { username } = req.body
    const result = '1'
    // se pide la consulta al servicio y se detecta si es admin o no .
    // luego se hace next

    if (result) {
      next()
    } else {
      res.json({ message: 'Not Admin User' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  isAnyRoleByList,
  isAdminOrSameUser,
  isTheSameUser,
  isAdminRole,
}

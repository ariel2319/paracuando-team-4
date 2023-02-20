const express = require('express')
const router = express.Router()
const {
  getUsers,
  addUser,
  removeUser,
  getUserById,
  putUserById,
} = require('../controllers/user.controller')
const {
  isAnyRoleByList,
  isAdminOrSameUser,
  isTheSameUser,
  isAdminRole,
} = require('../middlewares/auth.checkers')

router.get('/', isAnyRoleByList(['admin']), getUsers)
router.get('/:id', isAdminOrSameUser, getUserById)
router.put('/:id', isTheSameUser, putUserById)
router.post('/', isAdminRole, addUser)
router.delete('/:id', removeUser)

module.exports = router

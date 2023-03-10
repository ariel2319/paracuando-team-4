const express = require('express')
const passport = require('passport')
const router = express.Router()
const {
  getUsers,
  addUser,
  removeUser,
  getUserById,
  putUserById,
  getVotesById,
} = require('../controllers/user.controller')
const {
  isAnyRoleByList,
  isAdminOrSameUser,
  isTheSameUser,
  isAdminRole,
  isLogged,
} = require('../middlewares/auth.checkers')

router.get('/',passport.authenticate('jwt', { session: false }),isAnyRoleByList(['admin']), getUsers)
router.get('/:id', isAdminOrSameUser, getUserById)
router.put('/:id', isTheSameUser, putUserById)
router.post('/', isAdminRole, addUser)
router.delete('/:id', removeUser)
router.get('/:id/votes', isLogged,getVotesById)

module.exports = router

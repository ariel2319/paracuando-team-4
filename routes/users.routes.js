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
  getPublicationsByUserId,
  addInterestByTagId,
  removeInterestByTagId,
  addImageByTagId,
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
router.get('/:id/publications', isLogged,getPublicationsByUserId)
router.post('/:id/add-interest', isTheSameUser,addInterestByTagId)
router.delete('/:id/remove-interest', isTheSameUser,removeInterestByTagId)

router.post('/:id/add-image', isAdminOrSameUser,addImageByTagId)

module.exports = router

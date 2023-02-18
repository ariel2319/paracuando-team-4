const express = require('express')
const router = express.Router()
const {getUsers,getUserById,putUserById}= require("../controllers/user.controller")


router.get('/', getUsers) 
router.get('/:id', getUserById) 
router.put('/:id', putUserById) 

module.exports = router

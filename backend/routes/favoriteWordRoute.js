const express=require('express')
const router=express.Router()
const favoriteWordController=require('../controllers/favoriteWordController')

const verifyJWT =require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

//use middleware
router.use(verifyJWT)
router.use(verifyRoles('User'))

router.get('/',favoriteWordController.getAllFavoriteWords)
router.post('/',favoriteWordController.toggleFavoriteWord)
router.put('/',favoriteWordController.updateFavoriteWordRaiting)
router.delete('/',favoriteWordController.deleteFavoriteWord)

module.exports=router
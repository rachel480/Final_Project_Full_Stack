const express=require('express')
const router=express.Router()
const favoriteWordController=require('../controllers/favoriteWordController')

const verifyJWT =require('../middleware/verifyJWT')

router.get('/',favoriteWordController.getAllFavoriteWords)
router.get('/:id',favoriteWordController.getSingleFavoriteWord)
router.post('/',favoriteWordController.createFavoriteWord)
router.put('/',favoriteWordController.updateFavoriteWordRaiting)
router.delete('/',favoriteWordController.deleteFavoriteWord)

//use middleware
router.use(verifyJWT)

module.exports=router
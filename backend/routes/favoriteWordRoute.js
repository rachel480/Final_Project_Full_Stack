const express=require('express')
const router=express.Router()
const favoriteWordController=require('../controllers/favoriteWordController')

const verifyJWT =require('../middleware/verifyJWT')
//use middleware
router.use(verifyJWT)

router.get('/',favoriteWordController.getAllFavoriteWords)
router.post('/',favoriteWordController.createFavoriteWord)
router.put('/',favoriteWordController.updateFavoriteWordRaiting)
router.delete('/',favoriteWordController.deleteFavoriteWord)



module.exports=router
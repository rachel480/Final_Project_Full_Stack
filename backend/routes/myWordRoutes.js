const express=require('express')
const router=express.Router()
const myWordController=require('../controllers/myWordController')

const verifyJWT =require('../middleware/verifyJWT')
//use middleware
router.use(verifyJWT)

router.get('/',myWordController.getAllMyWords)
router.post('/',myWordController.createMyWord)
router.put('/',myWordController.updateMyWord)
router.put('/rateing',myWordController.updateMyWordRaiting)
router.delete('/',myWordController.deleteMyWord)



module.exports=router
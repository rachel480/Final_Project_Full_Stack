const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const verifyJWT =require('../middleware/verifyJWT')

router.use(verifyJWT)
router.get('/',userController.getAllUsers)
router.get('/getUser/:id',userController.getSingleUser)
router.put('/',userController.updateUser)
router.delete('/',userController.deleteUser)

module.exports=router
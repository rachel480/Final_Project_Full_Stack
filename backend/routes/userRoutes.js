const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const verifyJWT =require('../middleware/verifyJWT')

//a router to check if userName is unique
router.get('/checkUniquness/:userName',userController.checkUserNameAvailability)

router.use(verifyJWT)
router.get('/',userController.getAllUsers)
router.get('/getUser/:id',userController.getSingleUser)
router.put('/',userController.updateUser)
router.delete('/',userController.deleteUser)

module.exports=router
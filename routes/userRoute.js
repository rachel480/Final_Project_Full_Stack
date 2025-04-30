const express=require('express')
const router=express.Router()
const userController=require('../controllers/UserController')
const verifyJWT=require('../middleware/verifyJWT')

router.use(verifyJWT)

router.get('/',userController.getAllUser)
router.get('/getUser/:id',userController.getSingleUser)
router.put('/',userController.updateUser)
router.put('/updateActive',userController.updateUserActive)
router.delete('/',userController.deleteUser)

module.exports=router


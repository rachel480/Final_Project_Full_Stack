const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const verifyJWT =require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

//a router to check if userName is unique
router.get('/checkUniquness/:userName',userController.checkUserNameAvailability)

router.use(verifyJWT)
router.get('/', verifyRoles('Admin') ,userController.getAllUsers)
router.get('/:id',userController.getSingleUser)
router.post('/',verifyRoles('Admin'),userController.createNewUserByAdmin)
router.put('/user',verifyRoles('User'),userController.updateUserByUser)
router.put('/admin',verifyRoles('Admin'),userController.updateUserByAdmin)
router.delete('/',verifyRoles('Admin'),userController.deleteUser)

module.exports=router
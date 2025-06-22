const express=require('express')
const router=express.Router()
const userProgressController=require('../controllers/userProgressController')
const verifyJWT=require('../middleware/verifyJWT')

//use middleware
router.use(verifyJWT)
router.get('/',userProgressController.getAllUsersProgress)
router.get('/getUserProgress/:id',userProgressController.getSingleUserProgress)
router.post('/',userProgressController.createUserProgress)
router.put('/',userProgressController.updateUserProgress)
router.delete('/',userProgressController.deleteUserProgress)

module.exports=router
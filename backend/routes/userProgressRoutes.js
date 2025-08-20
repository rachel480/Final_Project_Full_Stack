const express=require('express')
const router=express.Router()
const userProgressController=require('../controllers/userProgressController')
const verifyJWT=require('../middleware/verifyJWT')

//use middleware
router.use(verifyJWT)
router.get('/',userProgressController.getAllUsersProgress)
router.get('/getUserProgress/:id',userProgressController.getSingleUserProgressByAdmin)
router.get('/getUserProgress/',userProgressController.getSingleUserProgressByUser)
router.post('/',userProgressController.createUserProgress)
router.put('/',userProgressController.updateUserProgress)
router.put('/challengeResults',userProgressController.updateChallengeResultInUserProgress)
router.delete('/',userProgressController.deleteUserProgress)

module.exports=router
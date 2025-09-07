const express=require('express')
const router=express.Router()
const userProgressController=require('../controllers/userProgressController')

const verifyJWT=require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

//use middleware
router.use(verifyJWT)

router.get('/',verifyRoles('Admin'),userProgressController.getAllUsersProgress)
router.get('/:id/admin',verifyRoles('Admin'),userProgressController.getSingleUserProgressByAdmin)
router.get('/getUserProgress/',verifyRoles('User'),userProgressController.getSingleUserProgressByUser)
router.post('/',userProgressController.createUserProgress)
router.put('/',userProgressController.updateUserProgress)
router.put('/challengeResults',userProgressController.updateChallengeResultInUserProgress)
router.delete('/',verifyRoles('Admin'),userProgressController.deleteUserProgress)

module.exports=router
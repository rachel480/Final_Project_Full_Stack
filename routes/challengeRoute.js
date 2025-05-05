const express=require('express')
const router=express.Router()
const challengeController=require('../controllers/challengeController')
const verifyJWT=require('../middleware/verifyJWT')
//use middleware
router.use(verifyJWT)

router.get('/',challengeController.getAllChallenges)
router.get('/getChallenge/:id',challengeController.getSingleChallenge)
router.put('/',challengeController.updateChallenge)
router.post('/',challengeController.createNewChallenge)
router.delete('/',challengeController.deleteChallenge)

module.exports=router
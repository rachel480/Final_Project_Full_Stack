const expresss=require('express')
const router=expresss.Router()
const challengeController =require('../controllers/challengeController')
const verifyJWT =require('../middleware/verifyJWT')

//use middleware
router.use(verifyJWT)

router.get('/',challengeController.getAllChallenges)
router.get('/getChallenge/:id',challengeController.getSingleChallenge)
router.get('/:id/results',challengeController.getChallengeResults)
router.post('/',challengeController.createNewChallenge)
router.put('/',challengeController.updateChallenge)
router.delete('/',challengeController.deleteChallenge)

module.exports=router
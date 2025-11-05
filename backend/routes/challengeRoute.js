const expresss=require('express')
const router=expresss.Router()
const challengeController =require('../controllers/challengeController')
const verifyJWT =require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

//use middleware
router.use(verifyJWT)

router.get('/',challengeController.getAllChallenges)
router.get('/:id',challengeController.getSingleChallenge)
router.get('/:id/results',challengeController.getChallengeResults)
router.get("/:id/full",challengeController.getFullChallengeById)
router.post('/',verifyRoles('Admin') ,challengeController.createFullChallenge)
router.put('/',verifyRoles('Admin') ,challengeController.updateChallenge)
router.delete('/',verifyRoles('Admin') ,challengeController.deleteChallenge)

module.exports=router
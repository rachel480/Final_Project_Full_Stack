const expresss=require('express')
const router=expresss.Router()
const recommendtionController =require('../controllers/recommendtionController')
const verifyJWT =require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

router.get('/approved', recommendtionController.getApprovedRecommendions)
router.get('/:id', recommendtionController.getSingleRecommendion)

router.use(verifyJWT)

router.get('/',  verifyRoles('Admin'), recommendtionController.getAllRecommendions)
router.post('/',verifyRoles('User'),recommendtionController.createNewRecommendion)
router.put('/approve', verifyRoles('Admin'), recommendtionController.approveRecommendion)
router.delete('/',verifyRoles('Admin'),recommendtionController.deleteRecommendion)

module.exports = router

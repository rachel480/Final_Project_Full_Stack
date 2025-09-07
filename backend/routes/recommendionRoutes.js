const expresss=require('express')
const router=expresss.Router()
const recommendtionController =require('../controllers/recommendtionController')
const verifyJWT =require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

router.get('/',recommendtionController.getAllRecommendions)
router.get('/:id',recommendtionController.getSingleRecommendion)

//use middleware
router.use(verifyJWT)

router.post('/',verifyRoles('User'),recommendtionController.createNewRecommendion)
router.delete('/',verifyRoles('Admin'),recommendtionController.deleteRecommendion)

module.exports=router
const expresss=require('express')
const router=expresss.Router()
const recommendtionController =require('../controllers/recommendtionController')
const verifyJWT =require('../middleware/verifyJWT')

router.get('/',recommendtionController.getAllRecommendions)
router.get('/getRecommendtion/:id',recommendtionController.getSingleRecommendion)
//use middleware
router.use(verifyJWT)
router.post('/',recommendtionController.createNewRecommendion)
router.put('/',recommendtionController.updateRecommendion)
router.delete('/',recommendtionController.deleteRecommendion)

module.exports=router
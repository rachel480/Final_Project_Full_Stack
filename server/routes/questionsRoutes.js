const expresss=require('express')
const router=expresss.Router()
const questionController =require('../controllers/questionController')
const verifyJWT =require('../middleware/verifyJWT')

//use middleware
router.use(verifyJWT)

router.get('/',questionController.getAllQuestions)
router.get('/getQuestion/:id',questionController.getSingleQuestion)
router.post('/',questionController.createNewQuestion)
router.put('/',questionController.updateQuestion)
router.delete('/',questionController.deleteQuestion)

module.exports=router
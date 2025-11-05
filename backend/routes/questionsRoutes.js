const expresss=require('express')
const router=expresss.Router()
const questionController =require('../controllers/questionController')
const verifyJWT =require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

//use middleware
router.use(verifyJWT)

router.get('/',questionController.getAllQuestions)
router.get('/:id',questionController.getSingleQuestion)
router.get("/:id/full", questionController.getFullQuestionById)
router.post('/',verifyRoles('Admin') ,questionController.createNewQuestion)
router.put('/',verifyRoles('Admin') ,questionController.updateQuestion)
router.delete('/',verifyRoles('Admin') ,questionController.deleteQuestion)

module.exports=router
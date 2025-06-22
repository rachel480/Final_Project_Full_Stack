const express=require('express')
const router=express.Router()
const questionController=require('../controllers/questionController')
const verifyJWT=require('../middleware/verifyJWT')
//use middleware
router.use(verifyJWT)

router.get('/',questionController.getAllQuestion)
router.get('/getQuestion/:id',questionController.getSingleQuestion)
router.put('/',questionController.updateQuestion)
router.post('/',questionController.createNewQuestion)
router.delete('/',questionController.delateQuestion)

module.exports=router
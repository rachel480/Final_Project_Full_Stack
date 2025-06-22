const expresss=require('express')
const router=expresss.Router()
const wordController =require('../controllers/wordController')
const verifyJWT =require('../middleware/verifyJWT')

//use middleware
router.use(verifyJWT)

router.get('/',wordController.getAllWords)
router.get('/getWord/:id',wordController.getSingleWord)
router.post('/',wordController.createNewWord)
router.put('/',wordController.updateWord)
router.delete('/',wordController.deleteWord)

module.exports=router
const express=require('express')
const router=express.Router()
const wordController=require('../controllers/wordController')
const multer=require('multer')
const storage=multer.memoryStorage()
const upload=multer({storage})
const verifyJWT=require('../middleware/verifyJWT')
//use middleware
router.use(verifyJWT)

router.get('/',wordController.getAllWords)
router.get('/getWord/:id',wordController.getSingleWord)
router.put('/',wordController.updateWord)
router.post('/',upload.single('img'),wordController.createNewWord)
router.delete('/',wordController.deleteWord)

module.exports=router
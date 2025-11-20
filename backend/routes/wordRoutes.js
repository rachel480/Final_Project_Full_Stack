const expresss=require('express')
const router=expresss.Router()
const wordController =require('../controllers/wordController')
const verifyJWT =require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

router.post('/',wordController.upload.single('img'),verifyJWT,verifyRoles('Admin'),wordController.createNewWord)
router.put('/', wordController.upload.single('img'),verifyJWT ,verifyRoles('Admin'), wordController.updateWord)

//use middleware
router.use(verifyJWT)

router.get('/',wordController.getAllWords)
router.get('/:id',wordController.getSingleWord)
router.get('/getByCategory/:categoryName', wordController.getWordsByCategory)
router.delete('/',verifyRoles('Admin') ,wordController.deleteWord)

module.exports=router
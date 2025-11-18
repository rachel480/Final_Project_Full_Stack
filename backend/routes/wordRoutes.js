const expresss=require('express')
const router=expresss.Router()
const wordController =require('../controllers/wordController')
const verifyJWT =require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

//use middleware
router.use(verifyJWT)

router.get('/',wordController.getAllWords)
router.get('/:id',wordController.getSingleWord)
router.get('/getByCategory/:categoryName', wordController.getWordsByCategory)
router.post('/',verifyRoles('Admin'),wordController.upload.single('img'),wordController.createNewWord)
router.put('/', verifyRoles('Admin'), wordController.upload.single('img'), wordController.updateWord)
router.delete('/',verifyRoles('Admin') ,wordController.deleteWord)

module.exports=router
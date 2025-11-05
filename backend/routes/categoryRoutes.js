const expresss=require('express')
const router=expresss.Router()
const categoryController =require('../controllers/categoryController')
const verifyJWT =require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

//use middleware
router.use(verifyJWT)

router.get('/',categoryController.getAllCategories)
router.get('/:id',categoryController.getSingleCategory)
router.get("/:id/full", categoryController.getFullCategoryById)
router.get('/:id/challenge',categoryController.getChallengeOfCategory)
router.get('/:id/words',categoryController.getWordsOfCategory)
router.post('/', verifyRoles('Admin') , categoryController.createFullCourseSimple)
router.put('/',verifyRoles('Admin') , categoryController.updateCategory)
router.delete('/',verifyRoles('Admin') ,categoryController.deleteCategory)

module.exports=router
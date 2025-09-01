const expresss=require('express')
const router=expresss.Router()
const myCategoryController =require('../controllers/myCategoryController')
const verifyJWT =require('../middleware/verifyJWT')

//use middleware
router.use(verifyJWT)

router.get('/',myCategoryController.getAllCategories)
router.get('/:id/words',myCategoryController.getWordsOfCategory)
router.post('/',myCategoryController.createCategory)
router.put('/',myCategoryController.updateCategory)
router.delete('/',myCategoryController.deleteCategory)

module.exports=router
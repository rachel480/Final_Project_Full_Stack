const express=require('express')
const router=express.Router()
const categoryController=require('../controllers/categoryController')
const verifyJWT=require('../middleware/verifyJWT')
//use middleware
router.use(verifyJWT)

router.get('/',categoryController.getAllCategories)
router.get('/getCategory/:id',categoryController.getSingleCategory)
router.put('/',categoryController.updateCategory)
router.post('/',categoryController.createCategory)
router.delete('/',categoryController.deleteCategory)

module.exports=router

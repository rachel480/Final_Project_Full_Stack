const express=require('express')
const router=express.Router()
const courseController=require('../controllers/courseController')
const verifyJWT=require('../middleware/verifyJWT')
//use middleware
router.use(verifyJWT)

router.get('/',courseController.getAllCourses)
router.get('/getCourse/:id',courseController.getSingleCourse)
router.put('/',courseController.updateCourse)
router.post('/',courseController.createNewCourse)
router.delete('/',courseController.delateCourse)

module.exports=router
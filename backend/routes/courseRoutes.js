const expresss=require('express')
const router=expresss.Router()
const courseController =require('../controllers/courseController')
const verifyJWT =require('../middleware/verifyJWT')

//use middleware
router.use(verifyJWT)

router.get('/',courseController.getAllCourses)
router.get('/getCourse/:id',courseController.getSingleCourse)
router.post('/',courseController.createNewCourse)
router.put('/',courseController.updateCourse)
router.delete('/',courseController.deleteCourse)

module.exports=router
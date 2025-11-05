const expresss=require('express')
const router=expresss.Router()
const courseController =require('../controllers/courseController')
const verifyJWT =require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

//use middleware
router.use(verifyJWT)

router.get('/',courseController.getAllCoursesForUser)
router.get('/admin',verifyRoles('Admin') ,courseController.getAllCoursesForAdmin)
router.get('/:id',courseController.getSingleCourse)
router.get("/:id/full", courseController.getFullCourseById)
router.get('/:id/categories',courseController.getCategoriesOfCourse)
router.get('/:id/words', courseController.getWordsOfCourseWithFavorites)
router.post("/createFullSimple", courseController.createFullCourseSimple)
router.put('/',verifyRoles('Admin') ,courseController.updateCourse)
router.delete('/',verifyRoles('Admin') ,courseController.deleteCourse)

module.exports=router
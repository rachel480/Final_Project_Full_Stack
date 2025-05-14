const Course = require('../models/Course')
//get all course for admin and user
const getAllCourses = async (req, res) => {
    const courses = await Course.find().lean()
    if (!courses)
        return res.status(400).json({ message: 'no courses found' })
    res.json(courses)
}
//get cours by id for admin and user
const getSingleCourse = async (req, res) => {
    const { id } = req.params
    //validetion
    //required fields
    if (!id)
        return res.status(400).send('id is required')
    const foundCourse = await Course.findById(id).lean()
    if (!foundCourse)
        return res.status(400).json({ message: 'no courses found' })
    res.json(foundCourse)

}
//create new course for admin
const createNewCourse = async (req, res) => {
    const { level,categories } = req.body
    //validetion
    //chek if user is admin
    const user = req.user
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })

    //required fields
    if (!level  || !categories )
        return res.status(400).send('all fields are required')
    const newCourse = await Course.create({level, categories })
    if (!newCourse)
        return res.status(400).json({ message: `error occurred while createing  the course ` })
    return res.status(201).json({ message: `course created successfully` })

}
//update course for admin
const updateCourse = async (req, res) => {
    const { level,categories ,id } = req.body
    //validetion
    //chek if user is admin
    const user = req.user
    if (user.roles === 'User')
        return res.status(403).json({ message: 'Forbidden' })
    //required fields
    if (!level || !categories || !id)
        return res.status(400).send('all fields are required')
      const foundCourse=await Course.findById(id).exec()
      if (!foundCourse)
          return res.status(400).json({ message: 'no courses found' })
      //update fields
      foundCourse.level=level
      foundCourse.categories=categories
      const updatedCourse=await foundCourse.save()
      if (!updatedCourse)
          return res.status(400).json({ message: `error occurred while updateing course` })
      return res.status(201).json({ message: `course updated successfully` })
}
//delate course for admin
const delateCourse = async (req, res) => {
    const {id}=req.body
        //validetion
        //chek if user is admin
        const user = req.user
        if (user.roles === 'User')
            return res.status(403).json({ message: 'Forbidden' })
        //required fields
        if (!id)
            return res.status(400).send('id is required')
        const foundCourse=await Course.findById(id).exec()
        if (!foundCourse)
            return res.status(400).json({ message: 'no courses found' })
        const deletedCourse=await foundCourse.deleteOne()
        if(!deletedCourse)
            return res.status(400).json({ message: `error occurred while deleting course ${id}` })
        return res.status(201).json({ message: `course with id ${id} was deletd successfully` })

}
module.exports = { getAllCourses, getSingleCourse, createNewCourse, updateCourse, delateCourse }
const Course = require('../models/Course')
const FavoriteWord = require('../models/FavoriteWord')

// get all courses for  user
const getAllCoursesForUser = async (req, res) => {
    try {
        
        const courses = await Course.find({status:"published"}).lean()
         //validation
        if (!courses)
            return res.status(400).json({ message: "no courses found" })
        return res.json(courses)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

const getAllCoursesForAdmin = async (req, res) => {
    try {
        
        const courses = await Course.find().lean()
         //validation
        if (!courses)
            return res.status(400).json({ message: "no courses found" })
        return res.json(courses)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// get course by id for admin and user
const getSingleCourse = async (req, res) => {
    try {
        const { id } = req.params
         //validation
        if (!id)
            return res.status(400).send('id is required')

        const foundCourse = await Course.findById(id).lean()
        if (!foundCourse)
            return res.status(400).json({ message: "no course found" })
        return res.json(foundCourse)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// create new course for admin
const createNewCourse = async (req, res) => {
    try {
        const {name, level} = req.body

         //validation
        if (!level ||!name)
            return res.status(400).send('all fields are required')

        const newCourse = await Course.create({ level,name,status:"draft" })
        if (!newCourse)
            return res.status(400).json({ message: `error occurred while creating the course` })

        return res.status(201).json({ message: `course created successfully` })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// update course for admin
const updateCourse = async (req, res) => {
    try {
        const { level, name, id } = req.body
         //validation
        if (!level || !name || !id)
            return res.status(400).send('all fields are required')

        const foundCourse = await Course.findById(id).exec()
        if (!foundCourse)
            return res.status(400).json({ message: "no course found" })

        foundCourse.level = level
        foundCourse.name = name

        const updatedCourse = await foundCourse.save()
        if (!updatedCourse)
            return res.status(400).json({ message: `error occurred while updating course` })

        return res.status(201).json({ message: `course was updated successfully` })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// delete course for admin
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.body
         //validation
        if (!id)
            return res.status(400).send('id is required')

        const foundCourse = await Course.findById(id).exec()
        if (!foundCourse)
            return res.status(400).json({ message: "no course found" })

        const deletedCourse = await foundCourse.deleteOne()
        if (!deletedCourse)
            return res.status(400).json({ message: `error occurred while deleting course with id ${id}` })

        return res.status(201).json({ message: `course with id ${id} was deleted successfully` })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// get course with categories
const getCategoriesOfCourse = async (req, res) => {
    try {
        const { id } = req.params
        if (!id)
            return res.status(400).send('id is required')

        const course = await Course.findById(id).populate('categories')
        if (!course)
            return res.status(404).json({ message: 'Course not found' })

        return res.json(course.categories)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// get words of course with favorites
const getWordsOfCourseWithFavorites = async (req, res) => {
    try {
        const { id } = req.params
        if (!id)
            return res.status(400).send('id is required')

        const user = req.user

        const course = await Course.findById(id)
            .populate({
                path: 'categories',
                populate: {
                    path: 'words'
                }
            })

        if (!course)
            return res.status(404).json({ message: 'Course not found' })

        const words = course.categories.flatMap(category => category.words)
        const favWords = await FavoriteWord.find({ user: user._id }, { word: 1 }).lean()
        const favWordIds = favWords.map(f => f.word.toString())

        const wordsWithFavorites = words.map((word) => ({
            ...word.toObject(),
            isFavorite: favWordIds.includes(word._id.toString())
        }))

        return res.json(wordsWithFavorites)
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { getAllCoursesForAdmin,getAllCoursesForUser, getSingleCourse, createNewCourse, updateCourse, deleteCourse, getCategoriesOfCourse, getWordsOfCourseWithFavorites }

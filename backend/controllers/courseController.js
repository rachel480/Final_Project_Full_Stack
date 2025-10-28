const Course = require('../models/Course')
const FavoriteWord = require('../models/FavoriteWord')
const Category = require("../models/Category");
const { Word } = require("../models/Word");
const Challenge = require("../models/Challenge");
const Question = require("../models/Question");
const UserProgress = require('../models/UserProgress');

// get all courses for user
const getAllCoursesForUser = async (req, res) => {
    try {
        const courses = await Course.find({ status: 'published' }).lean()

        //validation
        if (!courses)
            return res.status(400).json({ message: "no courses found" })
        return res.json(courses)

    } catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

// get all courses for admin
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

// get full course with all populates
const getFullCourseById = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: "id is required" })
        }

        const course = await Course.findById(id)
            .populate({
                path: "categories",
            })
            .lean()

        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        return res.json(course)
    } catch (err) {
        console.error("getFullCourseById error:", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// update course for admin
const updateCourse = async (req, res) => {
    try {
        const { level, name, id ,status} = req.body

        //validation
        if (!level || !name || !id)
            return res.status(400).send('all fields are required')

        const foundCourse = await Course.findById(id).exec()
        if (!foundCourse)
            return res.status(400).json({ message: "no course found" })

        foundCourse.level = level
        foundCourse.name = name
        foundCourse.status=status? status:foundCourse.status

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
    if (!id) return res.status(400).json({ message: "Course ID is required" })

    // step 1 : Find the course
    const course = await Course.findById(id).exec()
    if (!course) return res.status(404).json({ message: "Course not found" })

    // step 2: Find all categories that belong to this course
    const categories = await Category.find({ course: id }).exec()

    for (const category of categories) {
      // step 3: Delete all words that belong to this category
      await Word.deleteMany({ categoryName: category.name })

      // step 4: Delete all questions in the category's challenge
      if (category.challenge) {
        const challenge = await Challenge.findById(category.challenge).exec()
        if (challenge) {
          await Question.deleteMany({ _id: { $in: challenge.questions } })
          await challenge.deleteOne()
        }
      }

      //step 5: Delete the category
      await category.deleteOne()
    }

    // step 6: Delete the course
    await course.deleteOne()

    return res.status(200).json({
      message: `Course "${course.name}" and all its related data were deleted successfully.`,
    })
  } catch (err) {
    console.error("Delete course error:", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

// get course with categories
const getCategoriesOfCourse = async (req, res) => {
    try {
        const { id } = req.params

        //validation
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

        //validation
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

const createFullCourseSimple = async (req, res) => {
    try {
        const { courseInfo, categories, words, questions, challenges } = req.body

        //step 1: add words to DB
        const createdWords = await Word.insertMany(words)

        // step 2: add questions to DB
        const questionsWithIds = questions.map(q => {

            const questionWord = createdWords.find(w => w.word === q.question)

            const optionsWords = q.options.map(opt => {
                const word = createdWords.find(w => w.word === opt)
                return word._id
            })

            return { question: questionWord._id, correctAnswer: questionWord._id, options: optionsWords }
        })

        const createdQuestions = await Question.insertMany(questionsWithIds)

        const questionMap = {}
        questions.forEach((q, index) => {
            questionMap[q.question] = createdQuestions[index]._id
        })

        // step 3: add challenges to DB
        const challengesWithQuestions = challenges.map((ch) => {
            const questionIds = ch.questions.map((q) => {
                const id = questionMap[q.question]
                if (!id) throw new Error(`Question not found for: ${q.question}`)
                return id;
            })
            return { ...ch, questions: questionIds }
        })

        const createdChallenges = await Challenge.insertMany(challengesWithQuestions)

        //step 4 add course without categories to DB
        const addCourseInfo={name:courseInfo.name,level:courseInfo.level}
        const createdCourse = await Course.create(addCourseInfo)

        //step 5: add categories to DB
        const categoriesWithRefs = categories.map((cat, idx) => {
            const wordIds = cat.words.map((w) => {
                const foundWord = createdWords.find((cw) => cw.word === w)
                if (!foundWord) throw new Error(`Word not found for category ${cat.name}: ${w}`)
                return foundWord._id;
            })

            const challenge = createdChallenges[idx] || null;

            return {
                name: cat.name,
                words: wordIds,
                challenge: challenge ? challenge._id : null,
                course: createdCourse._id,
            }
        })

        const createdCategories = await Category.insertMany(categoriesWithRefs)

        // step 6: update course categories and status
        await Course.findByIdAndUpdate(createdCourse._id, {
            categories: createdCategories.map((c) => c._id),
            status: "published", 
        });

        //step 7: add course to admin user progress
        const user = req.user
        const userProgress = await UserProgress.findOne({user:user._id}).exec()
        userProgress.courses.push(createdCourse._id)
        await userProgress.save()

        res.status(201).json({ message:"created succsesfully"})
    } catch (err) {
        console.error("createFullCourseSimple error:", err)
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

module.exports = { getAllCoursesForUser, getAllCoursesForAdmin,getFullCourseById, getSingleCourse, createFullCourseSimple, updateCourse, deleteCourse, getCategoriesOfCourse, getWordsOfCourseWithFavorites }
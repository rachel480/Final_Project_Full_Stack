const UserProgress = require('../models/UserProgress')

//get all user progress only for admin
const getAllUsersProgress = async (req, res) => {
    try {
        const usersProgress = await UserProgress.find().lean()
        if (!usersProgress)
            return res.status(400).json({ message: "no progress found" })
        res.json(usersProgress)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get one userProgress only for admin
const getSingleUserProgressByAdmin = async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId)
            return res.status(400).send('userId is required')

        const foundUserProgress = await UserProgress.findOne({ user: userId }).populate([
            { path: 'courses' },
            { path: 'completedCategories' },
            { path: 'challengeResults.challenge' },
            { path: 'challengeResults.answers.question' }
        ]).lean()

        if (!foundUserProgress)
            return res.status(404).json({ message: "no progress found" })

        res.json(foundUserProgress)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get one userProgress only for user
const getSingleUserProgressByUser = async (req, res) => {
    try {
        const user = req.user

        const foundUserProgress = await UserProgress.findOne({ user: user._id }).populate([
            { path: 'courses' },
            { path: 'completedCategories' },
            { path: 'challengeResults.challenge' },
            { path: 'challengeResults.answers.question' }
        ]).lean()

        if (!foundUserProgress)
            return res.status(404).json({ message: "no progress found" })

        res.json(foundUserProgress)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//create user progress
const createUserProgress = async (req, res) => {
    try {
        const { userId, courseId } = req.body
        if (!userId || !courseId)
            return res.status(400).send('user and course are required')

        const user = req.user
        if (!user.roles.includes("Admin")) {
            if (user._id !== userId)
                return res.status(403).json({ message: 'forbidden!!!! you can create for yourself only' })
        }

        const foundUserProgress = await UserProgress.findOne({ user: userId })

        if (!foundUserProgress) {
            const newUserProgress = await UserProgress.create({ user: userId, courses: [courseId] })
            if (!newUserProgress)
                return res.status(400).json({ message: `error occurred while creating user progress` })
            return res.status(201).json({ message: `user's progress was created successfully` })
        } 
        
        else {
            if (foundUserProgress.courses.includes(courseId))
                return res.status(400).json({ message: `course exsists` })

            foundUserProgress.courses = [...foundUserProgress.courses, courseId]
            const updatedUserProgress = await foundUserProgress.save()
            if (!updatedUserProgress)
                return res.status(400).json({ message: `error occurred while updating user progress` })
            return res.status(200).json({ message: `user progress was updated successfully` })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update only for user and admin
const updateUserProgress = async (req, res) => {
    try {
        const { user1, courses, completedCategories, challengeResults, id } = req.body
        const user = req.user

        if (!id || !user1 || !courses)
            return res.status(400).send('id user and course are required')

        const foundUserProgress = await UserProgress.findOne({ user: user._id, _id: id }).exec()
        if (!foundUserProgress)
            return res.status(400).json({ message: "no user progress found" })

        foundUserProgress.user = user1
        foundUserProgress.courses = courses
        foundUserProgress.completedCategories = completedCategories
        foundUserProgress.challengeResults = challengeResults

        const updatedUserProgress = await foundUserProgress.save()
        if (!updatedUserProgress)
            return res.status(400).json({ message: `error occurred while updating user progress` })
        return res.status(201).json({ message: `user progress was updated successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//delete for admin
const deleteUserProgress = async (req, res) => {
    try {
        const { id } = req.body
        if (!id)
            return res.status(400).send('id is required')

        const foundUserProgress = await UserProgress.findById(id).exec()
        if (!foundUserProgress)
            return res.status(400).json({ message: "no user progress found" })

        const deletedUserProgress = await foundUserProgress.deleteOne()
        if (!deletedUserProgress)
            return res.status(400).json({ message: `error occurred while deleting user progress` })
        return res.status(201).json({ message: `user progress was deleted successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update challenge results in user progress
const updateChallengeResultInUserProgress = async (req, res) => {
    try {
        const { challengeResults, categoryId } = req.body
        const user = req.user

        if (!challengeResults || !categoryId)
            return res.status(400).send('challenge results and categoryId are required')

        const completedAt = new Date()
        challengeResults.completedAt = completedAt

        const foundUserProgress = await UserProgress.findOne({ user: user._id }).exec()
        if (!foundUserProgress)
            return res.status(400).json({ message: "no user progress found" })

        foundUserProgress.challengeResults = [...foundUserProgress.challengeResults, challengeResults]
        foundUserProgress.completedCategories = [...foundUserProgress.completedCategories, categoryId]

        const updatedUserProgress = await foundUserProgress.save()
        if (!updatedUserProgress)
            return res.status(400).json({ message: `error occurred while updating user progress` })
        return res.status(201).json({ message: `user progress was updated successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getAllUsersProgress, getSingleUserProgressByAdmin, getSingleUserProgressByUser, createUserProgress, updateUserProgress, deleteUserProgress, updateChallengeResultInUserProgress }
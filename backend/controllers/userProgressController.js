const UserProgress = require('../models/UserProgress')

//get all user progress only for admin
const getAllUsersProgress= async (req, res) => {
    const user = req.user
    //chek if user is admin
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })
    const usersProgress = await UserProgress.find().lean()
    if (!usersProgress)
        return res.status(400).json({ message: "no progress found" })
    res.json(usersProgress)
}

//get one userProgress only for admin and user
const getSingleUserProgressByAdmin = async (req, res) => {
    const { userId } = req.params;
    if (!userId)
        return res.status(400).send('userId is required');

    const user = req.user;

    if (!user.roles?.includes("Admin"))
        return res.status(403).json({ message: 'forbidden' });

    const foundUserProgress = await UserProgress.findOne({ user: userId }).populate([
        { path: 'course' },
        { path: 'completedCategories' },
        { path: 'challengeResults.challenge' },
        { path: 'challengeResults.answers.question' }
    ]).lean();

    if (!foundUserProgress)
        return res.status(404).json({ message: "no progress found" });

    res.json(foundUserProgress);
}

const getSingleUserProgressByUser = async (req, res) => {
    const user = req.user;

    if (user.roles?.includes("Admin"))
        return res.status(403).json({ message: 'forbidden' });

    const foundUserProgress = await UserProgress.findOne({ user: user._id }).populate([
        { path: 'course' },
        { path: 'completedCategories' },
        { path: 'challengeResults.challenge' },
        { path: 'challengeResults.answers.question' }
    ]).lean();

    if (!foundUserProgress)
        return res.status(404).json({ message: "no progress found" });

    res.json(foundUserProgress);
}

const createUserProgress = async () => {
    const { user1, course, completedCategories, challengeResults } = req.body
    if (!user1 || !course)
        return res.status(400).send('user and course are required')
    const user = req.user

    //chek if the user parameter is the same of user only if user is not admin
    if (user.roles === "User") {
        if (user._id !== user1)
            return res.status(403).json({ message:'forbidden!!!! you can create for yourself only'})
    }
    const newUserProgress = await UserProgress.create({ user:user1, course, completedCategories, challengeResults })
    if(!newUserProgress)
        return res.status(400).json({ message: `error occurred while creating user progress`})
    return res.status(201).json({ message: `users progress was created successfully`})
}

//update only for user and admin
const updateUserProgress = async (req, res) => {
    const{ user1, course, completedCategories, challengeResults,id} = req.body
    const user=req.user

    //validation
    //required fields
    if (!id || !user1 || !course)
        return res.status(400).send('id user and course are required')

    const foundUserProgress = await UserProgress.findOne({user:user._id, _id: id }).exec()
    if (!foundUserProgress)
        return res.status(400).json({ message: "no user progress found" })

    //update fields
    foundUserProgress.user=user1
    foundUserProgress.course=course
    foundUserProgress.completedCategories=completedCategories
    foundUserProgress.challengeResults=challengeResults

    const updatedUserProgress = await foundUserProgress.save()
    if (!updatedUserProgress)
        return res.status(400).json({ message: `error occurred while updating user progress` })
    return res.status(201).json({ message: `user progress was updated successfully` })
}

//delete for admin
const deleteUserProgress = async (req, res) => {
    //validation:

    //chek required fields
    const { id } = req.body
    if (!id)
        return res.status(400).send('id is required')

    //chek if user is admin
    const user = req.user
    if (user.roles === "User")
        return res.status(403).json({ message: 'forbidden' })

    const foundUserProgress = await UserProgress.findById(id).exec()
    if (!foundUserProgress)
        return res.status(400).json({ message: "no user progress found" })
    const deletedUserProgress = await foundUserProgress.deleteOne()
    if (!deletedUserProgress)
        return res.status(400).json({ message: `error occurred while deleting user progress` })
    return res.status(201).json({ message: `user progress was deleted successfully` })
}


module.exports = { getAllUsersProgress, getSingleUserProgressByAdmin,getSingleUserProgressByUser,createUserProgress, updateUserProgress, deleteUserProgress}
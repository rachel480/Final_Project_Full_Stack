const Recommendion = require('../models/Recommendion')

//get all Recommendion public
const getAllRecommendions = async (req, res) => {
    try {
        const recommendions = await Recommendion.find().lean()

        if (!recommendions)
            return res.status(400).json({ message: "no recommendions found" })
        res.json(recommendions)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get recommendion by id public
const getSingleRecommendion = async (req, res) => {
    try {
        const { id } = req.params
        if (!id)
            return res.status(400).send('id is required')

        const foundRecommendion = await Recommendion.findById(id).lean()
        if (!foundRecommendion)
            return res.status(400).json({ message: "no Recommendion found" })
        res.json(foundRecommendion)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//create recommendion only for user
const createNewRecommendion = async (req, res) => {
    try {
        const { recommendtion, userName, rating } = req.body
         //validation
        if (!recommendtion || !userName || !rating)
            return res.status(400).send('all fields are required')

        const newRecommendion = await Recommendion.create({ recommendtion, userName, rating })
        if (!newRecommendion)
            return res.status(400).json({ message: `error occurred while creating recommendion` })
        return res.status(201).json({ message: `recommendion was created successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//delete Recommendion only for admin
const deleteRecommendion = async (req, res) => {
    try {
        const { id } = req.body
         //validation
        if (!id)
            return res.status(400).send('id is required')

        const foundRecommendion = await Recommendion.findById(id).exec()

        if (!foundRecommendion)
            return res.status(400).json({ message: "no Recommendion found" })

        const deletedRecommendion = await foundRecommendion.deleteOne()
        if (!deletedRecommendion)
            return res.status(400).json({ message: `error occurred while deleting recommendion with id ${id}` })
        return res.status(201).json({ message: `recommendion with id ${id} was deleted successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {getAllRecommendions,getSingleRecommendion,createNewRecommendion,deleteRecommendion}

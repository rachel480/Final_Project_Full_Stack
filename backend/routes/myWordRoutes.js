const express = require('express')
const router = express.Router()
const myWordController = require('../controllers/myWordController')
const verifyJWT = require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

router.post('/',myWordController.upload.single('img'),verifyJWT,verifyRoles('User'),myWordController.createMyWord)

//use middleware
router.use(verifyJWT)
router.use(verifyRoles('User'))

router.get('/',myWordController.getAllMyWords)
router.put('/',myWordController.updateMyWord)
router.put('/rating',myWordController.updateMyWordRaiting)
router.delete('/',myWordController.deleteMyWord)

module.exports = router
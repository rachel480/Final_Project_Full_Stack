const expresss = require('express')
const router = expresss.Router()
const contactMessageController = require('../controllers/contactMessageController')
const verifyJWT =require('../middleware/verifyJWT')
const verifyRoles = require('../middleware/verifyRoles')

router.post('/', contactMessageController.createMessage)
router.get('/',verifyJWT,verifyRoles('Admin'),contactMessageController.getAllMessages)
router.delete('/',verifyJWT,verifyRoles('Admin'),contactMessageController.deleteMessage)

module.exports = router
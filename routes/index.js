const Controller = require('../controllers/controller')
const router = require('express').Router()

router.get('/', Controller.login)
router.post('/', Controller.postLogin)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)

module.exports = router
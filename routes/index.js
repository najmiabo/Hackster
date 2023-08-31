const Controller = require('../controllers/controller')
const router = require('express').Router()

router.get('/', Controller.login)
router.post('/', Controller.postLogin)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)

router.use((req, res, next) => {
    if (!req.session.UserId) {
        const errors = 'Silahkan login terlebih dahulu!'
        res.redirect(`/?errors=${errors}`)
    } else {
        next()
    }
})

router.get('/profile')
router.get('/post', Controller.post)
router.post('/post', Controller.postProcess)

module.exports = router
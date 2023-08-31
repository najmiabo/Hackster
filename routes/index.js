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

router.get('/profile', Controller.profile)
router.post('/profile', Controller.profilePost)

router.get('/addtag/:PostId', Controller.addTag)
router.post('/addtag/:PostId', Controller.addTagPost)

router.get('/profile/update', Controller.updateProfile)
router.post('/profile/update', Controller.updateProfilePost)

router.get('/post', Controller.post)
router.post('/post', Controller.postProcess)

router.get('/dashboard', Controller.dashboard)
router.get('/dashboard/:UserId/post', Controller.showPosts)
router.get('/dashboard/:UserId/post/:id/delete', Controller.deletePost)

router.get('/logout', Controller.logOut)

module.exports = router
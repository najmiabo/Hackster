const { User, Profile, Post, Tag, TagPost } = require('../models/index')
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize')

class Controller {
    static login(req, res) {
        const { errors } = req.query
        res.render("home", { errors })
    }

    static postLogin(req, res) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            },
            include: [Profile, {
                model: Post,
                include: Tag
            }]
        })
            .then((user) => {
                if (user) {
                    
                    const isValidPassword = bcrypt.compareSync(password, user.password);

                    if (isValidPassword) {
                        req.session.UserId = user.id
                        if (user.role == "Admin") {
                            return res.render('admin', { user })
                        } else {
                            // return res.json(user)
                            return res.render('user', { user })
                        }
                    } else {
                        const error = `Akun/Password salah!`
                        return res.redirect(`/?errors=${error}`)
                    }
                } else {
                    const error = 'Akun/Password salah!'
                    res.redirect(`/?errors=${error}`)
                }
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static register(req, res) {
        const { errors } = req.query
        res.render("register", { errors })
    }

    static postRegister(req, res) {
        const { email, password, role } = req.body
        User.create({ email, password, role })
            .then(() => {
                res.redirect('/')
            })
            .catch((err) => {
                if (err.name == "SequelizeValidationError") {
                    const errors = err.errors.map(el => el.message)
                    res.redirect(`/register?errors=${errors}`)
                } else {
                    console.log(err)
                    res.send(err)
                }
            })
    }

    static profile(req, res) {
        User.findOne({
            where: {
                id: req.session.UserId
            },
            include: [Profile, {
                model: Post,
                include: Tag
            }]
        })
            .then((user) => {
                res.render('user-profile', { user })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static profilePost(req, res) {
        const { fullName, gender, dateOfBirth, phone} = req.body
        Profile.create({ fullName, gender, dateOfBirth, phone, UserId: req.session.UserId})
            .then(() => {
                res.redirect('/profile')
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static addTag(req, res) {
        Tag.findAll()
            .then((tags) => {
                res.render('add-tag', { tags })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static addTagPost(req, res) {
        const { PostId } = req.params
        const { TagId } = req.body
        TagPost.create({ PostId, TagId})
            .then(() => {
                res.redirect('/profile')
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static updateProfile(req, res) {
        Profile.findOne({where: {
            UserId: req.session.UserId
        }})
            .then((profile) => {
                res.render('update-profile', { profile })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static updateProfilePost(req, res) {
        const { fullName, gender, dateOfBirth, phone} = req.body
        Profile.update({ fullName, gender, dateOfBirth, phone}, {
            where: {
                UserId: req.session.UserId
            }
        })
            .then(() => {
                res.redirect('/profile')
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static post(req, res) {
        const { errors } = req.query
        Tag.findAll()
            .then((tags) => {
                res.render('user-post', { tags, errors })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static postProcess(req, res) {
        const { content, TagId } = req.body;
        
        Post.create({ content, UserId: req.session.UserId })
            .then((post) => {
                if (TagId) {
                    return TagPost.create({ PostId: post.id, TagId })
                }
                return Promise.resolve();
            })
            .then(() => {
                res.redirect('/profile');
            })
            .catch((err) => {
                if (err.name == "BadWords") {
                    res.redirect(`/post?errors=${err.errors}`)
                } else {
                    console.error(err);
                    res.send(err);
                }
            });
    }
    
    
    static dashboard(req, res) {
        User.findAll({
            where: {
                role: "User"
            },
            include: [Profile, {
                model: Post,
                include: Tag
            }]
        })
            .then((users) => {
                res.render("dashboard", { users })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static showPosts(req, res) {
        const { UserId } = req.params
        const { search } = req.query

        let options = {
            where: {
                UserId
            }
        }

        if (search) {
            options.where.content = {
                [Op.iLike]: `%${search}%`
            }
        }

        Post.findAll(options)
            .then((posts) => {
                res.render("post-list", { posts })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static deletePost(req, res) {
        const { id, UserId } = req.params
        Post.destroy({
            where: { id }
        })
            .then(() => {
                res.redirect(`/dashboard/${UserId}/post`)
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static logOut(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }
    
}

module.exports = Controller
const { User } = require('../models/index')
const bcrypt = require('bcryptjs');

class Controller {
    static login(req, res) {
        const { errors } = req.query
        res.render("home", { errors })
    }

    static postLogin(req, res) {
        const { email, password } = req.body
        User.findOne({where: {email}})
            .then((user) => {
                if (user) {
                    
                    const isValidPassword = bcrypt.compareSync(password, user.password);

                    if (isValidPassword) {
                        return res.send("masuk")
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
}

module.exports = Controller
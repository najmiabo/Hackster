const { User } = require('../models/index')


class Controller {
    static login(req, res) {
        res.render("home")
    }

    static postLogin(req, res) {
        const { email, password } = req.body
        User.findOne({where: {email}})
            .then((user) => {
                if (user) {
                    const bcrypt = require('bcryptjs');
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(user.password, salt);
                    const isValidPassword = bcrypt.compareSync(password, hash);

                    if (isValidPassword) {
                        return res.send("masuk")
                    } else {
                        return res.redirect('/')
                    }
                } else {
                    res.send("ga ada akunnya")
                }
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }

    static register(req, res) {
        res.render("register")
    }

    static postRegister(req, res) {
        const { email, password, role } = req.body
        User.create({ email, password, role })
            .then(() => {
                res.redirect('/')
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = Controller
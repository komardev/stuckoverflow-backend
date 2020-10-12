const knex = require('../connection/connection')
const router = require('express').Router()
const moment = require('moment')
const bcrypt = require('bcryptjs');
const v = require('validator');

/*----------  Register User  ----------*/
router.post('/user-regist', async (req, res) => {
    try {
        const {
            user_name,
            email,
            password,
            full_name,
        } = req.body

        // Validation
        if (!user_name || !email || !password || !full_name) return res.send({
            error: "Please fill the empty form!"
        })

        if (!v.isEmail(email)) return (res.send({
            error: 'Email format is not valid!'
        }))

        // Check user name
        let checkUser = await knex('users').where('user_name', user_name)
        if (checkUser.length) return res.send({
            error: 'Username has already been taken'
        })

        // Check Email
        let checkEmail = await knex('users').where('email', email)
        if (checkEmail.length) return res.send({
            error: 'Email has already been taken'
        })

        // Create User
        let user = await knex('users').insert({
            user_name,
            full_name,
            email,
            "profile_pic": 'default.png',
            "password": bcrypt.hashSync(password, 8),
            "created_at": moment().format('YYYY/MM/DD HH:mm:ss')
        })

        res.status(201).send({
            id: user[0],
            full_name,
            user_name,
            email,
            "profile_pic": '/avatar/default.png'
        })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})


/*----------  Login User  ----------*/
router.post('/user-login', async (req, res) => {
    try {
        const {
            userAcc,
            password
        } = req.body

        console.log(userAcc, password);
        // Validation
        if (!userAcc || !password) return res.send({
            error: "Please fill the empty form!"
        })

        // Post User
        let user = await knex('users').where('email', userAcc).orWhere('user_name', userAcc)
        if (!user.length) return res.send({
            error: 'User Not Found !'
        })

        user = user[0]
        let hash = bcrypt.compareSync(password, user.password)
        if (!hash) return res.send({
            error: 'User account or Password is not valid!'
        })

        res.status(201).send({
            id: user.id,
            "full_name": user.full_name,
            "user_name": user.user_name,
            "email": user.email,
            "profile_pic": '/avatar/default.png'
        })
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router
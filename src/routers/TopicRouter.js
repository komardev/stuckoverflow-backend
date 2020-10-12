const knex = require('../connection/connection')
const router = require('express').Router()
const moment = require('moment')
/*----------  Get All Topic  ----------*/
router.get('/topics', async (req, res) => {
    try {
        let topic = await knex('topics')
            .join('users', 'topics.user_id', '=', 'users.id')
            .select('topics.id', 'title', 'desc', 'topics.created_at', 'topics.updated_at', 'user_id', 'users.user_name')
        res.send(topic)
    } catch (e) {
        console.log(e);
    }
})

/*----------  Create Topic  ----------*/
router.post('/topic', async (req, res) => {
    const { user_id, title, desc } = req.body
    try {
        let topic = await knex('topics').insert({
            user_id,
            title,
            desc,
            "created_at": moment().format('YYYY/MM/DD HH:mm:ss')
        })
        res.send({
            success: 'Topic has been created!'
        })
    } catch (e) {
        console.log(e);
    }
})

/*----------  Edit Topic  ----------*/
router.put('/topic', async (req, res) => {
    const { title, desc } = req.body
    const { id, userId } = req.query
    try {
        let topic = await knex('topics').where({ id: id, user_id: userId }).update({
            id,
            title,
            desc,
            "updated_at": moment().format('YYYY/MM/DD HH:mm:ss')
        })
        res.sendStatus(201).send({
            success: 'Topic has been edited!'
        })
    } catch (e) {
        console.log(e);
    }
})

/*----------  Get Topic by ID  ----------*/
router.get('/topic/:id', async (req, res) => {
    try {
        let topic = await knex('topics').where('id', req.params.id)
        res.send(topic)
    } catch (e) {
        console.log(e);
    }
})

/*----------  Get Topic by User ID  ----------*/
router.get('/topic-user/:id', async (req, res) => {
    try {
        let topic = await knex('topics')
            .join('users', 'topics.user_id', '=', 'users.id')
            .select('topics.id', 'title', 'desc', 'topics.created_at', 'topics.updated_at', 'user_id', 'users.user_name').where('user_id', req.params.id)

        res.send(topic)
    } catch (e) {
        console.log(e);
    }
})

/*---------- Delete Topic by ID  ----------*/
router.delete('/topic/:id', async (req, res) => {
    try {
        let topic = await knex('topics').where('id', req.params.id).del()
        res.sendStatus(200).send({
            success: 'Delete topic success'
        })
    } catch (e) {
        console.log(e);
    }
})



module.exports = router
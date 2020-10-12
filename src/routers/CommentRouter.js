const knex = require('../connection/connection')
const router = require('express').Router()
const moment = require('moment')

/*----------  Get All Comments  ----------*/
router.get('/comments', async (req, res) => {
    try {
        let topics = await knex('topic_comments')
        res.send(topics)
    } catch (e) {
        console.log(e);
    }
})

/*----------  Get Comments by Topic ID  ----------*/
router.get('/comments/:topicId', async (req, res) => {
    try {
        let topic = await knex('topic_comments').join('users', 'topic_comments.user_id', '=', 'users.id').select('topic_comments.id', 'comment', 'topic_id', 'topic_comments.created_at', 'user_id', 'users.user_name')
            .where('topic_id', req.params.topicId)
        res.send(topic.reverse())
    } catch (e) {
        console.log(e);
    }
})

/*----------  Create Comment  ----------*/
router.post('/comment', async (req, res) => {
    const { user_id, topic_id, comment } = req.body
    try {
        let commentData = await knex('topic_comments').insert({
            user_id,
            topic_id,
            comment,
            "created_at": moment().format('YYYY/MM/DD HH:mm:ss')
        })
        res.send({
            success: 'Comment has been posted!'
        })
    } catch (e) {
        console.log(e);
    }
})

/*----------  Edit Comment  ----------*/
router.put('/comment', async (req, res) => {
    const { comment } = req.body
    const { id, userId } = req.query
    try {
        let commentData = await knex('topic_comments').where({ id: id, user_id: userId }).update({
            comment,
            "updated_at": moment().format('YYYY/MM/DD HH:mm:ss')
        })
        res.send({
            success: 'Comment has been edited!'
        })
    } catch (e) {
        console.log(e);
    }
})

/*---------- Delete Comment by ID  ----------*/
router.delete('/comment/:id', async (req, res) => {
    try {
        let commentData = await knex('topic_comments').where('id', req.params.id).del()
        res.send({
            success: 'Delete comment success'
        })
    } catch (e) {
        console.log(e);
    }
})



module.exports = router
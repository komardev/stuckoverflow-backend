const knex = require('../connection/connection')
const router = require('express').Router()
const path = require('path')
const avatarDir = path.join(__dirname, '/../../public/User Avatar/')

/*----------  Get Avatar User  ----------*/
router.get('/avatar/:imageName', async (req, res) => {
    let imageDir = {
        root: avatarDir
    }

    let namaFile = req.params.imageName
    res.sendFile(namaFile, imageDir, (err) => {
        if (err) return res.send({
            err: err.message
        })
    })
})


module.exports = router
const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const AuthRouter = require('./routers/AuthRouter')
const TopicRouter = require('./routers/TopicRouter')
const CommentRouter = require('./routers/CommentRouter')
const ImageRouter = require('./routers/ImageRouter')

const cors = require('cors');
dotenv.config();

const app = express()
const port = process.env.NODE_PORT

app.use(express.json())
app.use(AuthRouter)
app.use(ImageRouter)
app.use(TopicRouter)
app.use(CommentRouter)
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({
    limit: "8mb",
}));


app.get('/', (req, res) => {
    res.status(200).send(`<h1>RUNNING AT PORT ${port}</h1>`)
})

app.listen(port, () => {
    console.log(`RUNNING AT PORT ${port}`)
})
// Modules and Globals
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express();
const defineCurrentUser = require('./midddleware/difineCurrentUser')

// Express Settings
app.use(cors({
    origin: "*"
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(defineCurrentUser)

// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'public', 'build')));
}

// Controllers & Routes

app.use(express.urlencoded({ extended: true }))

const router = express.Router()


router.use('/places', require('./controllers/places'))
router.use('/users', require('./controllers/users'))
router.use('/authentication', require('./controllers/authentication'))

app.use('/api', router)

// Listen for Connections
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})
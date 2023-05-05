// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)
require('./config/session.config')(app)

// default value for title local
const projectName = 'PRO2'

app.locals.appTitle = `${projectName} created with Aziya and Mijy`

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)


const authRoutes = require('./routes/auth.routes')
const { isLoggedOut } = require('./middleware/route-guard')
app.use('/auth', isLoggedOut, authRoutes)

const cardsRoutes = require('./routes/cards.routes')
app.use('/cards', cardsRoutes)


require('./error-handling')(app)

module.exports = app

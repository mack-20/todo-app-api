// Import neccessary modules
const express = require('express')
const morgan = require('morgan')
const todoRouter = require('./routes/todoRoutes')

// Create app
const app = express()


// Middleware
app.use(express.json())
app.use(morgan('dev'))

// Route
app.use('/api/todos', todoRouter)


module.exports = app
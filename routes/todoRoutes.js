const express = require('express')
const todoRouter = express.Router()

const { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../handlers/todoHandlers')


// Ensure validity of ID
todoRouter.param('id', (req, res, next, val) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
        return res.status(400).json({
            status: 'Fail',
            data: {},
            message: 'ERROR🤦‍♂️: Invalid ID'
        })
    }
    next()
})

todoRouter.route('/')
    .get(getAllTodos)
    .post(createTodo)

todoRouter.route('/:id')
    .get(getTodo)
    .patch(updateTodo)
    .delete(deleteTodo)

module.exports = todoRouter
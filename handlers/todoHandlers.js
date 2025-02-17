const fs = require('fs')
const path = require('path')

let todos = []
const filePath = path.join(__dirname, '..', 'data', 'todos.json')
try {
    if (fs.existsSync(filePath)) {
        todos = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    else {
        fs.writeFileSync(filePath, JSON.stringify([]))
    }

} catch (error) {
    console.log(error.message)
    todos = []
}

exports.getAllTodos = (req, res) => {
    const resp = {
        status: 'Success✔',
        data: {
            todos
        }
    }
    res.status(200).json(resp)

}

exports.getTodo = (req, res) => {
    const todo = todos.find(el => el.id === id)
    const resp = {
        status: 'Success✔',
        data: {
            todo
        }
    }
    res.status(200).json(resp)
}


exports.createTodo = (req, res) => {
    const data = req.body

    if (Object.keys(data).length === 0) {
        return res.status(400).json({
            status: 'Fail',
            message: 'ERROR🤦‍♂️: Request body cannot be empty'
        })
    }
    const newID = todos[todos.length - 1].id + 1
    const newTodo = Object.assign({ 'id': newID }, data)
    todos.push(newTodo)

    fs.writeFile(filePath, JSON.stringify(todos), (err) => {
        if (err) return res.status(500).send(err.message)
        const resp = {
            status: 'Success✔(Created)',
            data: {
                newTodo
            }
        }
        res.status(201).json(resp)
    })
}

exports.updateTodo = (req, res) => {
    const id = parseInt(req.params.id, 10)
    const data = req.body

    // Valid ID[✔], check for body 
    if (Object.keys(data).length === 0) {
        return res.status(400).json({
            status: 'Fail',
            message: 'ERROR🤦‍♂️: Request body cannot be empty'
        })
    }

    const index = todos.findIndex(el => el.id === id)
    todos[index].todo = req.body.todo

    fs.writeFile(filePath, JSON.stringify(todos), (err) => {
        if (err) return res.status(500).send(err.message)
        const resp = {
            status: 'Success✔(Updated)',
            data: {
                updatedTodo: {
                    "id": id,
                    "todo": req.body.todo
                }
            }
        }
        res.status(200).json(resp)
    })

}

exports.deleteTodo = (req, res) => {
    const id = parseInt(req.params.id, 10)

    const updatedTodos = todos.filter(todo => todo.id !== id)
    fs.writeFile(filePath, JSON.stringify(updatedTodos), (err) => {
        if (err) return res.status(500).send(err.message)

        const resp = {
            status: 'Success✔(Deleted)',
            data: {
                updatedTodos
            }
        }
        res.status(200).json(resp)
    })
}
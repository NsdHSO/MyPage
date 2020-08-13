const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const pool = require('./db')

app.use(cors())
app.use(express.json())

// Routing
// Create a todo 
app.post('/todos', async(req, resp) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING * ', [description])
        resp.json(newTodo[0])

    } catch (err) {
        console.error(err.message)
    }
})

// get All todo
app.get('/todos', async(req, resp) =>{
    try {
        const allTodos = await pool.query('SELECT * FROM todo')
        resp.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }

})

// get a todo 

app.get('/todos/:id', async(req, resp) => {
    try {
        const { id } = req.params
        const get1ToDo = await pool.query('SELECT * FROM todo WHERE id = $1' , [id])

        resp.json(get1ToDo.rows[0])
    } catch (err) {
        console.err(err.message)
    }

})

// update a todo 
app.put('/todos/:id', async(req,resp) => {
    try {
        const { id } = req.params
        const { description }  = req.body
        const updataToDo = await pool.query('UPDATE todo SET description = $1 WHERE id = $2', [description, id])
        resp.json('Todo was updated ')
    } catch (err) {
        console.error(err.message)
    }
})

//delete all 

app.delete('/todos', async(req, resp) => {
    try {
        const deleteAll = await pool.query('DELETE FROM todo')
        resp.status("All Todo is deleted")
    } catch (err) {
        console.error(err.message)
    }
})

// delete a todo 
app.delete('/todos/:id', async(req,resp) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query('DELETE FROM todo WHERE id = $1', [id])

        resp.json("Todo list ")
    } catch (err) {
        console.error(err.message)
    }
})


app.listen(port ,() => {
    console.log(`Server has started on port ${port}`)
})
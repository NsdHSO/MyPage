import React, { Fragment, useState, useEffect } from 'react'
import EditTodo from './EditTodo'

const ListTodos = () => {

   
    const [todos, setTodos] = useState([])
    const deleteTodo = async (id) => {
        try {
            //eslint-disable-next-line
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,
            {
                method: "DELETE"
            })
        setTodos(todos.filter(todo => todo.id !==id))
        } catch (err) {
            console.error(err)
        }
    }
    const getTodos = async () => {
        
        try {
            const response = await fetch ("http://localhost:5000/todos")
            const jsonData =await response.json()

            setTodos(jsonData)
            console.log(jsonData)
        } catch (err) {
            console.error(err.message)
        }

    }

    useEffect( () => {
        getTodos()
    },[] )
    
    return (
        <Fragment>
            {" "}
            <table className = "table table-hover mt-5 text center">
                <thead>
                    <tr>
                        <th className = "table-info">Description</th>
                        <th className = "table-primary">Edit</th>
                        <th className = "table-danger">Delete</th>
                        
                    </tr>
                </thead>
                <tbody className = "table-secondary">
                    {todos.map(todo => (
                        <tr>
                            <td className = "table-active">{todo.description}</td>
                            <td className = "table-primary"><EditTodo todo={todo}/></td>
                            <td > <button className = "btn btn-danger text center" onClick = { () => deleteTodo(todo.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </Fragment>
    );
}

export default ListTodos
import React, {useState} from 'react'
import {Itodo} from "../Interfaces";

interface ToDoListProps {
    todos: Itodo[],

    onRemove(id: number): void,

    onToggle(id: number): void
}

export const ToDoList: React.FC<ToDoListProps> = (todos) => {

    if (todos.todos.length == 0) {
        return <>
            <p className="center">No tasks</p>
        </>
    }
    return (
        <ul>
            {todos.todos.map(todo => {
                const classes = ['todo']
                if (todo.completed) {
                    classes.push('completed')
                }

                return (

                    <li className={classes.join(' ')} key={todo.id}>
                    <label>
                            <input type="checkbox" checked={todo.completed} onChange={(e) => {todos.onToggle(todo.id)}}/>
                            <span>{todo.title}</span>
                            <i onClick={() => todos.onRemove(todo.id)}
                               className="material-icons red-text">delete</i>
                    </label>

                    </li>
                )
            })}

        </ul>
    )

}

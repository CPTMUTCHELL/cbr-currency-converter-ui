import React, {useState} from 'react';
import {Navbar} from "./components/Navbar";
import {Todo} from "./components/Todo";

import {Itodo} from "./Interfaces";
import {ToDoList} from "./components/ToDoList";

const App:React.FC =()=>{
  const [todos,setTodos]  = useState<Itodo[]>([])
  const addHandler = (title:string) =>{
    const  todo:Itodo={
      title:title,
      id: Date.now(),
      completed:false

    }
   setTodos(prevState => [todo, ...prevState])
  }
  const deleteHandler = (id:number) => {
   if ( window.confirm(`Are you sure?`))
    setTodos(prevState => prevState.filter(todo=>{
      if (todo.id !=id){
        return todo
      }
    }))
  }
  const toggleHandler = (id:number) => {
    console.log(id)
    setTodos(prevState => prevState.map(todo=>{
      if (todo.id===id){
        const newTodo = {...todo,completed:!todo.completed}
       return newTodo
      }
      return todo
    }))
  }
  return <>
    <Navbar></Navbar>
    <div className="container">
      <Todo onAdd={addHandler}/>
      <ToDoList todos={todos} onRemove={deleteHandler} onToggle={toggleHandler}/>
    </div>

  </>
}
export default App
import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

export default function App() {
  console.log("App component is rendered");
  const [todos, setTodos] = useState(() => {
    console.log("runnig usestate")
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) {
      console.log("when ITEMS doesn't exist in localstorage")
      return []

    }
    console.log("todos from usestate " + JSON.parse(localValue));
    console.log("when ITEMS list exist in localstorage")

    return JSON.parse(localValue)
  })

  useEffect(() => {
    console.log("runnig useffect")
    console.log("inside useeffect: " + JSON.stringify(todos))
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    console.log("on add todo function");
    setTodos(currentTodos => {
      console.log("adding new todo item in settodos")
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    console.log("toggle function: " + completed);
    console.log("todo ID: " + id);
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}
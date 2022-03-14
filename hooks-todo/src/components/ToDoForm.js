import { useState, useEffect } from "react";
import { useContext } from "react";
import React from "react";
import TodosContext from "../context";

export default function ToDoForm() {
  const [todo, setTodo] = useState("");
  const {
    dispatch,
    state: { currentTodo = {} },
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTodo.text) {
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      dispatch({ type: "ADD_TODO", payload: todo });
    }
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        onChange={(event) => setTodo(event.target.value)}
        type="text"
        className="border-black border-solid border-2"
        value={todo}
      />
    </form>
  );
}

import { useState, useEffect } from "react";
import { useContext } from "react";
import React from "react";
import TodosContext from "../context";
import axios from "axios";

const reqUrl = "api/todos";

export default function ToDoForm() {
  const [todo, setTodo] = useState("");
  const {
    dispatch,
    state: { currentTodo = {} },
    state,
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentTodo.text) {
      const response = await axios.put(`${reqUrl}/${currentTodo.id}`, {
        text: todo,
      });
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      const response = await axios.post(`${reqUrl}/9999`, { text: todo });
      dispatch({ type: "ADD_TODO", payload: response.data });
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

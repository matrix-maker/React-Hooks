import { createContext } from "react";
import React from "react";

const TodosContext = createContext({
  todos: [],
  currentTodo: {},
});

export default TodosContext;

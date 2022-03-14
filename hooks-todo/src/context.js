import { createContext } from "react";
import React from "react";

const TodosContext = createContext({
  todos: [
    { id: 1, text: "Eat your breakfast missy!", complete: false },
    { id: 2, text: "Do your laundry", complete: false },
    { id: 3, text: "Finish your project", complete: true },
  ],
  currentTodo: {},
});

export default TodosContext;

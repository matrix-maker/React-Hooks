import { useContext, useReducer } from "react";
import React from "react";
import ReactDOM from "react-dom";
import reducer from "./reducer";
import TodosContext from "./context";
import TodosList from "./components/TodosList";
import ToDoForm from "./components/ToDoForm";

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoForm />
      <TodosList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

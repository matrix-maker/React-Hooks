import { useContext, useReducer, useEffect } from "react";
import React from "react";
import ReactPlaceholder from "react-placeholder/lib";
import ReactDOM from "react-dom";
import reducer from "./reducer";
import TodosContext from "./context";
import TodosList from "./components/TodosList";
import { REQUEST_STATUS } from "./hooks/useAPI";
import ToDoForm from "./components/ToDoForm";
import useAPI from "./hooks/useApi";

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { requestStatus, error, data: savedTodos } = useAPI();

  useEffect(() => {
    dispatch({ type: "GET_TODOS", payload: savedTodos });
  }, [savedTodos]);

  if (requestStatus === REQUEST_STATUS.FAILURE)
    return (
      <div className="text-danger">
        ERROR <b>Loading speakerdata failed {error}</b>
      </div>
    );

  return (
    <div className="container speakers-list">
      <ReactPlaceholder
        type="media"
        row={30}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      >
        <TodosContext.Provider value={{ state, dispatch }}>
          <ToDoForm />
          <TodosList />
        </TodosContext.Provider>
      </ReactPlaceholder>
    </div>
  );
};

export default App;

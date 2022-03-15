import { useContext } from "react";
import React from "react";
import TodosContext from "../context";
import axios from "axios";

const reqUrl = "api/todos";

export default function TodosList() {
  const { state, dispatch } = useContext(TodosContext);
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing To Do!";

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <p className="font-bold text-3xl">{title}</p>
      <ul className="list-reset text-white p-0">
        {state["todos"].map((todo) => (
          <li
            className="flex items-center border-black border-dashed border-2 my-2 py-4"
            style={{ backgroundColor: "rgb(249 115 22)" }}
            key={todo.id}
          >
            <span
              onDoubleClick={async () => {
                const response = await axios.patch(`${reqUrl}/${todo.id}`, {
                  complete: !todo.complete,
                });
                console.log("response.data " + response.data);
                dispatch({ type: "TOGGLE_TODO", payload: todo });
              }}
              className={`flex-1 ml-12 cursor-pointer ${
                todo.complete && "line-through text-gray-900"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "SET_CURRENT_TODO", payload: todo })
              }
            >
              <img src="./edit.png" alt="Edit Icon" className="h-6" />
            </button>
            <button
              onClick={async () => {
                await axios.delete(`${reqUrl}/${todo.id}`, todo);
                dispatch({ type: "DELETE_TODO", payload: todo });
              }}
            >
              <img src="./delete.png" alt="Delete Icon" className="h-6" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

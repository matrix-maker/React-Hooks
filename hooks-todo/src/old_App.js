import React, { useReducer } from "react";
import { UserContext } from ".";
import { useContext } from "react";

const initialState = {
  status: "none",
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      };
    case "decrement":
      return {
        status: "decrement",
        count: state.count - 1,
      };
    case "reset":
      return initialState;
    default:
      return initialState;
  }
}

export default function old_App() {
  const { username } = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      Status: {state.status}
      <br />
      Count: {state.count}
      <br />
      <button
        className="border m-1 p-1"
        onClick={() => dispatch({ type: "increment" })}
      >
        Increment
      </button>
      <button
        className="border m-1 p-1"
        onClick={() => dispatch({ type: "decrement" })}
      >
        Decrement
      </button>
      <button
        className="border m-1 p-1"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </div>
  );
}

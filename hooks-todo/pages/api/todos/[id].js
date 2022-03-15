import path from "path";
import fs from "fs";
import uuidv4 from "../../../src/uuidv4";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  //res.status(200).send(JSON.stringify(data, null, 2));
  const jsonFile = path.resolve("./", "dB.json");
  const method = req?.method;
  const id = req?.query.id;
  const reqTodo = req?.body;

  switch (method) {
    case "POST":
      await postMethod();
      break;
    case "PATCH":
      await patchMethod();
      break;
    case "PUT":
      await putMethod();
      break;
    case "DELETE":
      await deleteMethod();
      break;
    default:
      res.status(501).send(`Method ${method} not implemented`);
      console.log(`Method ${method} not implemented`);
  }

  async function patchMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const todos = JSON.parse(readFileData).todos;
      if (!todos) {
        res.status(404).send("Error: Request failed with status code 404");
      } else {
        const newTodoArray = todos.map(function (todo) {
          return todo.id === id
            ? { ...todo, complete: reqTodo.complete }
            : todo;
        });
        writeFile(jsonFile, JSON.stringify({ todos: newTodoArray }, null, 2));
        res.setHeader("Content-Type", "application/json");
        const resposeTodo = todos.filter((t) => t.id === id);
        console.log("resposeTodo  " + resposeTodo);
        res.status(200).send(JSON.stringify(resposeTodo, null, 2));
        console.log(`PUT /api/todo/${id}  status: 200`);
      }
    } catch (e) {
      res.status(500).send(`PUT /api/todo/${id}  status: 500 unexpected error`);
      console.log(`PUT /api/todo/${id}  status: 200`, e);
    }
  }

  async function putMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const todos = JSON.parse(readFileData).todos;
      if (!todos) {
        res.status(404).send("Error: Request failed with status code 404");
      } else {
        const newTodoArray = todos.map(function (todo) {
          return todo.id === id ? { ...todo, text: reqTodo.text } : todo;
        });
        writeFile(jsonFile, JSON.stringify({ todos: newTodoArray }, null, 2));
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(reqTodo.text, null, 2));
        console.log(`PUT /api/todo/${id}  status: 200`);
      }
    } catch (e) {
      res.status(500).send(`PUT /api/todo/${id}  status: 500 unexpected error`);
      console.log(`PUT /api/todo/${id}  status: 200`, e);
    }
  }

  async function deleteMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const todos = JSON.parse(readFileData).todos;
      if (!todos) {
        res.status(404).send("Error: Request failed with status code 404");
      } else {
        const newTodoArray = todos.filter(function (todo) {
          return todo.id !== id;
        });
        writeFile(jsonFile, JSON.stringify({ todos: newTodoArray }, null, 2));
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(
          JSON.stringify(
            todos.find((rec) => rec.id === id),
            null,
            2
          )
        );
        console.log(`DELETE /api/todo/${id}  status: 200`);
      }
    } catch (e) {
      res
        .status(500)
        .send(`DELETE /api/todo/${id}  status: 500 unexpected error`);
      console.log(`DELETE /api/todo/${id}  status: 200`, e);
    }
  }

  async function postMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const todos = JSON.parse(readFileData).todos;
      if (!todos) {
        res.status(404).send("Error: Request failed with status code 404");
      } else {
        const idNew = uuidv4();
        const newTodo = { id: idNew, text: reqTodo.text, complete: false };
        const newTodosArray = [...todos, newTodo];
        writeFile(jsonFile, JSON.stringify({ todos: newTodosArray }, null, 2));
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(newTodo, null, 2));
        console.log(`POST /api/todo/${id}  status: 200`);
      }
    } catch (e) {
      res
        .status(500)
        .send(`POST /api/todo/${id}  status: 500 unexpected error`);
      console.log(`POST /api/todo/${id}  status: 200`, e);
    }
  }
}

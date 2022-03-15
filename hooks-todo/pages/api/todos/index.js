import path from "path";
import fs from "fs";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  const jsonFile = path.resolve("./", "dB.json");

  try {
    const jsonFileData = await readFile(jsonFile);
    await delay(1000);
    const todos = JSON.parse(jsonFileData).todos;
    if (todos) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(todos, null, 2));
      console.log("GET /api/todos status: 200");
    }
  } catch (e) {
    console.log("/api/speakers error", e);
    res.status(404).send("File Not Found on server");
  }
}

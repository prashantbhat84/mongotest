const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const mongoose = require("mongoose");
const express = require("express");
let app = express();
let count = 0;

// Connection URL
const url = "mongodb://localhost:27017/TodoApp";
mongoose.Promise = global.Promise;

mongoose.connect(url, { useNewUrlParser: true });
let Todo = mongoose.model("Todo", {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});
app.get("/todos", (req, res) => {
  Todo.find()
    .then(todos => {
      if (todos) {
        todos.forEach(todo => {
          if (todo.completed === false) {
            count++;
          }
        });
      }

      res.send({ count });
    })
    .catch(e => {
      res.sendStatus(400).send(e);
    });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

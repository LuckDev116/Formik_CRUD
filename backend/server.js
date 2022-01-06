const express = require("express");
const cors = require("cors");

const { users } = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", users);

module.exports = app;

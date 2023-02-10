const express = require("express");
const server = express();
const cors = require("cors");

require("dotenv").config();

server.use(express.json());
server.use(cors());

// Routers
const userRouter = require("./content/routes/UsersRoutes");
server.use("/users", userRouter);
const teamRouter = require("./content/routes/TeamsRoutes");
server.use("/teams", teamRouter);
const taskRouter = require("./content/routes/TasksRoutes");
server.use("/tasks", taskRouter);

const { createDB } = require("./database/database.js");
const PORT = 3000;
server.listen(PORT, async () => {
  console.log(`SERVER RUNNING AT http://localhost:${PORT}`);
  await createDB();
});

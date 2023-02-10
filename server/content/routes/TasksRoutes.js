const express = require("express");
const router = express.Router();
const { Tasks } = require("../models/Tasks.js");
const { Users } = require("../models/Users.js");

router.post("/add-task", async (req, res) => {
  const { task_name, assigned_to, assigned_from, description } = req.body;
  if (Users.findByPk(assigned_to) && Users.findByPk(assigned_from)) {
    Tasks.create({
      name: task_name,
      assigned_to: assigned_to,
      assigned_from: assigned_from,
      description: description,
    })
      .then(() => {
        res.status(201).send({
          message: "Task added successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({
          message: "Unable to add task!",
        });
      });
  } else {
    res.status(500).send({ message: "The employee does not exist" });
  }
});

router.get("/", async (req, res) => {
  try {
    const listOfTasks = await Tasks.findAll();
    res.json(listOfTasks);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error getting all the tasks" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (await Tasks.findByPk(id)) {
      const listOfTasks = await Tasks.findByPk(id);
      res.json(listOfTasks);
    } else {
      res.status(500).send({ message: `The task with id ${id} does not exist` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error getting all the tasks" });
  }
});

//create a get for all the tasks of a specific employee
router.get("/employee/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (await Users.findByPk(id)) {
      const listOfTasks = await Tasks.findAll({
        where: {
          assigned_to: id,
        },
        attributes: { exclude: [] },
      });
      res.json(listOfTasks);
    } else {
      res.status(500).send({ message: `The user with id ${id} does not exist` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error getting all the tasks of ${id}` });
  }
});

//create a get for all the tasks of a specific manager
router.get("/manager/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (await Users.findByPk(id)) {
      const listOfTasks = await Tasks.findAll({
        where: {
          assigned_from: id,
        },
      });
      res.json(listOfTasks);
    } else {
      res.status(500).send({ message: `The manager with id ${id} does not exist` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error getting all the tasks assigned from ${id}` });
  }
});


router.post("/finished", async (req, res) => {
  const { id } = req.body;
  try {
    if (await Tasks.findByPk(id)) {
      await Tasks.update(
        {
          isCompleted: "TRUE",
        },
        {
          where: { id: id },
        }
      );
      res.status(201).send({ message: `The task with id ${id} has finished` });
    } else {
      res.status(500).send({ message: `The task with id ${id} does not exist` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error updating task ${id}` });
  }
});

router.delete("/delete-task", async (req, res) => {
  const { id } = req.body;
  if (await Tasks.findByPk(id)) {
    Tasks.destroy({
      where: { id: id },
    })
      .then(() => {
        res.status(201).send({
          message: "Task deleted succesfuly",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({
          message: "Unable to delete task!",
        });
      });
  } else {
    res.status(500).send({ message: `The task with id ${id} does not exist` });
  }
});

module.exports = router;

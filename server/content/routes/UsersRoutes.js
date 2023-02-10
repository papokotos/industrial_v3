const express = require("express");
const router = express.Router();
const { Users } = require("../models/Users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create User
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, user_name, email, password, phone_number, rank, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      email: email,
      password: hashedPassword,
      phone_number: phone_number,
      rank: rank,
      age: age,
    });
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating user" });
  }
});

//create post to update password and username
router.post("/update", async (req, res) => {
  const { id, first_name, last_name, email, phone_number, rank, age } = req.body;
  try {
    const user = await Users.findByPk(id);
    if (user) {
      Users.update(
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone_number: phone_number,
          rank: rank,
          age: age,
        },
        {
          where: { id: id },
        }
      );
    } else {
      res.status(500).send({ message: "user does not exist" });
    }
    res.status(201).send({ message: "user account updated succesfuly" });
  } catch {
    res.status(500).send({ message: "error updating user" });
  }
});

//create post to update password and username
router.post("/update-credentials", async (req, res) => {
  const { id, user_name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await Users.findByPk(id);
    if (user) {
      Users.update(
        {
          password: hashedPassword,
          user_name: user_name,
        },
        {
          where: { id: id },
        }
      );
    } else {
      res.status(500).send({ message: "user does not exist" });
    }
    res.status(201).send({ message: "user credentials updated succesfuly" });
  } catch {
    res.status(500).send({ message: "error updating credentials" });
  }
});

// Get all Employess
router.get("/employees", async (req, res) => {
  try {
    const listOfEmployees = await Users.findAll({
      where: {
        rank: "employee",
      },
      attributes: { exclude: ["password"] },
    });
    res.json(listOfEmployees);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "ERROR GETTING ALL EMPLOYEES" });
  }
});

router.get("/free-managers", async (req, res) => {
  try {
    const listOfManagers = await Users.findAll({
      where: {
        rank: "manager",
        assigned_team: null,
      },
      attributes: { exclude: ["password"] },
    });
    res.json(listOfManagers);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "ERROR GETTING ALL FREE MANAGERS" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    res.json(user);
  } catch {
    res.status(500).send({ message: "ERROR GETTING EMPLOYEE" });
  }
});

// Get all Users
router.get("/", async (req, res) => {
  try {
    const listOfUsers = await Users.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(listOfUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "ERROR GETTING ALL USERS" });
  }
});

//delete user
router.delete("/delete-user", async (req, res) => {
  const { id } = req.body;
  if (await Users.findByPk(id)) {
    Users.destroy({
      where: { id: id },
    })
      .then(() => {
        return res.status(201).send({ message: "user is deleted" })
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "ERROR DELETING USER" })
      });
  } else {
    res.status(500).send({ message: `THE USER WITH ID ${id} DOES NOT EXIST` });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { user_name: username } });
    if (!user) {
      return res.status(404).send({ message: "USER NOT FOUND" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "INVALID PASSWORD" });
    }
    const token = jwt.sign({ userId: user.id, rank: user.rank }, process.env.JWT_SECRET);
    res.send({
      message: "LOGGED IN SUCCESSFULY",
      token,
      rank: user.rank,
      id: user.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "ERROR LOGGING IN" });
  }
});

module.exports = router;

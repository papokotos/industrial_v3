const express = require("express");
const router = express.Router();
const { Teams } = require("../models/Teams.js");
const { Users } = require("../models/Users.js");

router.post("/add-team", async (req, res, next) => {
  const { team_name, team_leader, description } = req.body;
  if (Users.findByPk(team_leader)) {
    Teams.create({
      name: team_name,
      description: description,
    })
      .then(() => {
        res.status(201).send({
          message: "Team added successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({
          message: "Unable to add team!",
        });
      });
  } else {
    res.status(500).send({
      message: "User doesnt exist!",
    });
  }
});

router.post("/add-leader", async (req, res) => {
  const { team_id, leader } = req.body;
  if (Users.findByPk(leader) && Teams.findByPk(team_id)) {
    Users.update(
      {
        assigned_team: team_id,
      },
      {
        where: {
          id: leader,
        },
      }
    )
      .then(() => {
        Teams.update(
          {
            leader: leader,
          },
          {
            where: { id: team_id },
          }
        );
        Teams.increment("members", {
          by: 1,
          where: { id: team_id },
        })
          .then(() => {})
          .catch((error) => {
            console.log(error);
            res.status(500).send({
              message: "Unable to add leader!",
            });
          });
      })
      .then(() => {
        res.status(201).send({
          message: "Leader added successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({
          message: "Unable to add leader!",
        });
      });
  } else {
    res.status(500).send({ message: "Team or manager does not exist!" });
  }
});

router.post("/add-user", async (req, res, next) => {
  const { team_id, user_id } = req.body;
  try {
    if (Teams.findByPk(team_id) && Users.findByPk(user_id)) {
      Users.update(
        {
          assigned_team: team_id,
        },
        {
          where: { id: user_id },
        }
      );
      Teams.increment("members", {
        by: 1,
        where: { id: team_id },
      });
    } else {
      res.status(500).send({ message: "Team does not exist" });
    }
    res.status(201).send({ message: "You succesfuly added users to the team" });
  } catch {
    console.log(error);
    res.status(500).send({ message: "Error adding users to the team" });
  }
});

router.post("/remove-user", async (req, res, next) => {
  const { team_id, user_id } = req.body;
  try {
    if (Teams.findByPk(team_id) && Users.findByPk(user_id)) {
      Users.update(
        {
          assigned_team: null,
        },
        {
          where: { id: user_id },
        }
      );
      Teams.decrement("members", {
        by: 1,
        where: { id: team_id },
      });
    } else {
      res.status(500).send({ message: "Team or employee do not exist" });
    }
    res.status(201).send({ message: "You succesfuly deleted users from the team" });
  } catch {
    console.log(error);
    res.status(500).send({ message: "Error deleting users from the team" });
  }
});

router.get("/", async (req, res) => {
  try {
    const listOfTeams = await Teams.findAll();
    res.json(listOfTeams);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error getting all the teams" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (await Teams.findByPk(id)) {
      const listOfTeams = await Teams.findByPk(id);
      res.json(listOfTeams);
    } else {
      res.status(500).send({ message: `The team with id ${id} does not exist` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error getting team with id ${id}` });
  }
});

router.delete("/delete-team", async (req, res) => {
  const { team_id } = req.body;

  if (await Teams.findByPk(team_id)) {
    Teams.destroy({ where: { id: team_id } })
      .then(() => {
        res.status(201).send({
          message: `deleted ${team_id} succesfully`,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "ERROR DELETING TEAM" });
      });
  } else {
    res.status(500).send({
      message: `The team id ${team_id} does not exist`,
    });
  }
});

module.exports = router;

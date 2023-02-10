const { sequelize } = require("../../database/database.js");
const { DataTypes } = require("sequelize");

const Tasks = sequelize.define(
  "Tasks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assigned_from: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isCompleted: {
      type: DataTypes.STRING,
      defaultValue: "FALSE",
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Tasks };

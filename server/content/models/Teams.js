const { sequelize } = require("../../database/database.js");
const { DataTypes, Sequelize } = require("sequelize");

const Teams = sequelize.define(
  "Teams",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leader: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    members: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Teams };

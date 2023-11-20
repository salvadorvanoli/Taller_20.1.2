const peopleModel = require("../models/peopleModel");

const getUsers = async (req, res) => {
    const users = await peopleModel.getUsers();
    res.json(users);
};

module.exports = {
    getUsers,
};
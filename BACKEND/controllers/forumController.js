// Importamos los models necesarios
const forumModel = require("../models/forumModel");

const getForums = async (req, res) => {
  const forums = await forumModel.getForums();
  res.json(forums);
};

const getForumById = async (req, res) => {
  const id = parseInt(req.params.id);
  const forum = await forumModel.getForumById(id);
  if (forum) {
    res.json(forum);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

const createForum = async (req, res) => {
  const createdForum = await forumModel.createForum(req.body);
  if (createdForum) {
    res.json(createdForum);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};

const deleteForum = async (req, res) => {
  const id = parseInt(req.params.id);
  const forum = await forumModel.getForumById(id);
  if (forum) {
    const result = await forumModel.deleteForum(parseInt(req.params.id));

    if (result) {
      res.json(forum);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

module.exports = {
  getForums,
  getForumById,
  createForum,
  deleteForum,
};

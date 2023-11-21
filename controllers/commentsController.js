// Importamos los models necesarios
const commentModel = require("../models/commentModel");

const getComments = async (req, res) => {
  const comments = await commentModel.getComments();
  res.json(comments);
};

const getCommentById = async (req, res) => {
  const id = parseInt(req.params.id);
  const comment = await commentModel.getCommentById(id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

const createComment = async (req, res) => {
  const createdComment = await commentModel.createComment(req.body);
  if (createdComment) {
    res.json(createdComment);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};

const deleteComment = async (req, res) => {
  const id = parseInt(req.params.id);
  const comment = await commentModel.getCommentById(id);
  if (comment) {
    const result = await commentModel.deleteComment(parseInt(req.params.id));

    if (result) {
      res.json(comment);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

module.exports = {
    getComments,
    getCommentById,
    createComment,
    deleteComment,
};
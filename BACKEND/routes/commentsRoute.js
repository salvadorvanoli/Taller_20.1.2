const express = require("express");
const commentRouter = express.Router();
// Importamos los controllers necesarios
const commentController = require("../controllers/commentsController");

commentRouter.get("/", commentController.getComments);

commentRouter.get("/:id", commentController.getCommentById);

commentRouter.post("/", commentController.createComment);

commentRouter.delete("/:id", commentController.deleteComment);

module.exports = commentRouter;

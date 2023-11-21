const express = require("express");
const forumRouter = express.Router();
// Importamos los controllers necesarios
const forumController = require("../controllers/forumController");

forumRouter.get("/", forumController.getForums);

forumRouter.get("/:id", forumController.getForumById);

forumRouter.post("/", forumController.createForum);

forumRouter.delete("/:id", forumController.deleteForum);

module.exports = forumRouter;

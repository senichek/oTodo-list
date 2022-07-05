const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");
const tagController = require("./controllers/tagController");
const mainController = require("./controllers/mainController");
const positionController = require("./controllers/positionController");
const auth = require("./middlewares/authentication");

router.get("/", mainController.renderGreet);
router.get("/login", userController.renderLogin);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/register", userController.renderSignUp);
router.post("/register", userController.signup);

router.get("/tags", tagController.getAll);
router.get("/tasks/:id/tags/:name", auth, tagController.detachFromTask);
router.post("/tasks/:id/tags/:tagid", auth, tagController.attachToTask);

router.get("/tasks", auth, taskController.getAllByUserId);
router.post("/tasks", auth, taskController.create);
router.delete("/tasks/:id", auth, taskController.delete);
router.put("/tasks/:id", auth, taskController.update);

router.post("/positions", auth, positionController.create);

module.exports = router;
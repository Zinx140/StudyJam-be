const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const authorization = require("../middlewares/authorization");

router.get("/", authorization("user", "get"), userController.fetchUsers);
router.get(
  "/:user_id",
  authorization("user", "get"),
  userController.fetchUserByID,
);
router.put(
  "/:user_id",
  authorization("user", "put"),
  userController.updateRoleUser,
);
router.delete(
  "/:user_id",
  authorization("user", "delete"),
  userController.softDeleteUser,
);

module.exports = router;

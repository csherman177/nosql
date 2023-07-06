const router = require("express").Router();
const {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/courses/:userId
router.route("/:userId").get(getUserId).put(updateUser).delete(deleteUser);

module.exports = router;

const { User } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get single user by ID and populate thought & data field
  async getUserId(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Post a new user

  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Put to update user by ID
  async updateUser(req, res) {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updateUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete to remove user by ID
  async deleteUser(req, res) {
    try {
      const removeUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!course) {
        return res.status(404).json({ message: "No user with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

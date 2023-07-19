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
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends");

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
      const deleteUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!deleteUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Post new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      const friend = await User.findById(friendId);
      if (!friend) {
        return res.status(404).json({ message: "No friend with that ID" });
      }

      user.friends.push(friendId);
      await user.save();

      res.status(200).json({ message: "Friend added successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete friend from friend list
  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      const friendIndex = user.friends.indexOf(friendId);
      if (friendIndex === -1) {
        return res
          .status(404)
          .json({ message: "No friend with that ID in the friend list" });
      }

      user.friends.splice(friendIndex, 1);
      await user.save();

      res.status(200).json({ message: "Friend removed successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};

const { User, Thought } = require("../models");

// Get all thoughts
module.exports = {
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get single thought by ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Post - Create new thought (don't forget to push the created thought's _id
  //to the associated user's thoughts array field)
  async newThought(req, res) {
    try {
      const thought = await Thought.create(req.body); // userID is coming from req.body
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true } //hands database new information
      );
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.status(200).json({ thought, user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Put to update a thought by its id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete to remove a thought by ID
  // DELETE /thoughts/:thoughtId
  async deleteThoughtById(req, res) {
    try {
      const { thoughtId } = req.params;
      const deletedThought = await Thought.findByIdAndDelete(thoughtId);

      if (!deletedThought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      return res.status(200).json({ message: "Thought deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  // Create a Reaction - Left off here
  async newReaction(req, res) {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      const newReaction = {
        reactionBody,
        username,
      };

      thought.reactions.push(newReaction);
      await thought.save();

      return res.status(201).json(thought.reactions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  // Delete a Reation
  async removeReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction.reactionId.toString() === reactionId
      );

      if (reactionIndex === -1) {
        return res.status(404).json({ error: "Reaction not found" });
      }

      thought.reactions.splice(reactionIndex, 1);
      await thought.save();

      return res.status(200).json({ message: "Reaction removed successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  },
};

const router = require("express").Router();
const thoughtController = require("../../controllers/thoughtsController.js");

// Get all thoughts
router.get("/", thoughtController.getThoughts);

// Get single thought by ID
router.get("/:thoughtId", thoughtController.getSingleThought);

// Create new thought
router.post("/", thoughtController.newThought);

// Update a thought by its ID
router.put("/:thoughtId", thoughtController.updateThought);

// Remove a thought by its ID
router.delete("/:thoughtId", thoughtController.deleteThoughtById);

// Create a reaction stored in a single thought's reactions array
router.post("/:thoughtId/reactions", thoughtController.newReaction);

// Remove a reaction by the reaction's reactionId value
router.delete(
  "/:thoughtId/reactions/:reactionId",
  thoughtController.removeReaction
);

module.exports = router;

const router = require("express").Router();

// Get all thoughts
router.get("/thoughts", thoughtController.getThoughts);

// Get single thought by ID
router.get("/thoughts/:thoughtId", thoughtController.getSingleThought);

// Create new thought
router.post("/thoughts", thoughtController.newThought);

// Update a thought by its ID
router.put("/thoughts/:thoughtId", thoughtController.updateThought);

// Remove a thought by its ID
router.delete("/thoughts/:thoughtId", thoughtController.removeThought);

// Create a reaction stored in a single thought's reactions array
router.post("/thoughts/:thoughtId/reactions", thoughtController.createReaction);

// Remove a reaction by the reaction's reactionId value
router.delete(
  "/thoughts/:thoughtId/reactions/:reactionId",
  thoughtController.removeReaction
);

module.exports = router;

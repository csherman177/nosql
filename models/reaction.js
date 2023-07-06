const mongoose = require("mongoose");

//creates reaction subdocument
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (timestamp) {
      return new Date(timestamp).toLocaleString();
    },
  },
});

const thoughtSchema = new mongoose.Schema({
  // does this pull from the thought column in user?

  reactions: [reactionSchema],
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizzSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quizzTitle: {
      type: String,
      maxLength: 50,
      required: true,
    },
    inputPrompt: {
      type: String,
      required: true,
    },
    questionSets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionSet",
      },
    ],
  },
  { timestamps: true }
);

const Quizz = mongoose.model("Quizz", quizzSchema);

module.exports = Quizz;

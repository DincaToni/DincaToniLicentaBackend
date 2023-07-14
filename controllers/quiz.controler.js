let Quizz = require("../models/quizz.model");

const getQuizById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = await Quizz.findById(id).populate("questionSets");
    if (quiz) {
      res.status(200).json({
        _id: id,
        quizzTitle: quiz.quizzTitle,
        questionSets: quiz.questionSets,
      });
    } else {
      res.status(404);
      throw new Error("Test inexistent");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { getQuizById };

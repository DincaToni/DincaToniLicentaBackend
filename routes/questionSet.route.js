const router = require("express").Router();
let QuestionSet = require("../models/questionSet.model");

router.route("/")
.get(async (req, res, next) => {
  try {
    const questionSets = await QuestionSet.find();
    res.json(questionSets);
  } catch (error) {
    return next(error);
  }
});

router.route('/addQuestionSet')
.post(async (req, res, next) => {
    try {
      const {setName, isSetNameHidden, questionType, nrOfQuestions, isQuestionOrderRandomised} = req.body;
      const newQuestionSet = new QuestionSet({setName, isSetNameHidden, questionType, nrOfQuestions, isQuestionOrderRandomised});
      await newQuestionSet.save();

      res.send('Question added');

    } catch (error) {
       return next(error);
    }
})

module.exports = router;
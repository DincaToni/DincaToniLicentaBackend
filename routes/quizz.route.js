const router = require("express").Router();
//const {PythonShell} = require('python-shell');
const { spawn } = require("child_process");
let Quizz = require("../models/quizz.model");
let QuestionSet = require("../models/questionSet.model");
const { resolve } = require("path");
const { getQuizById } = require("../controllers/quiz.controler");

/*let options = {
    pythonPath: 'D:/Programs/Anaconda/envs/DincaToniLicenta-env/python.exe',
    scriptPath: `${__dirname}../../../DincaToniLicentaPyth`,
    args: []
}*/

router.route("/:uid").get(async (req, res, next) => {
  try {
    const { uid } = req.params;
    const quizz = await Quizz.find()
      .where("user")
      .equals(uid)
      .populate("questionSets");
    res.json(quizz);
  } catch (error) {
    return next(error);
  }
});

router.route("/addQuizz").post(async (req, res, next) => {
  try {
    const { user, quizzTitle, inputPrompt, questionSets } = req.body;
    const newQuizz = new Quizz({ user, quizzTitle, inputPrompt });
    //options.args.push(newQuizz.inputPrompt)
    await Promise.all(
      questionSets.map(async (set) => {
        let qs = new QuestionSet({
          setName: set.setName,
          isSetNameHidden: set.isSetNameHidden,
          questionType: set.questionType,
          nrOfQuestions: set.nrOfQuestions,
          isQuestionOrderRandomised: set.isQuestionOrderRandomised,
        });
        /*options.args[1] = qs.questionType;
            options.args[2] = qs.nrOfQuestions;
            console.log(options)
            await PythonShell.run('main.py', options, (err, res) => {
                if(err) console.log(err);
                if(res) {
                    console.log("e res");
                    console.log(res);
                    qs.questions.push(res);
                }
            })*/
        console.log("test: " + qs.questionType);
        const childPython = spawn(
          "D:/Programs/Anaconda/envs/DincaToniLicenta-env/python.exe",
          [
            `${__dirname}../../../DincaToniLicentaPyth/main.py`,
            newQuizz.inputPrompt,
            qs.questionType,
            qs.nrOfQuestions,
          ]
        );
        await new Promise((resolve) => {
          childPython.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
            const modifyData = data.toString().substring(2, data.length - 4);
            const questions = modifyData.split("', '");
            qs.questions.push(...questions);
          });
          childPython.stderr.on("data", (data) => {
            console.log(`stderr: ${data}`);
          });
          childPython.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
            resolve(code);
          });
          console.log("almost exited python file");
        });
        console.log("exited python file");
        await qs.save();
        newQuizz.questionSets.push(qs);
      })
    );
    await newQuizz.save();
    res.send("Quizz added");
  } catch (error) {
    return next(error);
  }
});

router.route("/quiz/:id").get(getQuizById);

module.exports = router;

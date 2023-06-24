const router = require("express").Router();
let Quizz = require('../models/quizz.model');

router.route('/')
.get(async (req, res, next)=>{
    try {
        const quizz = await Quizz.find();
        res.json(quizz);
    } catch (error) {
        return next(error)
    }
});

router.route('/addQuizz')
.post(async (req, res, next) => {
    try {
        const {quizzTitle, inputPrompt} = req.body;
        const newQuizz = new Quizz({quizzTitle, inputPrompt});
        newQuizz.creationDate = Date.now();
        await newQuizz.save();
        res.send('Quizz added');
    } catch (error) {
        return next(error);
    }
})

module.exports = router;
const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const quizzSchema = new Schema({
    quizzTitle:{
        type: String,
        maxLength: 50,
        required: true
    },
    inputPrompt:{
        type: String,
        required: true
    },
    creationDate:{
        type: Date,
        required: true
    },
    questionSets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'QuestionSet'
    }],

})

const Quizz = mongoose.model('Quizz', quizzSchema);

module.exports = Quizz;
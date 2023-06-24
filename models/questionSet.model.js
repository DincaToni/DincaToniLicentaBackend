const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSetSchema = new Schema({
    setName:{
        type: String,
        required: true
    },
    isSetNameHidden:{
        type: Boolean,
        required: true
    },
    questionType:{
        type: String,
        enum: ['Grilă', 'Advărat/Fals', 'Întrebare Liberă', 'Completează spațiul liber'],
        required: true
    },
    nrOfQuestions:{
        type: Number,
        required: [true,'Specificați numarul de întrebări']
    },
    isQuestionOrderRandomised:{
        type: Boolean,
        required: true
    },
    questions:{
        type: [String]
    }
});

const QuestionSet = mongoose.model('QuestionSet', questionSetSchema);

module.exports = QuestionSet;
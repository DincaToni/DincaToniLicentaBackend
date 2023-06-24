const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.URI; 

mongoose.connect(uri,{useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection establised via mongoose");
})


const quizzRouter = require('./routes/quizz.route');
const questionSetRouter = require('./routes/questionSet.route');

app.use('/quizzes', quizzRouter);
app.use('/questionSets', questionSetRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
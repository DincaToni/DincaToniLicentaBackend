const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const quizzRouter = require('./routes/quizz.route');
const questionSetRouter = require('./routes/questionSet.route');
const userRouter = require('./routes/user.route');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const uri = process.env.URI; 

mongoose.connect(uri,{useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection establised via mongoose");
})



app.use('/api/quizzes', quizzRouter);
app.use('/api/questionSets', questionSetRouter);
app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
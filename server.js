// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { getQuestions } = require('./questionService');
const { generateQuestionPaper } = require('./questionPaperGenerator');

const app = express();
app.use(bodyParser.json());

app.post('/generate-question-paper', (req, res) => {
  const { totalMarks, difficultyDistribution } = req.body;

  if (!totalMarks || !difficultyDistribution) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const questions = getQuestions();
  const questionPaper = generateQuestionPaper(questions, totalMarks, difficultyDistribution);

  res.json({ questionPaper });
});

module.exports = app;

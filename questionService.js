// questionService.js
const fs = require('fs');

const getQuestions = () => {
  const rawData = fs.readFileSync('./questionBank.json');
  const questionsData = JSON.parse(rawData);
  return questionsData;
};

module.exports = { getQuestions };

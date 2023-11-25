// questionPaperGenerator.js

let leftMarks = 0;
const generateQuestionPaper = (questions, totalMarks, difficultyDistribution) => {
    // Validate input
    if (!questions || !totalMarks || !difficultyDistribution) {
      throw new Error('Invalid input parameters');
    }
  
    const questionPaper = [];
    const marksDistribution = calculateMarksDistribution(totalMarks, difficultyDistribution);
    // console.log("marksDistribution"+marksDistribution.easy);
    // console.log("marksDistribution"+marksDistribution.medium);
    // console.log("marksDistribution"+marksDistribution.hard);
  
    // Filter questions based on difficulty and topic
    const easyQuestions = filterQuestions(questions, 'Easy');
    const mediumQuestions = filterQuestions(questions, 'Medium');
    const hardQuestions = filterQuestions(questions, 'Hard');
    // console.log("easyQuestions");
    // easyQuestions.forEach((question, index) => {
    //     console.log(`Question ${index + 1}:`, question);
    //   });
    // console.log("mediumQuestions"+mediumQuestions);
    // console.log("hardQuestions"+hardQuestions);
  
    // Randomly select questions based on the distribution
    questionPaper.push(...selectRandomQuestions(easyQuestions, marksDistribution.easy));
    questionPaper.push(...selectRandomQuestions(mediumQuestions, marksDistribution.medium));
    questionPaper.push(...selectRandomQuestions(hardQuestions, marksDistribution.hard));
    // console.log(leftMarks);
    if(leftMarks>0){
        let compensationQn = questions.find(question => question.marks === leftMarks);
        if(!compensationQn){
            let dif = totalMarks-leftMarks;
            console.log("Question paper can not be designed with the desired total marks, no combination of such qns exist");
            console.log("The returned question paper contains only of marks "+dif);
        }
        else{
            questionPaper.push(compensationQn);
            
        }
    }
    leftMarks = 0;
  
    return questionPaper;
  };
  
  const calculateMarksDistribution = (totalMarks, difficultyDistribution) => {
    const easyMarks = Math.round(totalMarks * difficultyDistribution.easy);
    const mediumMarks = Math.round(totalMarks * difficultyDistribution.medium);
    const hardMarks = totalMarks - easyMarks - mediumMarks;
  
    return { easy: easyMarks, medium: mediumMarks, hard: hardMarks };
  };
  
  const filterQuestions = (questions, difficulty) => {
    return questions.filter(question => question.difficulty === difficulty);
  };
  
  const selectRandomQuestions = (questions, totalSectionalMarks) => {
    const shuffledQuestions = shuffleArray(questions);
    let filteredQuestions = shuffledQuestions;

    const n = filteredQuestions.length;
    const dp = Array.from({ length: n + 1 }, () =>
        Array(totalSectionalMarks + 1).fill(0)
    );

    for (let i = 1; i <= n; i++) {
        const currentQuestion = filteredQuestions[i - 1];
        const { marks } = currentQuestion;

        for (let j = 0; j <= totalSectionalMarks; j++) {
            if (parseInt(marks) > j) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = Math.max(
                dp[i - 1][j],
                dp[i - 1][j - parseInt(marks)] + parseInt(marks)
                );
            }
        }
    }

    let j = totalSectionalMarks;
    let totalMarksGenerated = 0;
    let selectedQuestions = [];

    for (let i = n; i > 0 && j > 0; i--) {
        if (dp[i][j] !== dp[i - 1][j]) {
            const selectedQuestion = filteredQuestions[i - 1];
            selectedQuestions.push(selectedQuestion);
            totalMarksGenerated += selectedQuestion.marks;
            j -= selectedQuestion.marks;
        }
    }

    if (totalMarksGenerated < totalSectionalMarks) {
        leftMarks+=(totalSectionalMarks - totalMarksGenerated);
    }

    return selectedQuestions;  
  };
  
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  
  module.exports = { generateQuestionPaper };
  
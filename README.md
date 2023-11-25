# Reelo Assignment - Question Paper Generator

## Problem Statement

### Design and implement a Question Paper Generator application
- The application must store a number of questions in a Question Store.
- A question can have the following attributes {question, subject, topic, difficulty, marks}.
- Sample question: ```{"What is the speed of light", "Physics", "Waves", "Easy", 5}```
- The Question paper Generator should look for questions in the Question Store and then generate the question paper based on the total marks and the distribution of marks based on *Difficulty*.

### **Example**
Assume the below requirement for a question paper:
```(100 marks, Difficulty, {20% Easy, 50% Medium, 30% Hard })```
- The problem statement here is that we need to generate a question paper of 100 marks total of which 20% (ie, 20 marks) worth of questions should have the ```Difficulty=Easy```, 50% having ```Difficulty=Medium``` and 30% having ```Difficulty=Hard```.

## Steps to run the program:
- Clone the repository in a folder locally.
- Open the folder in an IDE.
- Open the terminal and go to the respective folder directory using ``cd``` command
- Run ```npm install``` in the terminal.
- After installing the node modules, run the program using, ```npm start```.
- The server will be live on port ```3000```.

## Steps to test the API
- Open postman and hit the post request for the url ```http://localhost:3000/generate-question-paper```.
- In the body section, choose ```raw``` option and change the type to ```JSON```.
- Enter the specifications required for the question paper in the following format:
     ```
     {
         "totalMarks": 100,
         "difficultyDistribution": { "easy": 0.22, "medium": 0.54, "hard": 0.24 }
     }
- Hit the send button in the postman.
- An array of questions with the given specifications will be returned.

## Assumptions
- Assumed that the easy qn has marks from 1 to 5, medium qn has marks from 6 to 10 and hard questions has marks from 11 to 20.
- Assumed that there is sufficient number of questions to meet the criteria of total marks.
- Assumed that if questions of any difficulty level was not able to satisfy the toatal marks needed for that particular section, then assigned the left marks to the easy difficulty question.
- For example, question paper should contain these specifications:
```
   {
        "totalMarks": 100,
        "difficultyDistribution": { "easy": 0.22, "medium": 0.54, "hard": 0.24 }
   }
```
- In the question bank, there was no possible way to generate questions that sum up to 24 marks, so the left marks was assigned to the easy difficulty question.



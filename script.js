const startMenu = document.getElementById('start-menu');
const startButton = document.getElementById('start-button');
const quizSection = document.getElementById('quiz');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const answerSection = document.getElementById('answers');
const result = document.getElementById('result');
const button1 = document.getElementById('1');
const button2 = document.getElementById('2');
const button3 = document.getElementById('3');
const button4 = document.getElementById('4');
const results = document.getElementById('results');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById("timer");
const timeLeftElement = document.getElementById("time-left");



var score = 0;
var timeLeft = 60;
var timerInterval;


const questions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: ["var", "int", "string", "declare"],
        correct: 0,
    },
    {
        question: "What does \"DOM\" stand for in JavaScript?",
        answers: ["Document Object Model", "Data Object Model", "Document Order Model", "Dynamic Object Model"],
        correct: 0,
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        answers: ["Number", "Boolean", "Character", "Object"],
        correct: 2,
    },
    {
        question: "Which symbol is used for strict equality comparison in JavaScript?",
        answers: ["==", "===", " ==", "!=="],
        correct: 1,
    }
];

loadData();
var currentQuestion = 0



function startQuiz() {
    startMenu.style.display = 'none';
    quizSection.style.display = 'block';
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    if (currentQuestion == questions.length) {
        endQuiz();
    }
    else {
        questionNumber.textContent = currentQuestion + 1;
        questionText.textContent = questions[currentQuestion].question;
        button1.textContent = questions[currentQuestion].answers[0];
        button2.textContent = questions[currentQuestion].answers[1];
        button3.textContent = questions[currentQuestion].answers[2];
        button4.textContent = questions[currentQuestion].answers[3];
    }
}

function checkAnswer(selectedAnswerIndex) {
    if (selectedAnswerIndex == questions[currentQuestion].correct) {
        result.textContent = 'Correct!';
        score += 1;
    }
    else {
        result.textContent = 'Incorrect!';
        timeLeft -= 5;
    }
    currentQuestion += 1;
    loadQuestion();
}

function endQuiz() {
    quizSection.style.display = 'none';
    results.style.display = 'block';
    scoreElement.textContent = score;
}


function startTimer() {
    timerInterval = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        } else {
            timeLeftElement.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);
}

function saveData() {
    const username = document.getElementById("username").value;

    localStorage.setItem("username", username);
    localStorage.setItem("score", score);
    loadData();
}

function loadData() {
    const username = localStorage.getItem("username");
    const score = localStorage.getItem("score");

    if (username && score) {
        document.getElementById("displayData").innerHTML = `Username: ${ username }, Score: ${ score }`;
    } else {
        document.getElementById("displayData").innerHTML = "Data not found in local storage.";
    }
}

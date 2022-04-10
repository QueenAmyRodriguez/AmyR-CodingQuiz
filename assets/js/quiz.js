// access html through id
var startButtonEL = document.querySelector('#startQuiz')
var titleEL = document.querySelector("#title");
var pageContentEL = document.querySelector("#page-content");
var quizContainerEL = document.querySelector("#quizContainer");
var questionIdCounter = 0;

var highsores = [];

// quiz questions and answers in array
var questions = [
    { //index 0 objectpropertis
        question: 'Inside which HTML element do we put the JavaScript?',
        answer1: '<script>',
        answer2: '<javascript>',
        answer3: '<scripting>',
        answer4: '<js>',
        correctAnswer: 'answer1'
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        answer1: 'The <head> section',
        answer2: 'Both the <head> section and the <body> section are correct',
        answer3: 'The <body> section',
        answer4: 'After the <html> tag',
        correctAnswer: 'answer2'
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answer1: '<script name="xxx.js">',
        answer2: '<script src="xxx.js">',
        answer3: '<script href="xxx.js"?',
        answer4: '<script id="xxx.js">',
        correctAnswer: 'answer2'
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        answer1: '*',
        answer2: '=',
        answer3: '+',
        answer4: '-',
        correctAnswer: 'answer2'
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answer1: 'msgBox("Hello World");',
        answer2: 'alertBox("Hello World");',
        answer3: 'alert("Hello World");',
        answer4: 'msg("Hello World");',
        correctAnswer: 'answer3'
    }
];

// create function to replace html with quiz questions
function startQuiz() {
    console.log("click");

    titleEL.textContent = "";
    displayQuestions();

};

// display questions
function displayQuestions() {
    console.log(questions);
    quizContainerEL.textContent = "";

    var questionAnswerDiv = document.createElement('div');
    questionAnswerDiv.className = 'container';

    var questionEL = document.createElement('h2');
    questionEL.textContent = questions[questionIdCounter].question;
    questionAnswerDiv.appendChild(questionEL);

    var answer1 = document.createElement('button');
    answer1.className = 'btn answer';
    answer1.textContent = questions[questionIdCounter].answer1;
    answer1.setAttribute("value", "answer1")
    questionAnswerDiv.appendChild(answer1);

    var answer2 = document.createElement('button');
    answer2.className = 'btn answer';
    answer2.textContent = questions[questionIdCounter].answer2;
    answer2.setAttribute("value", "answer2")
    questionAnswerDiv.appendChild(answer2);

    var answer3 = document.createElement('button');
    answer3.className = 'btn answer';
    answer3.textContent = questions[questionIdCounter].answer3;
    answer3.setAttribute("value", "answer3")
    questionAnswerDiv.appendChild(answer3);

    var answer4 = document.createElement('button');
    answer4.className = 'btn answer';
    answer4.textContent = questions[questionIdCounter].answer4;
    answer4.setAttribute("value", "answer4")
    questionAnswerDiv.appendChild(answer4);

    quizContainerEL.appendChild(questionAnswerDiv);

    var questionAnswerDivEL = document.querySelector('.container');

    questionAnswerDivEL.addEventListener("click", checkAnswers);
};

// check answers

function checkAnswers(event) {
    var answerEL = event.target;
    answerSelected = answerEL.getAttribute("value");
    var lineEL = document.createElement("hr");
    var answerText = document.createElement("h3");
    console.log(answerEL);
    console.log(answerSelected);

    // check for correct answer
    if (answerSelected === questions[questionIdCounter].correctAnswer) {
        questionIdCounter = questionIdCounter + 1;
        answerText.textContent = "Correct!";

    } else {
        questionIdCounter = questionIdCounter + 1;
        answerText.textContent = "Wrong!";

    }


    // check if there are more questions and display next questions
    if (questionIdCounter < questions.length) {
        displayQuestions();
    }
    else {
        quizContainerEL.textContent = "";
    }

    quizContainerEL.appendChild(lineEL);
    quizContainerEL.appendChild(answerText);

};



startButtonEL.addEventListener('click', startQuiz);
// access html through id
var highScoresEL = document.querySelector("#viewHighScores")
var timerEL = document.querySelector('#time-left');
var startButtonEL = document.querySelector('#startQuiz');
var quizContainerEL = document.querySelector("#quizContainer");
var questionIdCounter = 0;
var counter = 60;

var highscores = [];

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

// create function to start timer once start quiz button is clicked
function startQuiz() {
    // function to start timer
    function timer() {
        counter--;
        timerEL.textContent = counter;
        if (counter <= 0) {
            console.log(counter);
            timerEL.textContent = 0;
            clearInterval(startTimer);
            endQuiz();
        }
        else if (questionIdCounter >= questions.length) {
            console.log(counter);
            clearInterval(startTimer);
            endQuiz();
        }
    }

    var startTimer = setInterval(timer, 1000);

    displayQuestions();

};

// function to display the quiz questions
function displayQuestions() {
    console.log(questions);
    quizContainerEL.textContent = "";

    // creates a container to hold the questions
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

    // appends questionAnswer container to quiz contatiner Div
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

    // check that only button was clicked
    if (answerEL.matches(".btn")) {
        // check for correct answer
        if (answerSelected === questions[questionIdCounter].correctAnswer) {
            questionIdCounter = questionIdCounter + 1;
            answerText.textContent = "Correct!";

        } else {
            counter = counter - 5;
            questionIdCounter = questionIdCounter + 1;
            answerText.textContent = "Wrong!";

        }
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

function endQuiz() {
    var newHighscore = timerEL.textContent;
    var highscoresContainer = document.createElement("div");
    var completedQuiz = document.createElement("h2");
    var scoreText = document.createElement("p");

    // check if score = 0
    if (newHighscore === "0") {
        completedQuiz.textContent = "Game over! Timer ran out!";

        var startOverButton = document.createElement("button");
        startOverButton.textContent = "Try Again";
        startOverButton.className = "btn start-over";

        highscoresContainer.appendChild(startOverButton);
        startOverButton.addEventListener("click", restartQuiz);
    } else {
        completedQuiz.textContent = "All Done!"
        scoreText.textContent = "Your final score is " + newHighscore;

        var highScoreForm = document.createElement("form");
        var inputLabel = document.createElement("label");
        inputLabel.for = "addHighscore";
        inputLabel.textContent = "Enter your Initials";

        var inputScore = document.createElement("input");
        inputScore.type = "text";
        inputScore.id = "addNewScore";
        inputScore.name = "addHighScore";

        var addScoreButton = document.createElement("button");
        addScoreButton.textContent = "Add Score";
        addScoreButton.className = "btn";
        addScoreButton.id = "addScoreButton";

        highScoreForm.appendChild(inputLabel);
        highScoreForm.appendChild(inputScore);
        highScoreForm.appendChild(addScoreButton);
        highscoresContainer.appendChild(highScoreForm);
    }

    highscoresContainer.appendChild(completedQuiz);
    highscoresContainer.appendChild(scoreText);
    highscoresContainer.addEventListener("submit", addScoreFormHandler);
    quizContainerEL.appendChild(highscoresContainer);
}


function addScoreFormHandler(event) {
    event.preventDefault();
    console.log("clicked");
    score = timerEL.textContent;

    var scoreInitials = document.querySelector("input[name='addHighScore']").value;
    console.log(scoreInitials);
    var addHighScores = {
        initials: scoreInitials,
        highscore: score
    }
    highscores.push(addHighScores);
    console.log(highscores);
    saveScores();

    // show saved scores
    displayScores();
};

function saveScores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function loadScore() {
    var loadHighScores = localStorage.getItem("highscores");
    if (!loadHighScores) {
        return false
    }
    loadHighScores = JSON.parse(loadHighScores);

    for (i = 0; i < loadHighScores.length; i++) {
        highscores.push(loadHighScores[i]);
    }
}

function displayScores() {
    quizContainerEL.textContent = "";

    var displayScoresContainer = document.createElement("div");
    var viewHighScore = document.createElement("h2");
    viewHighScore.textContent = "High Scores";
    displayScoresContainer.appendChild(viewHighScore);

    var listScores = document.createElement("ol");

    // loop to display scores
    for (i = 0; i < highscores.length; i++) {
        var eachScore = document.createElement("li");
        eachScore.textContent = highscores[i].initials + " - " + highscores[i].highscore;
        listScores.appendChild(eachScore);
    }

    var startOverButton = document.createElement("button");
    startOverButton.textContent = "Try Again";
    startOverButton.className = "btn start-over";

    var clearButton = document.createElement("button");
    clearButton.textContent = "Clear High Score";
    clearButton.className = "btn";

    displayScoresContainer.appendChild(listScores);
    displayScoresContainer.appendChild(startOverButton);
    displayScoresContainer.appendChild(clearButton);
    quizContainerEL.appendChild(displayScoresContainer);

    startOverButton.addEventListener("click", restartQuiz);
    clearButton.addEventListener("click", clearScores);

}


// refreshes page to restart quiz
function restartQuiz() {
    location.reload();
}
// view high scores directly
function viewScore(event) {
    event.preventDefault();
    displayScores();
}
// clears local storage
function clearScores() {
    localStorage.clear("quizScore");
    alert("High Score cleared");
    restartQuiz();
}

// load scores on page load
loadScore();

// event listener on start button quiz and to viewscores link
startButtonEL.addEventListener("click", startQuiz);
highScoresEL.addEventListener("click", viewScore);


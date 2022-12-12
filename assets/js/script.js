//selector variables
let time = document.querySelector(".time");
let questionElement = document.querySelector(".questions");
let options = document.querySelector(".multiple-choice");
let optionButton = document.querySelector(".option");
let confirmation = document.querySelector(".confirmation");
let initialEntry = document.querySelector(".inputfield");

//button selectors
let startButton = document.querySelector(".start-quiz");
let submitButton = document.querySelector(".submit");
let highscoreButton = document.querySelector(".highscore");
let scoreboardBackButton = document.querySelector(".back");
let scoreboardClear = document.querySelector(".clear");

//menu selectors
let startMenu = document.querySelector(".start-menu");
let block = document.querySelector(".block");
let gameOver = document.querySelector(".gameover");
let scoreBoard = document.querySelector(".scoreboard");
let playerRecords = document.querySelector(".playerNames");

let questionOrder, questionIndex, playerScore;
let timeleft = 100;

//array to store player scores
let localStorageArray = Object.keys(localStorage).sort((a,b) => {
    return (localStorage[b] - localStorage[a]);
})

// console.log(localStorageArray);=
// console.log(localStorage);
// console.log(localStorage.key);
// console.log(localStorage.getItem);




startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);
highscoreButton.addEventListener("click", showScores);
scoreboardBackButton.addEventListener("click", goBack);
scoreboardClear.addEventListener("click", deleteRecords);



//start button functionality to start quiz
function startQuiz() {
    //display question and hide start menu
    startMenu.classList.add("hide");
    highscoreButton.classList.add("hide");
    block.classList.remove("hide");

    playerScore = 0;
    //countdown timer 
    timeleft = 100;
    time.textContent = timeleft;

    let timeInterval = setInterval(function () {
        timeleft--;
        time.textContent = timeleft;

        if(timeleft <= 0) {
            endGame();
            clearInterval(timeInterval);
        }
    }, 1000);

    //sort the question array to prevent static list
    questionOrder = questionList.sort(() => Math.random() - 0.5);
    questionIndex = 0;
    startingQuestion();
    console.log(questionOrder);
    console.log(questionIndex);
}

function startingQuestion() {
    displayQuestion(questionOrder[questionIndex]);
}

function nextQuestion() {
    deleteOld();
    displayQuestion(questionOrder[questionIndex]);
}

function deleteOld (){
    while (options.firstChild) {
        console.log(options);
        console.log(playerRecords + "this is records");
        options.removeChild(options.lastElementChild);
    }
}

//go into given array and pull out the text for question and answers and fill into proper fields
function displayQuestion(array) {
    //set the question
    questionElement.textContent = array.question;

    //set answers and generate a new button per answer inside array
    array.answers.forEach((answer,index) => {
        const button = document.createElement("button");
        button.innerText = answer.answer;
        button.classList.add("option");
        //for the answer that has the correct = true in array, give a dataset property to identify
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", chosenAnswer);
        options.appendChild(button);
    })
}

//function added to each new button/answer generated for each question
function chosenAnswer(event) {
    console.log(event)
    if (event.target.dataset.correct == "true") {
        playerScore += 1;
        questionIndex++;
        //if answer chosen is correct
        //if no more question in list then end game
        if ((questionIndex+1) > questionOrder.length) {
            endGame();
        //if there are still questions next question
        }else {
            nextQuestion();
            confirmation.textContent = "Correct";
        }
    // if answer chosen is incorrect
    } else {
        console.log(questionIndex + " incorrect");
        timeleft-=10;
        questionIndex++;
        //if no more question in list then end game
        if ((questionIndex+1) > questionOrder.length) {
            console.log("incorrect >");
            endGame();
        //if there are still questions next question
        } else {
            console.log("incorrect else");
            nextQuestion();
            confirmation.textContent = "Incorrect";
        }
    }
}

//function to end the questions and move to intitial screen
function endGame(){
    deleteOld();
    block.classList.add("hide");
    gameOver.classList.remove("hide");
    console.log("endgame run");
    timeleft = 0;
    time.textContent = "Time is Up";

}

//function for click event when submitting name
function submitScore() {
    gameOver.classList.add("hide");
    startMenu.classList.remove("hide");
    highscoreButton.classList.remove("hide");
    //save highest score for each name inputted
    if (localStorage.hasOwnProperty(initialEntry.value) == true) {
        if (localStorage.getItem(initialEntry.value) > playerScore){
            return;
        } else {
            localStorage.setItem(initialEntry.value, playerScore);
        }
    } else {
        localStorage.setItem(initialEntry.value, playerScore);
    }
    
    localStorageArray = Object.keys(localStorage).sort((a,b) => {
        return (localStorage[b] - localStorage[a]);
    })
    console.log(localStorageArray);
    initialEntry.value = "";
    time.textContent = "Timer";
}

function showScores() {
    startMenu.classList.add("hide");
    time.classList.add("hide");
    highscoreButton.classList.add("hide");
    scoreBoard.classList.remove("hide");
    
    // for (let i = 0; i < localStorageArray.length; i++) {
    //     playerRecords.removeChild(playerRecords.querySelector(".records"));
    // }
    // deleteRecords();

    // playerRecords.removeChild(playerRecords.querySelector(".records"));

    for (i in localStorageArray) {
        //variable to print ranking number
        let recordNum = i;
        recordNum ++;
        const record =  document.createElement("div");
        // console.log(record);
        record.classList.add("records");
        record.textContent = (recordNum + ". " + localStorageArray[i] + " (" + localStorage.getItem(localStorageArray[i]) + ")")
        // console.log("First key: " + localStorageArray[i] + " and value: " + localStorage.getItem(localStorageArray[i]));
        playerRecords.appendChild(record);
    }
}

function goBack() {
    scoreBoard.classList.add("hide");
    startMenu.classList.remove("hide");
    time.classList.remove("hide");
    highscoreButton.classList.remove("hide");
}

function deleteRecords() {
    localStorage.clear();
}


//array of questions
const questionList = [
    {
        question: "What is HTML?",
        answers: [
            {answer: "HTML describes the structure of a webpage", correct: false},
            {answer: "HTML is the standard markup language mainly used to create web pages", correct: false},
            {answer: "HTML consists of a set of elements that helps the browser how to view the content", correct: false},
            {answer: "All of the mentioned", correct: true},
        ] 
    },
    {
        question: "HTML stands for __________",
        answers: [
            {answer: "HyperText Markup Language", correct: true},
            {answer: "HyperText Machine Language", correct: false},
            {answer: "HyperText Marking Language", correct: false},
            {answer: "HighText Marking Language", correct: false},
        ] 
    },
    {
        question: "What is the correct syntax of doctype in HTML5?",
        answers: [
            {answer: "</doctype html>", correct: false},
            {answer: "<doctype html>", correct: false},
            {answer: "<doctype html!>", correct: false},
            {answer: "<!doctype html>", correct: true},
        ] 
    },
    {
        question: "What is DOM in HTML?",
        answers: [
            {answer: "Language dependent application programming", correct: false},
            {answer: "Hierarchy of objects in ASP.NET", correct: false},
            {answer: "Application programming interface", correct: false},
            {answer: "Convention for representing and interacting with objects in html documents", correct: true},
        ] 
    },
    {
        question: "HTML stands for __________",
        answers: [
            {answer: "4", correct: false},
            {answer: "5", correct: false},
            {answer: "6", correct: true},
            {answer: "7", correct: false},
        ] 
    },
]


// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    runGame("addition");
});

/**
 * The main game loop
 */
function runGame(gameType) {
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);

    }
     else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks the user's answer
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let result = calculateCorrectAnswer();

    if (Number.isNaN(userAnswer)) {
        alert("Please enter a number!");
        return;
    }

    if (userAnswer === result.answer) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(
            `Awwww.... you answered ${userAnswer}. The correct answer was ${result.answer}!`
        );
        incrementWrongAnswer();
    }

    runGame(result.gameType);
}

/**
 * Calculates and returns the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return {
            answer: operand1 + operand2,
            gameType: "addition",
        };
    } else if (operator === "×") {
        return {
            answer: (operand1 * operand2),
            gameType: "multiply",
        };
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

function incrementScore() {
    // implement score logic
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

    if (isCorrect) {
        alert("Hey! You got it right! :D"); 
        incrementScore();
    } else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${correctAnswer}!`);
        incrementWrongAnswer();
    }

}

function incrementWrongAnswer() {
    // TODO: implement wrong answer logic
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion() {}

function displayMultiplyQuestion(operand1,operand2) {
      document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "×";
}
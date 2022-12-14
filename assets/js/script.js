document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");
    
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");

})

/**
 * The main game "loop" called when the script is first loaded
 * and after the user´s answer has been processed
 */

function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

/**
 * Creates twp random numbers between 1 and 25
 */
    let num1 = Math.floor(Math.random()*25) + 1;
    let num2 = Math.floor(Math.random()*25) + 1;
    
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        dispalyDivisionAnswer((num1 * num2) , num2);

    } else {
        alert(`Unknown game type: ${gameType}`)
        throw `Unknown game type: ${gameType}. Aborting`;
    }

}



function checkAnswer() {
    let userAnswer =parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Yey! You got it right!")
        incrementScore();
    } else {
        alert(`Awwww... You answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") { 
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") { 
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") { 
        return [operand1 / operand2, "division"];
    } else {
        alert(`unimplemented operator ${operator}`)
        throw `unimplemented operator ${operator}, Aborting!`;
    }
}

/**
 * Get the current score an add it by one
 */

function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

/**
 * Get the current incorrectAnswer and add it by one
 */

function incrementWrongAnswer() {
    
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
    
}

function displayAdditionQuestion(operand1, operand2) {
    
    document.getElementById('operand1').textContent = operand1
    document.getElementById('operand2').textContent = operand2
    document.getElementById('operator').textContent = "+"
}

function displaySubtractQuestion (operand1, operand2){
    
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2; 
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-" 
}

function displayMultiplyQuestion (operand1, operand2){

    document.getElementById('operand1').textContent = operand1
    document.getElementById('operand2').textContent = operand2
    document.getElementById('operator').textContent = "x"
}

function dispalyDivisionAnswer(operand1, operand2) {
    
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2; 
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "/" 
}
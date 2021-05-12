/*
GAME FUNCTION:
-Player must guess a number between a  min and max
-Player gets a certain amount of guesses
-Notify player of guesses remaining
-Notify player of corect guesses if looses
-Lets player choose to play agin 
*/

//Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener("mousedown", function () {
  if ((e.target.className = "play-again")) {
    window.location.reload();
  }
  //we use mousedown instead of click bcs when we click on the play-again and move our finger up it will automatically click the submit button and NaN will be executed outomatically.
  //whenever we add a new class dynamically in the page, we have to select the parent and than target on the element and than add the event to it.( deligation )
  //window object ka child location
  //and location ke pas reload fun hai
});

//Listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);
  //Validate
  if (isNaN(guess) || guess < min || guess > max) {
    console.log(`Please enter a number between ${min} and ${max}`);
    setMessage(`Please enter a number between ${min} and ${max}`);
  }

  //Check if won
  if (guess === winningNum) {
    //game over -win
    gameOver(true, `${winningNum} is correct, YOU WON !`);
  } else {
    //wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      //Game over -lost
      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNum}`
      );
    } else {
      //Game continues -answer wrong
      //change border color
      guessInput.style.borderColor = "red";
      //Clear input
      guessInput.value = "";
      //Set message
      setMessage(`${guess} is not correct,${guessesLeft} guesses left `, "red");
    }
  }
});
//isNaN checks whether guess is not a number or not , returns true if guess is not a number  or blank

//game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  //Disable input
  guessInput.disable = true; //it will disable the input
  //Change border color
  guessInput.style.borderColor = color;
  //set message
  setMessage(msg, color);

  //Play Again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
  //by doing += we can add more classes
}

//Get winning number
function getRandomNum(min, max) {
  console.log(Math.floor(Math.random() * (max - min + 1) + min));

  //In js we dont need to declare the function and body , before calling the function.
  //We can call the function before even declaring it, that is the behaviour of js
}

//Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

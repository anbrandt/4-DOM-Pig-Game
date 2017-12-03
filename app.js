/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//DOM - document object model - struktura html'owa strony, do której mamy dostęp z poziomu JS i którą możemy manipulować
//way to generate a random number between 1 and 5 - Math.floor(Math.random() * 6) + 1
var scores, activePlayer, roundScore;
initializeTheGame();

//function that is called when button roll the dice is clicked. addEventListener takes two parameters - one is the action that is demanded for the second param
//parameter to be called - and we call anonymous function - this one only works within this eventlistener.
document.querySelector(".btn-roll").addEventListener("click", function() {

    //1 - generate random number
    var dice = Math.floor(Math.random() * 6 ) + 1;

    console.log(dice);
    //2 - display the result using the images of the dice (dice -1 to 6)
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block"; //change the display to block, which basically makes an element visible
    diceDOM.src = "dice-" + dice + ".png";

    //3 - update the round score
    if(dice !== 1) {
        //add the score - update the score-0 or score-1
        roundScore += dice;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
        //change player
        changePlayer();

    }

    });


document.querySelector(".btn-hold").addEventListener("click", function () {
   //add current score to the global score
    scores[activePlayer] += roundScore;

    //update the user interface - the current player global score
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    //veryfiy if the player won
    scores[activePlayer] >= 100 ?
        (document.getElementById("name-" + activePlayer).textContent = "winner",
            document.querySelector(".dice").style.display = "none",
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner"),
                document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active")
        ) : ( changePlayer());

});


document.querySelector(".btn-new").addEventListener("click", initializeTheGame);

function initializeTheGame() {

    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
// dice = Math.floor(Math.random() * 6) + 1; //dice variable has to between 1 and 5
// console.log(dice);

//assigning query element (defined by id in index.html) to dice variable
// document.querySelector("#current-" + activePlayer).textContent = dice;

// var globalScore = document.querySelector("#score-0").textContent;

    document.querySelector(".dice").style.display = "none"; //hide the dice before the game start s

//select the starting score to 0
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
};

function changePlayer() {
    //change player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    //change the class when player hits 1 - effectively change the player
    //first remove the class from the active player
    document.querySelector(".player-0-panel").classList.toggle("active");
    //and then add it to the other player
    document.querySelector(".player-1-panel").classList.toggle("active");

    //finally - hide thie dice when the player changes
    document.querySelector(".dice").style.display = "none";
};


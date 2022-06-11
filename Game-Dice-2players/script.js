'use strict';
// selecting scores elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
//selecting 3 buttons
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
//selecting Current scores elements
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.querySelector('#current--1');
//selecting dice element (dice image)
const diceEl = document.querySelector('.dice');
//selecting players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

//comment..

const init = function () {
    //starting conditions
    score0El.textContent = 0;
    score1El.textContent = 0;
    //hiding the dice element
    diceEl.classList.add('hidden');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;


    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

//this will load when we click reload button
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

}

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    //generating a random dice roll
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        //display dice roll
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`     //diceEl is selecing the element of dice class and change the src of the element

        //Check for rolled 1: if true, switch player | 
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            //switch player
            switchPlayer();

        }
    }
});

//holding button functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        //add current score to  active player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //(score>=100) if yes --> player wins
        if (scores[activePlayer] >= 100) {
            //Finish game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player-active');
            diceEl.classList.add('hidden');
        } else {
            //no --> switch player
            switchPlayer();
        }
    }
});

//new game functionality
btnNew.addEventListener('click', init);
/***
 * 
 * 2023/03 - Mathieu Dellon
 * Dicee Game - JS Script v0.1
 *
 ***/





/** CONFIG **/
const cfg = {
    "ROOT": "/",
    "IMG_FOLDER": "images" 
};

document.querySelector("h1#start").addEventListener("click", play);


/** play
 * 
 * @param {*}
 * @returns false
 */
function play() {
    var 
        i, j = 1, t,        // counters and timeout
        numOfPlayers = document.querySelectorAll(".dice").length,
        h1 = document.querySelector("h1#start"), 
        winClass,           // .winner or .loser class
        win, winText, 
        len,
        scores = [];        // array of all the scores;

    // check argument if valid and/or set default value to 2 players
    numOfPlayers = (numOfPlayers && typeof(numOfPlayers) === "integer") ? numOfPlayers : 2;

    // reset winner and loser classes if not first roll
    document.querySelectorAll(".dice").forEach( (el) => { 
        el.classList.remove("winner"); 
        el.classList.remove("loser"); 
    } );

    // start animation
    t = setInterval(function() {        

        // ROLLING !! 
        h1.textContent = "Rolling!";

        // throw dice for each player
        for (i=1; i<=numOfPlayers; i++) {
            scores.push(throwDice(i));
        }
        j++;
        
        // stop animation
        if (j === 30) {
            clearInterval(t);

            // Display winner
            len = scores.length;
            win = whoWins(scores.slice(len-2, len));
            h1.textContent = (win === 0) ? "Draw!" : "Player " + win + " wins!";

            if (win !== 0) {
                for (i=1; i<=numOfPlayers; i++) {
                    winClass = (i === win) ? "winner" : "loser";
                    document.querySelector(".p" + i).classList.add(winClass);
                }
            }
        }
    }, 50);

    return false;
}


/*** throwDice
 * 
 * @param {*} player (int) number of the player currently playing
 * @returns score
 */
function throwDice(player) {
    var score = myRandom();
    
    return setImage(player, score);
}

/*** setImage
 * 
 * @param {*} player    (int) number of the player currently playing
 * @param {*} score     (int) score of the dice to display
 * @returns score
 */
function setImage(player, score) {
    var className, img;

    // chack if arguments are valid
    if (player && score) {
        if (typeof(player) === "number" && typeof(score) === "number") {
            className = "img" + player;
            img = cfg.IMG_FOLDER + "/dice" + score + ".png";

            // change image
            document.querySelector("." + className).setAttribute("src", img);  
        }
    }

    return score;
}



/*** myRandom()
 * 
 * @param {*} [sides]   // (int) optional, nb of sides of the dice
 * @returns score (int)
 */
function myRandom(sides) {
    var score;

    // check if argument is valid, if not set default value to 6
    sides = (!sides || typeof(sides) !== "number" ) ? 6 : sides;

    // creates a random integer
    score = Math.floor(Math.random()*(sides) + 1);

    return score;
}


function whoWins(scores) {
    var hiScore = [0, 0], i, draw;
    
    if (Array.isArray(scores)) {
        // check if draw
        draw = (new Set(scores).size === 1) ? true : false;

        // find winner
        if (!draw) {
            for (i=0; i<scores.length; i++) {   
                hiScore = (scores[i] > hiScore[0]) ? [scores[i], i+1] : hiScore;
            }
        }
    }

    return (draw) ? 0 : hiScore[1];
}

window.onload = function () {

  // Global Variables //
  /////////////////////////////////////////////////////////////////////////////
  var wins = 0;
  var losses = 0;
  var guesses = 8;
  var wrongGuesses = 0;
  var correctGuesses = 0;

  var charactersDiv = document.getElementById("characters");
  var wordDiv = document.getElementById("word");
  var winsDiv = document.getElementById("wins");
  var lossesDiv = document.getElementById("losses");
  var guessesLeftDiv = document.getElementById("guesses-left");
  var guessesDiv = document.getElementById("guessed-letters");

  var characters = ["carl", "maggie", "glenn", "morgan", "carol", "daryl", "michonne", "rick"];
  var words = ["zombie", "walkers", "the hilltop", "pistol", "alexandria", "crossbow", "survival", "apocalypse", "the walking dead"];
  var rightLetters = [];
  var wrongLetters = [];

  var guess;
  var chosenWord;

  var disableInput = false;
  var totalWords = words.length

  var winAudio = "./assets/audio/win.mp3"
  var lossAudio = "./assets/audio/loss.mp3"
  /////////////////////////////////////////////////////////////////////////////


  // Functions
  /////////////////////////////////////////////////////////////////////////////
  function init() {
    winsDiv.textContent = wins;
    lossesDiv.textContent = losses;
    guessesLeftDiv.textContent = guesses;
    addImages()
    generateWord()
  }

  function reset() {
    if (wins + losses !== totalWords) {
      guesses = 8;
      wrongGuesses = 0
      correctGuesses = 0;
      rightLetters = [];
      wrongLetters = [];
      wordDiv.innerHTML = "";
      guessesDiv.innerHTML = "";
      resetImages();
      generateWord();
      updatePage();
      disableInput = false;
    } else {
      endOfGame();
    }
  }

  // Update Page
  function updatePage() {
    winsDiv.textContent = wins;
    lossesDiv.textContent = losses;
    guessesLeftDiv.textContent = guesses;
  }

  // Resets Zombified Images
  function resetImages() {
    var x = document.getElementById("characters").getElementsByTagName("img");
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("invert");
    }
  }

  // Update images on incorrect guess
  function updateImage() {
    if (wrongGuesses === 1) {
      var carl = document.getElementById("image-0");
      carl.setAttribute("class", "invert")
    }
    if (wrongGuesses === 2) {
      var maggie = document.getElementById("image-1");
      maggie.setAttribute("class", "invert")
    }
    if (wrongGuesses === 3) {
      var glenn = document.getElementById("image-2");
      glenn.setAttribute("class", "invert")
    }
    if (wrongGuesses === 4) {
      var morgan = document.getElementById("image-3");
      morgan.setAttribute("class", "invert")
    }
    if (wrongGuesses === 5) {
      var carol = document.getElementById("image-4");
      carol.setAttribute("class", "invert")
    }
    if (wrongGuesses === 6) {
      var daryl = document.getElementById("image-5");
      daryl.setAttribute("class", "invert")
    }
    if (wrongGuesses === 7) {
      var michonne = document.getElementById("image-6");
      michonne.setAttribute("class", "invert")
    }
    if (wrongGuesses === 8) {
      var rick = document.getElementById("image-7");
      rick.setAttribute("class", "invert")
    }
  }

  function playAudio(gameAudio) {
    var audio = new Audio(gameAudio);
    audio.play();
    audio.volume = .5;
  }

  function addImages() {
    for (var i = 0; i < characters.length; i++) {

      // Create image column
      var characterCol = document.createElement("div");
      // Set column class
      characterCol.setAttribute("class", "col-sm-6")
      // Append column to #characters
      charactersDiv.appendChild(characterCol);

      // Create image tag
      var character = document.createElement("img");
      // Set image src
      character.src = "./assets/images/" + characters[i] + ".jpg";
      // Set img style
      character.style = "width: auto; height: 150px";
      // Set image class
      character.setAttribute("class", "rounded")
      // Set image Id
      character.setAttribute("id", "image-" + i)
      // Append img to column
      characterCol.appendChild(character);
    }
  }

  function generateWord() {
    // Choosing a random word from the words array
    var randomNumber = Math.floor(Math.random() * words.length);
    chosenWord = words[randomNumber];
    console.log('chosenWord:', chosenWord);

    // Removing word from words array so it doesn't generate twice
    words.splice(randomNumber, 1);

    // For loop to display blank spaces
    for (var i = 0; i < chosenWord.length; i++) {
      // Create new span for each letter
      var letterSpan = document.createElement("span");
      // Giving text content to each letter
      letterSpan.textContent = "_ ";
      // Appending each letter to #word
      wordDiv.appendChild(letterSpan);
      // Adding ID to each span
      letterSpan.setAttribute("id", i);
    };
    // Displays spaces in phrase
    displaySpaces()
  }

  // Check if Game Over
  function checkIfGameOver() {
    
    console.log('correctGuesses:', correctGuesses)
    if (correctGuesses === chosenWord.length) {
      win()
    } else if (guesses === 0) {
      loss()
    } else {
      updatePage()
    }
  }
  function win() {
    wins++
    disableInput = true;
    updatePage()
    displayWin()
    playAudio(winAudio);
    setTimeout(reset, 3000)
  }
  function loss() {
    losses++
    disableInput = true;
    updatePage()
    displayCorrectWord();
    displayLoss()
    playAudio(lossAudio);
    setTimeout(reset, 3000)
  }

  // Display the word if loss
  function displayCorrectWord() {
    for (var i = 0; i < chosenWord.length; i++) {
      var correctLetters = chosenWord[i];
      var correctGuessId = document.getElementById(i);
      correctGuessId.textContent = correctLetters.toUpperCase();
    }
  }

  function displaySpaces() {
    for (var i = 0; i < chosenWord.length; i++) {
      var space = " ";
      var correctGuessId = document.getElementById(i);
      // Making sure letter hasn't already been guessed. If not, call correct()
      if (space === chosenWord[i]) {
        correctGuesses++
        console.log("added to correctGuesses", correctGuesses)
        correctGuessId.textContent = "\xa0\xa0";
      }
    }
  }

  function displayWin() {
    // Clearing guessed letters
    guessesDiv.innerHTML = "";
    // Create new div to display WINNER
    var winnerDiv = document.createElement("div");
    // Giving text content to div
    winnerDiv.textContent = "YOU WON";
    // Set img style
    winnerDiv.style = "padding-top: 15%; color: green;";
    // Appending message to #guessed-letters
    guessesDiv.appendChild(winnerDiv);
  }
  function displayLoss() {
    // Clearing guessed letters
    guessesDiv.innerHTML = "";
    // Create new div to display WINNER
    var loserDiv = document.createElement("div");
    // Giving text content to div
    loserDiv.textContent = "YOU LOST";
    // Set img style
    loserDiv.style = "padding-top: 15%; color: red;";
    // Appending message to #guessed-letters
    guessesDiv.appendChild(loserDiv);
  }
  function endOfGame() {
    // Clearing guessed letters
    guessesDiv.innerHTML = "";
    // Create new div to display WINNER
    var endOfGame = document.createElement("div");
    // Giving text content to div
    endOfGame.textContent = "GAME OVER";
    // Set img style
    endOfGame.style = "padding-top: 10%; color: D39920;";
    // Appending message to #guessed-letters
    guessesDiv.appendChild(endOfGame);

    // Create new div to display WINNER
    var endOfGame2 = document.createElement("div");
    // Giving text content to div
    endOfGame2.textContent = "Reloading page...";
    // Set img style
    endOfGame2.style = "padding-top: 10px; color: D39920; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;";
    // Appending message to #guessed-letters
    guessesDiv.appendChild(endOfGame2);

    // Reload Page
    setTimeout(reloadPage, 3000);
  }

  function reloadPage() {
    location.reload();
  }
  /////////////////////////////////////////////////////////////////////////////


  // User Input
  /////////////////////////////////////////////////////////////////////////////
  // On user guess, run this code
  document.onkeyup = function (e) {

    if (disableInput === false) {

      // User Guess
      guess = e.key
      keyCode = e.keyCode

      // If guess is a letter, do the following
      if (keyCode >= 65 && keyCode <= 90) {
        checkIfCorrect()
      }

      // Handles correct guess
      function checkIfCorrect() {

        // Need this to ensure correct letters don't keep pushing to rightLetters array
        if (wrongLetters.includes(guess) === false && rightLetters.includes(guess) === false) {
          for (var i = 0; i < chosenWord.length; i++) {
            // Grabs correct letter and associated Id 
            var correctGuessId = document.getElementById(i);
            // Making sure letter hasn't already been guessed. If not, call correct()
            if (guess === chosenWord[i]) {
              correct(correctGuessId)
            }
          }
          // Check if incorrect
          checkIfIncorrect()
        }
      }

      // Handles incorrect guess
      function checkIfIncorrect() {

        for (var i = 0; i < chosenWord.length; i++) {
          // Making sure letter hasn't already been guessed. If not, call wrong()
          if (wrongLetters.includes(guess) === false && rightLetters.includes(guess) === false) {
            wrong()
          }
        }
      }

      // Correct
      function correct(correctGuessId) {
        // Pushing correct guess to rightLetters array
        rightLetters.push(guess);
        // Revealing correct letter(s)
        correctGuessId.textContent = guess.toUpperCase();
        // Increase correctGuesses by 1
        correctGuesses++
      }

      // Incorrect
      function wrong() {
        wrongGuesses++
        guesses--

        // Pushing incorrect guess to wrongLetters array
        wrongLetters.push(guess);
        // Create new span for each guess
        var guessSpan = document.createElement("span");
        // Giving text content to each guess
        guessSpan.textContent = guess.toUpperCase() + " ";
        // Appending each letter to #guessed-letters
        guessesDiv.appendChild(guessSpan);
        // Update Image
        updateImage()
      }

      // Check if game over
      checkIfGameOver()
    }

  }
  /////////////////////////////////////////////////////////////////////////////

  // Function Calls
  /////////////////////////////////////////////////////////////////////////////
  init()
}
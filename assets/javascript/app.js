window.onload = function () {

  // Global Variables //
  /////////////////////////////////////////////////////////////////////////////
  var guesses = 10;
  var wrongGuesses = 0
  var wins = 0
  var losses = 0

  var charactersDiv = document.getElementById("characters");
  var wordDiv = document.getElementById("word");
  var winsDiv = document.getElementById("wins");
  var lossesDiv = document.getElementById("losses");
  var guessesLeftDiv = document.getElementById("guesses-left");
  var guessesDiv = document.getElementById("guessed-letters");


  var characters = ["carl", "maggie", "glenn", "morgan", "carol", "daryl", "michonne", "rick"];
  var words = ["zombie", "walkers", "headshot", "pistol", "alexandria", "blood", "survival"]
  var rightLetters = [];
  var wrongLetters = [];

  var guess;
  var chosenWord;
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

  function addImages() {
    for (var i = 0; i < characters.length; i++) {

      // Create image column
      var characterCol = document.createElement("div");
      // Set column class
      characterCol.setAttribute("class", "col-sm-6 ")
      // Append column to #characters
      charactersDiv.appendChild(characterCol);

      // Create image tag
      var character = document.createElement("img");
      // Set image src
      character.src = "./assets/images/" + characters[i] + ".jpg";
      // Set img style
      character.style = "width: auto; height: 150px";
      // Set column class
      character.setAttribute("class", "rounded")
      // Append img to column
      characterCol.appendChild(character);
    }
  }

  function generateWord() {
    // Choosing a random word from the words array
    var randomNumber = Math.floor(Math.random() * words.length);
    chosenWord = words[randomNumber];
    console.log('word:', chosenWord);

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
  }

  // Update Page
  function updatePage() {
    winsDiv.textContent = wins;
    lossesDiv.textContent = losses;
    guessesLeftDiv.textContent = guesses;
  }

  function checkIfGameOver() {
    if (rightLetters.length === chosenWord.length) {
      win()
    } else if (guesses === 0) {
      loss()
    } else {
      updatePage()
    }
  }
  function win() {
    wins++
    updatePage()
    alert("YOU WON");

  }
  function loss() {
    losses++
    updatePage()
    alert("loser")
  }
  /////////////////////////////////////////////////////////////////////////////


  // User Input
  /////////////////////////////////////////////////////////////////////////////
  // On user guess, run this code
  document.onkeyup = function (e) {
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
      rightLetters.push(guess);
      console.log('pushed:', guess);
      correctGuessId.textContent = guess.toUpperCase();

      // Update Page
      checkIfGameOver()
    }

    // Incorrect
    function wrong() {
      console.log("Wrong")
      wrongGuesses++
      guesses--

      // Update Guesses
      wrongLetters.push(guess);
      // Create new span for each guess
      var guessSpan = document.createElement("span");
      // Giving text content to each guess
      guessSpan.textContent = guess.toUpperCase() + " ";
      // Appending each letter to #guessed-letters
      guessesDiv.appendChild(guessSpan);

      // Update Page
      checkIfGameOver()
    }

  }
  /////////////////////////////////////////////////////////////////////////////

  // Function Calls
  /////////////////////////////////////////////////////////////////////////////
  init()
}
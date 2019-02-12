window.onload = function () {

  // Global Variables //
  /////////////////////////////////////////////////////////////////////////////
  var guesses = 10;
  var wrongGuesses = 0

  var charactersDiv = document.getElementById("characters");
  var wordDiv = document.getElementById("word");
  var guessesLeftDiv = document.getElementById("guesses-left");
  guessesLeftDiv.textContent = guesses;

  var characters = ["carl", "maggie", "glenn", "morgan", "carol", "daryl", "michonne", "rick"];
  var words = ["zombie", "walkers", "headshot", "pistol", "alexandria", "blood", "survival"]
  var rightLetters = [];
  var wrongLetters = [];

  var guess;
  var chosenWord;

  /////////////////////////////////////////////////////////////////////////////


  // Functions
  /////////////////////////////////////////////////////////////////////////////
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
      // Append img to column
      characterCol.appendChild(character);
    }
  }

  function generateWord() {
    // Choosing a random word from the words array
    chosenWord = words[Math.floor(Math.random() * words.length)]
    console.log('word:', chosenWord);

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

  // Function Calls
  addImages()
  generateWord()
}
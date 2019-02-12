window.onload = function () {

  // Global Variables
  var charactersDiv = document.getElementById("characters");
  var characters = ["carl", "maggie", "glenn", "morgan", "carol", "daryl", "michonne", "rick"];

  // Functions
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
  
  // Function Calls
  addImages()
}
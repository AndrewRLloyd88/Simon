let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

//function that generates the next square in the sequence
function nextSequence() {
  let randomNumber = Math.round(Math.random() * 3);
  level++;
  $("h1").text("Level " + level);
  //handling simons output to the user
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);


  // console.log(gamePattern);
}

//function that handles sound for both simon and player
function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

//handles animating the button the user clicks
function animatePress(currentColor) {
  //add the pressed class to currentColor
  $("#" + currentColor).addClass("pressed")
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

//check the answer in the current level
function checkAnswer(currentLevel) {
  //if the index of userClickedPattern === the index of gamePattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    //second check to see if the user has clicked as many times as the generated game pattern array
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
    //otherwise the user got the sequence wrong
  } else {
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    console.log("wrong");
    startOver();
  }
}

$(document).ready(function () {
  //main jQuery code
  //if started is false
  //wait for the game to start by detecting user key press
  $(document).keydown(function () {
    if (!started) {
      started = true;
      console.log(started);
      //change our title to say Level X

      //handling the user input
      //start next sequence
      nextSequence();
      //started is true
    };
  });


  $(".btn").click(function () {
    if(started){
    let userChosenColour = $(this).attr("id");
    //push the users chosen color to the array
    userClickedPattern.push(userChosenColour);
    // console.log(userChosenColour)
    // console.log(userClickedPattern);
    //play the corresponding sound
    playSound(userChosenColour);
    //animate the button
    animatePress(userChosenColour);
    //check the answer
    checkAnswer(userClickedPattern.length - 1)
    }
  });
});
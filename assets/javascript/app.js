// this is the game code for Space Exploratin Trivia game

//Question object prototype
Question = {
  ID : 1, // must me a number between 1 and 7
  qText : "This is the question text",
  correctAnswer : "This is the correct answer to the question",
  otherAnswers : ["one", "two", "three"],
  hasImage : true,
  imageURL : "assets/images/john glenn.jpg"
}


//OBJECT CNSTRUCTOR



console.log("this is the .js include file");

// global variables
var timeLeft = 30; // time left to answer question
var idUsed[]; // array to help figure out which id numbers have already been used.



// testing how to check whether a ranomly generated id has already been used.
var tmp = getRandom7;
if (idNotUsed ==true) {
  // if ifNotUsed is true, then add the new random number to the idUsed array
  idused.push(tmp);
}


function idNotUsed() {
  // this function returns true if an randomly gnerated id number has not yet been used, false if it has
  // whether or not an id has already been used is determned by whether it exists in the idUsed array
  var rslt = false; //assume the id number has not yet been used
  
  for (i=0; i < idused.lenth; i++) {
      //iterate the contenst of the idused array
      console.log("loop counter is: " + i);


  }
  

}

// generate a random number between 1 and 7, inclusive
function getRandom7() {
  //this function returns a random number betwee 1 and 7, inclusive
  var tmp =  (Math.floor(Math.random() * 7 )+1);  //generate a random number from 1 to 7 inclusive
  console.log("inside getRandom7 function, result is: " + tmp);
  return tmp;
}


// start the game
function startGame() {
  // this function inititializes the global variables for the game, and starts the game timer.
  console.log("START GAME FUNCTION");
  timeLeft = 30 // initialize the turn counter
  setTimeout(updateCountDown, 1000); // set timer for 1 second

  //remove the start game button
  $("#startgame").remove();


  console.log("end of start game function");
} //end of start game functin

function updateCountDown() {
  // console.log("inside updateCountDown function");
  timeLeft = timeLeft-1;
  document.getElementById("counter").innerText = timeLeft;
  
  console.log("new time remaining: " + timeLeft);
  if (timeLeft <= 0) {
    console.log("PLAYER HAS RUN OUT OF TIME");
    clearTimeout(updateCountDown);
  }
  else {
  setTimeout(updateCountDown, 1000);
  }
}


/* only do work if the document is ready */
$(document).ready(function () {
  console.log("inside document is ready function");

  //Question object testing
  console.log("TESTING QUESTION OBJECT");
  console.log("question ID is: " + Question.id);
  console.log("question is: " + Question.qText);
  console.log("question answer is: " + Question.correctAnswer);
  console.log("iterating list of other answers");
  for (i=0; i < Question.otherAnswers.length; i++) {
    console.log("loop count: " + i);
    console.log("other answer " + i + " is " + Question.otherAnswers[i]);
  }

    if (Question.hasImage == true) {
      console.log("the question has a related image");
      console.log("the url to the image is: " + Question.imageURL);
    }
  console.log("QUESTION OBJEC TESTING COMPLETE");


  // TESTNG COUNTDOWN
  // console.log("starting timer test");

  // setTimeout(updateCountDown, 1000); // set timer for 1 second

  // console.log("end of timer test");



  $("#startgame").on("click", function() {
    //  start the game
    console.log("start game button clicked")
    startGame();
      // alert("Start game button clicked!");
    } 
    ) // end of startgame button event

    $("#Answer0").on("click", function() {
      console.log("answer 0 clicked");
    }
    
    ) // end of Answer 0 click event

  console.log("end of document ready function");
} //end of document ready function
) //end of document ready evant handler parameter list

// this is the game code for Space Exploratin Trivia game

//Question object prototype
// Question = {
//   ID : 1, // must me a number between 1 and 7
//   qText : "This is the question text",
//   correctAnswer : "This is the correct answer to the question",
//   otherAnswers : ["one", "two", "three"],
//   hasImage : true,
//   imageURL : "assets/images/john glenn.jpg",
//   xtraInfo : ""
// }

// global variables
var timeLeft = 30; // time left to answer question
var idUsed; // array to help figure out which id numbers have already been used.
var qList= [];  // array of question objects


//OBJECT CONSTRUCTOR FOR QUESTION  OBJECT
function Question(id, q, correctAnswer, otherAnswers, hasImage, imageURL, info) {
  // console.log("Question constructor");
  this.id = id;
  this.q = q;
  this.correctAnswer = correctAnswer;
  this.otherAnswers = otherAnswers;
  this.hasImage = hasImage;
  this.imageURL = imageURL;
  this.xtraInfo = info;
  // console.log("end of Question constructor");
} //end of question object constructor




function build_qList() {
  // this function builds the list of question objects, inserting each ne question into the qList array
  // console.log("start building questin list");
  // var Q;  //temp variable to hold new Question object
  // build question 1
  var Q1 = new Question(1,
    "What year was NASA founded?",
    "1958", 
    ["1950", "1960","1966"], 
    false,
    "", "");
  qList.push(Q1); // add new Question object to arry list of questions

  // build question 2
  Q = new Question(2,"The first woman in space was of what nationality?","Russian", ["United States", "China"],true, "assets/images/valentina tereshkova.jpg","Valentina Tereshkova in 1963, on Vostok 6");
  qList.push(Q); // add new Question object to arry list of questions

  //build question 3
  Q =  new Question(3,"What was John Glenn's major accomplishment in the space program?","First American to orbit the Earth.",["Walked on the Moon", "Apollo Program mission commander"],true,"assets/images/john glenn.jpg", "3 orbits in 1962");
  qList.push(Q);

  //build question 4
  Q = new Question(4,
    "Who was the first US woman in space?",
    "Sally Ride",["Judith Resnik", "Chirstina Koch"],true,"assets/images/sally ride.jpg", "1983, Shuttle Columbia");
  qList.push(Q);

  //build question 5
  Q = new Question(5,
    "Who was the first woman to make 2 space flights?",
    "Svetlana Savitskaya",
    ["Valentina Tereshkova", "Yelena Serova"],true,"assets/images/svetlana savitskaya.jpg", 
    "");
  qList.push(Q);

    //build question 6
    Q = new Question(6,
      "Who was the first man to walk on the Moon?",
      "Neil Armstrong",
      ["Scott Carpenter", "John Glenn", "Buzz Aldrin"],
      true,"assets/images/neil armstrong.jpg", "1983, Shuttle Columbia");
    qList.push(Q);

    //build question 7
    Q = new Question(7,
      "What Nation orbited the first artificial satellite?",
      "Soviet Union",
      ["China", "United States"],
      true,"assets/images/sputnik 1.jpg", "Sputnik 1, launched October 4, 1957, burned on re-entry Jan 4, 1958");
      qList.push(Q);
    
      // console.log("end building question list");
} //  end buildqList function



console.log("this is the .js include file");




// testing how to check whether a randomly generated id has already been used.
var tmp = getRandom1_7;
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
function getRandom1_7() {
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

  //build the question list array
  build_qList();

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
  console.log("TESTING QUESTION OBJECT LIST");
  // console.log(qList);
  console.log("build question list");
  build_qList();
  console.log("size of question list: " + qList.length );

  console.log("iterate question list");
  for (i=0; i < qList.length; i++) {
    console.log("qList index is: " + i );
    console.log("question ID is: " + qList[i].id);
    console.log("QUESTION IS: "+ qList[i].q);
  console.log("CORRECT ANSWER is: " + qList[i].correctAnswer);
  console.log("OTHER ANSWERS ARE: ")
  console.log("iterating list of other answers (inner loop)");
  for (k=0; k < qList[i].otherAnswers.length; k++) {
    console.log("loop count: " + k);
    console.log("other answer " + k + " is " + qList[i].otherAnswers[k]);
  }
  console.log("done iterating other answers");
    if (qList[i].hasImage == true) {
      console.log("the question has a related image");
      console.log("the url to the image is: " + qList[i].imageURL);
    }
      console.log("EXTRA INFO: " + qList[i].xtraInfo);

  }    
  console.log("QUESTION OBJECT LIST TESTING COMPLETE");


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

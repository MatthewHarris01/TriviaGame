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

// GLOBAL VARIABLES
var qtimeLeft = 30;  // time left to answer question NOTE: this variable's value should NEVER be changed.
var ansTimeLeft = 10;  // number of seconds before moving on to next questin when answer is displayed.
var idUsed = [];    // array to help figure out which id numbers have already been used.
var currentQ;       //reference to the current question object being displayed.
var qList = [];     // array of question objects
var qIndex = 0;     //index to special array governing the order in which questiona are to be displayed
var QTimerID;        //holds the timer id returned by setTimer (for Questions) so that it can be canceled later
var ATimerID;       //holds th etimer id returned by setTimer (for answers) so that it can be canceled later
var correctAnswers = 0;    //count of questions answered correctly
var incorrectAnswers = 0;   //count of questions not answered correctly
var notAnswered = 0;      //count of questions not answered before timer expired
var roundsPlayed = 0;     // count of complete rounds played (all question shown)

//ANSWER CLICK EVENT HANDLER
     // AnswerChoice
    //  $(".AnswerChoice").click, function() {
    //   //check whether the text of the clicked answer button matches the "correctAnswer" of the current question
    //   console.log("ANSWER CLICKED");
    //   var s = this.innerText
    //   s = s.toUpperCase();
    //   console.log("answer text: " + s);
    //   var s1 = currentQ.correctAnswer;
    //   s1 = s1.toUpperCase();
    //   console.log("correct answer: " + s1);

    //   if (s == s1) {
    //       console.log("CORRECT ANSWER");
    //   }
    //   else {
    //     console.log("WRONG ANSWER");
    //   }
    // } //END ANSWER CLICK FUNCTION
    //  )


//OBJECT CONSTRUCTOR FOR QUESTION  OBJECT
function Question(id, q, correctAnswer, otherAnswers, hasImage, imageURL, info) {
  this.id = id;
  this.q = q;
  this.correctAnswer = correctAnswer;
  this.Answers = otherAnswers;
  this.hasImage = hasImage;
  this.imageURL = imageURL;
  this.xtraInfo = info;
} //end of question object constructor

function build_qList() {
  // this function builds the list of question objects, inserting each new question into the qList array

  // console.log("start building question list");
  // build question 1
  var Q = new Question(1,
    "What year was NASA founded?",
    "1958", 
    ["1958","1950", "1960","1966"], 
    true,
    "assets/images/nasa logo.jpg", 
    "NASA was established in 1958, succeeding the National Advisory Committee for Aeronautics.");
  qList.push(Q); // add new Question object to arry list of questions

  // build question 2
  Q = new Question(2,
    "The first woman in space was of what nationality?",
    "Russian",
    ["Russian", "United States", "China"],
    true, 
    "assets/images/valentina tereshkova.jpg","th first woman to go into space was Valentina Tereshkova in 1963, on Vostok 6",
    "Valentina Tereshkovs was the first woman in space, on the Vostok 6 mission in 1963.");
  qList.push(Q); // add new Question object to arry list of questions

  //build question 3
  Q =  new Question(3,
    "What was John Glenn's major accomplishment in the space program?",
    "First American to orbit the Earth.",
    ["First American to orbit the Earth.","Walked on the Moon", "Apollo Program mission commander"],
    true,"assets/images/john glenn.jpg", "John Glenn made 3 orbits of the Earth in 1962");
  qList.push(Q);

  //build question 4
  Q = new Question(4,
    "Who was the first US woman in space?",
    "Sally Ride",
    ["Sally Ride","Judith Resnik", "Chirstina Koch"],
    true,
    "assets/images/sally ride.jpg", 
    "Sally Ride went into space in 1983, on the Shuttle Columbia");
  qList.push(Q);

  //build question 5
  Q = new Question(5,
    "Who was the first woman to make 2 space flights?",
    "Svetlana Savitskaya",
    ["Svetlana Savitskaya","Valentina Tereshkova", "Yelena Serova"],
    true,
    "assets/images/svetlana savitskaya.jpg", 
    "");
  qList.push(Q);

  //build question 6
  Q = new Question(6,
    "Who was the first man to walk on the Moon?",
    "Neil Armstrong",
    ["Neil Armstrong","Scott Carpenter", "John Glenn", "Buzz Aldrin"],
    true,
    "assets/images/neil armstrong.jpg", "1983, Shuttle Columbia");
  qList.push(Q);

  //build question 7
  Q = new Question(7,
    "What Nation orbited the first artificial satellite?",
    "Soviet Union",
    ["Soviet Union","China", "United States"],
    true,
    "assets/images/sputnik 1.jpg", 
    "Sputnik 1 was launched October 4, 1957, and orbited for 3 months, burning up on re-entry on Jan 4, 1958");
  qList.push(Q);    
} //  end buildqList function
  
// generate a random number between 1 and 7, inclusive
function getRandom1_7() {
  //this function returns a random number between 1 and 7, inclusive
  var tmp =  (Math.floor(Math.random() * 7 )+1);  //generate a random number from 1 to 7 inclusive
  console.log("inside getRandom7 function, result is: " + tmp);
  return tmp;
}


// start the game
function startGame() {
  // this function inititializes the global variables for the game, and starts the game timer.
  console.log("START GAME FUNCTION");
  timeLeft = 30 // initialize the timer counter
  
  //build the question list array
  build_qList();
  qIndex = 0;   //question index is 0, the first question in the question list
  currentQ = "no current question";   //current questin has not yet been selected
  correctAnswers = 0;   //no questions answered yet in this round
  incorrectAnswers = 0; //no questions answered yet in this round
  roundsPlayed++  //increment count of rounds played

  displayQuestion(qIndex);


  //remove the start game button
  $("#startgame").remove();


  console.log("end of start game function");
} //end of start game functin

function displayQuestion(idx) {
  //this function displays a question and its answers, the idx parameter is the index of the question to be displayed in the 
  //qList array, it should be a value between o and 6 (there are 7 questions in the qList array)
  console.log("inside displayQuestion function");
  // console.log("the question index (qIndx) is: " + idx);
  //set the currentQ global variable
  currentQ = qList[idx];

  //create Question element in a <p> tag with class=Question and id=Question
  var Ptag = $("<p>").text(currentQ.q);   //addClass("Question");
  Ptag.addClass("Question"); //set the class
  $(Ptag).attr("id", "Question");  //set the element id
  // append the question <p> element to the game div element
  // console.log("APPENDING Ptag");
  var game_div = document.getElementById("game-container");
  $(game_div).append(Ptag);

  //NOW ADD THE ANSWERS TO THE DISPLAY
  for (k=0; k < currentQ.Answers.length; k++) {
    console.log("ADDING ANSWERS");
  var ans = $("<p>").text(currentQ.Answers[k]);  //create new p tag for answer, with answer text
  $(ans).attr("class", "AnswerChoice");  //set the element class
    $(ans).attr("id", "Ans" + k); //set id for answer
    var game_div = document.getElementById("game-container");
    $(game_div).append(ans);  //add the answer to the display
  }
  //START THE TIMER FOR THIS QUESTION
  QTimerID = setTimeout(updateQCountDown, 1000); // set timer for 1 second

  console.log("end of displayQuestion function");
} // end of displayQuestion function

function updateQCountDown() {
  //this function updates the countdown display on-screen for Question time remainng
  qtimeLeft = qtimeLeft-1;  //decrement the amount of time left
  document.getElementById("counter").innerText = qtimeLeft;  //update what is shown on-screen
  // console.log("time remaining: " + qtimeLeft);
  
  if (qtimeLeft <= 0) {
    console.log("PLAYER HAS RUN OUT OF TIME");
    clearTimeout(QTimerID); //stop the timer event

    //display the answer
    displayAnswer("ot");
  }
  else {
  QTimerID=setTimeout(updateQCountDown, 1000);
  }
}

function playsound(chc) {
  // this function attempts to play a sound. The sound to be played is specified by the value in the chc parameter.

  if (chc == "losesound") { 
    console.log("play win sound");
    var snd = document.getElementById("losesound");
    snd.play();
  }
  else {
    console.log("play lose sound");
    var snd = document.getElementById("winsound");
    snd.play();
  }
}

function updateACountDown() {
  //this function updates the countdown display on-screen for time until next Question, while Answer is on display

  ansTimeLeft = ansTimeLeft-1 //decrement the amount of time left to display the answer
  //update what is shown on-screen
  document.getElementById("AnsTime").innerText = "Next question will display in about " + ansTimeLeft + " seconds.";
  
  if (ansTimeLeft <= 0) {
    console.log("DISPLAY NEXT QUESTION");
    clearTimeout(ATimerID); //stop the timer event

    if (qIndex == 6) {
      // all questions have already been shown, this is starting a new round
      roundsPlayed++ //increment count of rounds played
      displayScore(); //show score for the end of this round
    }
    else {
      qIndex++  //increment the question index
      clearGameDisplay();
      displayQuestion(qIndex);  //display the next question
    }

  }
  else {
  ATimerID=setTimeout(updateACountDown, 1000);
  }
}
function clearGameDisplay() {
  //this function empties the game display area to ready it for a new question display.
  console.log("inside the clearGameDisplay function");

  console.log("current question index: " + qIndex);
  console.log("EMPTY THE GAME DISPLAY AREA");

  // NO, THIS REMOVES TOO MUCH
  // $('p:not(first-child)').remove(); //removes all p elements except the first
  //create a var that points to the game area

  // var gamearea = $("#game-div");

  //remove all elements with class game-head
  $(".game-head").remove();
  // alert("all game-head class elements removed");

  //remove all elements with class Question
  $(".Question").remove();
  // alert("all question class elements removed");

  //remove all elements with class ansImage
  $(".ansImage").remove();
  // alert("all ansImage class elements removed");


  console.log("end of clearGameDisplay function")
}

function displayScore() {
  //this function displays the score after all questions have been shown.
  console.log("inside displayScore function");

  console.log("DISPLAY FINAL SCORE FOR THIS ROUND")
  console.log("wins " + correctAnswers);
  console.log("losses " + incorrectAnswers);
  console.log("time outs: " + notAnswered);
  console.log("rounds played " + roundsPlayed);

  console.log("end of displayScore function");
} //end of displayScore function

function displayAnswer(msg) {
  //this function displays the answer to the question referenced by currentQ
  //if the msg parameter is "ot" the user ran out of time to answer the question
  var imgurl = ""; // url of the image to display

  console.log("inside displayAnswer function");
  console.log("The msg parameter is: " + msg);

  clearTimeout(QTimerID); //STOP TIMER EVENT

  //clear the answer choices from the screen
  $(".AnswerChoice").remove();


//Select the correct text for whether user ran out of time, answered correctly or incorrectly
  if (msg == "ot") { 
    console.log("USER RAN OUT OF TIME");
    notAnswered++ //increment count of questins not answered
    //create note to user
    var Ptag = $("<p>").text("You ran out of time, the correct answer is below.");
    playsound("losesound");
  }
  else if (msg == "Correct") {
    console.log("USER SELECTED CORRECT ANSWER");
    correctAnswers++  //increment count of correct answsers
    //create note to user
    var Ptag = $("<p>").text("You chose the CORRECT Answer as shown below!");
    playsound("win");
  }
  else if (msg == "Incorrect") {
    console.log("USER SELECTED WRONG ANSWER");
    incorrectAnswers++  //increment count of incorrect answers
    //create note to user
    var Ptag = $("<p>").text("Your answer was INCORRECT, the correct answer is below.");
    playsound("losesound");
  }

    //add p tag with the outcome message.
    Ptag.addClass("game-head"); //set the class, no id needed.
    var game_div = document.getElementById("game-container");
    $(game_div).append(Ptag); //add element to screen

    //DISPLAY THE CORRECT ANSWER
    var txt = currentQ.correctAnswer
    // console.log("correct answer is: " + txt);
    var Ptag = $("<p>").text(txt);
    Ptag.addClass("Question"); //set the class, no id needed.
    game_div = document.getElementById("game-container");
    $(game_div).append(Ptag); //add element to screen

    console.log("display image: " + imgurl);
  
    if(currentQ.hasImage == true) {
      console.log("THERE IS AN IMAGE TO DISPLAY")
      imgurl = currentQ.imageURL
      }
      else {
        console.log("DISPLAY GENERIC IMAGE");
        imgurl = "assets/images/blank.jpg"
      }

      var imgTag = $("<img src='" + imgurl +"'> alt='Answer Image");
      imgTag.addClass("ansImage");  // set class for image
      game_div = document.getElementById("game-container");
      $(game_div).append(imgTag); //add element to screen

      //show the "extra" info
      if (currentQ.xtraInfo == "") {
        console.log("there is no extra info");
        txt = "";
      }
      else {
        txt = currentQ.xtraInfo;
      }
      Ptag = $("<p>").text(txt);
      Ptag.addClass("Question"); //set the class, no id needed.
      game_div = document.getElementById("game-container");
      $(game_div).append(Ptag); //add element to screen
      

      //add p tag element to display time remaining befoer next question
      txt= "Next question will display in about 10 seconds"
      Ptag = $("<p>").text(txt);
      Ptag.addClass("game-head"); //set the class
      Ptag.attr("id", "AnsTime" );
      game_div = document.getElementById("game-container");
      $(game_div).append(Ptag); //add element to screen


        //finally, set up the timer to move on to the next question
        ansTimeLeft=10; //set time before moving on to next quest as 10 seconds
        ATimerID = setTimeout(updateACountDown, 1000);


  console.log("end of displayAnswer function");
} //end of displayAnswer function

/* only do work if the document is ready */
$(document).ready(function () {
  console.log("inside document is ready function");

  //EVENT HANDLER FOR CLICKING START GAME BUTTON
  $("#startgame").on("click", function() {
    //  start the game
    console.log("start game button clicked")
    startGame();
    } 
    ) // end of startgame button event

      //EVENT HANDLER FOR CLICKING AN ANSWER
    $('body').on('click', ".AnswerChoice",  function() {
      //check whether the text of the clicked answer button matches the "correctAnswer" of the current question
      console.log("ANSWER CLICKED");
      var s = this.innerText
      s = s.toUpperCase();
      console.log("answer text: " + s);
      var s1 = currentQ.correctAnswer;
      s1 = s1.toUpperCase();
      console.log("correct answer: " + s1);
      if (s == s1) {
          console.log("CORRECT ANSWER");
          displayAnswer("Correct");
      }
      else {
        console.log("WRONG ANSWER");
        displayAnswer("Incorrect");
      }
    } //END ANSWER CLICK FUNCTION
    
    ) // end of Answer click event



  console.log("end of document ready function");
} //end of document ready function
) //end of document ready evant handler parameter list


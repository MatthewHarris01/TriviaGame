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
var qtimeLeft = 20;  // time left to answer question NOTE: this variable's value should NEVER be changed.
var ansTimeLeft = 10;  // number of seconds before moving on to next questin when answer is displayed.
var scoreTimeLeft = 10; //number of seconds before starting a new game round when score is displayed.
var currentQ;       //reference to the current question object being displayed.
var qList = [];     // array of question objects
var qIndex = 0;     //index to special array governing the order in which questiona are to be displayed
var QTimerID;        //holds the timer id returned by setTimer (for Questions) so that it can be canceled later
var ATimerID;       //holds th etimer id returned by setTimer (for answers) so that it can be canceled later
var AScoreTimerID   //holds the timer id returned by setTime (for score display) so that it can be canceled later
var correctAnswers = 0;    //count of questions answered correctly
var incorrectAnswers = 0;   //count of questions not answered correctly
var notAnswered = 0;      //count of questions not answered before timer expired
var roundsPlayed = 1;     // count of complete rounds played (all question shown)
// var isAnswerCount = true;  // flag used by the updateACoundtDown timer procedure to determine whether the count down is for answer 
                          // display or something else (that is, for the score display)



//OBJECT CONSTRUCTOR FOR QUESTION  OBJECT
function Question(id, q, correctAnswer, Answers, hasImage, imageURL, info) {
  this.id = id; //question id (1 - 7)
  this.q = q; //question text
  this.correctAnswer = correctAnswer; //the correct answer text
  this.Answers = Answers;  //list of all answers (typically between 3 and 4 elements)
  this.hasImage = hasImage; //boolean indicating whether this anwswer has an associated image (check this before trying to use imageURL)
  this.imageURL = imageURL; //local url to associated image, may be empty
  this.xtraInfo = info; //extra info about this question, like date, or other tidbits
} //end of question object constructor

function currentTime() {
  //this functin returns the current time in "H:m:s" format as a string
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
return time;
}

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
    "assets/images/valentina tereshkova.jpg",
    "The first woman to go into space was Valentina Tereshkova in 1963, on Vostok 6",
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
    ["Sally Ride","Judith Resnik", "Christina Koch"],
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
    "assets/images/neil armstrong.jpg",
    "Neil Armstrong stepped onto Moon's surface on July 21, 1969 at 02:56:15 UTC.");
  qList.push(Q);

  //build question 7
  Q = new Question(7,
    "What nation orbited the first artificial satellite?",
    "Soviet Union",
    ["Soviet Union","China", "United States"],
    true,
    "assets/images/sputnik 1.jpg", 
    "Sputnik 1 was launched October 4, 1957, and orbited for 3 months, burning up on re-entry on Jan 4, 1958");
  qList.push(Q);    
} //  end buildqList function
  

// start the game
function startGame() {
  // this function inititializes the global variables for the game, and starts the game timer.
  console.log("inside startGame functin");
  timeLeft = 30 // initialize the timer counter
  
  //build the question list array
  build_qList();
  qIndex = 0;   //question index is 0, the first question in the question list
  currentQ = "no current question";   //current question has not yet been selected
  correctAnswers = 0;   //no questions answered yet in this round
  incorrectAnswers = 0; //no questions answered yet in this round
  // roundsPlayed++  //increment count of rounds played

  displayQuestion(qIndex);


  //remove the start game button
  $("#startgame").remove();


  console.log("end of start game function");
} //end of start game function

function displayQuestion(idx) {
  //this function displays a question and its answers, the idx parameter is the index of the question to be displayed in the 
  //qList array, it should be a value between o and 6 (there are 7 questions in the qList array)
  console.log("inside displayQuestion function");
  // console.log("QUESTION INDEX: " + idx);

  console.log(" IN DISPLY QUESTION FUNTION, CURRENT TIME: " + currentTime());

    //start by clearing game display
    clearGameDisplay();

  //RESET THE QUESTION TIME
  qtimeLeft = 20;
  document.getElementById("counter").innerText = qtimeLeft;  //update what is shown on-screen

  //ensure timer is visible
  // console.log("UNHIDE QUESTION TIME");
  document.getElementById("qtimer").style.visibility = "visible";

  //if the qIndex is 6, then it must be reset to 0, a new game round has started.
  if (qIndex == 6) {
    // console.log("RESET QINDEX");
    // qIndex = 0;
  }

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
    // console.log("ADDING ANSWERS");
  var ans = $("<p>").text(currentQ.Answers[k]);  //create new p tag for answer, with answer text
  $(ans).attr("class", "AnswerChoice");  //set the element class
    // $(ans).attr("id", "Ans" + k); //set id for answer
    var game_div = document.getElementById("game-container");
    $(game_div).append(ans);  //add the answer to the display
  }
  //START THE TIMER FOR THIS QUESTION
  console.log("setting question timer");
  console.log("value of QTimerID, before setting Timeout event: " + QTimerID);
  QTimerID = setTimeout(updateQCountDown, 1000); // set timer for 1 second
  console.log("value of QTimerID, after setting Timeout event: " + QTimerID);

  console.log("end of displayQuestion function");
} // end of displayQuestion function

function updateQCountDown() {
  //this function updates the countdown display on-screen for Question time remainng
  
  qtimeLeft = qtimeLeft-1;  //decrement the amount of time left
  console.log("INSIDE updateQCountDown function")
  document.getElementById("counter").innerText = qtimeLeft;  //update what is shown on-screen
  console.log("question time remaining: " + qtimeLeft);
  
  if (qtimeLeft <= 1) {
    // console.log("PLAYER HAS RUN OUT OF TIME");
    console.log("CANCEL QUESTION TIMER, event id is: " + QTimerID);
    clearTimeout(updateQCountDown); //stop the timer event

    //display the answer
    displayAnswer("ot");
  }
  else {
    console.log("KEEP QUESTION TIMER GOING");
  QTimerID = setTimeout(updateQCountDown, 1000);  //reset the timer countdown for another second
  }
} //end of updateQCountDown function

function playsound(chc) {
  // this function attempts to play a sound. The sound to be played is specified by the value in the chc parameter.

  if (chc == "losesound") { 
    console.log("play lose sound");
    var snd = document.getElementById("losesound");
    snd.play();
  }
  else {
    console.log("play win sound");
    var snd = document.getElementById("winsound");
    snd.play();
  }
} //end of playsound function

function updateScoreCountDown() {
  //this function updates the countdown dipslay on-screen while the gaem Score is on display
  console.log("inside updateScoreCountDown function");

  var acounter = document.getElementById("AnsTime");
  console.log("remaining score time is " + scoreTimeLeft);

  console.log("QUESTION INDEX IS: " + qIndex);


  scoreTimeLeft = scoreTimeLeft-1 //decrement the amount of time left to display the score

  //update what is shown on-screen
  if (acounter != null)  {
    //update time left display -- the in not null test is required because there is a circumstane in which this functin gets called, and the AnsTime element does not exist.
    // console.log("ANSTIME ELEMENT EXISTS");
    document.getElementById("AnsTime").innerText = "Next game round will begin in about " + ansTimeLeft + " seconds.";
    }

    if (scoreTimeLeft <= 0) {
      //time to show score has expired
      console.log("CANCELLING UPDATESCORECOUNTDOWN TIMER EVENT");
      clearTimeout(AScoreTimerID);
      console.log("START NEW GAME ROUND");
      clearTimeout(AScoretimerID); //stop the timer event
      displayQuestion(qIndex);
    }
    else {
      //more time to run, reset this timer
    AScoreTimerID = setTimeout(updateScoreCountDown, 1000);  //restart this timer
    }
    console.log("end of updateScoreCountDown function");
  } // end of updateScoreCountDown function





function updateACountDown() {
  //this function updates the countdown display on-screen for Answer display
  //since this function is also used to update the timer for score display, the isAnswer parameter is used to adjust 
  //behavior accordingly
  console.log("inside updateACountdown function");

  var acounter = document.getElementById("AnsTime");

  // console.log("QUESTION INDEX IS: " + qIndex);
  // console.log("CURRENT QUESTION ID IS: " + currentQ.id);


  ansTimeLeft = ansTimeLeft-1 //decrement the amount of time left to display the answer
  console.log("remaining answer time is " + ansTimeLeft);

  //if time left is <=0, then return, do no work here


  //update what is shown on-screen
  if (acounter != null)  {
    // console.log("ANSTIME ELEMENT EXISTS");
    //there are circumstances under which this timer event runs, whan the AnsTime element may not exist, henc the need to 
    //check whether the reasult of GetElementByID is null.
    document.getElementById("AnsTime").innerText = "Next question will display in about " + ansTimeLeft + " seconds.";
    }

    if (ansTimeLeft <= 1)  {
      //time to show answer has expired
      console.log("CANCELING ANSWER TIMER, timer id: " + ATimerID);
      clearTimeout(updateACountDown); //stop the timer event

      if (qIndex == 6) {
        //we have used all questions, it is time to show the score
        console.log("DISPLAY SCORE");
        // qIndex = 0; //reset question index
        displayScore(); //show score for the end of this round
      }
      else {
        //there are still more questions to show
      ATimerID = setTimeout(updateACountDown, 1000); //keep this timer going
      console.log("KEEPING ANSWER TIMER GOING, TIMER ID IS: " + ATimerID);  
      console.log("DISPLAY NEXT QUESTION");
      qIndex++
      displayQuestion(qIndex);
      }
  }
  else {
    console.log("KEEP ANSWER TIMER GOING, timer id is: " + ATimerID);
    ATimerID = setTimeout(updateACountDown, 1000); //keep this timer going
  }

  } //end of updateACountDown function
  

function clearGameDisplay() {
  //this function empties the game display area to ready it for a new question, answser, or score display.
  console.log("inside the clearGameDisplay function");

  console.log("current question index: " + qIndex);
  // console.log("EMPTY THE GAME DISPLAY AREA");

  //remove all elements with class game-head
  $(".game-head").remove();
  // alert("all game-head class elements removed");

  //remove all elements with class Question
  $(".Question").remove();
  // alert("all question class elements removed");

  //remove all elements with class ansImage
  $(".ansImage").remove();
  // alert("all ansImage class elements removed");

  //remove all elements with class 'score'
  $(".score").remove();
  // alert("all score class elements removed");


  console.log("end of clearGameDisplay function")
}

function displayScore(msg) {  //NEW VERSION
  //this function displays the final scores for the round of game play just completed.
  console.log("inside displayScore function");

  // hide the timer display
  document.getElementById("qtimer").style.visibility = "hidden";
  clearTimeout(QTimerID); //STOP TIMER EVENT

  //clear the game display
  clearGameDisplay();

  //build message strings for score info
  //rounds played
  var sroundsPlayed = "Rounds Played: " + roundsPlayed;
  
  //correct answers
  var scorrectAnswers = "Correct Answers: " + correctAnswers;
  var pcnt = ((correctAnswers/7)*100);
  pcnt = pcnt.toFixed(1);
  pcnt = " (" + pcnt + "%)";
  scorrectAnswers= scorrectAnswers + pcnt
  // console.log("PERCENT OF CORRECT ANSWERS (3/7)*100 " + scorrectAnswers);

    // compute percent of corrent answer and format for display
  pcnt =((correctAnswers/7)*100);
  pcnt = pcnt.toFixed(2);
  pcnt =  " (" + pcnt + "%)";
  // alert("percent of correct answers: " + pcnt);
  scorrectAnswer = scorrectAnswers + pcnt;
  // alert("correct answers score: " + scorrectAnswers);

  // compute percent of incorrect answers and format for display
  var sincorrectAnswers = "Incorrect Answers: " + incorrectAnswers;
  pcnt = ((incorrectAnswers/7)*100);
  pcnt = pcnt.toFixed(2);
  pcnt = " (" + pcnt + "%)";
  sincorrectAnswers = sincorrectAnswers + pcnt;

  // computer percent of answers timed-out, and format for display
  var snotAnswered = "Not Answered: " + notAnswered;
  pcnt = ((notAnswered/7)*100);
  pcnt = pcnt.toFixed(2);
  pcnt = " (" + pcnt + "%)";
  snotAnswered = snotAnswered + pcnt;


    //clear the answer choices from the screen
    // $(".AnswerChoice").remove();


    //set heading for score display
    var Ptag = $("<p>").text("YOUR OVERALL SCORE FOR THIS ROUND OF QUESTIONS: ");
    Ptag.addClass("score"); //set the class, no id needed.
    game_div = document.getElementById("game-container");
    $(game_div).append(Ptag); //add element to screen
    console.log("SCORE HEADING ADDED");

      //SHOW rounds played
    Ptag = $("<p>").text(sroundsPlayed);
    Ptag.addClass("score");
    $(game_div).append(Ptag); //add element to screen

    //SHOW correct answers
    Ptag = $("<p>").text(scorrectAnswers);
    Ptag.addClass("score");
    $(game_div).append(Ptag); //add element to screen

    //show incorrect Answers
    Ptag = $("<p>").text(sincorrectAnswers);
    Ptag.addClass("score");
    $(game_div).append(Ptag); //add element to screen

    //show not answered
    Ptag = $("<p>").text(snotAnswered);
    Ptag.addClass("score");
    $(game_div).append(Ptag); //add element to screen


      //add p tag element to display time remaining before next question
      txt= "New game round will begin in about 10 seconds"
      Ptag = $("<p>").text(txt);
      Ptag.addClass("score"); //set the class
      Ptag.attr("id", "AnsTime" );  //set the id
      game_div = document.getElementById("game-container");
      $(game_div).append(Ptag); //add element to screen

    //add element to show time before next round starts
    //add p tag element to display time remaining befoer next round
    // txt= "Next game round will start in about 10 seconds"
    // Ptag = $("<p>").text(txt);
    // Ptag.addClass("game-head"); //set the class
    // Ptag.attr("id", "AnsTime" );  //set the id
    // game_div = document.getElementById("game-container");
    // $(game_div).append(Ptag); //add element to screen

      //******************************************************************************
    //TEMP OUTPUT CODE
    console.log("FINAL SCORE");
    console.log(sroundsPlayed);
    console.log(scorrectAnswers);
    console.log(sincorrectAnswers);
    console.log(snotAnswered);



//**************************************** */

  
    //at this point, reset the question index, and increment count of rounds played
  roundsPlayed++
  qIndex = 0;


        //finally, set up the timer to move on to the next question
        scoreTimeLeft=10;   //set time before starting question again
        // isAnswerCount = false;
        AScoreTimerID = setTimeout(updateScoreCountDown, 1000);

  //RESET THE QUESTION TIME
  qtimeLeft = 20;
  document.getElementById("counter").innerText = qtimeLeft;  //update what is shown on-screen

  console.log("end of displayScore function");
} //end of displayScore function




function displayAnswer(msg) { //WORKNG (MOSTLY, DOES NOT DISPLAY ANSWER WHEN INCORECT OR TIME-OUT ANSWER!!)
  //this function displays the answer to the question referenced by currentQ
  //if the msg parameter is "ot" the user ran out of time to answer the question
  var imgurl = ""; // url of the image to display

  console.log("inside displayAnswer function");
  console.log("The msg parameter is: " + msg);

  clearTimeout(QTimerID); //STOP TIMER EVENT

  //clear the answer choices from the screen
  $(".AnswerChoice").remove();

  //hide the question timer
  document.getElementById("qtimer").style.visibility="hidden";


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
      

      //add p tag element to display time remaining before next question
      txt= "Next question will display in about 10 seconds"
      Ptag = $("<p>").text(txt);
      Ptag.addClass("game-head"); //set the class
      Ptag.attr("id", "AnsTime" );
      game_div = document.getElementById("game-container");
      $(game_div).append(Ptag); //add element to screen


        //finally, set up the timer to move on to the next question
        ansTimeLeft=10; //set time before moving on to next quest as 10 seconds
        // isAnswerCount = true; //the time being set is for countdown after showing answer
        ATimerID = setTimeout(updateACountDown(), 1000);


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


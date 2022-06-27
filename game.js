
var started = false;

var level = 1;


var userClickedPattern = [];
var gamePattern = [];
var count=0;

var buttonColour = ["red", "blue", "green", "yellow"];
var randomChosenColour = "";

$(".btn").click(function(){

    var clicked = $(this).attr("id");
    userClickedPattern.push(clicked);
    playAudio(clicked);
    addAnimation(clicked);
    var check = getChecked(); 
    count++;
    if(!check){
        $("h1").text("You Have lost. Press Any Key To start Again");
        userClickedPattern=[];
        gamePattern=[];
        started=false;
        count=0;
    }
    else if(check&&count==level){
        count=0;
        userClickedPattern=[];
        setTimeout(function(){nextSequence()},1000);
    }else {
      
    }
});

function getChecked(){

    for(var i=0;i<userClickedPattern.length;i++){
        if(userClickedPattern[i]!==gamePattern[i]){
            return false;
        }
    }
    return true;
}

$(document).keypress(function() {
   if(!started){
    nextSequence();
   }
  });



function nextSequence(){
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  randomChosenColour = buttonColour[randomNumber];
  gamePattern.push(randomChosenColour);
  addAnimation(randomChosenColour);
  if(started){
    level++;
    $("h1").text(("level "+level));
  }else{
    $("h1").text("level 1");
    started=true;
  }
}

function addAnimation(id){
    $("#" + id).fadeOut(50).fadeIn(50).fadeOut(100).fadeIn(100);
    $("#" + id).addClass("pressed");
    setTimeout(function(){
        $("#" + id).removeClass("pressed");
   },100)
  playAudio(randomChosenColour);
}

function playAudio(id) {
  var add = id + ".mp3";
  var audio = new Audio("sounds/"+add);
  audio.play();
}

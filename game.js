var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function(){
  nextSequence();
});

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if(hasPlayed())
  {
    if(hasLevelPassed() || level === 0)
    {
      level++;
      $("h1").text("Level " + level);
      setTimeout(function(){
        nextSequence();
      },1000);
    }
    else
    {
      $("h1").text("Game over. Press a key to start");
      gamePattern = [];
      userClickedPattern = [];
      level = 0;
    }
  }
});

function nextSequence()
{
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
  if(level === 0)
  {
    level++;
    $("h1").text("Level " + level);
  }
}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(color)
{
  $("#"+color).addClass("pressed");
  setTimeout(function(){
  $("#"+color).removeClass("pressed");
},100);
}

function hasLevelPassed()
{
  userClickedPattern = userClickedPattern.slice(0, level);
  for(var i=0; i<level; i++)
  {
    if(gamePattern[i] === userClickedPattern[i])
    {
      if(i === level - 1)
      {
        userClickedPattern = [];
        return true;
      }
      continue;
    }
    return false;
  }
}

function hasPlayed()
{
  if(userClickedPattern.length === gamePattern.length){
    return true;
  }
  else{
    return false;
  }
}

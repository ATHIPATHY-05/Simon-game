var buttoncolors=["red","blue","green","yellow"];
var gamepattern=[];
var userclickedpattern=[];
var started=false;
var level=0;

$(document).keydown(function(){
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextsequence();
        started=true;
    }
})

$(".btn").on("click",function(){
    var userchosencolor= $(this).attr("id");
    userclickedpattern.push(userchosencolor);
    playSound(userchosencolor);
    animatepress(userchosencolor);
    checkAnswer(userclickedpattern.length-1);
})



function nextsequence()
{
    userclickedpattern=[];
    level++;
    $("#level-title").text("Level " +level);
    var randomnumber=Math.floor(Math.random()*4);
    var randomchosencolor=buttoncolors[randomnumber];
    gamepattern.push(randomchosencolor);
    
    $("#" + randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomchosencolor);
}

function playSound(name)
{
    let audio= new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatepress(currentcolor)
{
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentcolor).removeClass("pressed")
    },100)
}

function checkAnswer(currentlevel)
{
    if(gamepattern[currentlevel] === userclickedpattern[currentlevel])
    {
        if(userclickedpattern.length === gamepattern.length)
        {
             setTimeout(function(){
                nextsequence();
             },1000)
        }
    }
    else
    {
        console.log("Wrong");
        
        playSound("wrong");
        
        $("body").addClass("game-over");
        $("#level-title").text("Game over Press any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

       startOver();

    }
}
function startOver() {
  
  level=0;
  gamepattern = [];
  started = false;
}

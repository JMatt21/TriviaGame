//Questions
var questionArray = [
    question("Fill in the blank. ___ Man by Billy Joel.", ["Band", "Fat", "Short", "Piano"], "Piano",
                "The correct answer was Piano. Billy Joel is neither fat or short, but he was in a band."),
    question("Country music is also known as...", ["African Music", "Texas Music", "Uncle Farmer Bob's Favorite", "Hillbilly Music"], "Hillbilly Music",
                "The correct answer was Hillbilly Music. Uncle Farmer Bob really liked metal."),
    question("Which century was Jazz born in?", ["14th", "20th", "1st", "18th", "19th"], "19th",
                "19th century, because my opinion is F A C T."),
    question("Who was in the band Tenacious D?", ["Tim Allen", "Jack Black"], "Jack Black",
                'Tim Allen starred in "Home Improvement". It was okay, I guess. Never did music.'),
    question("Which of these do NOT belong?", ["Tuba", "Trumpet", "Cornet", "Saxophone"], "Saxophone",
                "A saxophone might look all brass-like from a distance and also made of metal, but it is considered a woodwind instrument. Likely because it uses a reed."),
    question("Which one of these intruments does not have a mute?", ["Xylophone", "Tuba", "Trumpet", "Cello"], "Xylophone",
                "The correct answer was Xylophone. Tuba's and Trumpet's can be stuffed and a Cello has this weird rubber atttachment."),
    question("True or False? The Beatles had a member called Stuart Moore", ["True", "False"], "False",
                "Stuart Sutcliffe and Tommy Moore were both members. Not their combined amalgamation."),
    question("Which instrument would you least likely find in a jazz band?", ["Drumset", "Vibes", "Saxophone", "Trombone"], "Vibes",
                "Vibes are not as common as the classical jazzical three.")
]
var currentQuestion;
//variables
var numberCorrect = 0, numberIncorrect = 0, numberUnanswered = 0;
var intervalID;
var backgroundMusic = new Audio("assets/audio/Flying Home.mp3");
//Timer
const MAX_TIME = 15;
var timer = {
    time: MAX_TIME,
    start: function () {
        intervalID = setInterval(function () {
            timer.time--;
            $("#timer").html(timer.time);
            if (timer.time === 0) {
                timer.stop();
                numberUnanswered++;
                imageAndResponseTransistion();
                $("#content").empty().append("<img src='assets/images/bach.jpg' width = 200 height = 200>")
                    .append("<p>Hey, Bach's knockin' wondering if you are still there.</p>");
                setTimeout(function () {
                    currentQuestion.toNext();
                }, 3000);
            }
        }, 1000);
    },
    stop: function () {
        clearInterval(intervalID);
    },
    reset: function () {
        timer.stop();
        timer.time = MAX_TIME;
    }
}

//functions
function question(theQuestion, options, answer, wrongAnswerText) {
    var ret = {
        theQuestion: theQuestion,
        options: randomizeArray(options),
        length: options.length,
        answer: answer,
        wrongText: wrongAnswerText,

        display: function () {
            $("#question").show();
            $("#time").show();
            $("#timer").text(timer.time);
            timer.start();
            currentQuestion = this;
            console.log(currentQuestion);
            $("#question").text(this.theQuestion);
            this.options.forEach(function (opt) {
                createButton(opt, "help");
            });
        },

        toNext: function () {
            var next = questionArray[questionArray.indexOf(this) + 1];
            $("#content").empty();
            if (next) {
                timer.reset();
                $("#time").show();
                next.display();
            } else {
                $("#time").hide();
                timer.reset();
                $("#content").append("<p> Right Answers: " + numberCorrect + "</p")
                    .append("<p> Wrong Answers: " + numberIncorrect + "</p")
                    .append("<p> Unanswered: " + numberUnanswered + "</p");
                createButton("Restart the Game", "restart")
            }
        },
    }
    return ret;
}

function randomizeArray(array) {
    var ret = [], length = array.length;
    for (var i = 0; i < length; i++) {
        rng = Math.floor(Math.random() * array.length);
        ret.push(array.splice(rng, 1).toString());
    }
    return ret;
}

function createButton(text, bClass) {
    var newDiv = $("<div>");
    newDiv.html("<button class=" + bClass + ">" + text + "</button>");
    $("#content").append(newDiv);
}

function startGame() {
    backgroundMusic.play();
    backgroundMusic.loop = true;
    $("#time").show();
    console.log("Starting Game.");
    $("#content").empty();
    console.log("Emptying Content.");
    questionArray[0].display();
}

function imageAndResponseTransistion() {
    $("#time").hide();
    timer.stop();
    $("#question").hide();
}
//Main
$(document).ready(function () {

    $("#time").hide();
    createButton("hello there", "startGame");

    $(".startGame").on("click", function () {
        startGame();
    });

    $("#content").on("click", ".help", function () {
        var input = $(this).text();
        if (input === currentQuestion.answer) {
            console.log(input + " is Correct.");
            numberCorrect++;
            imageAndResponseTransistion();
            $("#content").empty().append("<img src='assets/images/right.png' width = 200 height = 200>")
                .append("<p>Great Job! Onto the next one!</p>");
        } else {
            console.log(input + " is Wrong.");
            numberIncorrect++;
            imageAndResponseTransistion();
            $("#content").empty().append("<img src='assets/images/wrong.png' width = 200 height = 200>")
                .append("<p>" + currentQuestion.wrongText + "</p>");
        }

        setTimeout(function () {
            currentQuestion.toNext();
        }, 3000);


    }).on("click", ".restart", function () {
        console.log("reset");
        $("#content").empty();
        numberCorrect = 0, numberIncorrect = 0, numberUnanswered = 0;
        questionArray[0].display();
    });





});
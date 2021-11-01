
var questions = [
    {
        question : "Inside which HTML element do we put the JavaScript?",
        choices:["<js>", "<scripting>", "<script>","<javascript>"],
        answer : "<script>"
        

    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choices: ["The <body> section", "The <head> section", "Both sections are correct", "None of them"],
        answer: "The <body> section"
        
        
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>","<link href='xxx.js'>"],
        answer: "<script src='xxx.js'>"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["msg('Hello World')", "msgBox('Hello World')", "alertBox('Hello World')", "alert('Hello World')"],
        answer: "alert('Hello World')",
    },
    {
        question: "How to write an IF statement in JavaScript?",
        choices: ["if (i==5)","if i=5 then","if 1=5","i=5 if"],
        answer: "if (i==5)",
    },
]

   var score= 0;
   var questionIndex = 0;
   
   var timer = document.getElementById("countdown");
   var listEl = document.querySelector("ul");
   var questionsEl = document.getElementById("quiz-intro");
   var buttonEl = document.getElementById("button");
   var timeLeft = 75;
   var holdTime = 0;
   var titleEl = document.getElementById("title");
   var introEl = document.getElementById("intro");


   buttonEl.addEventListener("click", function() {
    if (holdTime === 0) {
    holdTime = setInterval(function() {
   timer.textContent = "time: " + timeLeft;
   timeLeft--;
    
   if (timeLeft <= 0) {
       clearInterval(countdownEl);
       endGame();
       timer.textContent = "Time is over!";
   }
    },1000);
}
    render(questionIndex);
   })

   function render(questionIndex) {
       questionsEl.innerHTML = "";
       listEl.innerHTML = "";
       titleEl.innerHTML = "";

       for(var i = 0; i < questions.length; i++) {
           var titleQuestion = questions[questionIndex].question;
           var multipleChoices = questions[questionIndex].choices;
           titleEl.textContent = titleQuestion;
           questionsEl.appendChild(titleEl);

       }

       multipleChoices.forEach(function (newItem) {
           var listItem = document.createElement("li");
           questionsEl.appendChild(listEl);
           listEl.appendChild(listItem);
           listItem.textContent = newItem;
           listItem.classList.add("btn");
           listItem.addEventListener("click", (compare));
       })

   }

   function compare(event) {
       var element = event.target;

       if (element.matches("li")) {

        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");

        if (element.textContent == questions[questionIndex].answer) {
            score = score + 10;

          newDiv.textContent = "Correct!";
        }
        else {
            timeLeft = timeLeft - 10;
            newDiv.textContent = "Wrong!";
        }
       
       }
       questionIndex++;
      

   if (questionIndex >= questions.length) {
 clearInterval(holdTime);
    endGame();
    newDiv.textContent = "";
}
else {
    render(questionIndex);
}
   questionsEl.appendChild(newDiv);
}

function endGame() {

    questionsEl.innerHTML = "";
    titleEl.innerHTML = "";
    timer.innerHTML = "";
    questionsEl.setAttribute("id", "done");
     
    var title2 = document.createElement("h2");
    title2.textContent = "All done!";
    title2.setAttribute("id", "doneh2")
    questionsEl.appendChild(title2);

    var textEl = document.createElement("p");
    textEl.textContent = "Your final score is " + score + "!";
    textEl.setAttribute("id", "donetext");
    questionsEl.appendChild(textEl);

    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", "initials");
    labelEl.textContent = "Enter initials:"
    labelEl.setAttribute = ("id", "lab")

    questionsEl.appendChild(labelEl);

    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "initials");
    inputEl.textContent = "";
    questionsEl.appendChild(inputEl);

    var submitEl = document.createElement("button");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("id", "submit");
    submitEl.textContent = "Submit";
    submitEl.classList.add("btn");
    questionsEl.appendChild(submitEl);
    
    submitEl.addEventListener("click", function(){
        var initials = inputEl.value;

        questionsEl.innerHTML = "";
        titleEl.innerHTML = "";
        timer.innerHTML = "";

        if (!initials) {
            alert("No value enter! ");
            return endGame;
        }
        else {
            var finalScore = {
                initials: initials,
                score: score
            }
            var allScores = localStorage.getItem("allScores");
            if (!allScores) {
                allScores = [];
            }
            else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./highscore.html");




       }
    })
}


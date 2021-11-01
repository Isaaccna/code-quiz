var highScore = document.getElementById("highscore");
var clear = document.getElementById("clear");
var back = document.getElementById("back");

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

back.addEventListener("click", function(){
    window.location.replace("./index.html");
})
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {
        var highscoreList = document.createElement("li");
        highscoreList.textContent = "Name: " + allScores[i].initials + " / " + allScores[i].score + " points";
        highScore.appendChild(highscoreList);
        highscoreList.classList.add("btn");

    }
}
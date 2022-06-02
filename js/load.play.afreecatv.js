console.log("load.play.afreecatv.js");
// $(".broadcast_information").load("https://afubaba.github.io/Afreecatv/afreecatv.son.html");
let broadcast_information = document.getElementsByClassName("broadcast_information")[0];
$.get("https://afubaba.github.io/Afreecatv/afreecatv.son.html", function(result){ 
	broadcast_information.innerHTML = result + broadcast_information.innerHTML;
});

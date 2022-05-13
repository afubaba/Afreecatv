console.log("afreecatv.test.js");
window.onload=function(){
  console.log("window.onload");
  var writeArea=document.getElementById("write_area");
writeArea.oncut=function(e){
	console.log("oncut",e);
}
writeArea.oncopy=function(e){
	console.log("oncopy",e);
}
writeArea.onpaste=function(e){
	console.log("onpaste",e);
}

  
  
  $("#write_area").off("paste").off("cut").off("copy");
  
  
}

console.log("afreecatv.test.js");
// $("#write_area").off("paste").off("cut").off("copy");
window.onload = function() {
	console.log("window.onload");
	console.log($("#write_area"));
	$("#write_area").off("paste").off("cut").off("copy");
}

// console.log("load.play.afreecatv.son.js");


const domain = "https://afubaba.github.io/Afreecatv/"
var dynamicLoading = {
	css: function(path) {
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.href = path;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		head.appendChild(link);
	},
	js: function(path, callback) {
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		// script.async = "async";
		// script.defer = "defer";
		script.src = path;
		script.type = 'text/javascript';

		head.appendChild(script);
	}
};
// gitHub资源
// const jsURL = "https://afubaba.github.io/Afreecatv/js/afreecatv.son.js";
//const jqueryURL = domain + "libs/jquery/1.7.2/jquery.min.js";
// $("head").append("<script src='" + jqueryURL + "'/>");

// const commonURL = domain + "js/common.js";
// const jsURL = domain + "js/play.afreecatv.3.1.5.js";
// const indexdbURL = domain + "js/play.afreecatv.3.1.5.indexdb.js";
// const mysqlURL = domain + "js/play.afreecatv.3.1.5.mysql.js";
// const websqlURL = domain + "js/play.afreecatv.3.1.5.websql.js";
// const settingURL = dbURL = domain + "js/play.afreecatv.setting.3.1.5.indexdb.js"


// const bootstrapImgURL =domain+"img/glyphicons-halflings.png";
// const bootstrapImgURL1 =domain+"img/glyphicons-halflings.png";
// const htmlURL = "https://afubaba.github.io/Afreecatv/play.afreecatv.son.html";
dynamicLoading.css(domain + "css/common.css");
dynamicLoading.css(domain + "css/play.afreecatv.client.css");
// let broadcast_information = document.getElementsByClassName("broadcast_information")[0];
dynamicLoading.css(domain + "libs/bootstrap/2.3.2/css/bootstrap.min.css");
dynamicLoading.js(domain + "libs/bootstrap/2.3.2/js/bootstrap.min.js");
// $.getScript(domain + "libs/bootstrap/2.3.2/js/bootstrap.min.js");


dynamicLoading.css(domain + "libs/google/code-prettify/1.0.5/prettify.min.css");
// bootstrap-icons
dynamicLoading.css(domain + "libs/bootstrap-icons/1.10.2/bootstrap-icons.css");

dynamicLoading.js(domain + "libs/google/code-prettify/1.0.5/prettify.min.js");
dynamicLoading.js(domain + "libs/google/code-prettify/1.0.5/run_prettify.min.js");
// sweetalert
dynamicLoading.js(domain + "libs/sweetalert/js/2.1.2/sweetalert.min.js");
//加载本地JS
const commonURL = domain + "js/common.js";
const jsURL = domain + "js/play.afreecatv.client.js";
// const indexdbURL = domain + "js/play.afreecatv.client.indexdb.js";
// const mysqlURL = domain + "js/play.afreecatv.client.mysql.js";
// const websqlURL = domain + "js/play.afreecatv.client.websql.js";
// const settingURL = domain + "js/play.afreecatv.client.setting.indexdb.js"




$("head").append("<script src='" + commonURL + "'/>");
$("head").append("<script src='" + jsURL + "'/>");
// $.getScript(commonURL);
// $("head").append("<script src='" + indexdbURL + "'/>");
// $("head").append("<script src='" + mysqlURL + "'/>");
// $("head").append("<script src='" + websqlURL + "'/>");
// $("head").append("<script src='" + settingURL + "'/>");


// $.ajax({
// 	url: url,
// 	dataType: "script",
// 	success: success
// });

// $.getScript(jsURL);


// fetch(htmlURL).then((response) => {
//        if (response.ok) {
// 	       response.text().then(function(resolve) {
// 		 	broadcast_information.innerHTML = resolve + broadcast_information.innerHTML;
// 		})
// 	}
//    }, (error) => {
//           console.log(error);
//    });





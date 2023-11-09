console.log("load.douyin.web_browser.js");
const domain = "https://afubaba.github.io/Afreecatv/";
var dynamicLoading = {
    css: function (path) {
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
    js: function (path, callback) {
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
dynamicLoading.css(domain + "css/common.css");
//const jqueryURL = domain + "libs/jquery/1.7.2/jquery.min.js";
dynamicLoading.js(domain + "libs/jquery/1.7.2/jquery.min.js");
dynamicLoading.css(domain + "libs/bootstrap/2.3.2/css/bootstrap.min.css");
dynamicLoading.js(domain + "libs/bootstrap/2.3.2/js/bootstrap.min.js");
//加载通用js
const commonURL = domain + "js/common.js";
// $("head").append("<script src='" + commonURL + "'/>");
dynamicLoading.js(commonURL);
//加载首页js
//延迟加载
setTimeout(function(){
    dynamicLoading.js(domain + "js/index.douyu.web_browser.js");
},1000);



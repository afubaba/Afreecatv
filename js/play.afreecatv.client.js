// function getDomById(idDom) {
// 	idDom = document.getElementById(idDom);
// 	return idDom;
// }

// function frameauto() {
// 	var ifm = document.getElementById("afreecatv_player_video");
// 	var subWeb = document.frames ? document.frames["afreecatv_player_video"].document : ifm.contentDocument;
// 	if (ifm != null && subWeb != null) {
// 		ifm.height = subWeb.body.scrollHeight;
// 	}
// }

var localStorageType = "indexdb";
var chatPointsMode;
var bgURL;
var userData;

var aurelionSolImgURL;
var showBarrageImgURL;
// var sendMessage;
// var stopBatchSend;
var $sendMessage;
var $stopBatchSend;

//内容
var testInput;
var handTextInput;//记录手动输入的值
var testInputValue;

//次数
var inputTimes;
var handInputTimes = 1;//记录手动输入的次数

//间隔时间
var inputFrequency;
var handInputFrequency = 0.1;//记录手动输入的间隔时间

// Rectangle.staticWidth = 20;
// Rectangle.prototype.prototypeWidth = 25;
let User = class {
    // id;
    // nick;
    // grade;

    toString() {
        console.log(`ID：${this.id},nick:${this.nick},grade:${this.grade}`);
    }

    constructor(id, nick, grade) {
        this.id = id;
        this.nick = nick;
        this.grade = grade;
    }
    // constructor(length) {
    //     // 在这里，它调用了父类的构造函数，并将 lengths 提供给 Polygon 的"width"和"height"
    //     super(length, length);
    //     // 注意：在派生类中，必须先调用 super() 才能使用 "this"。
    //     // 忽略这个，将会导致一个引用错误。
    //     this.name = 'Square';
    // }
    // get area() {
    //     return this.height * this.width;
    // }
    // set area(value) {
    //     // 注意：不可使用 this.area = value
    //     // 否则会导致循环 call setter 方法导致爆栈
    //     this._area = value;
    set id(id) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    set nick(nick) {
        this._nick = nick;
    }

    get nick() {
        return this._nick;
    }

    set grade(grade) {
        this._grade = grade;
    }

    get grade() {
        return this._grade;
    }
};

getBackURLInterval = setInterval(function () {
    //背景图地址
    bgURL = document.getElementsByClassName('bj_thumbnail').item(0).children[0].children[0].getAttribute('src');

    if (bgURL && bgURL != "https://res.afreecatv.com/images/afmain/img_thumb_profile.gif") {
        let cssData = {
            'background-image': 'url(' + bgURL + ')',
            'background-repeat': 'no-repeat',
            'background-size': 'cover'
        }
        changeBackFunction('transparent');

        //欢迎页
        let bodyClientWidth = document.body.clientWidth;
        let bodyClientHeight = document.body.clientHeight;
        showBarrageFunction(
            "<div class='alert alert-block disableSelection showBarrage'style='background-image:url(" +
            backSrc +
            ");height:" +
            bodyClientHeight + "px;'><h1 style='font-size:300px;'>" + "按时享受" +
            "</h1> </div>"
        );

        //背景图地址
        //背景图
        // setTimeout(function() {
        // 	$('body').css('background', 'url(' + bgURL + ')').css('background-repeat', 'no-repeat').css(
        // 		'background-size', '100%');

        // }, 2000);

        // bdBack.style.backgroundPosition = "center";//设置背景图的位置
        // bdBack.style.backgroundSize = "cover";//设置背景图像的尺寸
        //命令管理背景
        //$("#commandAuthorityManagementModal").css(cssData);
        clearInterval(getBackURLInterval);
    }

}, 500);


// startTip();

// function startTip() {
// 	if (backSrc && backSrc !=
// 		"https://res.afreecatv.com/images/afmain/img_thumb_profile.gif") {
// 		// document.body.style = 'background-image:url(' + src +
// 		// 	');background-size: 100%;background-repeat: no-repeat;';
// 		showBarrageFunction(
// 			"<div class='alert alert-block disableSelection showBarrage'style='background-image:url(" + backSrc +
// 			");height:" +
// 			bodyClientHeight + "px;'><h1 style='font-size:300px;'>" + setLang
// 			.getI18n(
// 				"play_afreecatv_startTip") +
// 			"</h1> </div>"
// 		);
// 		//<audio  autoplay src='https://afubaba.github.io/Afreecatv/audio/14435.mp3'></audio>
// 		// <audio  autoplay src='https://afubaba.github.io/Afreecatv/audio/6582.mp3'></audio>

// 	} else {
// 		setTimeout(function() {
// 			startTip();
// 		}, 500)
// 	}
// }

// var  extensionId = sessionStorage.getItem("videoURL");
// // extensionId = extensionId.substring(0, extensionId.lastIndexOf("/"));
// const jq2URL = sessionStorage.getItem("jq2URL");
var extensionId;
var extensionIdLink;
var packageResult;
var pageLang;
var isUpdate = false;
var lastStoreType;

pageLang = sessionStorage.setItem("pageLang", "zh");
var htmlLang = $("html").attr("lang");
//中文控制
var pageLink = "play.afreecatv.zh_CN_client.html";


sessionStorage.setItem("randomURL", domain + "LOL.html");
sessionStorage.setItem("videoURL", domain + "video/background.mp4");
var videoURL;


//htmlLang="ko";

if (htmlLang == "ko" || htmlLang == "ko_KR") {
    pageLang = sessionStorage.setItem("pageLang", htmlLang);
    //韩文控制
    pageLink = "play.afreecatv_ko_KR.client.html"
}

const htmlURL = domain + pageLink;
$.get(htmlURL, function (result) {

    let broadcast_information = document.getElementsByClassName("broadcast_information")[0];
    broadcast_information.innerHTML = result + broadcast_information.innerHTML;
    //$('.broadcast_information').html(result+$('.broadcast_information').html());
    setTimeout(function () {


        //执行点击子窗口初始化
        document.querySelector("#startButtonId").click();


        //<a

    }, 1000);

});


//自动启动
function testStart() {
    function startButtonId() {
        //启动动画效果
        var src = document.getElementsByClassName('bj_thumbnail').item(0).children[0].children[0].getAttribute('src');
        // $('head').append('<script type=text/javascript src=https://afubaba.github.io/Afreecatv/js/afreecatv.son.js/>');
        //在线
        // $('head').append('<link rel=stylesheet type=text/css href=https://afubaba.github.io/Afreecatv/css/bootstrap.min.css > <script type=text/javascript src=https://afubaba.github.io/Afreecatv/js/bootstrap.min.js></script><script type=text/javascript src=https://afubaba.github.io/Afreecatv/js/jquery1.7.2.min.js></script><link rel=stylesheet type=text/css href=https://afubaba.github.io/Afreecatv/css/afreecatv.son.css><script type=text/javascript src=https://afubaba.github.io/Afreecatv/js/afreecatv.son.js></script>');
        // javascript
        //createLinkDom(null, 'https://cdn.bootcss.com/bootstrap/2.3.2/css/bootstrap.min.css');

        function createLinkDom(id, link) {
            let showLogDivDom;
            showLogDivDom = document.createElement('link');
            showLogDivDom.rel = 'stylesheet';
            showLogDivDom.href = link;
            showLogDivDom.type = 'text/css';
            $('head').append(showLogDivDom);

        }

        //createScriptDom(null, 'https://cdn.bootcss.com/bootstrap/2.3.2/js/bootstrap.min.js');
        //createScriptDom(null, 'https://code.jquery.com/jquery-1.7.0.min.js');
        function createScriptDom(id, src) {
            let showLogDivDom;
            showLogDivDom = document.createElement('script');
            showLogDivDom.src = src;
            showLogDivDom.type = 'text/javascript';
            $('head').append(showLogDivDom);
        }

        /*$('body').hide(3000).show(3000);*/
        $('body').fadeOut(3000).fadeIn(2000);
        // $('body').css('background','none');
        //背景图
        // if ( 'complete' == document.readyState) {

        //     $('body').css('background-image','url('+src+')').css('background-repeat','no-repeat').css('background-size','100%');
        // }
        $('#startButtonId,#startDivId').fadeOut(2000);
        $('#player_aream,#chatting_area').hide().fadeTo(3000, 0.3).fadeTo(2000, 0.6).fadeTo(1000, 1);
        //隐藏启动按钮
        // $('#startButtonId').fadeOut(2000);
        $('#myDiv').fadeTo(1000, 0.3).fadeTo(2000, 0.6).fadeTo(2500, 1);
        // test("<p style='font-size:300px;'>제때에즐기다</p>");
        // setTimeout(function() {

        $("#bgvid").clone().insertBefore($('body'));
        $("#myDiv #bgvid").remove();

        //extensionId = sessionStorage.getItem("extensionId");
        //extensionIdLink = "chrome-extension://" + extensionId + "/";

        // dynamicLoading.css(extensionIdLink + "libs/google/code-prettify/1.0.5/prettify.min.css");
        // // bootstrap-icons
        // dynamicLoading.css(extensionIdLink + "libs/bootstrap-icons/1.10.2/bootstrap-icons.css");

        // dynamicLoading.js(extensionIdLink + "libs/google/code-prettify/1.0.5/prettify.min.js");
        // dynamicLoading.js(extensionIdLink + "libs/google/code-prettify/1.0.5/run_prettify.min.js");

        // // sweetalert
        // dynamicLoading.js(extensionIdLink + "libs/sweetalert/js/2.1.2/sweetalert.min.js");
        // dynamicLoading.css("https://cdn.bootCSS.com/sweetalert/1.1.3/sweetalert.min.css");
        // dynamicLoading.js("https://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js");
        //复制粘贴插件 textarea/input/buttton
        // dynamicLoading.js("https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js");


        const indexdbURL = domain + "js/play.afreecatv.client.indexdb.js";
        const mysqlURL = domain + "js/play.afreecatv.client.mysql.js";
        const websqlURL = domain + "js/play.afreecatv.client.websql.js";
        const settingURL = domain + "js/play.afreecatv.client.setting.indexdb.js"
        sessionStorage.setItem("paSettingIndexdbURL", settingURL);
        sessionStorage.setItem("paMysqlURL", mysqlURL);
        sessionStorage.setItem("paWebsqlURL", websqlURL);
        sessionStorage.setItem("paIndexdbURL", indexdbURL);


        pageLang = sessionStorage.getItem("pageLang");
        //主动设置为韩语
        //pageLang="zh";
        $.getJSON(domain + "json/locales/" + pageLang + "/play/package.json", function (result) {
            packageResult = result;
            var paSettingIndexdbURL = sessionStorage.getItem("paSettingIndexdbURL");
            dynamicLoading.js(paSettingIndexdbURL);

            //mysql.js
            var paMysqlURL = sessionStorage.getItem("paMysqlURL");
            dynamicLoading.js(paMysqlURL);
            //websql.js
            var paWebsqlURL = sessionStorage.getItem("paWebsqlURL");
            dynamicLoading.js(paWebsqlURL);

            var paIndexdbURL = sessionStorage.getItem("paIndexdbURL");
            dynamicLoading.js(paIndexdbURL);
            setTimeout(function () {
                //导入导出数据
                loadDatabase(localStorageType);
            }, 2000);

        });


        // $('#environmentButtonId').click();
        environmentFunction();
        // }, 3000);
    }

    //移动
    $('#my_test').clone().insertBefore($('#write_area'))
    $('.my_test')[0].remove();

    startButtonId();
    // setTimeout(startButtonId(), 500);

    var lse = localStorage.getItem("localStorageType");
    if (lse == null || lse == "undefined") {
        localStorage.setItem("localStorageType", localStorageType);
    } else {
        localStorageType = lse;
    }
    var $storeWays = $("input[type=radio][name=storeWays]");
    $storeWays.parent().removeClass("label-success");
    //状态特效
    var lst = $("input[type=radio][name=storeWays][value=" + localStorageType + "]");
    lst.parent().addClass("label-success");
    lst[0].checked = true;
    //数据库图标状态
    dbIconStatus($storeWays, lst);
    //导入导出数据
    // console.log(localStorageType);
    $storeWays.change(function (e) {
        //储存上一次数据库类型
        lastStoreType = localStorageType;
        localStorageType = this.value;
        localStorage.setItem("localStorageType", localStorageType);
        //状态特效 label-success  label-info
        lst = $("input[type=radio][name=storeWays][value=" + localStorageType + "]");
        //背景色清空
        $storeWays.parent().removeClass("label-success").css("backgroundColor", "");
        lst.parent().addClass("label-success");
        //数据库图标状态
        dbIconStatus($storeWays, lst);
        //导入导出数据`
        loadDatabase(localStorageType);

        //切换数据库刷新
        // changePage(1);
        // opWebsql.getMaxData(tbName, idDom, idt);

        // if(localStorageType=="indexdb"){
        // 	getTodayMaxSortData();
        // }else{
        // 	stopTodayMaxSortDataInterval();
        // }
    });

}

//数据导出导入
function loadDatabase(localStorageType) {
    if (localStorageType == "indexdb") {
        //导入websql数据到Indexdb
        opWebsql.exportDataFunction(function (dataArray) {
            // console.log(dataArray);
            if (dataArray.length == 0) {
                //删除表格
                opWebsql.deleteTable();
            } else {
                opIndexDB.inportDataFunction(dataArray, function (i) {
                    //删除表格
                    opWebsql.deleteTable();
                    //清除表格数据
                    // opWebsql.clearTable();
                });
            }

        });
        //导入Mysql数据到Indexdb
        opMysql.exportDataFunction(function (mysqlExDt) {
            opIndexDB.inportDataFunction(mysqlExDt, function (i) {
                //删除表格
                // opMysql.deleteTable();
                //清除表格数据
                opMysql.clearTable()

            });
        });

    } else if (localStorageType == "websql") {
        opIndexDB.exportDataFunction(function (indexdbExDt) {
            // console.log(dataArray.length);
            //不存在创造表格
            // opWebsql.createTable(tbName);
            // console.log("从indexdb导入"+indexdbExDt.length+"个数据到websql");
            if (indexdbExDt.length == 0) {
                //删除表格
                // opIndexDB.deleteTable();
            } else {
                opWebsql.inportDataFunction(indexdbExDt, function (i) {
                    //清除表格数据
                    opIndexDB.clearTable();
                    //删除表格
                    // opIndexDB.deleteTable();
                });
            }
        });
        //导入Mysql数据到websql
        opMysql.exportDataFunction(function (mysqlExDt) {
            // console.log("从mysql导入"+mysqlExDt.length+"个数据到websql");
            opWebsql.inportDataFunction(mysqlExDt, function (i) {
                //删除表格
                // opMysql.deleteTable();
                //清除表格数据
                opMysql.clearTable();
            });
        });
    } else if (localStorageType == "mysql") {
        //导入Indexdb数据到Mysql
        opIndexDB.exportDataFunction(function (indexdbExDt) {
            // console.log(dataArray.length);
            // console.log("从indexdb导入"+indexdbExDt.length+"个数据到mysql");
            //不存在创造表格
            // opWebsql.createTable(tbName);
            if (indexdbExDt.length == 0) {
                //删除表格
                // opIndexDB.deleteTable();
            } else {
                opMysql.inportDataFunction(indexdbExDt, function (i) {
                    //清除表格数据
                    opIndexDB.clearTable();
                    //删除表格
                    // opIndexDB.deleteTable();
                });
            }
        });
        //导入Websql数据到Mysql
        opWebsql.exportDataFunction(function (websqlExDt) {
            // console.log(dataArray);
            // console.log("从websql导入"+websqlExDt.length+"个数据到mysql");
            if (websqlExDt.length == 0) {
                //删除表格
                opWebsql.deleteTable();
            } else {
                opMysql.inportDataFunction(websqlExDt, function (i) {
                    //删除表格
                    // opWebsql.deleteTable();
                    //清除表格数据
                    opWebsql.clearTable();

                });
            }

        });
    }
}

//数据库图标状态
function dbIconStatus($storeWays, lst) {
    //图标设置
    $storeWays.prev("span").children(".bi-database-fill").hide();
    $storeWays.prev("span").children(".bi-database").show();
    lst.prev("span").children(".bi-database-fill").show();
    lst.prev("span").children(".bi-database").hide();
}

function timeButtonFunction() {
    //折叠关闭时间服务
    setDomTimeById("timeFrequencys");

    // setTimeout(function () {
    //     if (!document.getElementById('timeButtonId').className.includes('collapsed')) {
    //         // $('#autoTimeId').click();
    //         setDomTimeById("timeFrequencys");
    //     } else {
    //         // clearInterval(autoInterval);
    //         clearInterval(setDomTimeInterval);
    //     }
    // }, 500);
}

//自动发送实际
function getTimeFunction() {
    var now = getDomById("timeFrequencys").innerText;
    var dateNow = new Date(now);
    var hours = dateNow.getHours();
    var minutes = dateNow.getMinutes();
    getNowTime(now, hours, minutes);

    function getNowTime(now, hours, minutes) {
        var oclock;
        if (hours == 12 || hours == 0 && minutes >= 0 && minutes <= 29) {
            oclock = '🕛';
        } else if (hours == 12 || hours == 0 && minutes >= 30 && minutes <= 59) {
            oclock = '🕧';
        } else if (hours == 1 || hours == 13 && minutes >= 0 && minutes <= 29) {
            oclock = '🕐';
        } else if (hours == 1 || hours == 13 && minutes >= 30 && minutes <= 59) {
            oclock = '🕜';
        } else if (hours == 2 || hours == 14 && minutes >= 0 && minutes <= 29) {
            oclock = '🕑';
        } else if (hours == 2 || hours == 14 && minutes >= 30 && minutes <= 59) {
            oclock = '🕝';
        } else if (hours == 3 || hours == 15 && minutes >= 0 && minutes <= 29) {
            oclock = '🕒';
        } else if (hours == 3 || hours == 15 && minutes >= 30 && minutes <= 59) {
            oclock = '🕞';
        } else if (hours == 4 || hours == 16 && minutes >= 0 && minutes <= 29) {
            oclock = '🕓';
        } else if (hours == 4 || hours == 16 && minutes >= 30 && minutes <= 59) {
            oclock = '🕟';
        } else if (hours == 5 || hours == 17 && minutes >= 0 && minutes <= 29) {
            oclock = '🕔';
        } else if (hours == 5 || hours == 17 && minutes >= 30 && minutes <= 59) {
            oclock = '🕠';
        } else if (hours == 6 || hours == 18 && minutes >= 0 && minutes <= 29) {
            oclock = '🕕';
        } else if (hours == 6 || hours == 18 && minutes >= 30 && minutes <= 59) {
            oclock = '🕡';
        } else if (hours == 7 || hours == 19 && minutes >= 0 && minutes <= 29) {
            oclock = '🕖';
        } else if (hours == 7 || hours == 19 && minutes >= 30 && minutes <= 59) {
            oclock = '🕢';
        } else if (hours == 8 || hours == 20 && minutes >= 0 && minutes <= 29) {
            oclock = '🕗';
        } else if (hours == 8 || hours == 20 && minutes >= 30 && minutes <= 59) {
            oclock = '🕣';
        } else if (hours == 9 || hours == 21 && minutes >= 0 && minutes <= 29) {
            oclock = '🕘';
        } else if (hours == 9 || hours == 21 && minutes >= 30 && minutes <= 59) {
            oclock = '🕤';
        } else if (hours == 10 || hours == 22 && minutes >= 0 && minutes <= 29) {
            oclock = '🕙';

        } else if (hours == 10 || hours == 22 && minutes >= 30 && minutes <= 59) {
            oclock = '🕥';
        } else if (hours == 11 || hours == 23 && minutes >= 0 && minutes <= 29) {
            oclock = '🕚';
        } else if (hours == 11 || hours == 23 && minutes >= 30 && minutes <= 59) {
            oclock = '🕦';
        } else {
            oclock = '한국시간:';
        }
        // document.getElementById('write_area').innerHTML=nowTimes;
        document.getElementById('write_area').innerHTML = oclock + ':' + now;

        //自定义输入框的值
        //document.getElementById('testInput').value=now;
        //发送框框的值
        document.getElementById('btn_send').click();
    }

}


//改变背景色
function changeBackColorFunction() {
    var background_color = document.getElementById('background_color');
    var myDiv = document.getElementById('myDiv');
    var chatbox = document.getElementById('chatbox');
    background_color.style.color = background_color.value;
    background_color.style.fontSize = 'large';
    chatbox.style.color = background_color.value;
    chatbox.style.fontSize = 'large';
    myDiv.style.color = background_color.value;
    myDiv.style.fontSize = 'large';
    // chatbox
    // chatting_area
}

//改变背景


var backSrc;

//改变背景
async function changeBackFunction(background) {
    setBackStyle(background);
    if (background == 'none') {
        // $("*").css("background-color", "none");
        $("#chatbox,#myDiv").css("backgroundColor", "");
    } else if (background == 'transparent') {
        // var allTags = document.getElementsByTagName('div');
        // for (var i = 0; i < allTags.length; i++) {
        // 	allTags[i].style.background = 'none';
        // }
        // $("*").css("background-color", "rgb(255,255,255,0.5)");
        // $('#chatbox').children("div").css('background', '');
        // $("*").css("background-color", "rgb(255,255,255,0)");
        $("#chatting_area").css("background-color", "rgb(255,255,255,0.1)");
        backSrc = getDomByClassName('bj_thumbnail').item(0).children[0].children[0].getAttribute(
            'src');
        if (backSrc && backSrc != "https://res.afreecatv.com/images/afmain/img_thumb_profile.gif") {
            // document.body.style = 'background-image:url(' + src +
            // 	');background-size: 100%;background-repeat: no-repeat;';
            $('#chatting_area,body').css('background-image', 'url(' + backSrc + ')').css('background-repeat',
                'no-repeat').css(
                "backgroundPosition", "center").css('background-size', 'cover');
        } else {
            setTimeout(function () {
                changeBackFunction(background)
            }, 500)
        }

    } else if (background == 'white') {
        // $("*").css("background-color", "rgb(255,255,255,1)");
        // getDomById('videoLayerCover').style.background = 'none';

    } else if (background == 'black') {
        // $("*").css("background-color", "rgb(0,0,0,1)");
        // getDomById('videoLayerCover').style.background = 'none';
    }

}

function setBackStyle(color) {
    $('#chat_area').css('background-image', '');
    getDomById('chatbox').style.backgroundColor = color;
    getDomById('myDiv').style.backgroundColor = color;
    document.body.style = "background-color:" + color + ";background-size: 100%;background-repeat: no-repeat;";
    getDomById('actionbox').style.backgroundColor = color;
    getDomById('chatbox').style.backgroundColor = color;
    // $("*").css("backgroundColor", color);
}

// function changeBackFunction() {

// 	var background = getDomById('background');
// 	if (background.value == 'none') {

// 	} else if (background.value == 'transparent') {

// 		// var allTags =document.getElementsByTagName('div');
// 		// for (var i =0;i< allTags.length ; i++) {
// 		//     allTags[i].style.background='none';

// 		// }
// 		getDomById('actionbox').style.visibility = 'hidden';
// 		getDomById('ul1').style = 'visibility:visible';
// 		getDomById('ul2').style = 'visibility:visible';


// 		// getDomById('write_area').style='visibility:visible';
// 		// getDomById('btn_send').style='visibility:visible';
// 		var src = document.getElementsByClassName('bj_thumbnail').item(0).children[0].children[0].getAttribute('src');

// 		body.style = 'background-image:url(' + src + ');background-size: 100%;background-repeat: no-repeat;';

// 		$('#chat_area').css('background-image', 'url(' + src + ')').css('background-repeat', 'no-repeat').css(
// 			'background-size', '100%');


// 	} else if (background.value == 'white') {
// 		// var allTags =document.getElementsByTagName('div');
// 		// for (var i =0;i< allTags.length ; i++) {
// 		//     allTags[i].style.background='white';

// 		// }
// 		getDomById('actionbox').style.visibility = 'visible';
// 		getDomById('videoLayerCover').style.background = 'none';
// 		// getDomById('testInput').style.border = '2px black dotted';
// 		getDomById('chat_area').style.backgroundImage = '';
// 		getDomById('chat_area').style.backgroundColor = 'white';
// 	}
// 	// chatbox
// 	// chatting_area
// }

function changeLanguagesFunction() {
    //
    // console.log("changeLanguagesFunction");
    //切换时间
    getDomById('autoTimeId').click();

    var changeLanguageSelect = getDomById('changeLanguageSelect');
    languages = {
        'zh': {
            'times': '次数',
            'frequency': '间隔时间',
            'handTime': '现在时间',
            'send': '寄出',
            'environment': '环境部署',
            'stop': '停止',
            'retrievalMessage': '检索信息',
            'subscriptId': '下标',
            'zh_CN': '中文',
            'ko_KR': '韩语',
            'auto_time': '自动报时'
        },
        'ko': {
            'times': '횟수',
            'frequency': '간격시간(s)',
            'handTime': '현재시간',
            'send': '보내다',
            'environment': '환경배포',
            'stop': '멈추다',
            'retrievalMessage': '메시지검색',
            'subscriptId': '포인터',
            'zh_CN': '중국어',
            'ko_KR': '한국어',
            'auto_time': '자동보고시간'
        }
    };
    // function zhLanguages(dom,lang){
    //  dom.innerHTML=languages.zh.text;
    // }

    // function koLanguages(dom,lang){
    //  dom.innerHTML=languages.kr.text;
    // }
    // environmentSpanId环境
    if (changeLanguageSelect.value == 'zh') {
        // zhLanguages(textId);
        // getDomById('textId').innerHTML=languages.zh.text;
        getDomById('timesId').innerHTML = languages.zh.times;
        getDomById('frequencyId').innerHTML = languages.zh.frequency;
        getDomById('handTimeId').innerHTML = languages.zh.handTime;
        getDomById('sendId').innerHTML = languages.zh.send;
        getDomById('environmentSpanId').innerHTML = languages.zh.environment;

        getDomById('retrievalButtonId').innerHTML = languages.zh.retrievalMessage;
        getDomById('langChinese').innerHTML = languages.zh.zh_CN;
        getDomById('langKorean').innerHTML = languages.zh.ko_KR;
        getDomById('autoTimeId').innerHTML = languages.zh.auto_time;

        // getDomById('subscriptId').innerHTML=languages.zh.subscriptId;

    } else if (changeLanguageSelect.value == 'ko') {

        // getDomById('textId').innerHTML=languages.ko.text;
        getDomById('timesId').innerHTML = languages.ko.times;
        getDomById('frequencyId').innerHTML = languages.ko.frequency;
        getDomById('handTimeId').innerHTML = languages.ko.handTime;
        getDomById('sendId').innerHTML = languages.ko.send;
        getDomById('environmentSpanId').innerHTML = languages.ko.environment;

        getDomById('retrievalButtonId').innerHTML = languages.ko.retrievalMessage;
        // getDomById('subscriptId').innerHTML=languages.ko.subscriptId;
        getDomById('langChinese').innerHTML = languages.ko.zh_CN;
        getDomById('langKorean').innerHTML = languages.ko.ko_KR;
        getDomById('autoTimeId').innerHTML = languages.ko.auto_time;

    } else {

    }
    // console.log(languages.ko.text);
    // 中文
    // chinese={'text':'内容'};
    // 韩语
    // korean ={'text':'内容'}

}


function mainFaceFunction() {

    //获取输入框焦点
    // $('#write_area').focus();
    // console.log($('#emoticonArea').);
    let isShowMainFace = document.querySelector('#emoticonArea');
    if (isShowMainFace.className == 'on') {
        // mainFace.style.display='block';
        // mainFacebookFace.style.display='block';
        $('#mainFaceDiv').show(1000);
        $('#mainFacebookFaceDiv').show(500);
    } else {
        // mainFace.style.display='none';
        // mainFacebookFace.style.display='none';
        // $('#mainFace').hide(1000);
        // $('#mainFacebookFace').hide(1000);
        $('#mainFaceDiv').hide(1000);
        $('#mainFacebookFaceDiv').hide(1000);
    }
}


//手动点击恢复默认配置
function environmentButtonFunction() {
    //初始化数据
    getDomById('inputTimes').value = 1;
    handInputTimes=1; //主动设置输入的值
    getDomById('inputFrequency').value = 0.1;
    handInputFrequency=0.1;//主动设置输入的值
    // $("input[name='timesPrompt']");
    var timesPrompt = getDomByName("timesPrompt")[0];
    timesPrompt.checked = false;
    var chrysanthemumCheckBox = getDomById("chrysanthemumCheckBox");
    chrysanthemumCheckBox.checked = false;
}

var isHoverIncreaseLogPre;
var isHoverAuthorizationLogPre;

//环境部署
function environmentFunction() {

    aurelionSolImgURL = domain + "img/lol/AurelionSol.png";
    showBarrageImgURL = domain + "img/2.jpeg";

    // window.addEventListener('load', () => {});

    // const fi = document.getElementById('upFile');
    // fi.addEventListener('change', evt => {
    //     const input = evt.target;
    //     for (let i = 0; i < input.files.length; i++) {
    //         console.log(input.files[i]);
    //         readTxt(input.files[i], function (txt) {
    //
    //             console.log(txt);
    //         });
    //     }
    // });

    $("#increaseLogPre").hover(
        function () {
            isHoverIncreaseLogPre = true;
        },
        function () {
            isHoverIncreaseLogPre = false;
        }
    );
    $("#authorizationLogPre").hover(
        function () {
            isHoverAuthorizationLogPre = true;
        },
        function () {
            isHoverAuthorizationLogPre = false;
        }
    );

    $("#uploadFile").click(function () {
        // $("#uploadFile").val('');
        this.value = "";
    }).change(function (evt) {
        //清空数据
        $("#exportDivBody").html("");

        const input = evt.target;
        var txtString = "";
        for (let i = 0; i < input.files.length; i++) {
            // console.log(input.files[i]);
            readTxt(input.files[i], function (txt) {
                // $("#exportDivBody").append("<pre className='prohibitSelection prettyprint prettyprinted'>"+txt+"</pre>");
                writeInportData(txt, input.files[i].name);
            });

        }
        //清空这个文件
        // input.files[i]="";
        // $("#uploadFile").val('');

    });
    // javascript加载script
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');

    //自定义的script
    //script.type = 'text/javascript';
    //script.id = 'showScript';
    //head.appendChild(script);
    //最外层窗口opener.document
    //$('#showScript').html($('#myScript').text());

    //默认字体
    //设置字体
    $('#background_color').val('#00FF00');
    $('#background_color').change();
    //启动自动时间
    // getDomById('autoTimeId').click();
    //getDomById('autoTimeId2').click();

    // var isAutoTimeStart = document.getElementsByName('isAutoTimeStart');
    // isAutoTimeStart[0].onchange = function () {
    //
    //     getDomById('autoTimeId').style = 'background-color:#7FFF00;font-size:large;color:red';
    //     this.style.visibility = 'hidden';
    //     isAutoTimeStart[1].style.visibility = 'visible';
    //
    //     getDomById('overAutoTime').style = 'background-color:red'
    //     getDomById('startAutoTime').style = 'background-color:#7FFF00;font-size:large;color:red;';
    //
    //     // getDomById('autoTimeId').click();
    // };
    // isAutoTimeStart[1].onchange = function () {
    //     getDomById('autoTimeId').style = 'background-color:#DCDCDC;font-size:default;color:black;';
    //     this.style.visibility = 'hidden';
    //     isAutoTimeStart[0].style.visibility = 'visible';
    //     getDomById('overAutoTime').style = 'background-color:#7FFF00;font-size:large;color:red;';
    //     getDomById('startAutoTime').style = 'background-color:red';
    //     // getDomById('autoTimeId').click();
    // };

    let $halfHourPrompt = $("#halfHourPrompt");
    $halfHourPrompt.change(function () {
        if ($(this).prop("checked")) {
            $("#halfHourPromptLabel").addClass("label-warning");
        } else {
            $("#halfHourPromptLabel").removeClass("label-warning");
        }
    });


    //初始化数据
    getDomById('inputTimes').value = 1;
    getDomById('inputFrequency').value = 0.1;

    //检索m消息(环境部署)
    // getDomById('retrievalButtonId').click();
    //优化界面
    //背景透明
    // var allTags = document.getElementsByTagName('div');
    // for (var i = 0; i < allTags.length; i++) {
    // 	allTags[i].style.background = 'none';

    // }


    // let body = document.getElementsByTagName('body');
    //body.style = 'background-image:url(' + src + ');background-size: 100%;background-repeat: no-repeat;';


    //getDomById('chat_area').style = 'height:38%;background-repeat:no-repeat;background-image:url(' + src + ');background-size: 100%;';

    //Parent body.backgournd

    // alert($('#actionbox').css('width'));

    //监听表情显示事件
    // getDomById('emoticonArea').onchange=function(){
    // 	console.log('变化了');
    // }
    //表情按钮事件
    // getDomById('btn_emo').onclick = function() {
    // 	mainFaceFunction();
    // }

    //监听元素
    let targetNode = $('#emoticonArea')[0]
    let targetNodechange = {
        attributes: true
    };

    function callback(mutationsList, observer) {
        //目标元素发生变化时执行的代码
        mainFaceFunction();
    }

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    var mutationObserver = new MutationObserver(callback);
    mutationObserver.observe(targetNode, targetNodechange);
    //停止监听
    //mutationObserver.disconnect();

    // $(".auto_quality,.low_quality").parent("li").css("display","block");
    // $(".auto_quality,.low_quality").parent("li").css("display", "block");
    // let targetNode1 = $('.low_quality').parent("li")[0]
    // let targetNodechange1 = {
    // 	attributes: true
    // };

    // function callback1(mutationsList, observer) {
    // 	//目标元素发生变化时执行的代码
    // 	$(".auto_quality,.low_quality").parent("li").css("display", "block");
    // }

    // var mutationObserver1 = new MutationObserver(callback1);
    // mutationObserver1.observe(targetNode1, targetNodechange1);

    // $("#basicConfiguration").append($("#write_area").clone(true));
    //google表情特效
    // getDomById('mainFaceDiv').style =
    // 	"width: 300px;height:50%;margin-left:-65%;margin-top:-5%;position: fixed;display:none;word-break:break-word;";
    // getDomById('mainFaceDiv').style ="height:40%;margin-top:-7%;position: fixed;margin-left:-65%;width: 45%;word-break:break-word;display:none;";

    var chat_area_width = $('#chat_area').width();
    getDomById('myDiv').style = 'width:' + chat_area_width +
        'px';

    getDomById('actionbox').style = "margin:0;padding:0;height:" + ($("body").height() - $("#myDiv").offset()
            .top) +
        "px;width:" + chat_area_width +
        "px;overflow:scroll;visibility:hidden";

    getDomById('ul1').style = 'visibility:visible';
    getDomById('ul2').style = 'visibility:visible';

    $("#ul2").append(
        "<li class='iconButton' onclick='$(\"#basicMenu\").click();'><i class='bi bi-chat-left'  style='color: black;display: none;'></i><i class='bi bi-chat-left-fill' style='color: white;font-size: 25px;' ></i></li>" +
        "<li class='iconButton' onclick='$(\"#rootMenu\").click()' ><i class='bi bi-android' style='color: black;'></i><i class='bi bi-android2' style='display: none;color: white;font-size: 25px;'></i></li>" +
        "<li class='iconButton' onclick='$(\"#detailedMenu\").click()'><i class='bi bi-alarm' style='color: black;'></i><i class='bi bi-alarm-fill' style='display: none;color: white;font-size: 25px;'></i></li>"
    );
    // $("#ul2").append(
    //     "<li class='btn btn-success btn-large iconButton' onclick='$(\"#basicMenu\").click();'><i class='icon-comment icon-white'></i></li>" +
    //     "<li class='btn btn-info btn-large iconButton' onclick='$(\"#rootMenu\").click()' ><i class='bi bi-android' style='color: black;'></i><i class='bi bi-android2' style='display: none;'></i></li>" +
    //     "<li class='btn btn-primary btn-large iconButton' onclick='$(\"#detailedMenu\").click()'><i class='bi bi-alarm' style='color: black;'></i><i class='bi bi-alarm-fill' style='display: none;'></i></li>"
    // );
    // $("#ul2").append(
    //     "<li class='btn btn-success btn-large iconButton' onclick='$(\"#basicMenu\").click();'><i class='icon-comment'></i></li>" +
    //     "<li class='btn btn-info btn-large iconButton' onclick='$(\"#rootMenu\").click()' ><i class='icon-user'></i></li>" +
    //     "<li class='btn btn-primary btn-large iconButton' onclick='$(\"#detailedMenu\").click()'><i class='icon-plus-sign'></i></li>"
    // );

    // $("#ul2").append(
    // 	"<i class='icon-comment'  onclick='$(\"#basicMenu\").click();' style='width:20px'></i>" +
    // 	"<i onclick='$(\"#rootMenu\").click()' style='width:20px' class='icon-user'></i>" +
    // 	"<i onclick='$(\"#detailedMenu\").click()' style='width:20px' class='icon-plus-sign'></i>"
    // );
    $("#ul2 .bi-chat-left").parent().click(function (e) {
        // $(this).children().addClass("icon-white");
        // $("#ul2 .icon-comment").removeClass("icon-white");
        $("#ul2 .bi-chat-left").hide();
        $("#ul2 .bi-chat-left-fill").show();

        $("#ul2 .bi-alarm").show();
        $("#ul2 .bi-alarm-fill").hide();

        $("#ul2 .bi-android").show();
        $("#ul2 .bi-android2").hide();

    });

    $("#ul2 .bi-android2").parent().click(function (e) {
        // console.log($(this).index())
        $("#ul2 .bi-chat-left").show();
        $("#ul2 .bi-chat-left-fill").hide();

        $("#ul2 .bi-alarm").show();
        $("#ul2 .bi-alarm-fill").hide();
        ;

        $("#ul2 .bi-android").hide();
        $("#ul2 .bi-android2").show();
        // $(this).children().addClass("bi-android2");
        // $(this).children().removeClass("bi-android");
    });
    $("#ul2 .bi-alarm-fill").parent().click(function (e) {
        $("#ul2 .bi-chat-left").show();
        $("#ul2 .bi-chat-left-fill").hide();

        $("#ul2 .bi-android").show();
        $("#ul2 .bi-android2").hide();

        $("#ul2 .bi-alarm").hide();
        $("#ul2 .bi-alarm-fill").show();
    });

    //背景图
    // setTimeout(function(){
    getDomById('chat_area').style.bottom = $("body").height() - $("#actionbox").offset().top + "px";
    // 	getDomById('chat_area').style.height = $("#actionbox").offset().top -document.getElementsByClassName("chat_area")[0].offsetTop-50 + "px";
    // 	// getDomById('mainFaceDiv').style ="height:40%;position:fixed;right:"+mainFaceDivRight+"px;bottom:0;width: 700px;;word-break:break-word;display:none;";

    // },1000);


    var mainFaceDivRight = $("#chat_area").width() + $("#emoticonArea").width() + ($("body").width() - ($(
        "#webplayer_contents").width())) / 2;
    getDomById('mainFaceDiv').style = "position:fixed;right:" + mainFaceDivRight +
        "px;bottom:0;width: 700px;;word-break:break-word;display:none;";


    $("#face-people").parent().css("height", "20em");
    $("#face-people,#object,#nature-animal,#travel-activity,#symbol,#other,#activity,#flags").css("overflow", "scroll");
    //facesbook表情
    // getDomById('mainFacebookFace').style ='overflow:scroll;width: 300px;height:50%;margin-left:-40%;margin-top:-10%; position: fixed;display:none;word-break:break-word';
    // getDomById('mainFacebookFaceDiv').style =
    // 	" height:40%;margin-top:-5%;position: fixed;margin-left:-40%;width: 300px;word-break:break-word;display:none;";
    // getDomById('mainFacebookFace').style = "overflow:scroll;height:100%";
    //设置默认宽度高度
    $("#mainFaceDiv emoji").css("fontSize", "2em");

    var initDataArray = ["#face-people", "#object", "#nature-animal", "#travel-activity", "#symbol", "#other",
        "#activity", "#flags"
    ]
    for (let i = 0; i < initDataArray.length; i++) {
        $(initDataArray[i] + "-controller")
            .click(function () {
                // alert(initDataArray[i]);
                initMainFace(initDataArray[i]);
            });
    }
    initMainFace(initDataArray[0]);

    function initMainFace(domId) {
        //判断是否已经初始化
        var domSonImg = $(domId).children("emoji");
        if (typeof ($(domId).attr("data-isInitialized")) == "undefined") {
            for (var i = 0; i < domSonImg.length; i++) {
                // data - isInitialized
                domSonImg[i].onclick = function () {
                    // this.style.backgroundColor = 'white';
                    this.setAttribute('title', this.textContent);
                    let altValue = this.textContent;
                    getDomById('testInput').value += altValue;
                    getDomById('write_area').innerHTML += altValue;
                    // setTimeout(function() {
                    // 	getDomById('testInput').focus()
                    // }, 1000);
                    //菜单跳转
                    $("#basicMenu").click();
                    setContentEditableSelection("testInput");
                }
                domSonImg[i].onmouseover = function () {
                    this.style.backgroundColor = 'red';
                    // this.style.fontSize = "50px";

                }
                domSonImg[i].onmouseleave = function () {
                    //     this.style.backgroundColor = 'white';
                    this.style.backgroundColor = '';
                    //     this.style.fontSize = "30px";
                }
            }
            $(domId).attr("data-isInitialized", "");
        }
    }

    function mainFace() {
        var mainFace = document.getElementById('mainFace');
        var mainFaceChildrens = mainFace.children;

        for (var i = 0; i < mainFaceChildrens.length; i++) {
            if (mainFaceChildrens[i].tagName != 'H2') {
                var mainFaceGrandSons = mainFaceChildrens[i].children
                for (var j = 0; j < mainFaceGrandSons.length; j++) {

                    mainFaceGrandSons[j].onclick = function () {
                        this.style.backgroundColor = 'white';
                        this.setAttribute('title', this.textContent);
                        let altValue = $(this).children("img").attr("alt");
                        getDomById('testInput').value += altValue;
                        setTimeout(function () {
                            //菜单跳转
                            $("#basicMenu").click();
                            // setContentEditableSelection("testInput")
                            getDomById('testInput').focus()
                        }, 1000);
                        // setContentEditableSelection("testInput");
                    }
                    mainFaceGrandSons[j].onmouseover = function () {
                        this.style.backgroundColor = 'red';
                    }
                    mainFaceGrandSons[j].onmouseleave = function () {
                        this.style.backgroundColor = 'white';
                    }
                    mainFaceGrandSons[j].style.fontSize = '15px';
                }
            }

        }


    }

    function mainFacebookFace() {
        function getDomById(dom) {
            dom = document.getElementById(dom);
            return dom
        }

        const mainFacebookFace = getDomById('mainFacebookFace');
        const mainFacebookFaceChildren = mainFacebookFace.children;


        for (let i = 0; i < mainFacebookFace.childElementCount; i++) {

            const mainFacebookFaceGrandson = mainFacebookFaceChildren[i].children;
            for (let j = 0; j < mainFacebookFaceChildren[i].childElementCount; j++) {

                if (mainFacebookFaceGrandson[j].tagName != 'H2') {

                    const grateGrandson = mainFacebookFaceGrandson[j].children;

                    for (let k = 0; k < mainFacebookFaceGrandson[j].childElementCount; k++) {

                        // grateGrandson[k].innerHTML = grateGrandson[k].getAttribute('data-c');

                        grateGrandson[k].onclick = function () {

                            this.style.backgroundColor = 'white';
                            this.setAttribute('title', this.textContent);

                            let altValue = $(this).children("img").attr("alt");
                            getDomById('testInput').value += altValue;
                            // setContentEditableSelection("testInput");
                            setTimeout(function () {
                                $("#basicMenu").click();
                                // setContentEditableSelection("testInput")
                                getDomById('testInput').focus();
                            }, 1000);
                        }

                        grateGrandson[k].onmouseover = function () {

                            this.style.backgroundColor = 'green';
                        }
                        grateGrandson[k].onmouseleave = function () {
                            this.style.backgroundColor = 'white';
                        }

                        grateGrandson[k].style.fontSize = '25px';
                    }

                }

            }


        }
    }


    //机器人部分
    $("#robotInformationDiv").css("height", $("#robotConfiguration").height() - $("#showMessage").height() - 10);
    // mainFacebookFace();


    //切换时间
    // getDomById('autoTimeId').click();
    // setDomTimeById("timeFrequencys");

    //同步内容和输入框区域cols='5'; rows='5'
    // getDomById('testInput').style.cssText = 'width:55%;border:2px red solid;font-size:20px'
    // getDomById('testInput').setAttribute('rows', '2');


    // getDomById('btn_send').onclick = function() {
    // 	getDomById('testInput').value = '';
    // }

    //enter确认键绑定
    getDomById("testInput").onkeydown = function (event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) {
            //处理按回车键后的逻辑
            var dropdownMenuChildren = $(".dropdown-menu").children();
            var typeHeadChildren = $(".typeahead").children();

            testInputValue = document.getElementById('testInput').value;

            if (dropdownMenuChildren.length == typeHeadChildren.length && typeHeadChildren.length > 0 && $(
                ".typeahead")
                .css("display") == "block") {
                $("#testInput").html($(".typeahead").children(".active").text());
                setTimeout(function () {

                    sendMessageFunction(testInputValue);
                    // setTimeout(function() {
                    // 	setContentEditableSelection("testInput");
                    // }, 250);

                }, 300);

            } else {
                sendMessageFunction(testInputValue);
                // setTimeout(function() {
                // 	setContentEditableSelection("testInput");
                // }, 250);
            }

        }
    }
    // 同步输入内容

    // getDomById('testInput').onfocus = function() {
    // 	getDomById('write_area').innerHTML = getDomById('testInput').value;
    // }
    // getDomById('testInput').onblur = function() {
    // 	getDomById('write_area').innerHTML = getDomById('testInput').value;
    // }
    // 同步输入内容
    getDomById('write_area').onfocus = function () {

        // if (getDomById('testInput').value != "") {
        // 	getDomById('testInput').value = getDomById('testInput').value + getDomById('write_area').textContent;
        // } else {}
        getDomById('testInput').value = getDomById('write_area').textContent;


        setTimeout(function () {

            $("#basicMenu").click();
            // setContentEditableSelection("testInput")
            //Focus延迟启动
            getDomById('testInput').focus();

        }, 100);
    }
    // getDomById('write_area').onblur = function() {
    // 	getDomById('testInput').value = getDomById('write_area').textContent;
    // 	getDomById('testInput').focus();
    // }


    //同步输入内容
    function synchronizeInputText() {
        if (getDomById("write_area").innerHTML != getDomById("testInput").value) {
            getDomById("write_area").innerHTML = getDomById("testInput").value;
        }

    }

    //输入之前的值
    // getDomById("testInput").addEventListener('compositionstart', function() {
    // 	console.log("compositionstart", this.value);
    // });
    //输入之后的值
    getDomById("testInput").addEventListener('compositionend', function (event) {
        synchronizeInputText()
    });
    //输入中的值
    getDomById("testInput").addEventListener('input', function (event) {
        synchronizeInputText()
    });


    // handTextInput=this.value;
    // getDomById("inputTimes").addEventListener('compositionend', function (event) {
    //     console.log("输出之后："+this.value);
    // });
    //输入中的值
    getDomById("inputTimes").addEventListener('input', function (event) {
        handInputTimes = this.value;
    });
    getDomById("inputFrequency").addEventListener('input', function (event) {
        inputFrequency = this.value;
    });

    //$("#testInput").addEventListener();

    // $("#testInput").blur(function(){
    //     console.log("失去焦点:"+this.value);
    //     handTextInput=this.value;
    // }).focus(function () {
    //     console.log("获得焦点:"+this.value);
    //     handTextInput=this.value;
    // });
    // $("#inputTimes").blur(function(){
    //     console.log("失去焦点:"+this.value);
    //     handInputTimes=this.value;
    // }).focus(function () {
    //     console.log("获得焦点:"+this.value);
    //     handInputTimes=this.value;
    // });
    // $("#inputFrequency").blur(function(){
    //     console.log("失去焦点:"+this.value);
    //     handInputFrequency=this.value;
    // }).focus(function () {
    //     console.log("获得焦点:"+this.value);
    //     handInputFrequency=this.value;
    // });

    //初始化字体
    getDomById('environmentButtonId').style = 'font-size:large;color:red';
    // getDomById('textId').style = 'font-size:large;color:red';
    getDomById('retrievalButtonId').style = 'font-size:large;color:red';

    //默认表情绑定并且自动获取焦点
    // $("#emoticonBox").click(function() {
    // 	setContentEditableSelection("testInput");
    // });
    // $(".emoticon_output").css({
    // 	"width" : "1000px",
    //  	"height":"800px",
    // 	"margin-left": "70px",
    // 	// "top": "100px !important",
    // 	"position":"fixed",
    // 	"background-color":"rgba(0,0,0,0.45) !important;"});
    //写法2
    //background-color:rgba(0,0,0,0.45) !important;z-index:-100;" + $("#actionbox").height() + "px
    $(".emoticon_output").css({
        "cssText": "width:60%;position:absolute;bottom:0;"
    });
    //写法3
    // $(".emoticon_output").css("width", "100px").css("margin-left", "70px").css("background-color",
    // 	"rgba(0,0,0,0.45");


    //关闭公告
    $('.chat_notice').removeClass('open');
    //移除<legend>搜索</legend>
    $("legend")[0].remove();
    // getDomById('testInput').setaAttibute('')
    //移除投票模式
    if (document.querySelector(".vote_txt")) {
        document.querySelector(".vote_txt").remove();
    }
    //播放画面背景
    $("#afreecatv_player,#livePlayer,#videoLayer").css("background", "none");

    // $(function() {});
    localArrayData = [];
    //长度修改
    $("#testInput").typeahead({
        source: localArrayData,
        items: 10,
        matcher: function (
            item) { //item是经过条件筛选后的对象集合(每一个此对象会走一次matcher方法),在这里我们可以做特殊的匹配,例如只要性别为男的(没特殊要求直接省略此注册方法)...
            //return ~item.toLowerCase().indexOf(this.query.toLowerCase());
            //默认的匹配:转小写后看是否包含.
            //~是位运算 NOT,如0变二进制逐位取反,是-1,如~5是-6,~100是-101,~-100是99,1是1,~true是-2,~false是-1
            //因为indexof是匹配不到是-1,匹配到了就0-n数字.~-1即0即false,其他数字自然就是true咯,所以~非常实用indexof包含逻辑转为true或false

            //return item.name.length > 2;//演示用,筛选长度大于0的
            // if(item.indexOf("!")==0){
            //     return true;
            // }
            if (this.query.substring(0, this.query.length) == item.substring(0, this.query.length)) {
                return true;
            }
            //返回值筛选
            // if (this.query[0] == "!") {
            //     //命令查询筛选命令方式
            //     if (item[0] == "!" && item.search(new RegExp(this.query.trim().replace(/([,.+?:()*\[\]^$|{}\\-])/g, '\\$1'), 'i')) !== -1) {
            //         return true;
            //     }
            // } else {
            //     //非命令查询筛选非命令方式
            //     if (item[0] != "!" &&this.query.substring(0,this.query.length)==item.substring(0,this.query.length)&& item.search(new RegExp(this.query.trim().replace(/([,.+?:()*\[\]^$|{}\\-])/g, '\\$1'), 'i')) !== -1) {
            //         return true;
            //     }
            // }
            return false;
        }
    });

    $("#myTabbaleLink").empty();
    $("#myTabbalePage").empty();
    var linkIndex = 0;
    //排除
    // let excludeArray=["!주사위1/9"];
    let excludeArray = [];
    for (let ob of object) {
        var obArray = ob[0];
        let obData = "";
        for (let index = 0; index < obArray.length; index++) {
            let obString = obArray[index];
            obData = obData + obString + " ";

            //obj数组
            if (!excludeArray.includes(obString)) {
                let arrayDataIndex = localArrayData.indexOf(obString);
                if (arrayDataIndex == -1) {
                    localArrayData.unshift(obString);
                }
            }

        }
        linkIndex++;

        // $("#myTabbaleLink").append("<li><div style='width: 300px;display: flex' onclick='changeMyTabbalePage(" + linkIndex + ")'><div style='width: 250px;font-size: 15px;' ><a href='#chapter" + linkIndex + "' data-toggle=\"tab\">" + obData + "</a></div><div style='flex: 1;' ><input id='isStart" + linkIndex + "' type='checkbox' class='switch' name='isStart' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex + ")'/></div></div></li></hr>");
        $("#myTabbaleLink").append("<li><div class='displayFlexDiv' onclick='changeMyTabbalePage(" + linkIndex +
            ")'><div class='spanDiv'><span onclick='loadCommandAuthorityManagementStatusFunction(" + linkIndex +
            ")' href='#chapter" + linkIndex + "' data-toggle=\"tab\">" + obData +
            "</span></div><div class='flexDiv'><input id='isStart" + linkIndex +
            "' type='checkbox' class='switch' name='isStart' onchange='changeCommandAuthorityManagementCustomSelectFunction(" +
            linkIndex + ")'/></div></div></li></hr>");
        //查询状态

        //默认状态
        if (pageLang == "ko" || pageLang == "ko_KR") {
            $("#myTabbalePage").append("<div class='tab-pane noScroll myTabbalePageDiv' id='chapter" + linkIndex +
                "' > <p class='fontStyle myTabbalePageP'> " + obData + "</p>" +
                "<div class='fontStyle myTabbaleSelectDiv' ><select onchange='changeCommandAuthorityManagementCustomSelectFunction(" +
                linkIndex + ")' id='commandAuthorityManagementCustomSelect" + linkIndex + "'>" +
                "<option name='loginUser' value='loginUser'>로그인 중인 계정</option>\n" +
                "<option name='bj' value='bj'>BJ</option>\n" +
                "<option name='manager' value='manager'>매니저</option>\n" +
                "<option name='hot' value='hot'>열혈팬</option>\n" +
                "<option name='subscription' value='subscription'>구독자</option>\n" +
                "<option name='supporter' value='supporter'>서포터</option>\n" +
                "<option name='fan' value='fan'>팬</option>\n" +
                "<option name='normal'  value='normal'>관객</option>\n" +
                "<option name='custom' value='custom'>다중 선택</option></select>" +
                "<br><div id='commandAuthorityManagementCustomCheckbox" + linkIndex + "'>" +
                "<label class='label' for='loginUser" + linkIndex +
                "'><span name='loginUser'>로그인 중인 계정</span><input id='loginUser" + linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "&emsp;<label class='label' for='bj" + linkIndex + "'><span name='bj'>bj</span><input id='bj" +
                linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'></label>" +
                "&emsp;<label class='label' for='manager" + linkIndex +
                "'><span name='manager'>매니저</span><input id='manager" + linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "<br><label class='label' for='hot" + linkIndex + "'><span name='hot'>열혈팬</span><input id='hot" +
                linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "&emsp;<label class='label' for='subscription" + linkIndex +
                "'><span name='subscription'>구독자</span><input id='subscription" + linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "&emsp;<label class='label' for='supporter" + linkIndex +
                "'><span name='supporter'>서포터</span><input id='supporter" + linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "<br><label class='label' for='fan" + linkIndex + "'><span name='fan'>팬</span><input id='fan" +
                linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "&emsp;<label class='label' for='normal" + linkIndex +
                "' ><span name='normal'>관객</span><input id='normal" +
                linkIndex + "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" +
                linkIndex + ")'/></label>" +
                "<br><li id='chooseAll' name='chooseAll' class='btn btn-success' onclick='checkedToggle(\"all\"," +
                linkIndex + ");' tilte='모두 선택'>모두 선택</li>" +
                "&emsp;<li id='chooseNone' name='chooseNone'  class='btn btn-info' onclick='checkedToggle(\"none\"," +
                linkIndex +
                ");' title='모두 선택 안 함'>모두 선택 안 함</li>" +
                "&emsp;<li id='chooseContrary' name='chooseContrary'  class='btn btn-inverse' onclick='checkedToggle(\"contrary\"," +
                linkIndex + ");' tiltle='반대 선택'>반대 선택</li></div>" +
                "<button id='applyAllBtn' name='applyAllBtn' class='btn btn-danger applyAllBtn' onclick='applyAllBtnFunction(" +
                linkIndex +
                ")' data-loading-text='Applying' autocomplete='off' title='모든 명령에 라이센스 적용'>모든 명령에 라이센스 적용</button></div></div>"
            );

        } else {
            $("#myTabbalePage").append("<div class='tab-pane noScroll myTabbalePageDiv' id='chapter" + linkIndex +
                "' > <p class='fontStyle myTabbalePageP'> " + obData + "</p>" +
                "<div class='fontStyle myTabbaleSelectDiv' ><select onchange='changeCommandAuthorityManagementCustomSelectFunction(" +
                linkIndex + ")' id='commandAuthorityManagementCustomSelect" + linkIndex + "'>" +
                "<option name='loginUser' value='loginUser'>登录账户</option>\n" +
                "<option name='bj' value='bj'>BJ</option>\n" +
                "<option name='manager' value='manager'>管理员</option>\n" +
                "<option name='hot' value='hot'>超级粉丝</option>\n" +
                "<option name='subscription' value='subscription'>订阅者</option>\n" +
                "<option name='supporter' value='supporter'>支持者</option>\n" +
                "<option name='fan' value='fan'>粉丝</option>\n" +
                "<option name='normal'  value='normal'>普通收看者</option>\n" +
                "<option name='custom' value='custom'>多选</option></select>" +
                "<br><div id='commandAuthorityManagementCustomCheckbox" + linkIndex + "'>" +
                "<label class='label' for='loginUser" + linkIndex +
                "'><span name='loginUser'>登陆中的用户</span><input id='loginUser" + linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "&emsp;<label class='label' for='bj" + linkIndex + "'><span name='bj'>bj</span><input id='bj" +
                linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'></label>" +
                "&emsp;<label class='label' for='manager" + linkIndex +
                "'><span name='manager'>房管</span><input id='manager" + linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "<br><label class='label' for='hot" + linkIndex + "'><span name='hot'>热血粉丝</span><input id='hot" +
                linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "&emsp;<label class='label' for='subscription" + linkIndex +
                "'><span name='subscription'>订阅者</span><input id='subscription" + linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "&emsp;<label class='label' for='supporter" + linkIndex +
                "'><span name='supporter'>支持者</span><input id='supporter" + linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "<br><label class='label' for='fan" + linkIndex + "'><span name='fan'>粉丝</span><input id='fan" +
                linkIndex +
                "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
                ")'/></label>" +
                "&emsp;<label class='label' for='normal" + linkIndex +
                "' ><span name='normal'>观众</span><input id='normal" +
                linkIndex + "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" +
                linkIndex + ")'/></label>" +
                "<br><li id='chooseAll' name='chooseAll' class='btn btn-success' onclick='checkedToggle(\"all\"," +
                linkIndex + ");' tilte='全选'>全选</li>" +
                "&emsp;<li id='chooseNone' name='chooseNone'  class='btn btn-info' onclick='checkedToggle(\"none\"," +
                linkIndex +
                ");' title='全不选'>全不选</li>" +
                "&emsp;<li id='chooseContrary' name='chooseContrary'  class='btn btn-inverse' onclick='checkedToggle(\"contrary\"," +
                linkIndex + ");' tiltle='反选'>反选</li></div>" +
                "<button id='applyAllBtn' name='applyAllBtn' class='btn btn-danger applyAllBtn' onclick='applyAllBtnFunction(" +
                linkIndex +
                ")' data-loading-text='Applying' autocomplete='off' title='应用授权到全部命令'>应用授权到全部命令</button></div></div>"
            );

        }

    }
    //修改数组按照长度顺序
    localArrayData.sort((a, b) => a.length - b.length);

    var labelArray = ["loginUser", "bj", "manager", "hot", "subscription", "supporter", "fan", "normal"];
    for (let i = 0; i < labelArray.length; i++) {
        $("#myTabbalePage input[id^='" + labelArray[i] + "']").click(function () {
            if (this.checked) {
                $(this).parent("label").addClass("label-warning");
            } else {
                $(this).parent("label").removeClass("label-warning");
            }
        });
    }
    $(".myTabbalePageP").css("width", "200");

    // $(".typeahead").typeahead({
    // 	source: localArrayData,
    // 	items: 5
    // });


    //文本框延迟速度dom
    var delayInputTextId = getDomById('delayInputTextId');
    delayInputFrequency = delayInputTextId.value;
    // if (upperLimit.value == '') {
    // 	upperLimit.value == '0.001';
    // 	getDomById('upperLimit').value = '0.001';
    // }
    // console.log(delayInputFrequency);
    //自动提速2自动初始化


    if (delayInputFrequency == '') {
        // console.log(delayInputId.value);
        changeSpeed();
    }


    $("#delayInputId").change(function () {
        // console.log(this.value);
        changeSpeed();
    });


    //监听启动或者暂停读取消息
    $("#retrievalButtonId,#stopRetrievalMessage").click(function () {
        // console.log(this);

        let seData = {
            id: settData.id
        }
        if (this.getAttribute("id") == "retrievalButtonId") {
            seData.isStart = true;
        } else if (this.getAttribute("id") == "stopRetrievalMessage") {
            seData.isStart = false;
        }
        // console.log(settData);


        opSettingIndexDB.insertData(seData, "upload");

    });

    //默认开启聊天
    // getDomById('retrievalButtonId').click();


    //window.addEventListener('resize', function() {});

    window.onresize = function () {

        getDomById('actionbox').style.height = ($("body").height() - $("#myDiv").offset().top) + "px";
        getDomById('chat_area').style.bottom = $("body").height() - $("#actionbox").offset().top + "px";
        mainFaceDivRight = $("#chat_area").width() + $("#emoticonArea").width() + ($("body").width() - (
            $("#webplayer_contents").width())) / 2;
        getDomById('mainFaceDiv').style.right = mainFaceDivRight + "px;";

        //设置命令行的选项宽度
        //getDomByClassName('myTabbalePageP').setAttribute('width',);
        //$(".spanDiv").width($("#commandAuthorityManagementModal").width()/4)
        //$("#myTabbaleLink").width($("#commandAuthorityManagementModal").width()/2)

        //$("#commandAuthorityManagementModal").width();

        if ($("#commandAuthorityManagementModal").width() >= 200) {

            $("#commandAuthorityManagementModal>.modal-body").height($("#commandAuthorityManagementModal")
                .height() * 0.5);
            //	$("#myTabbalePage").height($("#commandAuthorityManagementModal").height()*0.6);

            $("#myTabbaleLink,.spanDiv,.displayFlexDiv").width($("#commandAuthorityManagementModal")
                .width() * 0.5);
            $("#myTabbalePage").css("margin-left", $("#myTabbaleLink").width());
            $(".myTabbalePageP").css("left", "0").css("width", $("#commandAuthorityManagementModal")
                .width() - $(
                "#myTabbaleLink").width());
        }
    }

}

function changeSpeed() {
    // 选择框延迟速度dom
    var delayInputId = getDomById('delayInputId');
    var informationSynchronization = getDomById('informationSynchronization');
    var upperLimit = getDomById('upperLimit');
    if (delayInputId.value == 'slowSpeed') {
        delayInputFrequency = 1000;
        getDomById('delayInputTextId').value = 1000;
        upperLimit.value = 1;
        informationSynchronization.value = 5;

    } else if (delayInputId.value == 'meiumSpeed') {
        delayInputFrequency = 500;
        getDomById('delayInputTextId').value = 500;
        upperLimit.value = 1;
        informationSynchronization.value = 5;

    } else if (delayInputId.value == 'quick') {
        delayInputFrequency = 125;
        getDomById('delayInputTextId').value = 125;
        upperLimit.value = 0.001;
        informationSynchronization.value = 1;
    }
}


function stopRetrievalMessageFunction() {

    //停止时清除第一个下标
    sessionStorage.removeItem("firstIndex");

    $("#showMessage").html("");
    // $("#lastIndex,#nowIndex,#delayInputTextId,#informationSynchronization,#upperLimit").val("");

    // $("#robotConfiguration").css("opacity", 0.1);
    // $("#retrievalButtonId").css("opacity", 1);

    // $("#robotConfiguration").hide();
    // $("#retrievalButtonId").show();

    // getDomById('robotConfiguration').style.visibility = 'hidden';
    // getDomById('retrievalButtonId').style.visibility = 'visible';
    $('#stopRetrievalMessage').addClass('btn-success').hide();
    $('#retrievalButtonId').removeClass('btn-success').show();

    if ('undefined' != typeof messageInterval) {
        clearInterval(messageInterval);
    }
    $('#showMessageDiv').hide();
    //关闭弹幕-同步检索 弹幕状态信息
    //  $barrageButton.attr('data-isBarrage');
    // tipBarrage('关闭消息阅读');

    showTipBarrageFunction(packageResult.stopRetrievalMessageFunction);
}

//提示弹窗
function showTipBarrageFunction(text) {
    //弹幕数组
    var showLogArray = [];
    // $('body').hide(1000).show(2000);
    // $('#chat_area').fadeOut($('#delayInputTextId').val()*2).fadeIn($('#delayInputTextId').val());


    if (text.length > 10) {
        //不加图片alert
        text = "<div class='alert alert-block disableSelection'><h1 class='alert-heading'>" + text + "</h1></div>";
    } else {
        //加图片
        text = "<div class='alert alert-block disableSelection'><h1 class='alert-heading'>" + text + "</h1>" +
            "<img class='showBarrageImg' src='" + showBarrageImgURL + "'/></div>";
    }

    showLogArray.push(text);
    createShowLogs();
    //只能清理弹幕
    if ($('.showLog').length >= 198) {
        // console.log('清理屏幕弹幕');
        $('#webplayer').prevAll('div').remove();
        showTipBarrageFunction(packageResult.showTipBarrageFunction);

        // for (var i=0;i<$('#webplayer').prevAll('div').length;i++){
        //     if ($('#webplayer').prevAll('div')[i].offsetLeft<=$('body').clientWidth/2){
        //         $('#webplayer').prevAll('div')[i].remove();
        //     }
        //
        // }
        // for (var i=0;i<$('#webplayer').prevAll('div').length;i++){
        //     if ($('#webplayer').prevAll('div')[i].offsetLeft<=($('#webplayer').prevAll('div')[i].length+20)){
        //         $('#webplayer').prevAll('div')[i].remove();
        //     }
        //
        // }
    }

    //创建dom
    function createShowLogs() {
        let webplayer = getDomById('webplayer');
        let chatBoxHeight = $('#chatbox').height();
        let htmlWidth = $('html').width();
        //每个dom应该的高度
        let topHeight = chatBoxHeight / 2 / showLogArray.length;
        // parseInt(Math.random() * 1000 / 1 + 1);
        //body的高度
        var bodyHeight = $('body').height();
        //根据数量布局
        for (let i = 0; i < showLogArray.length; i++) {
            let randomNo;

            function getRandNo() {
                randomNo = parseInt(Math.random() * (bodyHeight - $('#showLog' + randomNo).height()) / 1 + 1);
                if (document.getElementById('showLog' + randomNo) != null) {
                    // console.log('重复的id：showLog'+randomNo+'正在重新创建');
                    getRandNo();
                    // $('#showLog' + randomNo).remove();
                }
                // console.log('不存在的id：showLog'+randomNo+'进入下一步');
                return randomNo;
            }

            //获得一个不重复的id
            randomNo = getRandNo();
            //清除重复的
            createSingleShowLog('showLog' + randomNo, showLogArray[i]);
            // $('#showLog' + (i + 1)).offset({top: topHeight * (i + 1),left:htmlWidth});


            $('#showLog' + randomNo).offset({
                top: randomNo,
                left: htmlWidth
            });

            // $('#showLog' + randomNo).offset({
            //  left: htmlWidth
            // }).css("bottom",randomNo);
            runShowLog('#showLog' + randomNo);

            // domArrary.push();


            // showLogArray.remove('11');
            // showLogArray.remove(showLogArray[i]);

            // showLogArray. shift();
        }
        // runShowLog('#showLog1');
        //创建单个dom
        function createSingleShowLog(id, text) {
            let showLogDivDom = document.createElement('div');

            //showLogDivDom.style.color = $('#background_color').val()
            showLogDivDom.style.color = getRandomColor();
            // showLogDivDom.style.fontSize="300px";
            showLogDivDom.id = id;
            showLogDivDom.className = 'showLog';
            showLogDivDom.innerHTML = text;
            // showLogDivDom.style.backgroundColor='white';
            document.body.insertBefore(showLogDivDom, webplayer);
        }

    }


    //运行dom
    function runShowLog(id) {
        let i = $('html').width();
        // if ('undefined' != typeof showLogTimeout) {
        //     clearTimeout(showLogTimeout);
        // }    //隐藏所有


        //  var $chatboxLegt=$('#chatbox').offset().left;
        // var $domIdWidth= $(id).width();
        let delayInputTextId = $('#delayInputTextId').val();
        //弹幕速度时间范围delayInputTextId >= 1000 ? 1000 : delayInputTextId;
        let minDelay = 500;
        let maxDelay = 2000;
        let showLogDelay = delayInputTextId < minDelay || delayInputTextId > maxDelay ? delayInputTextId <
        minDelay ?
            minDelay : maxDelay : delayInputTextId;
        showLogSetTimeout(id);

        // var deg = 0;

        function showLogSetTimeout(id) {

            var showLogTimeout = setTimeout(function () {
                //突出显示
                i -= 400;

                $(id).offset({
                    left: i
                });

                if (i > -$(id).width()) {
                    showLogSetTimeout(id);
                }
                //else { $(id).remove();}

                //删除已经显示的
                // deleteShowLog(id);
            }, showLogDelay);
        }
    }


    // 销毁dom
    function deleteShowLog(id) {
        // console.log(id);
        $(id).remove();
        $('body:first-child').remove();
        // $(id).empty();
        // console.log(showLogArray.length);
        // if(showLogArray.length>1){
        if ('undefined' != typeof showLogTimeout) {
            clearTimeout(showLogTimeout);
        }
        showLogArray.shift();
        // }

        // console.log(showLogArray)
    }
}

// //发送一个提示

function showBarrageFunction(text) {
    //弹幕数组
    var showLogArray = [];
    // $('body').hide(1000).show(2000);
    // $('#chat_area').fadeOut($('#delayInputTextId').val()*2).fadeIn($('#delayInputTextId').val());
    showLogArray.push(text);
    createShowLogs();
    //只能清理弹幕
    if ($('.showLog').length > 198) {
        console.log('清理屏幕弹幕');
        $('#webplayer').prevAll('div').remove();
        // for (var i=0;i<$('#webplayer').prevAll('div').length;i++){
        //     if ($('#webplayer').prevAll('div')[i].offsetLeft<=$('body').clientWidth/2){
        //         $('#webplayer').prevAll('div')[i].remove();
        //     }
        //
        // }
        // for (var i=0;i<$('#webplayer').prevAll('div').length;i++){
        //     if ($('#webplayer').prevAll('div')[i].offsetLeft<=($('#webplayer').prevAll('div')[i].length+20)){
        //         $('#webplayer').prevAll('div')[i].remove();
        //     }
        //
        // }
    }

    //创建dom
    function createShowLogs() {
        let webplayer = getDomById('webplayer');
        let chatBoxHeight = $('#chatbox').height();
        let htmlWidth = $('html').width();
        //每个dom应该的高度
        let topHeight = chatBoxHeight / 2 / showLogArray.length;
        // parseInt(Math.random() * 1000 / 1 + 1);
        //body的高度
        var bodyHeight = $('body').height();
        //根据数量布局
        for (let i = 0; i < showLogArray.length; i++) {
            let randomNo;

            function getRandNo() {
                randomNo = parseInt(Math.random() * bodyHeight / 1 + 1);
                if (document.getElementById('showLog' + randomNo) != null) {
                    // console.log('重复的id：showLog'+randomNo+'正在重新创建');
                    getRandNo();
                    // $('#showLog' + randomNo).remove();
                }
                // console.log('不存在的id：showLog'+randomNo+'进入下一步');
                return randomNo;
            }

            //获得一个不重复的id
            randomNo = getRandNo();
            //清除重复的
            createSingleShowLog('showLog' + randomNo, showLogArray[i]);
            // $('#showLog' + (i + 1)).offset({top: topHeight * (i + 1),left:htmlWidth});
            $('#showLog' + randomNo).offset({
                // top: randomNo,
                left: htmlWidth
            });
            runShowLog('#showLog' + randomNo);
            // domArrary.push();


            // showLogArray.remove('11');
            // showLogArray.remove(showLogArray[i]);

            // showLogArray. shift();
        }
        // runShowLog('#showLog1');
        //创建单个dom
        function createSingleShowLog(id, text) {
            let showLogDivDom = document.createElement('div');

            //showLogDivDom.style.color = $('#background_color').val()
            showLogDivDom.style.color = getRandomColor();
            // showLogDivDom.style.fontSize="300px";
            showLogDivDom.id = id;
            showLogDivDom.className = 'showLog';
            showLogDivDom.innerHTML = text;
            // showLogDivDom.style.backgroundColor='white';
            document.body.insertBefore(showLogDivDom, webplayer);
        }

    }


    //运行dom
    function runShowLog(id) {
        let i = $('html').width();
        // if ('undefined' != typeof showLogTimeout) {
        //     clearTimeout(showLogTimeout);
        // }    //隐藏所有


        //  var $chatboxLegt=$('#chatbox').offset().left;
        // var $domIdWidth= $(id).width();
        let delayInputTextId = $('#delayInputTextId').val();
        //弹幕速度时间范围delayInputTextId >= 1000 ? 1000 : delayInputTextId;
        let minDelay = 500;
        let maxDelay = 2000;
        let showLogDelay = delayInputTextId < minDelay || delayInputTextId > maxDelay ? delayInputTextId < minDelay ?
            minDelay : maxDelay : delayInputTextId;
        showLogSetTimeout(id);
        var deg = 0;

        function showLogSetTimeout(id) {

            var showLogTimeout = setTimeout(function () {
                //突出显示
                i -= 800;
                deg = deg + 90;
                // .css("transition-duration", "5s")
                // $("body").css("transform", "rotateX(" + deg + "deg)").css(
                // 	"transition-timing-function", "ease-in");
                // $("body").css("transform", "rotateY(" + deg + "deg)").css(
                // 	"transition-timing-function", "ease-in");


                // $(id).css("transform", "rotateX(-" + deg + "deg)").css("transition-duration", "5s").css(
                // 	"transition-timing-function", "ease-in");
                $(id).css("transform", "rotateY(-" + deg + "deg)").css("transition-duration", "5s").css(
                    "transition-timing-function", "ease-in");

                // $(id).css("transform", "rotate3d(1,2,1,-"+deg+"deg)").css("transition-duration", "5s").css(
                // 					"transition-timing-function", "ease-in");

                // $(id).css("transform", "scale3d(1,1,2)").css("transition-duration", "5s").css(
                // 					"transition-timing-function", "ease-in");

                $(id).offset({
                    left: i
                });
                //10秒后自动隐藏
                // setTimeout(function () {
                //     $(id).remove();
                // }, 10000);
                if (i > -$(id).width()) {
                    showLogSetTimeout(id);
                    // console.log("1结束");
                }

                //删除已经显示的
                // deleteShowLog(id);
            }, showLogDelay);
        }
    }


    // 销毁dom
    function deleteShowLog(id) {
        // console.log(id);
        $(id).remove();
        $('body:first-child').remove();
        // $(id).empty();
        console.log(showLogArray.length);
        // if(showLogArray.length>1){
        if ('undefined' != typeof showLogTimeout) {
            clearTimeout(showLogTimeout);
        }
        showLogArray.shift();
        // }

        console.log(showLogArray)
    }


};


// function showBarrageFunction(text) {
// 	//弹幕数组
// 	var showLogArray = [];
// 	// $('body').hide(1000).show(2000);
// 	// $('#chat_area').fadeOut($('#delayInputTextId').val()*2).fadeIn($('#delayInputTextId').val());


// 	// if(text.length>15){
// 	//     //不加图片
// 	//     text= "<div class='alert alert-block disableSelection'><h1 class='alert-heading'>"+text+"</div>";
// 	// }else{
// 	//     //加图片
// 	//     text= "<div class='alert alert-block disableSelection'><h1 class='alert-heading'>"+text+"<hr>"+
// 	//     "<img class='showBarrageImg' src='" +sessionStorage.getItem("showBarrageImage") +"'/></div>";
// 	// }

// 	showLogArray.push(text);
// 	createShowLogs();
// 	//只能清理弹幕
// 	if ($('.showLog').length >= 198) {
// 		// console.log('清理屏幕弹幕');
// 		$('#webplayer').prevAll('div').remove();
// 		showTipBarrageFunction(packageResult.showTipBarrageFunction);

// 		// for (var i=0;i<$('#webplayer').prevAll('div').length;i++){
// 		//     if ($('#webplayer').prevAll('div')[i].offsetLeft<=$('body').clientWidth/2){
// 		//         $('#webplayer').prevAll('div')[i].remove();
// 		//     }
// 		//
// 		// }
// 		// for (var i=0;i<$('#webplayer').prevAll('div').length;i++){
// 		//     if ($('#webplayer').prevAll('div')[i].offsetLeft<=($('#webplayer').prevAll('div')[i].length+20)){
// 		//         $('#webplayer').prevAll('div')[i].remove();
// 		//     }
// 		//
// 		// }
// 	}

// 	//创建dom
// 	function createShowLogs() {
// 		let webplayer = getDomById('webplayer');
// 		let chatBoxHeight = $('#chatbox').height();
// 		let htmlWidth = $('html').width();
// 		//每个dom应该的高度
// 		let topHeight = chatBoxHeight / 2 / showLogArray.length;
// 		// parseInt(Math.random() * 1000 / 1 + 1);
// 		//body的高度
// 		var bodyHeight = $('body').height();
// 		//根据数量布局
// 		for (let i = 0; i < showLogArray.length; i++) {
// 			let randomNo;

// 			function getRandNo() {
// 				randomNo = parseInt(Math.random() * (bodyHeight - $('#showLog' + randomNo).height()) / 1 + 1);
// 				if (document.getElementById('showLog' + randomNo) != null) {
// 					// console.log('重复的id：showLog'+randomNo+'正在重新创建');
// 					getRandNo();
// 					// $('#showLog' + randomNo).remove();
// 				}
// 				// console.log('不存在的id：showLog'+randomNo+'进入下一步');
// 				return randomNo;
// 			}

// 			//获得一个不重复的id
// 			randomNo = getRandNo();
// 			//清除重复的
// 			createSingleShowLog('showLog' + randomNo, showLogArray[i]);
// 			// $('#showLog' + (i + 1)).offset({top: topHeight * (i + 1),left:htmlWidth});


// 			$('#showLog' + randomNo).offset({
// 				top: randomNo,
// 				left: htmlWidth
// 			});

// 			// $('#showLog' + randomNo).offset({
// 			// 	left: htmlWidth
// 			// }).css("bottom",randomNo);
// 			runShowLog('#showLog' + randomNo);

// 			// domArrary.push();


// 			// showLogArray.remove('11');
// 			// showLogArray.remove(showLogArray[i]);

// 			// showLogArray. shift();
// 		}
// 		// runShowLog('#showLog1');
// 		//创建单个dom
// 		function createSingleShowLog(id, text) {
// 			let showLogDivDom = document.createElement('div');

// 			//showLogDivDom.style.color = $('#background_color').val()
// 			showLogDivDom.style.color = getRandomColor();
// 			// showLogDivDom.style.fontSize="300px";
// 			showLogDivDom.id = id;
// 			showLogDivDom.className = 'showLog';
// 			showLogDivDom.innerHTML = text;
// 			// showLogDivDom.style.backgroundColor='white';
// 			document.body.insertBefore(showLogDivDom, webplayer);
// 		}

// 	}


// 	//运行dom
// 	function runShowLog(id) {
// 		let i = $('html').width();
// 		// if ('undefined' != typeof showLogTimeout) {
// 		//     clearTimeout(showLogTimeout);
// 		// }    //隐藏所有


// 		//  var $chatboxLegt=$('#chatbox').offset().left;
// 		// var $domIdWidth= $(id).width();
// 		let delayInputTextId = $('#delayInputTextId').val();
// 		//弹幕速度时间范围delayInputTextId >= 1000 ? 1000 : delayInputTextId;
// 		let minDelay = 500;
// 		let maxDelay = 2000;
// 		let showLogDelay = delayInputTextId < minDelay || delayInputTextId > maxDelay ? delayInputTextId <
// 			minDelay ?
// 			minDelay : maxDelay : delayInputTextId;
// 		showLogSetTimeout(id);

// 		// var deg = 0;

// 		function showLogSetTimeout(id) {

// 			var showLogTimeout = setTimeout(function() {
// 				//突出显示
// 				i -= 400;
// 				// deg = deg + 90;
// 				// .css("transition-duration", "5s")
// 				// $("body").css("transform", "rotateX(" + deg + "deg)").css(
// 				// 	"transition-timing-function", "ease-in");
// 				// $("body").css("transform", "rotateY(" + deg + "deg)").css(
// 				// 	"transition-timing-function", "ease-in");
// 				// $(id).css("transform", "rotateX(-" + deg + "deg)").css("transition-duration", "5s").css(
// 				// 	"transition-timing-function", "ease-in");

// 				// $(id).css("transform", "rotateY(-" + deg + "deg)").css("transition-duration", "1s").css(
// 				// 	"transition-timing-function", "ease-in");


// 				// $(id).css("transform", "rotate3d(1,2,1,-"+deg+"deg)").css("transition-duration", "5s").css(
// 				// 					"transition-timing-function", "ease-in");

// 				// $(id).css("transform", "scale3d(1,1,2)").css("transition-duration", "5s").css(
// 				// 					"transition-timing-function", "ease-in");

// 				$(id).offset({
// 					left: i
// 				});
// 				//10秒后自动隐藏
// 				// setTimeout(function() {
// 				// 	$(id).remove();
// 				// }, 10000);
// 				if (i > -$(id).width()) {
// 					showLogSetTimeout(id);
// 				}
// 				//else { $(id).remove();}

// 				//删除已经显示的
// 				// deleteShowLog(id);
// 			}, showLogDelay);
// 		}
// 	}


// 	// 销毁dom
// 	function deleteShowLog(id) {
// 		// console.log(id);
// 		$(id).remove();
// 		$('body:first-child').remove();
// 		// $(id).empty();
// 		// console.log(showLogArray.length);
// 		// if(showLogArray.length>1){
// 		if ('undefined' != typeof showLogTimeout) {
// 			clearTimeout(showLogTimeout);
// 		}
// 		showLogArray.shift();
// 		// }

// 		// console.log(showLogArray)
// 	}


// };


//停止批量发送
function stopBatchSendFunction() {
    //发送消息计时器
    if ('undefined' != typeof thisInterval) {
        clearInterval(thisInterval);
    }
    //批量发送=延迟输入
    if ('undefined' != typeof inputInterval) {
        clearInterval(inputInterval);
    }
    //计数显示mydiv计时器
    if ('undefined' != typeof tiInterval) {
        clearInterval(tiInterval);
    }
    if ('undefined' != typeof sendOnceTimtout) {
        clearTimeout(sendOnceTimtout);
    }
    if ('undefined' != typeof sendOnceCopyTimtout) {
        clearTimeout(sendOnceCopyTimtout);
    }

    //恢复显示
    setTimeout(function () {
        inputTimes = document.getElementById('inputTimes');
        inputFrequency = document.getElementById('inputFrequency');
        inputFrequency.value = handInputFrequency;
        inputTimes.value = handInputTimes;
        setTimeout(function () {
            setContentEditableSelection("testInput");
        }, 250);
    }, 100);

    showTipBarrageFunction(packageResult.stopBatchSendFunction);

    //打开啊发送按钮
    $sendMessage.show();
    $stopBatchSend.hide();
    $("#testInput").attr("disabled", false);
    // getDomById("testInput").focus();
    // setContentEditableSelection("testInput");
}


var us;

function sendMessageFunction(messageArray) {

    $sendMessage = $("#send_message");
    //显示停止按钮
    $stopBatchSend = $("#stopBatchSend");
    testInputValue = document.getElementById('testInput').value;
    allRepeatTimes = document.getElementById('inputTimes').value;
    frequency = document.getElementById('inputFrequency').value;


    if (allRepeatTimes <= 0 || frequency <= 0) {
        // alert("");
        return;
    }
    /*更正系统*/
    if (allRepeatTimes == '' || isNaN(allRepeatTimes)) {
        document.getElementById('inputTimes').value = 1;
        allRepeatTimes = 1;
    }
    if (frequency == '' || isNaN(frequency)) {
        document.getElementById('inputFrequency').value = 1;
        frequency = 1;
    }
    if (frequency >= 1) {
        $sendMessage.hide();
        $stopBatchSend.show();
    }
    $("#testInput").attr("disabled", true);
    // if (!(/(^[1-9]\d*$)/.test(num))) {
    //     return false;
    // }else {
    //
    // }


    //判断当前发送消息是否重复
    if ('undefined' != typeof thisInterval) {
        clearInterval(thisInterval);
    }
    if ('undefined' != typeof tiInterval) {
        clearInterval(tiInterval);
    }
    if ('undefined' != typeof inputInterval) {
        clearInterval(inputInterval);
    }

    if ('undefined' != typeof sendOnceTimtout) {
        clearTimeout(sendOnceTimtout);
    }
    if ('undefined' != typeof sendOnceCopyTimtout) {
        clearTimeout(sendOnceCopyTimtout);
    }

    repeatTimes = 1;
    //判断是数组还是字符串
    if (!Array.isArray(messageArray)) {
        //不是数组 拼接 成重复数据的 数组
        let sendMessageArray = new Array();
        for (let i = 0; i < allRepeatTimes; i++) {
            sendMessageArray[i] = messageArray; //临时数组接受字符串
        }
        messageArray = sendMessageArray;
        // ["你好"]
        // ["你好","你好"]
    } else {
        //是数组要进行操作
        document.getElementById('inputTimes').value = messageArray.length;
        allRepeatTimes = messageArray.length; //设置
    }

    //次数显示到myDiv
    inputTimes = document.getElementById('inputTimes');
    inputTimes.value = allRepeatTimes + "/" + repeatTimes;
    inputFrequency = document.getElementById('inputFrequency');
    var nowFrequency = frequency;
    tiInterval = setInterval(function () {
        nowFrequency--;
        inputFrequency.value = nowFrequency;
        if (nowFrequency == 0) {
            nowFrequency = frequency
        }
    }, 1000);

    let str = sendMessageSonFunction(repeatTimes, messageArray[0]); //拼接内容
    if (allRepeatTimes > 1) {
        //延时发送
        // delayInput(str, frequency);
        //立即发送  第一次
        sendNowFunction(str);
        //储存下拉提示
        var arrayDataIndex = localArrayData.indexOf(messageArray[0]); //储存第一个
        if (arrayDataIndex != -1) {
            // localArrayData.push(testInputValue);
            localArrayData.splice(arrayDataIndex, 1);
        }
        localArrayData.unshift(testInputValue);
        // console.log("第一次");

        repeatTimes++;
        delayInput(repeatTimes, frequency, messageArray[repeatTimes - 1]);
        //延时发送

        // showTipBarrageFunction(
        // 	"<h1 style=''>" + frequency + "秒后发送第" + repeatTimes +
        // 	"次</h1><hr><img src='" + bgURL + "'/>"
        // );

        if (frequency >= 5) {
            showTipBarrageFunction(frequency + packageResult.sendMessageFunction.showTipBarrageFunction[0] +
                repeatTimes + packageResult.sendMessageFunction.showTipBarrageFunction[1]);
        }


        thisInterval = setInterval(function () {
            inputTimes.value = allRepeatTimes + "/" + repeatTimes;

            // document.getElementById('write_area').innerHTML = str;
            //<!--js模拟点击事件/아 날로 그 클릭 이벤트-->
            // document.getElementById('btn_send').click();
            repeatTimes++;
            // <!--반복 횟수, 수 동 설정 가능,3 은 3 번 을 나타 낸다-->
            if (repeatTimes > allRepeatTimes) {
                //恢复显示
                setTimeout(function () {
                    //打开啊发送按钮
                    $sendMessage.show();
                    $stopBatchSend.hide();
                    $("#testInput").attr("disabled", false);

                    //清空文本框
                    getDomById('testInput').value = '';
                    // setContentEditableSelection("testInput");
                    // getDomById("testInput").focus();
                    inputFrequency.value = handInputFrequency;
                    inputTimes.value = handInputTimes;

                    setTimeout(function () {
                        setContentEditableSelection("testInput");
                    }, 250);
                }, 100);

                clearInterval(thisInterval);
                clearInterval(tiInterval);
                return;
            } else {
                // showTipBarrageFunction(
                // 	"<h1 style=''>" + frequency + "秒后发送第" + repeatTimes +
                // 	"次</h1><hr><img src='https://afubaba.github.io/Afreecatv/logo/400x400.jpeg'/>"
                // );

                // showTipBarrageFunction(
                // 	"<h1 style=''>" + frequency + "秒后发送第" + repeatTimes +
                // 	"次</h1><hr><img src='" + bgURL + "'/>"
                // );
                if (frequency >= 5) {
                    showTipBarrageFunction(frequency + packageResult.sendMessageFunction.showTipBarrageFunction[
                        0] + repeatTimes + packageResult.sendMessageFunction.showTipBarrageFunction[1]);
                }
            }
            // tipBarrage("<img src='https://afubaba.github.io/Afreecatv/logo/400x400.jpeg'/><hr><h1 style=''>" +
            // 	frequency + "秒后发送第" + repeatTimes + "次</h1>");
            // str = sendMessageSonFunction(repeatTimes);
            //延时发送
            delayInput(repeatTimes, frequency, messageArray[repeatTimes - 1]);
            //立即发送
            // sendNowFunction(str);
            //순환 속도 1 초 당,수 동 설정 가능,1000 은 1 초.2000 은2 초
        }, frequency * 1000);


        // thisInterval = setInterval(function() {
        // 	// document.getElementById('write_area').innerHTML = str;
        // 	//<!--js模拟点击事件/아 날로 그 클릭 이벤트-->
        // 	// document.getElementById('btn_send').click();
        // 	repeatTimes++;
        // 	// <!--반복 횟수, 수 동 설정 가능,3 은 3 번 을 나타 낸다-->
        // 	if (repeatTimes > allRepeatTimes) {
        // 		clearInterval(thisInterval);
        // 		return;
        // 	}
        // 	// tipBarrage("<img src='https://afubaba.github.io/Afreecatv/logo/400x400.jpeg'/><hr><h1 style=''>" +
        // 	// 	frequency + "秒后发送第" + repeatTimes + "次</h1>");
        // 	str = sendMessageSonFunction(repeatTimes);
        // 	//延时发送
        // 	delayInput(str, frequency);
        // 	//立即发送
        // 	// sendNowFunction(str);
        // 	//순환 속도 1 초 당,수 동 설정 가능,1000 은 1 초.2000 은2 초
        // }, frequency * 1000);

    } else if (allRepeatTimes == 1) {
        // console.log(str);
        //延时发送
        delayInput(repeatTimes, frequency, testInputValue);
        sendOnceCopyTimtout = setTimeout(function () {
            clearInterval(tiInterval);
            //恢复显示
            setTimeout(function () {
                //储存下拉提示
                var arrayDataIndex = localArrayData.indexOf(testInputValue);
                if (arrayDataIndex != -1) {
                    // localArrayData.push(testInputValue);
                    localArrayData.splice(arrayDataIndex, 1);
                }
                localArrayData.unshift(testInputValue);


                //打开啊发送按钮
                $sendMessage.show();
                $stopBatchSend.hide();
                $("#testInput").attr("disabled", false);
                // setContentEditableSelection("testInput");
                // getDomById("testInput").focus();
                // showTipBarrageFunction(
                // 	"<img src='https://afubaba.github.io/Afreecatv/logo/400x400.jpeg'/><hr><h1 style=''>发送好了</h1>"
                // );
                //清空文本框
                getDomById('testInput').value = '';
                inputFrequency.value = handInputFrequency;
                inputTimes.value = handInputTimes;

                // setTimeout(function() {
                // 	setContentEditableSelection("testInput");
                // }, 500);
            }, 100);
        }, frequency * 1000);

        // setTimeout(function() {
        //立即发送
        // sendNowFunction(str);
        // }, frequency * 1000);
    }

    //清空输入框
    // document.getElementById('testInput').value = '';
}

//延时输入内容

function delayInput(repeatTimes, inputFrequency, inputText) {
    //默认值
    //var inputText = inputText;
    if ('undefined' != typeof inputInterval) {
        clearInterval(inputInterval);
    }
    var i = 0;
    //清空输入框
    // $("#write_area").html("");
    // $("#testInput").html("");
    var willSendTex = "";
    var dif = inputFrequency * 1000 + 250;
    if (inputText.length > 0) {
        //10分之一
        let inputFrequencyParts = inputFrequency / 10;
        if (inputFrequencyParts < 1) {
            //小于10秒减去十分之一
            inputFrequency = inputFrequency - inputFrequency / 10;
        } else {
            //大于10秒直接减少1
            inputFrequency = inputFrequency - 1;
        }
        inputFrequency = inputFrequency / inputText.length;
        inputInterval = setInterval(function () {
            // try {

            // 	$("#write_area").html($("#write_area").html() + inputText[i]);
            // } catch (e) {
            // 	$("#write_area").html($("#write_area").html());
            // }
            willSendTex += inputText[i]
            $("#write_area").html(willSendTex);
            i++;
            if (i >= inputText.length) {
                // $("#testInput").val($("#write_area").html());
                //立刻发送
                // setTimeout(function() {
                //如果是第二次手动再次调用
                //再次获取改变后的值
                inputText = sendMessageSonFunction(repeatTimes, inputText);
                $("#write_area").html(inputText);
                document.getElementById('btn_send').click();
                // }, 1000);
                clearInterval(inputInterval);
                setTimeout(function () {
                    setContentEditableSelection("testInput");
                }, dif);
            }
        }, inputFrequency * 1000);
    } else {
        sendOnceTimtout = setTimeout(function () {
            document.getElementById('btn_send').click();
            //打开啊发送按钮
        }, inputFrequency * 1000);
        setTimeout(function () {
            setContentEditableSelection("testInput");
        }, dif);

    }
}

// function delayInput(inputText,inputFrequency) {
// 	console.log(inputText.length);
// 	if ('undefined' != typeof inputInterval) {
// 		clearInterval(inputInterval);
// 	}
// 	var i = 0;
// 	$("#write_area").html("");
// 	$("#testInput").html("");
// 	var inputInterval = setInterval(function() {
// 		console.log(i);
// 		$("#write_area").html($("#write_area").html() + inputText[i]);
// 		i++;
// 		if (i >= inputText.length) {
// 			console.log($("#write_area").html());
// 			$("#testInput").val($("#write_area").html());
// 			clearInterval(inputInterval);
// 		}
// 	}, inputFrequency);
// }

//立即发送
function sendNowFunction(str) {
    document.getElementById('write_area').innerHTML = str;
    //<!--js模拟点击事件/아 날로 그 클릭 이벤트-->
    document.getElementById('btn_send').click();
    setTimeout(function () {
        setContentEditableSelection("testInput");
    }, 250);
}

function sendMessageSonFunction(repeatTimes, inputStr) {
    //排除一次
    let timesPrompt = document.getElementsByName('timesPrompt');
    let isTimePromptChecked = timesPrompt[0].checked;
    //频率
    var frequencys = '-';
    //次数单位
    //var times='ₜₗ';
    var times = '';
    var str = inputStr;
    //开关是否打开
    var chrysanthemumCheckBox = document.getElementById('chrysanthemumCheckBox').checked;
    //字符串转化
    if (chrysanthemumCheckBox) {
        var midValue = ''
        var addValue = '҉';
        for (var i = 0; i < str.length; i++) {
            midValue = midValue + addValue + str[i];
        }
        str = midValue + addValue;
        // console.log(midValue);
        // console.log(chrysanthemumCheckBox);
    }
    if (allRepeatTimes > 1 && isTimePromptChecked == true) {
        allTime = allRepeatTimes * frequency;
        //拼接单位和时间
        if (allTime < 60) {
            allTime = allTime + 'ₛ';
        } else if (allTime / 60 < 60) {
            allTime = allTime / 60 + 'ₘ';
        } else {
            allTime = allTime / 60 / 60 + 'ₕ';
        }

        if (frequency < 60) {
            frequencys = times + frequency + 'ₛ';

        } else if (frequency / 60 < 60) {
            frequencys = times + frequency / 60 + 'ₘ';
        } else {
            frequencys = times + frequency / 60 / 60 + 'ₕ';
        }
        //拼接次数、次数频率、单次时间，总共时间₌
        //allTime='₍' +allRepeatTimes+'ₗ'+repeatTimes+'ₓ'+frequencys+'|'+allTime+'₎';

        allTime = '₍' + allRepeatTimes + 'ₗ' + repeatTimes + ',' + frequencys + '₎';

        allTime = allTime.replaceAll('0', '₀').replaceAll('1', '₁')
            .replaceAll('2', '₂').replaceAll('3', '₃').replaceAll('4', '₄')
            .replaceAll('5', '₅').replaceAll('6', '₆').replaceAll('7', '₇')
            .replaceAll('8', '₈').replaceAll('9', '₉').replaceAll(' ', '');
    } else {
        allTime = '';
    }
    str = str + allTime;
    return str;
}

let body = document.getElementsByTagName('body')[0];

function init() {
    $('#barrageButtonId').css('background-color', 'green').css('font-size', 'large').css('color', 'yellow');
    // tipBarrage('start');
    // showTipBarrageFunction(
    // 	"<h1 style=''>start</h1><hr><img src='" + bgURL + "'/>"
    // );
}

init();

//是否开启弹幕
function barrage() {
    let $barrageButton = $('#barrageButtonId');
    let isBarrage = $barrageButton.attr('data-isBarrage');
    let seData = {
        id: settData.id
    }
    if (isBarrage == 'close') {
        // tipBarrage('open');

        seData.isBarrage = true;
        showTipBarrageFunction(packageResult.barrage.showTipBarrageFunction1);
        $barrageButton.attr('data-isBarrage', 'open');
        $barrageButton.css('background-color', 'green').css('font-size', 'large').css('color', 'yellow');
    } else if (isBarrage == 'open') {
        // tipBarrage('close');
        seData.isBarrage = false;

        showTipBarrageFunction(packageResult.barrage.showTipBarrageFunction2);
        $barrageButton.attr('data-isBarrage', 'close');
        $barrageButton.css('background-color', '#808080').css('font-size', 'unset').css('color', 'white');
    }
    opSettingIndexDB.insertData(seData, "upload");

    // alert($barrageButton.attr('data-isBarrage'));
}


//全局字体颜色
var commonFontColor;

// test('111111111');
function test(text) {
    let isBarrage = $('#barrageButtonId').attr('data-isBarrage');
    //弹幕数组
    var showLogArray = [];
    if (isBarrage == 'close') {
        setTimeout(function () {
            $('#webplayer').prevAll('div').remove();
            if ('undefined' != typeof showLogTimeout) {
                clearTimeout(showLogTimeout);
            }
        }, 10000);
    } else if (isBarrage == 'open') {
        // $('body').hide(1000).show(2000);
        // $('#chat_area').fadeOut($('#delayInputTextId').val()*2).fadeIn($('#delayInputTextId').val());
        showLogArray.push(text);
        createShowLogs();
    }
    //只能清理弹幕
    if ($('.showLog').length > 198) {
        // console.log('afreecatv.son.js:清理屏幕弹幕');
        $('#webplayer').prevAll('div').remove();

    }

    //创建dom
    function createShowLogs() {
        let webplayer = getDomById('webplayer');
        let chatBoxHeight = $('#chatbox').height();
        let htmlWidth = $('html').width();
        //每个dom应该的高度
        let topHeight = chatBoxHeight / 2 / showLogArray.length;
        // parseInt(Math.random() * 1000 / 1 + 1);
        //body的高度
        var bodyHeight = $('body').height();
        //根据数量布局
        for (let i = 0; i < showLogArray.length; i++) {
            let randomNo;

            function getRandNo() {
                randomNo = parseInt(Math.random() * bodyHeight / 1 + 1);
                if (document.getElementById('showLog' + randomNo) != null) {
                    // console.log('重复的id：showLog'+randomNo+'正在重新创建');
                    getRandNo();
                    // $('#showLog' + randomNo).remove();
                }
                // console.log('不存在的id：showLog'+randomNo+'进入下一步');
                return randomNo;
            }

            //获得一个不重复的id
            randomNo = getRandNo();
            //清除重复的
            createSingleShowLog('showLog' + randomNo, showLogArray[i]);
            // $('#showLog' + (i + 1)).offset({top: topHeight * (i + 1),left:htmlWidth});
            $('#showLog' + randomNo).offset({
                bottom: randomNo,
                left: htmlWidth
            });
            runShowLog('#showLog' + randomNo);
            // domArrary.push();


            // showLogArray.remove('11');
            // showLogArray.remove(showLogArray[i]);

            // showLogArray. shift();
        }
        // runShowLog('#showLog1');
        //创建单个dom
        function createSingleShowLog(id, text) {
            let showLogDivDom = document.createElement('div');

            //showLogDivDom.style.color = $('#background_color').val()
            showLogDivDom.style.color = commonFontColor;
            showLogDivDom.id = id;
            showLogDivDom.className = 'showLog';
            showLogDivDom.innerHTML = text;
            // showLogDivDom.style.backgroundColor='white';
            body.insertBefore(showLogDivDom, webplayer);
        }

    }


    //运行dom
    function runShowLog(id) {
        let i = $('html').width();
        // if ('undefined' != typeof showLogTimeout) {
        //     clearTimeout(showLogTimeout);
        // }    //隐藏所有


        //  var $chatboxLegt=$('#chatbox').offset().left;
        // var $domIdWidth= $(id).width();
        let delayInputTextId = $('#delayInputTextId').val();
        //弹幕速度时间范围delayInputTextId >= 1000 ? 1000 : delayInputTextId;
        let minDelay = 500;
        let maxDelay = 2000;
        let showLogDelay = delayInputTextId < minDelay || delayInputTextId > maxDelay ? delayInputTextId <
        minDelay ?
            minDelay : maxDelay : delayInputTextId;
        showLogSetTimeout(id);

        function showLogSetTimeout(id) {
            var showLogTimeout = setTimeout(function () {
                //突出显示
                i -= 400;
                $(id).offset({
                    left: i
                });
                //10秒后自动隐藏
                // setTimeout(function () {
                //     $(id).hide();
                // }, 10000);
                if (i > -$(id).width())
                    showLogSetTimeout(id);
                //删除已经显示的
                // deleteShowLog(id);
            }, showLogDelay);
        }
    }


    // 销毁dom
    function deleteShowLog(id) {
        // console.log(id);
        $(id).remove();
        $('body:first-child').remove();
        // $(id).empty();
        console.log(showLogArray.length);
        // if(showLogArray.length>1){
        if ('undefined' != typeof showLogTimeout) {
            clearTimeout(showLogTimeout);
        }
        showLogArray.shift();
        // }

        // console.log(showLogArray)
    }


};


//弹窗提示
function tipBarrage(textContent) {

    let barrageButtonId = getDomById('barrageButtonId');
    let bodyHeight = $('body').height();
    let chatbox = getDomById('chatbox')
    // let chatBoxHeight = chatbox.height;
    let chatBoxHeight = 1000;
    chatBoxHeight = chatBoxHeight / 2;
    createSingleShowLog('tipBarrage', textContent);

    function createSingleShowLog(id, text) {

        if (document.getElementById(id) == null) {
            let showLogDivDom = document.createElement('div');
            showLogDivDom.id = id;
            showLogDivDom.className = 'showLog';
            showLogDivDom.innerHTML = text;
            // const cssText = 'background:blue;height:100%;color:' + $('#background_color').val() + ';position:fixed;top:' + (bodyHeight / 2) + 'px;left:'+$('body').width()+'px';
            const cssText = 'font-size:888px;width: max-content;background:white;color:blue;height:' + $('body')
                .height() + 'px;position:fixed;top:0px;left:' + $('body').width() + 'px';


            // alert(cssText);
            showLogDivDom.style = cssText;
            $(barrageButtonId).after(showLogDivDom);

        } else {
            $('#' + id).remove();
            createSingleShowLog(id, text)
            // $('#'+id).val(text);

        }
        tipBarrageTimeoutFunction(id);

    }

    let i = $('body').width();

    function tipBarrageTimeoutFunction(id) {

        if ('undefined' != typeof tipBarrageTimeout) {
            clearTimeout(tipBarrageTimeout);
            // $('#'+id).remove();
        }

        tipBarrageTimeout = setTimeout(function () {
            i -= 400;
            $('#' + id).offset({
                left: i
            });
            //10秒后自动隐藏

            if (i < -$('body').width()) {
                clearTimeout(tipBarrageTimeout);
                $('#' + id).remove();
            } else {
                tipBarrageTimeoutFunction(id);
            }
            // $('#delayInputTextId').val()>1000?1000:$('#delayInputTextId').val()
        }, 500);
    }


}

var myVideo;

function playMyVideo() {
    myVideo = document.querySelector("#myVideo");

    //重新播放 myVideo.load();
    let playPromise = myVideo.play()
    if (playPromise !== undefined) {
        playPromise.then(() => {
            myVideo.play()
        }).catch(() => {

        })
    }
}

function pauseMyVideo() {
    myVideo.pause();
}

function once(fn) {
    let done = false;
    return function (...args) {
        if (!done) {
            done = true;
            fn.call({}, ...args);
        }
    };
}


// console.log(videoURL);
const executeOncePlay = once(function () {

    //清除聊天内容
    $("#li_chat_memodel").children().click();

    // $("a").css("color", "white");
    videoURL = sessionStorage.getItem("videoURL");
    $("body").before(
        "<video id=myVideo width=100% height=100%  class='fullscreenvideo' muted  playsinline='' poster='" +
        bgURL + "'    loop=''><source src='" +
        videoURL + "' type='video/mp4'>"
    );


    // document.querySelector("#myVideo").play();

});
const executeOnceRemove = once(function () {
    // console.log("停止");

});
var flag = true;
var deg = 0;
var isFocus = false;

// 接收消息
window.addEventListener('message', (e) => {
    // console.log(e);
    // console.log(e.data);

    $("#write_area").html(e.data);
    $("#btn_send").click();
})


function sendMessage(message) {
    //打开批量功能
    $('#batchInformationDivId').collapse("show");
    //读取默认配置
    testInputValue = getDomById('testInput').value;
    inputTimesValue = getDomById('inputTimes').value;
    inputFrequencyValue = getDomById('inputFrequency').value;
    //发送消息
    getDomById('testInput').value = message;
    getDomById('inputTimes').value = 1;
    getDomById('inputFrequency').value = 0.1;
    getDomById('send_message').click();
    //还原数据
    setTimeout(function () {
        getDomById('testInput').value = testInputValue;
        getDomById('inputTimes').value = inputTimesValue;
        getDomById('inputFrequency').value = inputFrequencyValue;
    }, 1500);
}


function sendMessageCustom(message, times, frequency) {
    //打开批量功能
    $('#batchInformationDivId').collapse("show");
    getDomById('testInput').value = message;
    getDomById('inputTimes').value = times;
    getDomById('inputFrequency').value = frequency;
    getDomById('send_message').click();

    setTimeout(function () {
        getDomById('inputTimes').value = times;
        getDomById('inputFrequency').value = 0.1;
    }, frequency * 1000 + 250);
}

//!방송시작시간广播开始时间
function getSonButtonDom1(dom) {
    dom = document.getElementsByClassName(dom).item(0).children[0].lastChild;
    return dom;
}

//收藏或者点赞
function getSonButtonDom(dom) {
    dom = document.getElementsByClassName(dom).item(0).children[0];
    return dom;
}

function sendUltimateLengthMessage(message) {
    sendNowFunction(message);
    // sendMessage(message);

    // getDomById('testInput').value = message;
    // getDomById('inputTimes').value = 2;
    // getDomById('inputFrequency').value = 30;
    // getDomById('send_message').click();
    showTipBarrageFunction(packageResult.sendUltimateLengthMessage.showTipBarrageFunction1);

    setTimeout(function () {
        sendNowFunction(message);
        showTipBarrageFunction(packageResult.sendUltimateLengthMessage.showTipBarrageFunction2);
        setTimeout(function () {
            showTipBarrageFunction(packageResult.sendUltimateLengthMessage.showTipBarrageFunction3);
            setTimeout(function () {
                refreshPage(null, packageResult.refreshPage.text1);
            }, 5000);
        }, 5000);

    }, 32000);
}

var tbName = $("#szBjId").val();
tbName = !isNaN(tbName.substr(0, 1)) ? "cpm_" + tbName : tbName;


var message;
var delayInputFrequency;

// var localStorageType=getDomByName("storeWays");
// localStorageType.addEventListener('change',function(){
// 	console.log(localStorageType[0].checked,localStorageType[1].checked);
// });

//检索m消息函数]
function retrievalButtonFunction() {

    // console.log("retrievalButtonFunction");
    // $("#robotConfiguration").css("opacity", 1);
    // getDomById('robotConfiguration').style.visibility = 'visible';
    // tipBarrage('打开消息阅读');
    //显示信息
    $('#showMessageDiv').show();
    $('#retrievalButtonId').addClass('btn-success').hide();
    $('#stopRetrievalMessage').removeClass('btn-success').show();

    //判断当计时器是否重复
    if ('undefined' != typeof messageInterval) {
        clearInterval(messageInterval);
    }

    //获取当前内容,以配合还原
    var testInput_last = getDomById('testInput');

    // 选择框延迟速度dom
    var delayInputId = getDomById('delayInputId');
    //文本框延迟速度dom
    var delayInputTextId = getDomById('delayInputTextId');
    //计时器延迟速度value
    delayInputFrequency = delayInputTextId.value;
    var informationSynchronization = getDomById('informationSynchronization');
    // if (upperLimit.value == '') {
    // 	upperLimit.value == '0.001';
    // 	getDomById('upperLimit').value = '0.001';
    // }
    // if (delayInputFrequency == '') {
    // 	if (delayInputId.value == 'slowSpeed') {
    // 		delayInputFrequency = 1000;

    // 	} else if (delayInputId.value == 'meiumSpeed') {
    // 		delayInputFrequency = 500;

    // 	} else if (delayInputId.value == 'quick') {
    // 		delayInputFrequency = 125;


    // 	}
    // }
    //赋值文本框延迟显示
    delayInputTextId.value = delayInputFrequency;

    //当前速度
    // console.log(delayInputId.value);
    //控制台信息数量
    // var consoleCount = 0;

    //统计10秒最大输出
    var initTime = informationSynchronization.value;
    //当前次数
    // var nowTimes=0;
    //当前秒
    var nowFrequency = 0;
    //统计次数
    var inputCount = 0;


    //localStorage.setItem('lastname', 'Smith');
    //localStorage.getItem('astname');          sessionStorage

    //id数
    var le = document.getElementsByTagName('dt').length;

    //初始化下标
    var initIndex = getDomById('nowIndex').value;


    // console.log('重启或其开启了messageInterval');

    //纠正下标
    var firstIndex = sessionStorage.getItem('firstIndex');
    var firstIndexId;
    // if (firstIndex == null || firstIndex == 'undefined') {
    // 	//查找下标所在的chat_area下标1
    // 	firstIndexId = $("#chat_area dd ").first().attr("id");
    // 	sessionStorage.setItem('firstIndex', firstIndexId);
    // }
    if (firstIndex == null || firstIndex == 'undefined') {
        //查找下标所在的chat_area下标1
        firstIndexId = $("#chat_area dd ").first().attr("id");
        sessionStorage.setItem('firstIndex', firstIndexId);
    }
    firstIndex = sessionStorage.getItem('firstIndex');
    var getMessageCount = 0;
    //显示
    messageInterval = setInterval(function () {
        if ($("#chat_area dl").length > 0) {
            var idt_last = window.sessionStorage.getItem('idt_last');
            var text_Last = window.sessionStorage.getItem('text_Last');
            //清理控制台/当前执行次数
            // consoleCount++;

            // if (consoleCount > 100) {
            // 	console.clear();
            // 	consoleCount = 0;
            // }


            //chat_area聊天区域
            var chat_area = getDomById('chat_area');

            var firstIndex2 = $("#chat_area dd").last().attr("id");
            firstIndex2 > 0 && $("#lastIndex").val(firstIndex2);
            var reduceIndex = firstIndex2 - firstIndex;
            if (firstIndex < 0 || firstIndex2 < 0) {
                sessionStorage.setItem('firstIndex', 1);
                getDomById('nowIndex').value = 1;
            }
            // console.log('firstIndex:' + firstIndex + ',firstIndex2:' + firstIndex2);
            //如果有变化则做差,并且更新最新的下标

            // if (reduceIndex > 0 && initIndex - reduceIndex > 0) {
            // 	console.log('reduceIndex大于0')
            // 	console.log('做差前,reduceIndex:' + reduceIndex + ',initIndex:' + initIndex);
            // 	initIndex = initIndex - reduceIndex;
            // 	console.log('做差后,reduceIndex:' + reduceIndex + ',initIndex:' + initIndex);
            // 	getDomById('nowIndex').value = initIndex;
            // 	sessionStorage.setItem('firstIndex', firstIndex2);
            // } else if (reduceIndex < 0) {
            // 	firstIndexId = $("#chat_area dd")[0].id;
            // 	sessionStorage.setItem('firstIndex', firstIndexId);
            // 	console.log('reduceIndex小于0');
            // } else {
            // 	//错误时重置
            // 	firstIndexId = $("#chat_area dd")[0].id;
            // 	sessionStorage.setItem('firstIndex', firstIndexId);
            // 	console.log('遇到错误,重置sessionStorage');

            // }

            // if (initIndex < chat_area.childElementCount - 1) {
            // 	console.log(chat_area.childElementCount );
            // 	initIndex++;
            // 	getDomById('nowIndex').value = initIndex;
            // }
            //限制最大长度199
            // if (initIndex < $("#chat_area dd").length - 1) {
            // 	// console.log(chat_area.childElementCount );
            // 	initIndex++;
            // 	getDomById('nowIndex').value = initIndex;
            // }
            if (initIndex <= firstIndex2 - 1) {
                if (!isUpdate) {
                    initIndex++;
                }

                getDomById('nowIndex').value = initIndex;
            }
            //现在的下标
            // var now_index = chat_area.children[initIndex].children[0].nextElementSibling.getAttribute('id');

            // var $nowRead = $("#chat_area dd:eq(" + initIndex + ")");
            // var now_index = $("#chat_area dd:eq(" + initIndex + ")").attr("id");
            var now_index = initIndex
            // var chat_area_Length = document.getElementById('chat_area').childNodes.length - 1;
            var last_index = firstIndex2;
            // var last_index = firstIndex2;
            //限制消息同步정보 가 일치 하지 않 는 최대 수량,그리고 속 도 를 올 립 니 다.

            delayInputId = getDomById('delayInputId');
            //自动提速2自动初始化
            var upperLimit = getDomById('upperLimit');
            //比例
            var limit = (last_index - now_index);


            //统计图片点
            var chatPointsMode = getDomById("chatPointsMode");
            if (chatPointsMode.checked) {
                let dataNotRead = $("#chat_area dd[data-isread!='']");
                if (dataNotRead.length - limit > 1 && chatPointsMode.checked) {
                    for (let i = 0; i < dataNotRead.length; i++) {
                        if (dataNotRead[i].getAttribute("id") == 0) {
                            let $idDom = $(dataNotRead[i]).prev().children().last();
                            let user_Id = $idDom.attr("user_id");
                            let user_Nick = $idDom.attr("user_nick");
                            if (user_Id && user_Id.includes("(") && user_Id.includes(")")) {
                                for (let index = 1; index <= 3; index++) {
                                    user_Id = user_Id.replaceAll("(" + index + ")", "");
                                }
                            }

                            let calcAddData = calculateAddPoints(tex);
                            uData = {
                                "id": user_Id,
                                "userNick": user_Nick,
                                "increase": calcAddData.increase,
                                "increaseBit": calcAddData.increaseBit,
                                "grade": $idDom.attr("grade")
                            }

                            // console.log(uData);
                            if (uData.id && uData.userNick) {
                                $("#increaseLogPre").prepend("<li>" + $("#timeFrequencys").text() + "&emsp;[" +
                                    user_Nick + "] " + packageResult.retrievalButtonFunction.byImageEmoji +
                                    calcAddData.increase + packageResult.retrievalButtonFunction
                                        .addChatPoints + "</li>");
                                if (!isHoverIncreaseLogPre) {
                                    //滚动条滚动到最上面
                                    scrollToTop("#increaseLogPre");
                                }
                                if (localStorageType == "indexdb") {
                                    opIndexDB.insertData(uData, idDom);
                                } else if (localStorageType == "websql") {
                                    // uData.tex="11111";
                                    uData.tbName = tbName;
                                    // uData.id = user_Id;

                                    //删除属性
                                    // Reflect.deleteProperty(uData, "id");
                                    // console.log(userData);
                                    opWebsql.insertData(uData, null);


                                    //查询
                                } else if (localStorageType == "mysql") {
                                    //上传MYSQL
                                    opMysql.insertData(uData);
                                }

                            }
                            $idDom.css("backgroundColor", "yellow");
                            $(dataNotRead[i]).attr("data-isRead", "");
                        }
                    }
                }

            }


            //超越界限纠正
            // console.log(limit);
            var disparity = $("#chat_area").children().length;
            if (limit >= disparity) {
                initIndex = firstIndex2 - disparity;
                getDomById('nowIndex').value = initIndex;
                // console.log("差距纠正：" + initIndex);
            }
            switch (delayInputId.value) {
                case 'slowSpeed':
                    // console.log("slowSpeed");
                    if (limit >= informationSynchronization.value) {
                        // console.log('距离超过5,加速起来');
                        //提速2 设置上限/最快速度
                        // if (delayInputFrequency / 2 >= upperLimit.value) {
                        if (delayInputFrequency - limit >= upperLimit.value) {
                            // delayInputFrequency = delayInputFrequency / 2
                            delayInputFrequency = delayInputFrequency - limit;
                            getDomById('delayInputTextId').value = delayInputFrequency;
                            // getDomById('retrievalButtonId').click();
                            retrievalButtonFunction();
                        }

                        //追1
                    } else if (limit == 0) {

                        // console.log("降低速度2倍");
                        // delayInputFrequency = delayInputFrequency * 2
                        // delayInputFrequency = parseInt(delayInputFrequency) + limit;
                        getDomById('delayInputTextId').value = parseInt(delayInputFrequency) + parseInt(
                            informationSynchronization.value);
                        // getDomById('retrievalButtonId').click();
                        retrievalButtonFunction();

                    }
                    break;
                case 'meiumSpeed':

                    // console.log("meiumSpeed");
                    //比例
                    if (limit >= informationSynchronization.value) {
                        // console.log('距离超过5,加速起来');
                        //提速2 设置上限/最快速度
                        if (delayInputFrequency / 2 >= upperLimit.value) {
                            delayInputFrequency = delayInputFrequency / 2;
                            //四舍五入
                            getDomById('delayInputTextId').value = Math.round((delayInputFrequency) * 1000) /
                                1000;
                            // getDomById('retrievalButtonId').click();
                            retrievalButtonFunction();
                        }
                        //追1
                    } else if (limit == 1) {
                        // console.log("降低速度2倍");
                        delayInputFrequency = delayInputFrequency * 2;
                        getDomById('delayInputTextId').value = delayInputFrequency;
                        // getDomById('retrievalButtonId').click();
                        retrievalButtonFunction();
                    }


                    break;
                case 'quick':
                    // console.log("quick");
                    //比例
                    if (limit >= informationSynchronization.value) {
                        // console.log('距离超过5,加速起来');
                        //提速2 设置上限/最快速度
                        if (delayInputFrequency / 2 >= upperLimit.value) {
                            delayInputFrequency = delayInputFrequency / 2;
                            // delayInputFrequency--;
                            // Math.round((delayInputFrequency) * 100) / 100 四舍五入
                            getDomById('delayInputTextId').value = Math.round((delayInputFrequency) * 1000) /
                                1000;
                            // getDomById('retrievalButtonId').click();
                            retrievalButtonFunction();
                        }
                        //追1
                    } else if (limit == 0) {
                        // console.log("降低速度2倍");
                        delayInputFrequency++;
                        // delayInputFrequency=delayInputFrequency*2;
                        // parseInt(delayInputFrequency)+=0.001
                        //小数转换成整数
                        // if(delayInputFrequency>=1){}
                        delayInputFrequency = parseInt(delayInputFrequency);

                        getDomById('delayInputTextId').value = delayInputFrequency;
                        // getDomById('retrievalButtonId').click();
                        retrievalButtonFunction();
                    }
                    break;
            }

            //document.getElementById('chat_area').children[2].children[0].nextElementSibling.getAttribute('id');
            if ('undefined' != chat_area.children[initIndex] && typeof $("#" + initIndex).attr("data-isread") ==
                "undefined") {
                // console.log(initIndex);

                // console.log(initIndex);
                var nickName = $("#" + initIndex).prev().children("a").attr('user_nick');
                //id
                var idt = $("#" + initIndex).prev().children("a").attr('user_id');
                if (idt && idt.includes("(") && idt.includes(")")) {
                    for (let index = 1; index <= 3; index++) {
                        idt = idt.replaceAll("(" + index + ")", "");
                    }
                }
                var is_mobile = $("#" + initIndex).prev().children("a").attr('is_mobile');
                var grade = $("#" + initIndex).prev().children("a").attr('grade');
                // console.log(grade);
                //id所属dom a
                var $idLast = $("#" + initIndex).prev().children("a");
                // var nickName = $idLast.attr('user_nick');
                // //id
                // var idt = $idLast.attr('user_id');
                // var is_mobile = $idLast.attr('is_mobile');
                // var grade = $idLast.attr('grade');


                //内容
                // var tex = $("#chat_area dd")[initIndex].children[0].nextElementSibling.textContent;
                // var tex = $("#" + initIndex).html();
                // document.getElementById('demo').firstChild.nodeValue;
                var tex;
                try {
                    tex = $("#" + initIndex).prop('firstChild').nodeValue;
                } catch (error) {
                    tex = tex = $("#" + initIndex).html();
                }
                is_mobile = is_mobile == 'false' ? '🖥️' : '📱';
                //转换grade
                // switch (grade) {
                //     case 'user':
                //         grade = '사용자';
                //         break;
                //     case 'manager':
                //         grade = '관리원';
                //         break;
                //     case 'bj':
                //         grade = '앵커';
                //         break;
                //     case 'fan':
                //         grade = '팬';
                //         break;
                //     case 'topfan':
                //         grade = '고급팬';
                //         break;
                //     case 'gudok':
                //         grade = '구독자';
                //         break;
                //     default:
                //         grade = 'lodding';
                //         break;
                // }


                // console.log('['+grade+']'+nickName+'('+idt+')'+is_mobile+':'+tex+'(延迟:'+delayInputFrequency+'ms)');

                //聊天内容配色
                //ｉｄ和内容设置
                var idDom = $("#" + initIndex).prev().children("a")[0];
                // idDom.style.fontSize = 'large';
                idDom.style.backgroundColor = 'yellow';
                idDom.innerHTML = is_mobile + idDom.textContent;
                var texDom = $("#" + initIndex)[0];
                texDom.setAttribute("data-isRead", "");
                // texDom.style.border='2px black solid';
                // texDom.style.fontSize = 'large';
                // texDom.style.backgroundColor = 'white';
                commonFontColor = getRandomColor();
                texDom.style.color = commonFontColor;
                //屏蔽连续相同的内容对比
                //判断内容ID是否相同
                if (idt != idt_last || tex != text_Last) {
                    // us=null;
                    // us = new User(idt, nickName, grade);
                    //us.toString();
                    let calcAddData = calculateAddPoints(tex);
                    userData = {
                        "id": idt,
                        "userNick": nickName,
                        "increase": calcAddData.increase,
                        "increaseBit": calcAddData.increaseBit,
                        "grade": grade,
                        // "text":tex
                    };
                    chatPointsMode = document.getElementById("chatPointsMode");
                    if (chatPointsMode.checked) {
                        // var tbName = "chatPointsMode";
                        // var tbName = $("#szBjId").val();
                        // tbName = !isNaN(tbName.substr(0, 1)) ? "cpm_" + tbName : tbName;
                        // console.log(userData);
                        if (userData.id && userData.userNick) {
                            $("#increaseLogPre").prepend("<li>" + $("#timeFrequencys").text() + "&emsp;[" +
                                nickName + "] " + packageResult.retrievalButtonFunction.byChat + calcAddData
                                    .increase + packageResult.retrievalButtonFunction.addChatPoints + "</li>");
                            //鼠标不在日志上滚动
                            if (!isHoverIncreaseLogPre) {
                                if ($("#increaseLogPre").scrollTop() != 0) {
                                    //直接滚动
                                    // $("#increaseLogPre").scrollTop(0);
                                    //带动画的滚动
                                    $("#increaseLogPre").animate({
                                        scrollTop: 0
                                    }, 500);
                                }
                            }

                            // createTable
                            if (localStorageType == "indexdb") {
                                opIndexDB.insertData(userData, idDom);
                            } else if (localStorageType == "websql") {
                                userData.tbName = tbName;
                                // userData.id = idt;
                                //删除属性
                                // Reflect.deleteProperty(userData, "id");
                                // console.log(userData);
                                opWebsql.insertData(userData, idDom);

                                //查询
                            } else if (localStorageType == "mysql") {
                                //上传MYSQL
                                opMysql.insertData(userData);
                            }
                            if (typeof getTodayMaxSortData === "function") {
                                !isUpdate && getTodayMaxSortData(idDom, idt);
                            }

                            // opIndexDB.getDB();

                            if (ace.userId == idt && ace.userNick == nickName) {
                                // var appendString ="<span style='background-image:url(" + aurelionSolImgURL +
                                // 	");color:yellow;font-size:large'>[ACE]</span>"

                                // if (imgSize < 3) {
                                //     imgSize = 3;
                                // } else if (imgSize > 60) {
                                //     imgSize = 60;
                                // }
                                // console.log(imgSize);
                                appendString = "<img style='width:" + imgSize + "px;height:" + imgSize +
                                    "px;' src ='" +
                                    aurelionSolImgURL + "' title='" + ace.chatRatio + "[" + imgSize + "px]'/>";
                                $(idDom).parent().append(appendString);
                                // $("#todayChatPointsAce>th:eq(0)").html(appendString);
                                // idDom.innerHTML=idDom.textContent=
                                // idDom.innerHTML=idDom.innerHTML+"[ACE]";
                            }


                        }

                    } else {
                        //停止定时获取最大值
                        stopTodayMaxSortDataInterval();
                    }

                    var chatSportMode = document.getElementById("chatSportMode");
                    //聊天内容特效
                    if (chatSportMode.checked) {

                        $(idDom).fadeOut().fadeIn(1000);
                        $(texDom).hide().show(2000);
                        setTimeout(function () {
                            // $("#chat_area dl:lt(1)").hide();
                            $(texDom).parent('dl').hide(3000);
                        }, 2000);

                        executeOncePlay();
                        var fadeInterval;
                        // if (typeof fadeInterval != 'undefined') {
                        // 	clearTimeout(fadeInterval);
                        // }

                        $("#testInput").focus(function () {
                            isFocus = true;
                            flag = false;
                            if ($("#chatting_area").css("backgroundImage") == "none") {
                                bgURL = document.getElementsByClassName('bj_thumbnail').item(0)
                                    .children[0]
                                    .children[0]
                                    .getAttribute('src');
                                $("body,#chatting_area").css("backgroundImage", "url(" + bgURL + ")")
                            }
                        });
                        $("#testInput").blur(function () {
                            flag = true;
                            isFocus = false;
                        });
                        // console.log(flag);
                        if (flag) {
                            flag = false;
                            // ,#player_area
                            $("#chatting_area").css("backgroundImage", "none").fadeTo(2000,
                                0.3).fadeTo(1000, 0.6)
                                .fadeTo(500, 1);
                            $("#livePlayer").fadeTo(2000, 0.6).fadeTo(2000, 0.8).fadeTo(1000, 1);
                            setTimeout(function () {
                                //6秒后没有获取焦点，则进行下一次
                                if (!isFocus) {
                                    flag = true;
                                }
                            }, 6000);

                            //
                        } else {
                            // clearInterval(fadeInterval);

                        }


                        deg += 180;
                        // $("#player_area").css("transform", "rotateY(-" + deg++ + "deg)").css("transition-duration", "5s").css(
                        // 	"transition-timing-function", "ease-in");
                        // $("#player_area").css("transform", "rotateX(-" + deg++ + "deg)").css("transition-duration", "5s").css(
                        // 	"transition-timing-function", "ease-in");


                        // $("#player_area").css("transform", "rotate3d(1,1,1," + deg +
                        // 	"deg) scale(" + parseInt(Math.random() * 3 / 1) + "," + parseInt(Math.random() * 3 /
                        // 		1) + ")").css("transition-duration",
                        // 	"5s").css(
                        // 	"transition-timing-function", "ease-in");
                        // .fadeTo(1000, 0.1).fadeTo(1000, 0.2).fadeTo(1000, 0.3).fadeTo(1000, 0.4).fadeTo(1000, 0.5)

                        // $("#player_area").css("transform", "rotate3d(1,1,1," + parseInt(Math.random() * 360 / 1) +
                        // 	"deg)").css("transition-duration",
                        // 	"5s").css(
                        // 	"transition-timing-function", "ease-in");


                        // setTimeout(function() {

                        // }, 5000);
                        // document.querySelector("#myVideo").play();
                        playMyVideo();
                        //监听播放器
                        $("html").hover(function () {
                            playMyVideo();
                        }, function () {
                            // document.querySelector("#myVideo").pause();
                            pauseMyVideo();
                        });

                    } else {
                        $("html").off("mouseenter").unbind("mouseleave");

                        if ($("#player_area").css("transform") != "none") {


                            if ($("#chatting_area").css("backgroundImage") == "none") {
                                bgURL = document.getElementsByClassName('bj_thumbnail').item(0).children[0]
                                    .children[0]
                                    .getAttribute('src');
                                $("#chatting_area").css("backgroundImage", "url(" + bgURL + ")")
                            }
                        }
                        $("#player_area").css("transform", "none");
                        if (document.querySelector("#myVideo")) {
                            document.querySelector("#myVideo").src = videoURL;
                        }

                        executeOnceRemove()

                        // document.querySelector("#myVideo").pause();
                        // document.querySelector("#myVideo").currentTime=0;
                    }
                    window.sessionStorage.setItem('idt_last', idt);
                    window.sessionStorage.setItem('text_Last', tex);

                    // const showMessageText= '[' + grade + ']' + nickName + '(' + idt + ')' + is_mobile + ':<br/><span style=font-size:large;>' + tex+'</span>';
                    //记录消息
                    // getDomById('showMessage').innerHTML =showMessageText;

                    // const showMessageText1 = '[' + grade + ']' + nickName + '(' + idt + ')' + is_mobile + ':' + tex;

                    // const showMessageText1=$("#" + initIndex).parent().prop("outerHTML");
                    const showMessageText1 = $("#" + initIndex).parent().clone(true)[0].outerHTML;

                    let isBarrage = $('#barrageButtonId').attr('data-isBarrage');

                    if (isBarrage == 'close') {

                    } else if (isBarrage == 'open') {
                        // var dtClassName = $("#" + initIndex).prev()[0].className;
                        // var imgSrc = $("#" + initIndex).prev().children("em").children("img").attr("src");

                        // var texContent = $("#" + initIndex).text();

                        // var dtString = "<dl ><dt class='" + dtClassName + "'><em><img src='" + imgSrc +
                        // 	"'/></em>[" + grade + "]" + nickName + "(" + idt + "):</dt><dd >" + texContent +
                        // 	"</dd></dl>"


                        // var idDom = $("#" + initIndex).prev().children("a")[0];
                        // showTipBarrageFunction(dtString);
                        showBarrageFunction(showMessageText1);

                        // var dtString = "<ul class='showLog'  >" + $("#" + initIndex).prev().prop("outerHTML") + " <li> " +
                        // 	texContent +
                        // 	"</li></ul>"


                        // var dtString = "<dl class='showLog' style='line-height:100%'>"+$("#" + initIndex).parent().prop("innerHTML")+"</dl>"
                        // var dtString = "<ul class='showLog'  ><h3>" + $("#" + initIndex).prev().prop("innerHTML") + "</h3> <li> " +
                        // 	texContent +
                        // 	"</li></ul>";
                        // showTipBarrageFunction(dtString);

                    }
                    //正在读取得消息div ,接收弹幕结果

                    // getDomById('chat_area').style.border = "2px " + commonFontColor + " ridge";
                    // getDomById('showMessage').style.borderColor = commonFontColor;
                    // getDomById('showMessage').innerHTML = showMessageText1;

                    // getDomById('showLog').innerHTML =showMessageText1;
                    // $('#showMessage').fadeOut().fadeIn(1000);
                    // .fadeToggle(1000)
                    // $('#showMessage').css('background-color','white').fadeOut(1000).fadeIn(1000)
                    // $('#showMessage').hide().show(1000);
                    //记录消息拼接时间


                    //统计10秒最大输出
                    // var initTime=10;
                    //最大次数
                    // var maxTimes=initTime/delayInputFrequency/1000
                    //当前次数
                    // var nowTimes=0;
                    //统计变化
                    inputCount++;


                    //打开关闭机器人聊天功能
                    var robotChatCommondCheckboxId = document.getElementById("robotChatCommondCheckboxId");
                    if (robotChatCommondCheckboxId.checked && tex && tex.length > 1 && tex[0] == "!") {

                        var res;

                        function doFunctionByData(tex) {
                            //初始化data
                            let objData = {
                                tex: tex,
                                idt: idt,
                                nickName: nickName,
                                grade: grade,
                                objIndex: 0
                            }

                            for (let obj of object) {
                                objData.objIndex++;

                                if (obj[0].includes(tex)) {
                                    obj[1](objData);
                                    return;
                                }
                            }
                        }

                        //骰子数量控制
                        var diceNoReg = /^!주사위[1-9]|!주사위|!🎲$/;
                        if (tex.includes('!text:') && tex.includes("x")) {
                            let objData = {
                                tex: tex,
                                idt: idt,
                                nickName: nickName,
                                grade: grade,
                                objIndex: 1
                            }
                            opSettingIndexDB.searchCommandAuthoritySupport(objData, function (callbackData) {

                                if (callbackData.isAuthority) {
                                    // var aa = "!text:221321,55511x1";

                                    //!멈추다 停止
                                    //内容发送!text:😗😗,2x3  !text:😗,2x0.01  !text:/짱좋아//짱좋아/,3x2
                                    // !text:/즐거워/,5x5 id 는 이것 을 포함 해야만 명령 을 실행 할 수 있 습 니 다.이 명령 은 관리자 의 채 팅 번역 기능 을 닫 아야 합 니 다.수 동 설정 도 같은 효과 입 니 다.
                                    // !text:😗,2x1 명령 권한 이 열 렸 습 니 다.관리자 계 정 이나 앵 커 계 정 은 채 팅 번역 기능 을 닫 아야 합 니 다.

                                     testInput = getDomById('testInput');
                                     inputTimes = getDomById('inputTimes');
                                     inputFrequency = getDomById('inputFrequency');
                                    //获取1-3的随机数字
                                    // console.log(parseInt(Math.random()*NO/1));
                                    var rdmNo = parseInt(Math.random() * 3 / 1 + 1);
                                    var text = "";
                                    var firstNo = "";
                                    var lastNo = "";

                                    function aa() {
                                        //固定位置
                                        text = tex.substring(6, tex.lastIndexOf(','));
                                        firstNo = tex.substring(tex.lastIndexOf(',') + 1, tex
                                            .lastIndexOf('x'));
                                        lastNo = tex.substring(tex.lastIndexOf('x') + 1);
                                        sendMessageCustom(text, firstNo, lastNo);
                                    }

                                    function bb() {
                                        text = tex.substring(tex.indexOf(":") + 1);
                                        // console.log("bb:", text);
                                        sendMessage(text)
                                    }

                                    // var reg = /^!text:.+,[1-9][0-9]*x[1-9][0-9]?/;
                                    //正数不包含0包含小数
                                    // var regSon=/^((0.[1-9])|(0.[0-9]{1,4}[^0])|([1-9][0-9]*)+(.[0-9]{1,5})|([1-9][0-9]*))?$/
                                    var reg =
                                        /^!text:.+,((0.[1-9])|(0.[0-9]{1,4}[^0])|([1-9][0-9]*)+(.[0-9]{1,5})|([1-9][0-9]*))?x((0.[1-9])|(0.[0-9]{1,4}[^0])|([1-9][0-9]*)+(.[0-9]{1,5})|([1-9][0-9]*))?$/;
                                    reg.test(tex) ? aa() : bb();

                                }
                            });
                        } else if (diceNoReg.test(tex)) {

                            let objData = {
                                tex: tex,
                                idt: idt,
                                nickName: nickName,
                                grade: grade,
                                objIndex: 2
                            }
                            opSettingIndexDB.searchCommandAuthoritySupport(objData, function (callbackData) {

                                if (callbackData.isAuthority) {
                                    // tex.includes('!주사위') && tex.length ==4 && tex.length == 5 &&diceNo<9&& !isNaN(diceNo)
                                    //⚀⚁⚂⚃⚄⚅🎲🎲
                                    var dice1 = "⚀";
                                    var dice2 = "⚁";
                                    var dice3 = "⚂";
                                    var dice4 = "⚃";
                                    var dice5 = "⚄";
                                    var dice6 = "⚅";


                                    // function randomDice(length) {
                                    //     var diceString = "";
                                    //     var dicePoints = 0;
                                    //     for (let i = 0; i < length; i++) {
                                    //         switch (getRandom()) {
                                    //             case 1:
                                    //                 diceString = diceString + dice1;
                                    //                 dicePoints = dicePoints + 1;
                                    //                 break;
                                    //             case 2:
                                    //                 diceString = diceString + dice2;
                                    //                 dicePoints = dicePoints + 2;
                                    //                 break;
                                    //             case 3:
                                    //                 diceString = diceString + dice3;
                                    //                 dicePoints = dicePoints + 3;
                                    //                 break;
                                    //             case 4:
                                    //                 diceString = diceString + dice4;
                                    //                 dicePoints = dicePoints + 4;
                                    //                 break;
                                    //             case 5:
                                    //                 diceString = diceString + dice5;
                                    //                 dicePoints = dicePoints + 5;
                                    //                 break;
                                    //             case 6:
                                    //                 diceString = diceString + dice6;
                                    //                 dicePoints = dicePoints + 6;
                                    //                 break;
                                    //         }
                                    //     }
                                    //     return {
                                    //         "diceString": diceString,
                                    //         "dicePoints": dicePoints
                                    //     }
                                    // }
                                    //倍率
                                    let diceMultiplier;
                                    let todayDate = $("#timeFrequencys").text().substring(0, $(
                                        "#timeFrequencys").text().indexOf("\t"));
                                    let todayDay = new Date(todayDate).getDay();
                                    switch (todayDay) {
                                        case 0:
                                            diceMultiplier = getRandom(7);
                                            break;
                                        case 1:
                                        case 2:
                                        case 3:
                                        case 4:
                                        case 5:
                                        case 6:
                                            diceMultiplier = getRandom(todayDay);
                                            break;
                                        default:
                                            diceMultiplier = 3.5;
                                            break;
                                    }
                                    // var randomNo;
                                    // function getRandomDice() {
                                    //     randomNo = parseInt(Math.random() * (6) / 1 + 1);
                                    //     return randomNo;
                                    // }
                                    function randomDice(length, callback) {
                                        var diceString = "";
                                        var dicePoints = 0;
                                        var i = 0;
                                        var diceInterval = setInterval(function () {
                                            // console.log(i);
                                            //形式
                                            // diceString = diceString + dice1;
                                            // dicePoints = dicePoints + getRandom() * diceMultiplier;
                                            switch (getRandom(6)) {
                                                case 1:
                                                    diceString = diceString + dice1;
                                                    dicePoints = dicePoints + 1 *
                                                        diceMultiplier;
                                                    break;
                                                case 2:
                                                    diceString = diceString + dice2;
                                                    dicePoints = dicePoints + 2 *
                                                        diceMultiplier;
                                                    break;
                                                case 3:
                                                    diceString = diceString + dice3;
                                                    dicePoints = dicePoints + 3 *
                                                        diceMultiplier;
                                                    break;
                                                case 4:
                                                    diceString = diceString + dice4;
                                                    dicePoints = dicePoints + 4 *
                                                        diceMultiplier;
                                                    break;
                                                case 5:
                                                    diceString = diceString + dice5;
                                                    dicePoints = dicePoints + 5 *
                                                        diceMultiplier;
                                                    break;
                                                case 6:
                                                    diceString = diceString + dice6;
                                                    dicePoints = dicePoints + 6 *
                                                        diceMultiplier;
                                                    break;
                                            }
                                            i++;
                                            if (i >= length) {
                                                callback({
                                                    "diceString": diceString,
                                                    "dicePoints": dicePoints
                                                });
                                                clearInterval(diceInterval);
                                            }

                                        }, 500);
                                    }

                                    //庄家
                                    var diceResult1;
                                    //闲家
                                    var diceResult2;
                                    if (tex.length == 4 || tex.length == 3) {
                                        randomDice(3, function (data) {
                                            diceResult1 = data;
                                            randomDice(3, function (data) {
                                                diceResult2 = data;
                                                inputData(diceResult1, diceResult2)
                                            });
                                        });
                                    } else if (tex.length == 5) {
                                        var diceNo = tex.substring(4, tex.length);
                                        // console.log(diceNo)
                                        randomDice(diceNo, function (data) {
                                            diceResult1 = data;
                                            randomDice(diceNo, function (data) {
                                                diceResult2 = data;
                                                inputData(diceResult1, diceResult2)
                                            });
                                        });
                                    } else {
                                    }

                                    function inputData(diceResult1, diceResult2) {
                                        let dicePointsResult1 = diceResult1.dicePoints - diceResult2
                                            .dicePoints;
                                        let dicePointsResult2 = diceResult2.dicePoints - diceResult1
                                            .dicePoints;
                                        //농가
                                        //登录账户信息
                                        // var makerId = localStorage.getItem("loginId");
                                        // var makerNick = $(".userInfo .btn-login").text();

                                        //bj账户信息
                                        var makerId = $("#szBjId").val();
                                        var makerNick = $(".text_information .nickname").text();
                                        // console.log(userData)
                                        let diceData = {
                                            "userId": objData.idt,
                                            "userNick": objData.nickName,
                                            "userAdd": dicePointsResult2,
                                            "makerId": makerId,
                                            "makerNick": makerNick,
                                            "makerAdd": dicePointsResult1
                                        };

                                        function outputData(data) {
                                            // console.log(data);
                                            let parameter1, parameter2;
                                            if (data[0].id == objData.idt && data[0].userNick == objData
                                                .nickName) {
                                                parameter1 = data[0].gamePoints;
                                                parameter2 = data[1].gamePoints;
                                            } else {
                                                parameter1 = data[1].gamePoints;
                                                parameter2 = data[0].gamePoints;
                                            }
                                            parameter1 = replaceSmall(parameter1);
                                            parameter2 = replaceSmall(parameter2);
                                            let mString = "";
                                            // let diceMultiplierString=packageResult.retrievalButtonFunction.multiple;
                                            let logString;
                                            if (dicePointsResult2 > 0) {
                                                //通过骰子游戏  赢了 BJ 5游戏点
                                                if (pageLang == "ko") {
                                                    logString = "[" + diceData.userNick + "] " +
                                                        packageResult.retrievalButtonFunction
                                                            .ByDiceGame + "[" + diceData.makerNick + "] " +
                                                        dicePointsResult2 + packageResult
                                                            .retrievalButtonFunction.wineGamePoints;
                                                } else {
                                                    logString = "[" + diceData.userNick + "] " +
                                                        packageResult.retrievalButtonFunction
                                                            .winByDiceGame + "[" + diceData.makerNick +
                                                        "] " + dicePointsResult2 + packageResult
                                                            .retrievalButtonFunction.addGamePoints;
                                                }
                                                dicePointsResult2 = "+" + dicePointsResult2;
                                            }
                                            if (dicePointsResult2 < 0) {
                                                if (pageLang == "ko") {
                                                    logString = "[" + diceData.userNick + "] " +
                                                        packageResult.retrievalButtonFunction
                                                            .ByDiceGame + "[" + diceData.makerNick + "] " +
                                                        dicePointsResult1 + packageResult
                                                            .retrievalButtonFunction.loseGamePoints;
                                                } else {
                                                    logString = "[" + diceData.userNick + "] " +
                                                        packageResult.retrievalButtonFunction
                                                            .loseByDiceGame + "[" + diceData.makerNick +
                                                        "] " + dicePointsResult1 + packageResult
                                                            .retrievalButtonFunction.addGamePoints;
                                                }
                                                dicePointsResult1 = "+" + dicePointsResult1;
                                            }
                                            $("#increaseLogPre").prepend("<li>" + $("#timeFrequencys")
                                                .text() + "&emsp;" + logString + "</li>");

                                            if (dicePointsResult2 == 0) {
                                                dicePointsResult1 = "";
                                                dicePointsResult2 = "";
                                                mString = ",화패";
                                            }
                                            let messageString = "@" + nickName + ":" + diceResult2
                                                    .diceString + "," + dicePointsResult2 + "₍🎮։" +
                                                parameter1 + "₎ " + makerNick + ":" +
                                                diceResult1.diceString + "," + dicePointsResult1 +
                                                "₍🎮։" +
                                                parameter2 + "₎" + mString + "{배수:" + diceMultiplier +
                                                "}";

                                            sendMessageCustom(messageString, 1, 2);

                                            // if (dicePointsResult2 > 0) {
                                            //     dicePointsResult2 = "+" + replaceSmall(dicePointsResult2);
                                            //     var messageString = "@" + nickName + ":" + diceResult2
                                            //             .diceString + "," + parameter1 + "₍" +
                                            //         dicePointsResult2 + "₎ " + makerNick + ":" +
                                            //         diceResult1.diceString + ", " + parameter2 + "₍" +
                                            //         dicePointsResult1 + "₎";
                                            //
                                            //     sendMessageCustom(messageString, 1, 2);
                                            // } else if (dicePointsResult2 == 0) {
                                            //     sendMessageCustom("@" + nickName + ":" + diceResult2
                                            //             .diceString + "," + parameter1 + " " +
                                            //         makerNick + ":" + diceResult1
                                            //             .diceString + "," + parameter2 + " 화패",
                                            //         1, 2);
                                            // } else {
                                            //     sendMessageCustom("@" + nickName + ":" + diceResult2
                                            //             .diceString + "," + parameter1 + "₍" +
                                            //         replaceSmall(dicePointsResult2) + "₎ " + makerNick + ":" +
                                            //         diceResult1
                                            //             .diceString + ", " + parameter2 + "₍" +
                                            //         dicePointsResult1 + "₎", 1, 2);
                                            // }
                                        }

                                        if (localStorageType == "indexdb") {
                                            opIndexDB.updateData(diceData, function (data) {
                                                // console.log(data);
                                                outputData(data);
                                            });
                                        } else if (localStorageType == "websql") {
                                            //修改data
                                            // diceData.userId = userData.userId;
                                            // console.log("websql")
                                            opWebsql.updateData(diceData, function (data) {
                                                // console.log(data);
                                                outputData(data);
                                            });
                                        } else if (localStorageType == "mysql") {

                                            opMysql.updateData(diceData, function (data) {
                                                // console.log(data);
                                                outputData(data);
                                            });
                                        } else {
                                            console.log("error command");
                                        }
                                    }
                                }
                            });

                        } else {
                            doFunctionByData(tex);
                        }


                    }
                }
                le = document.getElementsByTagName('dt').length;
            }
            //获取信息的延迟时间
        } else {
            getMessageCount++;
            //60秒终止
            getMessageCount >= 300 && stopRetrievalMessageFunction();
            // if(getMessageCount>=50){
            // 	stopRetrievalMessageFunction();
            // }
        }
    }, delayInputFrequency);
}

const object = new Set([
    [
        ["!text:*", "!text:*,axb"], (data) => {

    }
    ],
    [
        ["!🎲", "!주사위", "!주사위1/9"], (data) => {

    }
    ],
    [
        ["!총포인트", "!총횟수", "!게임포인트", "!채팅포인트", "!채팅횟수", "!채팅통계", "!채팅통계조회"], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            let serachType = "all";
            let dataStr;
            if (callbackData.isAuthority) {
                if (localStorageType == "indexdb") {
                    if (data.tex == "!채팅포인트") {
                        serachType = "chatPoints";
                        dataStr = "오늘 채팅 포인트:";
                    } else if (data.tex == "!채팅횟수") {
                        serachType = "chatTimes";
                        dataStr = "오늘 채팅 횟수:";
                    } else if (data.tex == "!게임포인트") {
                        serachType = "gamePoints";
                        dataStr = "오늘 게임 포인트:";
                    } else if (data.tex == "!총포인트") {
                        serachType = "allPoints";
                        dataStr = "누적 총 채팅 포인트:";
                    } else if (data.tex == "!총횟수") {
                        serachType = "allTimes";
                        dataStr = "누적 총 채팅 횟수:";
                    } else {

                    }
                    opIndexDB.searchDataByUserId(serachType, function (resArray) {
                        let dataString = "@" + data.nickName + ":";
                        //数组获取下标
                        index = resArray.map(mapData => mapData.id).indexOf(data.idt);
                        dataString = dataString + dataStr + resArray[index][serachType] +
                            ",순위:" + (index + 1) + "/" + resArray.length;
                        // console.log(dataString);
                        sendMessageCustom(dataString, 1, 4);
                    });

                } else if (localStorageType == "websql") {
                    opWebsql.searchDataByUserId(data.tex);
                } else if (localStorageType == "mysql") {
                    opMysql.searchDataByUserId(data);
                } else {
                    console.log("error command");
                }
            } else {

            }
        });
    }
    ],

    [
        ["!용왕", "!ace", "!포인트ace", "!채팅포인트ace", "!횟수ace", "!채팅횟수ace", "!게임ace", "!게임포인트ace", "!총포인트ace",
            "!총채팅포인트ace", "!총횟수ace", "!총채팅횟수ace"
        ], (data) => {
        let dataStr;
        let serachType;
        if (data.tex == "!포인트ace" || data.tex == "!채팅포인트ace" || data.tex == "!ace" || data.tex == "!용왕") {
            serachType = "chatPoints";
            dataStr = ":오늘 채팅 포인트:";
        } else if (data.tex == "!횟수ace" || data.tex == "!채팅횟수ace") {
            serachType = "chatTimes";
            dataStr = ":오늘 채팅 횟수:";
        } else if (data.tex == "!게임ace" || data.tex == "!게임포인트ace") {
            serachType = "gamePoints";
            dataStr = ":오늘 게임 포인트:";
        } else if (data.tex == "!총포인트ace" || data.tex == "!총채팅포인트ace") {
            serachType = "allPoints";
            dataStr = ":총 포인트:";
        } else if (data.tex == "!총횟수ace" || data.tex == "!총채팅횟수ace") {
            serachType = "allTimes";
            dataStr = ":총 횟수:";
        }
        let dataString;

        function outputText(searchData) {
            // dataString = "@" + searchData.userNick + dataStr + eval("searchData." + serachType) + ",순위:1/" + searchData.resArrLength;
            dataString = "@" + searchData.userNick + dataStr + searchData[serachType] + ",순위:1/" +
                searchData.resArrLength;
            // dataString="총 포인트:" + replaceSmall(data.allPoints);
            // console.log(dataString);
            sendMessageCustom(dataString, 1, 4);
        }

        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            if (callbackData.isAuthority) {
                if (localStorageType == "indexdb") {
                    // alert("Indexdb does not support query temporarily ace/용왕");
                    opIndexDB.serarchTodayMaxSortData(serachType, "down", function (searchData) {
                        outputText(searchData);
                        // var dataString = "@" + data.userNick +
                        // 	",오늘 채팅 횟수:" + data.chatPoints +
                        // 	",총 채팅 횟수:" + data.allPoints;
                        // let dataString = "@" + data.userNick +
                        //     ",오늘 채팅" + data.chatPoints +
                        //     "회,순위:1/" + dataLength + ",총 포인트:" + replaceSmall(data.allPoints);
                        // sendMessageCustom(dataString, 1, 4);
                    });

                } else if (localStorageType == "websql") {
                    opWebsql.searchMaxData(serachType, function (searchData) {

                        outputText(searchData);

                        // let dataString = "@" + data.userNick + ",오늘 채팅" + data
                        //         .maxChatPoint +
                        //     "회," + data.count + "명 발언 1위.";

                        // $("#testInput").val(dataString);
                        // sendMessageCustom(dataString, 1, 4);
                    });
                } else if (localStorageType == "mysql") {
                    opMysql.searchMaxData(serachType, function (searchData) {
                        // console.log(eval( "(" + searchData + ")"));
                        outputText(searchData);

                        // let dataString = "@" + data.userNick + ",오늘 채팅" + data
                        //         .maxChatPoint +
                        //     "회," + data.count + "명 발언 1위.";

                        // $("#testInput").val(dataString);
                        // sendMessageCustom(dataString, 1, 4);
                    });
                }

            } else {

            }
        });

    }
    ],
    [
        ["!눈물", "!악어의눈물", "!😩", "!☹", "!위로"], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            if (callbackData.isAuthority) {
                //鳄鱼的眼泪
                //sendMessageCustom("💧🐊악어의 눈물", 1, 5);
                let arrs = [
                    "위층의 학우들은 단념하지 마라.",
                    "생활 속의 뜻대로 되지 않는 일은 십중팔구이다.",
                    "살다 보면 이런저런 좌절을 겪는다.",
                    "도박은 사람을 해치고, 월드컵에서 멀리 떨어진다.",
                    "생활에는 벗어날 수 없는 곤경이 없다.",
                    "이런 굴곡은 미래의 더 빛나는 너만을 이룰 뿐이다."
                ];

                // $("#timesPromptInput").prop("checked", true).parent("label").addClass(
                //     "label-success");//수정 프롬프트 횟수 상태
                $("#inputFrequency").val(10); //한 마디당 간격이 10초입니다.
                sendMessageFunction(arrs); //여러 문장 보내기


                // let comfortIntervalIndex=0;
                // comfortInterval = setInterval(function() {
                // 	arrs[comfortIntervalIndex]

                // }, 5000);
            }
        });

        // {
        //     "tex": "!☹",
        //     "idt": "1057123764",
        //     "nickName": "핑퐁로봇4호",
        //     "grade": "user",
        //     "objIndex": 3
        // }

        // let searchData={
        //     id:"commandAuthorityStatus"+data.objIndex,
        //     grade:data.grade
        // }

        // console.log(data);

        // sendMessageCustom("💧🐊악어의 눈물", 1, 5);
    }
    ],
    /*[ // ||tex == '!bj' || tex == '!BJ'||tex == '!앵커'
	            // "!서포터",
	            ["!추첨매니저", "!추첨열혈팬", "!추첨구독자", "!추첨서포터", "!추첨팬", "!추첨일반참여자", "!매니저", "!열혈팬", "!구독자", "!팬", "!일반참여자",
	                "!사용자"
	            ], (data) => {
	            //测试模拟数据
	            // var tex = "!팬"
	            // var nickName = "11";
	            //打开列表
	            // $("#setbox_viewer").children().removeClass("off").addClass(
	            // 	"on");
	            opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
	                if (callbackData.isAuthority) {
	                    // console.log(data);
	                    //测试数据
	                    // var tex = "!팬"
	                    // var groupName = tex.substring(1);
	                    openUserList();
	                    //哪个组dom名称
	                    var groupName = data.tex.substring(1);

	                    function getGroupNameByName(name) {
	                        switch (true) {
	                            case name == '문지기' || name == '매니저' || name == "추첨매니저":
	                                // 매니저  管理员
	                                // groupName = 'lv_ul_manager';
	                                groupName = "manager";
	                                break;
	                            case name == '슈퍼팬' || name == '열혈팬' || name == "추첨열혈팬":
	                                //열혈팬热血粉丝
	                                // groupName = 'lv_ul_topfan';
	                                groupName = "hot";
	                                break;
	                            case name == '구독자' || name == "추첨구독자":
	                                // 구독자 订阅者
	                                // groupName = 'lv_ul_gudok';
	                                groupName = "subscription";
	                                break;
	                            case name == '팬' || name == "추첨팬":
	                                // groupName = 'lv_ul_fan';
	                                groupName = "fan";
	                                break;
	                            case name == "추첨서포터":
	                                //서포터支持者
	                                // groupName = 'lv_ul_supporter';
	                                groupName = "supporter";
	                                break;
	                            case name == '일반참여자' || name == '일반 참여자' || name == "추첨일반참여자" || name ==
	                            "사용자":
	                                //서포터支持者
	                                // groupName = 'lv_ul_user';
	                                groupName = "normal";
	                                break;
	                            // case name == '!bj' || name == '!BJ' || name == '!앵커':
	                            // 	//서포터支持者
	                            // 	groupName = 'lv_p_bj';
	                            // 	break;
	                            // default:
	                            // 	groupName = 'lv_p_bj';
	                            // 	break;
	                        }
	                        return groupName;
	                    }

	                    // console.log(groupName);
	                    groupName = getGroupNameByName(groupName);

	                    //等待中
	                    var waitIntevalsetInterval = setInterval(function () {

	                            count++;
	                            // console.log(count);
	                            var groupLenght = $("#userList .effective_list ." + groupName).length;
	                            if (groupLenght >= 1) {

	                                //滚动到最下方
	                                $("#userList").scrollTop($("#userList")[0].scrollHeight);

	                                //滚动条滚动到指定位置
	                                // $("#userList").scrollTop($("#" + groupName +" li").offset().top);
	                                scrollToLocation(".contents", "." +
	                                    groupName);
	                                clearInterval(waitIntevalsetInterval);
	                                //2秒后开始

	                                // console.log("3秒后开始");

	                                var removeDegJson = {
	                                    "transform": "",
	                                    "transition-duration": "",
	                                    "transition-timing-function": ""
	                                }
	                                var degJson = {
	                                    "transform": "scale(2,2)",
	                                    "transition-duration": "3s",
	                                    "transition-timing-function": "ease-in"
	                                }
	                                // console.log(degJson);
	                                //定义缩放
	                                $("#userList").css(degJson);
	                                degJson.transform = "scale(0.8,0.8)";
	                                // console.log(degJson);
	                                $("#afreecatv_player").css(degJson);

	                                setTimeout(function () {
	                                    groupLenght = $("." + groupName +
	                                        " li")
	                                        .length;
	                                    var i = getRandom(groupLenght);
	                                    var randomNo1;
	                                    var randomNo2;
	                                    var allLength;
	                                    var randomLength;
	                                    var inCount = 0;
	                                    var sendMs;

	                                    function dataProcessing(i) {

	                                        $("." + groupName +
	                                            " li")
	                                            .css({
	                                                "border": "none",
	                                                "background-color": ""
	                                            });
	                                        $("." + groupName +
	                                            " li:eq(" + i +
	                                            ")")
	                                            .css({
	                                                "border": "2px blue solid",
	                                                "background-color": "red"
	                                            });

	                                        //移除缩放
	                                        // $("#afreecatv_player,#userList")
	                                        // 	.css(
	                                        // 		"transform",
	                                        // 		"none");
	                                        $("#afreecatv_player,#userList")
	                                            .css(
	                                                removeDegJson
	                                            );
	                                        //滚动条跟随
	                                        // $("#userList")[0].scrollTo(0, $("#" +
	                                        // 		groupName + " li:eq(" + i + ")")
	                                        // 	.offsetTop);
	                                        // $("#userList").scrollTo(left:0;top:$("#" +groupName + " li:eq(" + i + ")").offset().top);

	                                        // $("#userList")
	                                        // 	.scrollTop($(
	                                        // 			"#" +
	                                        // 			groupName +
	                                        // 			" li:eq(" +
	                                        // 			i +
	                                        // 			")")
	                                        // 		.offset()
	                                        // 		.top);


	                                        var userDom = $(
	                                            "." +
	                                            groupName +
	                                            " li:eq(" +
	                                            i + ")");
	                                        var userId = userDom
	                                            .attr("id");
	                                        //滚动到中奖者位置
	                                        setTimeout(
	                                            function () {
	                                                scrollToLocation
	                                                (
	                                                    ".contents",
	                                                    "#" +
	                                                    userId
	                                                );
	                                            }, 4000);

	                                        var userNick = userDom.children("a").attr(
	                                            "user_nick");
	                                        // console.log(
	                                        // 	userNick +
	                                        // 	"(" +
	                                        // 	userId +
	                                        // 	")");
	                                        // 回复信息
	                                        // sendMs = "@" +
	                                        // 	nickName + ":" +
	                                        // 	tex
	                                        // 	.substring(1) +
	                                        // 	(i +
	                                        // 		1) + "번째，" +
	                                        // 	userNick + "(" +
	                                        // 	userId +
	                                        // 	"),축하드립니다.";

	                                        sendMs = "@" +
	                                            data.nickName + ":" +
	                                            data.tex.replace("!추첨", "").replace("!", "") +
	                                            (i + 1) +
	                                            "번째,[" +
	                                            userNick +
	                                            "],축하드립니다.";
	                                        // console.log("回复：" +
	                                        // 	sendMs);
	                                        showTipBarrageFunction(sendMs);
	                                        sendMessage(sendMs);
	                                        //关闭列表
	                                        // $("#setbox_viewer")
	                                        // 	.children()
	                                        // 	.removeClass(
	                                        // 		"on")
	                                        // 	.addClass(
	                                        // 		"off");
	                                        // $("#wrap_lv").css(
	                                        // 	"display",
	                                        // 	"none");

	                                        clearInterval(
	                                            randomInterval
	                                        );
	                                        return;
	                                    }

	                                    randomLength = parseInt(groupLenght / 2 + getRandom(
	                                        groupLenght / 2));

	                                    var randomInterval = setInterval(
	                                        function () {
	                                            groupLenght = $("." +
	                                                groupName +
	                                                " li")
	                                                .length;
	                                            // console.log("groupLenght:"+groupLenght);
	                                            //当前状态跟随
	                                            if (groupLenght < 100) {
	                                                $("." + groupName +
	                                                    " li")
	                                                    .css({
	                                                        "border": "none",
	                                                        "background-color": ""
	                                                    });
	                                                $("." + groupName +
	                                                    " li:eq(" + i +
	                                                    ")")
	                                                    .css({
	                                                        "border": "2px blue solid",
	                                                        "background-color": "red"
	                                                    });
	                                            }
	                                            //随机i
	                                            if (true) {
	                                                // console.log("大于200方法");
	                                                i = getRandom(groupLenght - 1);
	                                                inCount++;
	                                                var initRan = -1;

	                                                // if (groupLenght > 100) {
	                                                //     allLength = parseInt(groupLenght / 100);
	                                                // } else {
	                                                //     allLength = 4;
	                                                // }
	                                                allLength = 4;
	                                                var dataArry = [getRandom(
	                                                    randomLength)];
	                                                // console.log("---------------------------------");
	                                                // console.log(dataArry)
	                                                for (var j = 1; j < allLength; j++) {
	                                                    let randomNo = getRandom(
	                                                        randomLength);
	                                                    // console.log(dataArry[0] + "------" + randomNo)
	                                                    if (dataArry[0] === randomNo) {
	                                                        dataArry.push(randomNo);
	                                                    } else {
	                                                        dataArry[0] = getRandom(
	                                                            randomLength);
	                                                        continue;
	                                                    }
	                                                }

	                                                if (randomLength <= 1000 &&
	                                                    randomLength % 100 == 0) {
	                                                    //次后必中
	                                                    showTipBarrageFunction(inCount +
	                                                        "/" + groupLenght +
	                                                        packageResult.object
	                                                            .showTipBarrageFunction1[
	                                                            0] + randomLength +
	                                                        packageResult.object
	                                                            .showTipBarrageFunction1[1]
	                                                    ); // showTipBarrageFunction(
	                                                } else if (randomLength <= 500 &&
	                                                    randomLength % 50 == 0) {
	                                                    showTipBarrageFunction(inCount +
	                                                        "/" + groupLenght +
	                                                        packageResult.object
	                                                            .showTipBarrageFunction1[
	                                                            0] + randomLength +
	                                                        packageResult.object
	                                                            .showTipBarrageFunction1[1]
	                                                    ); // showTipBarrageFunction(
	                                                } else if (randomLength <= 100 &&
	                                                    randomLength % 10 == 0) {
	                                                    showTipBarrageFunction(inCount +
	                                                        "/" + groupLenght +
	                                                        packageResult.object
	                                                            .showTipBarrageFunction1[
	                                                            0] + randomLength +
	                                                        packageResult.object
	                                                            .showTipBarrageFunction1[1]
	                                                    ); // showTipBarrageFunction(
	                                                }


	                                                // console.log(dataArry + "最大随机值:" + randomLength + "总:" + inCount+"allLength:"+allLength);
	                                                if (randomLength < 0) {
	                                                    console.log("异常小于0")
	                                                    clearInterval(randomInterval);
	                                                }
	                                                if (dataArry.length == allLength) {
	                                                    // console.log(i);
	                                                    //中奖数据处理
	                                                    dataProcessing(i);
	                                                    clearInterval(randomInterval);
	                                                } else {
	                                                    if (getRandom(groupLenght) >
	                                                        getRandom(groupLenght / 2)) {
	                                                        randomLength -= getRandom(
	                                                            allLength);
	                                                    } else {
	                                                        randomLength += getRandom(
	                                                            allLength);
	                                                    }
	                                                }
	                                            } else {
	                                                // console.log("小于200方法");
	                                                randomNo1 = getRandom(groupLenght);
	                                                randomNo2 = getRandom(groupLenght);
	                                                // $("#" + groupName + " li").css("border",
	                                                // 	"none").css("background-color", "none");
	                                                // $("#" + groupName + " li").css("border",
	                                                // 	"none").css("background-color", "none");


	                                                // console.log("i:", i,
	                                                //     "randomNo1:",
	                                                //     randomNo1,
	                                                //     "randomNo2:",
	                                                //     randomNo2 +
	                                                //     ",all:",
	                                                //     groupLenght);

	                                                if (randomNo1 == i && randomNo2 == i) {
	                                                    //中奖数据处理
	                                                    dataProcessing(i);
	                                                }
	                                                i++;
	                                                if (i >= groupLenght) {
	                                                    i = 0;
	                                                    inCount++;
	                                                    //循环次数提醒
	                                                    if (inCount % 10 == 0) {
	                                                        showTipBarrageFunction(inCount +
	                                                            "/" + groupLenght +
	                                                            packageResult.object
	                                                                .showTipBarrageFunction2
	                                                        ); // showTipBarrageFunction(
	                                                    }
	                                                    // 	"<div class='alert alert-block disableSelection'><h1>" +
	                                                    // 	count +
	                                                    // 	"/" +
	                                                    // 	groupLenght +
	                                                    // 	"번째 순환</h1><hr><img class='showBarrageImg'  src='" +
	                                                    // 	sessionStorage
	                                                    // 	.getItem(
	                                                    // 		"showBarrageImage"
	                                                    // 		) +
	                                                    // 	"'/></div>"
	                                                    // );
	                                                    var maxCount =
	                                                        groupLenght >=
	                                                        50 ?
	                                                            groupLenght :
	                                                            50;
	                                                    if (inCount >=
	                                                        maxCount) {
	                                                        //移除缩放
	                                                        // $("#afreecatv_player,#userList")
	                                                        // 	.css(
	                                                        // 		"transform",
	                                                        // 		"none");
	                                                        $("#afreecatv_player,#userList")
	                                                            .css(
	                                                                removeDegJson
	                                                            );

	                                                        // sendMs = "@" +
	                                                        // 	nickName +
	                                                        // 	":50번을 반복해서 당첨자가 나오지 않았다";
	                                                        // sendMessage(
	                                                        // 	sendMs);
	                                                        // console.log(
	                                                        // 	count +
	                                                        // 	"次遍历，未产生中奖者"
	                                                        // );
	                                                        // console.log("当前i:"+i+"-"+inCount+"/"+inCount + "번째 순환이 끝났습니다. 아무도 뽑히지 않았습니다.");
	                                                        showTipBarrageFunction(inCount +
	                                                            packageResult.object
	                                                                .showTipBarrageFunction3
	                                                        );
	                                                        // 당첨자가 나오지 않았습니다.
	                                                        clearInterval(
	                                                            randomInterval
	                                                        );
	                                                    }

	                                                }
	                                            }


	                                        }, 0.001);
	                                }, 3000)

	                            } else if (count > 20) {
	                                //移除缩放
	                                // $("#afreecatv_player,#userList").css(
	                                // 	"transform",
	                                // 	"none");
	                                $("#afreecatv_player,#userList")
	                                    .css(removeDegJson);

	                                sendMs = "@" + data.nickName + ":" + data.tex.substring(
	                                        1) +
	                                    "존재하지 않음";
	                                // console.log(sendMs);
	                                sendMessage(sendMs);
	                                clearInterval(waitIntevalsetInterval);
	                            } else {
	                                // console.log("没有列表");
	                            }
	                        },
	                        500);
	                }
	            });
	        }
	        ],*/
    [
        ["!아름답다", "!예쁘다", "!사랑", "!사랑해", "!사랑해요", "!귀엽다", "!하얗다", "!화이트",
            "!카와이", "!피카츄"
        ], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            if (callbackData.isAuthority) {
                sendMessageCustom("'̀̀̀̀ͯ'", 1, 0.1);
            } else {

            }
        });

    }
    ],
    [
        ["!감사", "!고마워요"], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            if (callbackData.isAuthority) {
                sendMessageCustom("당신의 행위 예술에 감사 드립니다'̀̀̀̀ͯ'", 1,
                    5
                );
            } else {

            }
        });

    }
    ],
    [
        ["!안녕", "!안녕히 계세요"], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            if (callbackData.isAuthority) {
                sendMessageCustom("제때에 즐기다'̀̀̀̀ͯ'", 1, 4);
            } else {

            }
        });

    }
    ],
    [
        ["!용감", "!용감하다", "!용감해지다", "!침착하다", "!hold on"], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            if (callbackData.isAuthority) {
                sendMessageCustom(
                    "'̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀ͯ'", 1, 8);
            } else {

            }
        });

    }
    ],
    [
        ["!웅기하다", "!웅기"], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            if (callbackData.isAuthority) {
                message =
                    "'̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀̀ͯ'";
                sendUltimateLengthMessage(message);
            } else {

            }
        });

    }
    ],
    [
        ["!가리다", "!막다", "!덮어쓰다"], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            if (callbackData.isAuthority) {
                message =
                    "'̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞''̴̵̶̷̸̡̢̧̨̛̖̗̘̙̠̣̤̥̦̩̰̱̲̳̹͇͈͉͓͔͕͖͙̜̝̞̟̪̫̬̭̮̯̺̻̼͍͎̀́̂̃̄̅̆̇̈̉̐̑̒̓̔̀́͂̓̈́͆͐͑͒͗̊̋̌̍̎̏̽̾̿͊͋͌̕͘̚͠ͅ͏͚͛ͪͫͬͭͮͯ͜͟͝͞'";
                // sendMessageCustom(message, 2, 32);
                sendUltimateLengthMessage(message);
            } else {

            }
        });

    }
    ],
    [
        ["!극한길이", "!ultimatelength", "!long",
            "!极限长度", "!once", "!딱한번"
        ], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            if (callbackData.isAuthority) {
                message =
                    "'ͯ̑͒'̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̨̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩͚̭̤̩'";
                // sendMessageCustom(message, 2, 32);
                sendUltimateLengthMessage(message);
            } else {

            }
        });

    }
    ],
    [
        ["!reboot", "!재부팅", "!reload", "!restart"], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            if (callbackData.isAuthority) {
                refreshPage(null, packageResult.refreshPage.text1);
            } else {

            }
        });

    }
    ],
    [
        ["!탑", "!정글", "!미드", "!바텀", "!임의", "!모든", "!서포터", "!top", "!mid",
            "!jun", "!ad", "!adc", "!ap", "!sup", "!any", "!all"
        ], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {

            if (callbackData.isAuthority) {
                // const LOLURL = chrome.runtime.getURL("LOL.html");
                const LOLURL = sessionStorage.getItem("randomURL");
                // winowName = window.open(LOLURL, "windowName");
                // winowName = window.open(LOLURL, "_blank",
                //     "left=300,width=1000,height=1000,channelmode=yes,menubar=yes,scrollbars=0"
                // );
                // let dBCHeight=document.body.clientWidth;
                // let dBCWidth=document.body.clientWidth;
                // dBCHeight=dBCHeight-dBCHeight/4;
                // dBCWidth=dBCWidth-dBCWidth/4;
                // let features="left=300,fullscreen=0,width="+document.body.clientWidth+",height="+document.body.clientWidth+",status=0,menubar=no,scrollbars=0,titlebar=0,toolbar=0,resizable=0,location=0";
                let features2 =
                    "left=300,fullscreen=0,width=1000,height=1000,status=0,menubar=no,scrollbars=0,titlebar=0,toolbar=0,resizable=0,location=0";
                winowName = window.open(LOLURL, makerId, features2);
                setTimeout(function () {
                    winowName.postMessage(data.tex, LOLURL);
                    //所有英雄event.data == "!랜덤영웅" || event.data == "!임의의영웅" || event.data == "!임의영웅"

                    // winowName.postMessage("!랜덤탑", LOLURL);
                    // winowName.postMessage("!랜덤정글", LOLURL);
                    // winowName.postMessage("!랜덤미드", LOLURL);
                    // winowName.postMessage("!랜덤바텀", LOLURL);
                    // winowName.postMessage("!랜덤서포터", LOLURL);
                }, 1000);
            }
        });


    }
    ],
    [
        ['!stop', '!멈추다'], (data) => {
        //终止消息提示
        // document.getElementById('stopButtonId').click();
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {

            if (callbackData.isAuthority) {
                stopBatchSendFunction();
                // alert('['+grade+']'+nickName+'('+idt+')'+is_mobile+':'+tex'你使用终止命令,终止了任何条件程序');
                // console.log(idt + ':你使用终止命令,终止了部分程序');
                //恢复默认
                // document.getElementById('environmentButtonId').click();
                environmentFunction();
                // console.log(idt + ':系统恢复默认配置');
            }
        });

    }
    ],
    [
        // 部署环境(仅限管理员(id包含10571237))
        ['!en', '!환경', '!환경배포', '!start', '!시작하다', '!시작'], (data) => {
        if (idt.includes('10571237')) {

            // document.getElementById('environmentButtonId').click();
            environmentFunction();

            getDomById('testInput').value = '@' + data.nickName +
                ':환경 배치 성공';
            getDomById('send_message').click();

            // console.log(idt + '部署环境成功');


        }
    }
    ],
    [
        //聊天热度延迟速度
        ['!채팅속도', '!지연속도', '!속도'], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {


            if (callbackData.isAuthority) {
                var delayInputTextId = getDomById('delayInputTextId').value;
                if (delayInputTextId >= 1000) {
                    delayInputTextId = delayInputTextId / 1000 + 's';
                } else {
                    delayInputTextId = delayInputTextId + 'ms';
                }
                var sendMs = '@' + data.nickName + ':관중:' + getDomById('nAllViewer')
                        .innerHTML +
                    ',채팅속도:' + delayInputTextId + '마다!';
                sendMessageCustom(sendMs, 1, 4);
            }
        });

        // sendMessage(sendMs);

        // getDomById('testInput').value =
        // 	getDomById('send_message').click();

    }
    ],
    [
        ["!문지기", "!슈퍼팬", "!문지기목록", "!문지기수"], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {

            if (callbackData.isAuthority) {
                //哪个组dom名称
                var groupName = '';
                openUserList();
                var count = 0;
                var readListInterval = setInterval(function () {
                    //查看指定用户数量
                    var text = "";
                    var managerList = $("#userList .effective_list .manager");
                    var user_id;
                    var user_nick;
                    if (managerList.length > 0) {
                        clearInterval(readListInterval);
                        setTimeout(function () {
                            //再次获取
                            managerList = $("#userList .effective_list .manager");
                            if (data.tex == "!문지기수") {
                                text = "매니저 수:" + managerList.length;
                            } else {
                                for (var i = 0; i < managerList
                                    .length; i++) {
                                    // user_id =managerList[i].children[0].getAttribute("user_id");
                                    user_nick = managerList[i]
                                        .children[0]
                                        .getAttribute("user_nick");
                                    //仅昵称
                                    text = text + " " + (i + 1) +
                                        '.' +
                                        user_nick;
                                    //昵称和Id
                                    // text = text + (i + 1) + '.' + user_nick + '(' + user_id + ')';

                                }
                            }

                            // console.log(text);
                            // console.log(flag);
                            sendMessageCustom(text, 1, 4);
                            setTimeout(function () {
                                $("#list_viewer .close").click();
                            }, 1000);
                        }, 3000);
                    } else {
                        count++;
                        if (count >= 10) {
                            clearInterval(readListInterval);
                            text = "@" + data.nickName + ":매니저 존재하지 않음";

                            sendMessageCustom(text, 1, 4);
                            setTimeout(function () {
                                $("#list_viewer .close").click();
                            }, 1000);
                        }


                    }


                }, 1000);
                // document.getElementById('setbox_viewer').children.item(0).click();


            }
        });
    }
    ],
    // [
    //     [!open], (data) => {
    //     getDomById('inputFrequency'
    //     ).value = 6;
    //     document.getElementById('setbox_viewer').children.item(0)
    //         .click();
    // }
    // ],
    [
        //发送按钮语言
        ['!보내다', '!send', '!发送', '!보내기',
            '!나'
        ], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {

            if (callbackData.isAuthority) {
                if (data.tex == '!나') {
                    sendMessageCustom("나제일 길어요.", 1, 3);
                } else {
                    sendMessageCustom($('#showMessage').text(), 1, 3);
                }
            }
        });


        // $('#write_area').html($('#showMessage').html());
        // getDomById('btn_send').click();

    }
    ],
    [
        ['!보고시간', '!시간', '!time'], (data) => {
        // console.log('管理员(' + idt + '):' + '보고시간(报告时间)');
        //获取1-3的随机数字
        // console.log(parseInt(Math.random()*NO/1));
        // var rdmNo = parseInt(Math.random() * 3 / 1 + 1);
        // $("#detailedMenu").click();
        // $('#timeButtonId').click();
        // $('#timeDivId').collapse("show");
        // timeButtonFunction();
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {

            if (callbackData.isAuthority) {
                setTimeout(function () {
                    document.getElementById('handTimeId').click();
                    $("#basicMenu").click();
                }, 5000);

            }
        });

    }
    ],
    [
        // !보고시간现在手动的时间
        ["!방송시작시간", "!방송시간"], (data) => {

        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {
            if (callbackData.isAuthority) {
                var detail_view = getSonButtonDom1('detail_view');
                var detail_viewContent = detail_view.textContent;
                detail_viewContent = getDateTimeFormate(detail_viewContent);
                var $timeFrequencys = $("#timeFrequencys").text();
                var dateString;
                if (data.tex == "!방송시간") {
                    dateString = "벌써 방송 ";
                    var new_date = new Date($timeFrequencys); //新建一个日期对象，默认现在的时间
                    var old_date = new Date(
                        detail_viewContent); //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期

                    var difftime = (new_date - old_date) /
                        1000; //计算时间差,并把毫秒转换成秒

                    var days = parseInt(difftime / 86400); // 天  24*60*60*1000
                    var hours = parseInt(difftime / 3600) - 24 *
                        days; // 小时 60*60 总小时数-过去的小时数=现在的小时数
                    var minutes = parseInt(difftime % 3600 /
                        60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
                    var seconds = parseInt(difftime % 60); // 以60秒为一整份 取余 剩下秒数

                    if (days > 0) {
                        dateString = dateString + days + "일 ";
                    }
                    if (hours > 0) {
                        dateString = dateString + hours + "시간 ";
                    }
                    if (minutes > 0) {
                        dateString = dateString + minutes + "분 ";
                    }
                    if (seconds > 0) {
                        dateString = dateString + seconds + "초.";
                    }
                } else {
                    dateString = detail_viewContent;
                }
                // sendMessage(dateString);
                sendMessageCustom(dateString, 1, 4);

            }
        });

    }
    ],
    [
        ['!별', '!즐겨찾기', '!UP', '!up', '!좋아요', '!좋아'], (data) => {
        opSettingIndexDB.searchCommandAuthoritySupport(data, function (callbackData) {

            if (callbackData.isAuthority) {
                //收藏
                var bookmarkSonDom;
                //点赞
                var up_recommend;
                var text;
                switch (true) {
                    case
                    data.tex == '!별' || data.tex == '!즐겨찾기':
                        bookmarkSonDom = getSonButtonDom('bookmark');
                        let boomarkCnt = $(".boomark_cnt").children(".count")
                            .text();
                        if (bookmarkSonDom.className == '') {
                            bookmarkSonDom.click();
                            setTimeout(function () {
                                bookmarkSonDom = getSonButtonDom(
                                    'bookmark');
                                if (bookmarkSonDom.className == 'on') {
                                    // sendMessage('@' + nickName + ':즐겨찾기 추가 성공,' + boomarkCnt +
                                    // 	'=>' + $(".boomark_cnt").children(".count").text());
                                    // sendMessage('@' + nickName + ':즐겨찾기 추가 성공,' + boomarkCnt +
                                    // 	'=>' + (parseInt(boomarkCnt) + 1));

                                    text = '@' + data.nickName +
                                        ':즐겨찾기 추가 성공,' +
                                        replaceSmall(
                                            boomarkCnt) + '=>' +
                                        replaceSmall(boomarkCnt +
                                            1);
                                    sendMessageCustom(text, 1, 0.1);

                                } else {
                                    sendMessageCustom('@' + data.nickName +
                                        ':즐겨찾기 추가 실수', 1,
                                        0.1);
                                }
                            }, 2500);
                        } else {
                            //收藏失败,您已经收藏
                            sendMessageCustom('@' + data.nickName + ':이미 즐겨찾기', 1,
                                0.1);
                        }
                        break;
                    case
                    data.tex == '!UP' || data.tex == '!좋아요' || data.tex == '!좋아' || data.tex ==
                    '!up':
                        up_recommend = getSonButtonDom('up_recommend');

                        let upCount = $(".up_cnt").children(".count").text();
                        if (up_recommend.className == 'on') {
                            //点赞失败,您已经点赞
                            sendMessageCustom('@' + data.nickName + ':이미 좋아요 표시됨', 1,
                                0.1);

                        } else if (up_recommend.className == '') {
                            up_recommend.click();
                            setTimeout(function () {
                                up_recommend = getSonButtonDom(
                                    'up_recommend');
                                if (up_recommend.className == 'on') {

                                    // console.log('点赞成功:' + up_recommend.className);
                                    // sendMessage('@' + nickName + ':좋아요 성공,' + upCount + "=>" +
                                    // 	$(".up_cnt").children(".count").text());
                                    // sendMessage('@' + nickName + ':좋아요 성공,' + upCount + "=>" + (
                                    // 	parseInt(upCount) + 1));
                                    text = '@' + data.nickName + ':좋아요 성공,' +
                                        replaceSmall(
                                            upCount) +
                                        "=>" + replaceSmall(upCount +
                                            1);
                                    sendMessageCustom(text, 1, 0.1);
                                } else {
                                    // console.log('点赞失败');
                                    sendMessageCustom('@' + data.nickName +
                                        ':좋아요 실수', 1, 0.1);
                                }
                            }, 2500);
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    }
    ],

    // [[],(data)=>{}]
]);

// const aaa = (bbb) => {
// 	console.log(bbb);
// }


function isStart() {
    //渲染特效
    // $('#retrievalButtonId').toggleClass()
    $("#retrievalButtonId").toggleClass('btn-success btn-inverse');
    let showMessageDivClass = $('#showMessageDiv').attr('class');
    // console.log(showMessageDivClass);
    if (showMessageDivClass.includes('in')) {
        retrievalButtonFunction();
        console.log('包含in,执行');
    } else {
        if ('undefined' != typeof messageInterval) {
            clearInterval(messageInterval);
        }

        console.log('不包含in,不执行');
    }

}

//刷新指定网页
async function refreshPage(url, text) {
    // document.write("새로 고침 대기!");새로 고침 대기!
    $("body").replaceWith("<div class='alert alert-block disableSelection backgroundImg'><h1>" + text +
        "</h1><hr></div>");
    $(".backgroundImg").css("background-image", 'url(' +
        bgURL + ')');
    if (url && "undefined" != typeof url && null != typeof url) {
        location.replace(location);
    } else {
        location.reload();
        // history.go(0)
        // document.execCommand('Refresh
    }
}

function queryReply(tex, searchUserData, data) {
    var index = 0;
    var dataString = "@" + searchUserData.userNick;
    // sendMessageCustom(dataString, 1, 4);
    if (tex == "!총포인트") {

        if (localStorageType == "indexdb") {
            opIndexDB.serarchTodaySortRankDataByUserData("allPoints", function (resArray, resArrayLength) {
                index = resArray.map(userData => userData.id).indexOf(searchUserData.id);
                // console.log(index);
                index = index + 1;
                dataString = dataString + ",누적 총 포인트:" + data.allPoints + ",순위:" + index;
                sendMessageCustom(dataString, 1, 4);
            });
        }


    } else if (tex == "!채팅포인트") {
        if (localStorageType == "indexdb") {
            opIndexDB.serarchTodaySortRankDataByUserData("chatPoints", function (resArray, resArrayLength) {
                // console.log(resArrayLength);
                // https://zhuanlan.zhihu.com/p/340714604
                // pos = myArray.map(function(e) { return e.hello; }).indexOf('stevie');
                //myArray.map(x => x.hello).indexOf('stevie')
                // myArray.findIndex(x => x.hello === 'stevie')

                index = resArray.map(userData => userData.id).indexOf(searchUserData.id);
                // console.log(index);
                index = index + 1;

                dataString = dataString + ",오늘 채팅 포인트:" + data.chatPoints + ",순위:" + index;
                sendMessageCustom(dataString, 1, 4);
            });
        }


    } else if (tex == "!게임포인트") {
        dataString = dataString + ",오늘 게임 포인트:" + data.gamePoints;
        sendMessageCustom(dataString, 1, 4);
    } else if (tex == "!채팅통계조회") {
        dataString = dataString + ",오늘 채팅:" + data.chatPoints + ",오늘 게임:" +
            data.gamePoints + ",누적 총:" + data.allPoints;
        sendMessageCustom(dataString, 1, 4);
    }
    // sendMessageCustom(dataString, 1, 4);
}

function openUserList() {
    document.getElementById('setbox_viewer').children.item(0).click();
    $(".list_participant").removeClass("off").addClass("on");
}

function calculateAddPoints(userText) {
    // console.log(singleIncreaseMaxinumValueLocalStorage);
    //增加的分数
    let increase;
    //保留后几位
    let increaseBit;
    // console.log(accordingNumberWords.checked);
    //按照字数
    // console.log($isSingleIncreaseMaxinum.prop("checked"));
    if (userText != null) {
        userText = userText.replaceAll(" ", "");
        if (typeof $isSingleIncreaseMaxinum !== "undefined" && $isSingleIncreaseMaxinum.prop("checked")) {
            //去除空格 判断null
            if (userText.length <= singleIncreaseMaxinumValueLocalStorage) {
                // increase = roundFun(userText.length/15, 2);
                // increase = userText.length / 15;
                // increase = userText.length / accordingNumberWordsValueLocalStorage;
                increase = userText.length;
            } else {
                // increase = 2;
                // increase = 15 / accordingNumberWordsValueLocalStorage;
                increase = singleIncreaseMaxinumValueLocalStorage;
            }
        } else {
            increase = userText.length;
        }
        // console.log("userTextLength:" + userText.length);
    } else {
        //表情等
        // increase = 0.25 * 30 / accordingNumberWordsValueLocalStorage;
        increase = 0.25 * 30;
    }

    increaseBit = 2;
    // if (accordingNumberWords.checked) {} else{
    //     //按照条数
    //     // if(userText!=null){
    //     //     // 信息
    //     //     increase = 1;
    //     // }else{
    //     //     //表情
    //     //     increase = 0.5;
    //     // }
    //     increase = 1;
    //     increaseBit=0;
    // }
    let calcAddData = {
        "increase": increase,
        "increaseBit": increaseBit
    }
    // console.log(calcAddData);
    return calcAddData;
}

function outputMyTable(startIndex, outputArray) {
    $("#myTable tbody").children().detach();
    // $("#myTable tbody").children().remove();
    // let index = 0;
    for (outData of outputArray) {
        startIndex++;
        outputMyTableTr(startIndex, outData);
    }
}

function outputMyTableTr(startIndex, data) {
    let rsGamePoints = data.gamePoints === 0 ? "━ " : data.gamePoints;

    let classString = '';
    if (data.chatPoints / data.chatTimes > $("#singleIncreaseMaxinumValue").val()) {
        classString = "background-color:red;";
    }

    $("#myTable tbody").append("<tr style='" + classString + "'><th>" + startIndex +
        "</th><th><a href='https://bj.afreecatv.com/" + data.id + "' target='_blank'>" + data.userNick + "(" + data
            .id + ")</a></th><th>" + convertGrade(data.grade) + "</th><th>" + data.chatPoints +
        "</th><th>" + data.chatTimes + "</th><th>" + rsGamePoints + "</th><th>" + data.allPoints +
        "</th><th>" + data.allTimes + "</th><th>" + data.date + "</th></tr>");
}

function numberOfGroups(userDataArrayLength) {
    let spliceArraLength;
    if (userDataArrayLength < 50) {
        spliceArraLength = 5;
    } else if (userDataArrayLength < 500) {
        spliceArraLength = 50;
    } else if (userDataArrayLength < 5000) {
        spliceArraLength = 500;
    } else if (userDataArrayLength < 50000) {
        spliceArraLength = 1000;
    } else {
        spliceArraLength = 2000;
    }
    //测试数据
    spliceArraLength = 50;
    return spliceArraLength;
}

//标记是否自动隐藏了myModal
var isMyModal = false;

function openInportPorgress(resultLength, userDataArrayLength, conmmitArrayDataLength, arraIndex) {

    //统计聊天隐藏
    let $myModal = $("#myModal");
    let isModalShow = $myModal.css("display");
    if (isModalShow == "block") {
        isMyModal = true;
        $myModal.hide();
    }
    // 显示所有圆柱
    $(".lui-div").show();
    let storageRatio = resultLength / userDataArrayLength;
    //选择的数据库
    $("#" + localStorageType.toLowerCase() + "-lui-inner").css("height", storageRatio * 100 + "%").show();
    //上一次选择的数据库 底部填充
    $("#" + lastStoreType + "-lui-inner").height((1 - storageRatio) * 100 + "%").show();
    /*console.log(storageRatio);*/
    if (storageRatio != 1) {
        $("#" + localStorageType + "-lui-all").text(userDataArrayLength);
        $("#" + localStorageType + "-lui-commit").text(resultLength).show();

        $("#" + lastStoreType + "-lui-all").text(userDataArrayLength - resultLength);
        $("#" + lastStoreType + "-lui-commit").show().text(resultLength);
    } else {
        /* $("#" + localStorageType + "-lui-all").text("");*/
        $("#" + localStorageType + "-lui-commit").text("").hide();

        $("#" + lastStoreType + "-lui-all").text("0");
        $("#" + lastStoreType + "-lui-commit").text("").hide();

        //上一次选择的数据库 底部填充
        /*$("#" + lastStoreType + "-lui-inner").hide();*/
    }


    $("#importBar").css("width", storageRatio * 100 + "%");
    if (pageLang == "zh") {
        // $("#importBarText").text(packageResult.openInportPorgress.importBar + userDataArrayLength + "/" + resultLength + packageResult.openInportPorgress.importBarText);
        // $("#importBarSpan").text(packageResult.openInportPorgress.importBar + conmmitArrayDataLength + "/" + (arraIndex + 1) + packageResult.openInportPorgress.importBarSpan);

        // $("#importBarSpan").text(packageResult.openInportPorgress.importBar + userDataArrayLength + "/" + resultLength + packageResult.openInportPorgress.importBarText);
        $("#importBarText").text(packageResult.openInportPorgress.importBar + conmmitArrayDataLength + "/" + (
            arraIndex + 1) + packageResult.openInportPorgress.importBarSpan);


    } else if (pageLang == "ko") {
        // $("#importBarText").text(packageResult.openInportPorgress.importBarText + userDataArrayLength + "/" + resultLength + packageResult.openInportPorgress.importBar);
        // $("#importBarSpan").text(packageResult.openInportPorgress.importBarSpan + conmmitArrayDataLength + "/" + (arraIndex + 1) + packageResult.openInportPorgress.importBar);


        // $("#importBarSpan").text(packageResult.openInportPorgress.importBarText + userDataArrayLength + "/" + resultLength + packageResult.openInportPorgress.importBar);
        $("#importBarText").text(packageResult.openInportPorgress.importBarSpan + conmmitArrayDataLength + "/" + (
            arraIndex + 1) + packageResult.openInportPorgress.importBar);
    }
}

function closeInportPorgress(closeType) {
    // $("#importBarText").text("导入完成!");
    // $("#importBarSpan").text("导入完成!");
    // setTimeout(function(){},500);
    let className;
    if (closeType = "success") {
        className = "progress-success";
    } else if (closeType = "danger") {
        className = "progress-danger";
    }
    setTimeout(function () {
        $("#importBarParent").addClass(className);
    }, 500);
    setTimeout(function () {
        /*$("#" + localStorageType.toLowerCase() + "-lui-inner").css("height", "");*/
        $("#importBarText").text("");
        $("#importBarSpan").text("");

        $("#importBar").css("width", "");
        // $("#importBar").removeAttr("style");
        $("#importBarParent").removeClass(className).hide();
        //通过是否隐藏的标记决定是否再次显示
        if (isMyModal) {
            //统计聊天显示
            $("#myModal").show();
            isMyModal = false;
        }
        // 隐藏所有圆柱
        $(".lui-div").hide();
    }, 1500);
}
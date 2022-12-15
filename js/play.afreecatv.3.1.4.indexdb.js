var req;
var dbName = 'chatPointsModeDB';
var idbVersion;
//初始化

// req = indexedDB.open(dbName);

// req.onsuccess=function(event){

// 	console.log("event",event);
// 	var dataVersion=event.target.result.version;
// 	dataVersion=parseInt(dataVersion);

// }

idbVersion = localStorage.getItem("indexdb_version");
if (!idbVersion || idbVersion == null) {
    // ||dataVersion!=idbVersion
    // console.log("idbVersion更新");
    localStorage.setItem("indexdb_version", 1);
}

var resArray;
var version;
var loginId;

var opIndexDB = {
    aa: function () {
        console.log("test");
    },
    versionSynchronization: function () {
        //版本校验
        idbVersion = localStorage.getItem("indexdb_version");
        idbVersion = parseInt(idbVersion);
        if (version != idbVersion && idbVersion > 0) {
            // console.log("版本更新");
            // isUpdate = true;
            // stopRetrievalMessageFunction();
            // stopTodayMaxSortDataInterval()
            // version = idbVersion;
            // console.log(req);
            console.log(indexDataBase);

            // isUpdate = true;
            // // setTimeout(function(){
            // // console.log(req.readyState);

            // if (req.readyState == "done") {
            // 	req = indexedDB.open(dbName);
            // 	req.onsuccess = function() {
            // 		// console.log("success");

            // 		showTipBarrageFunction(

            // 			"<div class='alert alert-block disableSelection'><h1>indvexdb 버전 업데이트 성공</h1><hr><img class='showBarrageImg'  src='" +
            // 			sessionStorage.getItem(
            // 				"showBarrageImage") +
            // 			"'/></div>"
            // 		);
            // 		// console.log(req);
            // 		version = idbVersion;
            // 		isUpdate = false;
            // 	}
            // 	req.onerror = function() {
            // 		// console.log("error1");
            // 		// console.log(req);
            // 		version = idbVersion;
            // 		isUpdate = false;
            // 	}
            // } else {
            // 	db.close();
            // 	db.onclose = function() {
            // 		alert(db.name + "关闭");
            // 	}
            // }


            // },10000);
            // $('html').remove();

            refreshPage(null, packageResult.refreshPage.text2);

        }
    },
    getDB: function () {
        // request.onblocked = function(event) {
        //     alert('请关闭其它打开应用的窗口');
        // }
        req = indexedDB.open(dbName);
        return req;
    },
    createTable: function () {
        //获取当前版本
        version = parseInt(localStorage.getItem("indexdb_version"));
        localStorage.setItem("indexdb_version", version);
        req = indexedDB.open(dbName);
        // console.log(indexedDB);
        // req.onblocked=function(){
        // 	alert("关闭其他窗口");
        // }
        req.onsuccess = function (e) {
            indexDataBase = req.result;
            if (!indexDataBase.objectStoreNames.contains(tbName)) {
                //更新版本
                // console.log("数据库不存在" + tbName + "进行更新");
                version++;
                localStorage.setItem("indexdb_version", version);
                indexDataBase.close();
                isUpdate = true;
                req = indexedDB.open(dbName, version);
                req.onupgradeneeded = function (e) {
                    // console.log("create Tbale2创建成功");
                    showTipBarrageFunction(packageResult.opIndexDB.createTable);
                    indexDataBase = req.result;
                    // var store = db.createObjectStore("student", {autoIncrement: true}); 使用自增键
                    // 创建表
                    if (!indexDataBase.objectStoreNames.contains(tbName)) {
                        var store = indexDataBase.createObjectStore(tbName, {
                            keyPath: 'id'
                        });
                        // 设置id为主键
                        store.createIndex(tbName + '_id_unqiue', 'id', {
                            unique: true
                        });

                        isUpdate = false;
                    }

                }
                // location.reload();
            }
        }
        req.onerror = function (e) {
            // console.log("创建表格错误");
            req = indexedDB.open(dbName);
            req.onsuccess = function (even) {
                indexDataBase = req.result;
                localStorage.setItem("indexdb_version", db.version);
            }
        }

        req.onupgradeneeded = function (e) {
            // console.log("create Tbale创建成功");
            // console.log('onupgradeneeded');
            var db = req.result;
            // var store = db.createObjectStore("student", {autoIncrement: true}); 使用自增键
            // 创建表

            if (!db.objectStoreNames.contains(tbName)) {

                var store = db.createObjectStore(tbName, {
                    keyPath: 'id'
                });
                // 设置id为主键
                store.createIndex(tbName + '_id_unqiue', 'id', {
                    unique: true
                });
            }

        }
        return req;
    },
    insertData: function (userData, idDom) {
        if (!isUpdate) {
            let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
            // req = this.createTable();
            // console.log("version:", version + ",localVersion" + localStorage.getItem("indexdb_version"));

            // console.log(req);
            // console.log('insertData');
            // req = indexedDB.open(dbName);
            // req.onsuccess = function (event) { }
            // console.log('onsuccess');
            // 获取数据库
            // db = event.target.result;
            // var transaction = db.transaction('option', 'readwrite');
            // console.log(tbName);
            var transaction = indexDataBase.transaction([tbName], 'readwrite');
            transaction.onsuccess = function (event) {
                // console.log('[Transaction] 好了!');
            };
            transaction.onerror = function (event) {
                // console.log('[Transaction] 失败!');
            };
            //读取表名
            var userDataStore = transaction.objectStore(tbName);
            //数据储存
            // console.log(userData);
            userDataStore.get(userData.id).onsuccess = function (event) {
                // console.log("id为" + id + "的配置是", event.target.result);
                // seData(event.target.result);
                let resultData = event.target.result;
                // console.log(userData);
                // console.log("increase:" + increase);
                let increase = userData.increase;
                let increaseBit = userData.increaseBit;
                if (resultData) {
                    // resultData.allPoints++;
                    resultData.allPoints += increase;
                    resultData.allTimes++;
                    //测试数据
                    // if ("allTimes" in resultData && !isNaN(resultData.allTimes)) {
                    //     resultData.allTimes++;
                    // } else {
                    //     resultData.allTimes = 1;
                    // }
                    // console.log("update");
                    // data.userNick = data.userNick != userData.userNick ? data.userNick : userData.userNick;
                    //判断时期字符串是否相等
                    if (resultData.date == todayDate) {
                        // resultData.chatPoints++;
                        resultData.chatPoints += increase;
                        resultData.chatTimes++;
                        //测试数据
                        // if ("chatTimes" in resultData && !isNaN(resultData.chatTimes)) {
                        //     resultData.chatTimes++;
                        // } else {
                        //     resultData.chatTimes = 1;
                        // }
                    } else {
                        let toDate = new Date(todayDate);
                        let resuDate = new Date(resultData.date);
                        // console.log("toMonth"+toDate.getMonth()+":"+"resuDate"+resuDate.getMonth());
                        //判断月份
                        if (toDate.getMonth() == resuDate.getMonth()) {
                            // console.log("同一个月");
                            //判断日
                            if (toDate.getDate() == resuDate.getDate()) {
                                // resultData.chatPoints++;
                                resultData.chatPoints += increase;
                                resultData.chatTimes++;
                            } else {
                                // 昵称是否相同
                                if (resultData.userNick != userData.userNick) {
                                    resultData.userNick = userData.userNick;
                                }
                                //隔日等级同步
                                if (resultData.grade != userData.grade) {
                                    resultData.grade = userData.grade;
                                }
                                //测试数据
                                // if (!"allTimes" in resultData|| isNaN(resultData.allTimes)) {
                                //     resultData.allTimes = 1;
                                // }
                                resultData.chatPoints = increase;
                                resultData.chatTimes = 1;
                                resultData.gamePoints = 0;
                                // userData.userNick
                                showTipBarrageFunction(userData.userNick + " " + (resuDate.getDate()) + packageResult.opIndexDB.insertData[0]);
                            }
                        } else {
                            // console.log("不是一个月");
                            let $resetTotalPointsEveryMonth = $("#resetTotalPointsEveryMonth");
                            let resetTotalPointsEveryMonthChecked = $resetTotalPointsEveryMonth.prop("checked");
                            let logString = userData.userNick + " " + (resuDate.getMonth() + 1);
                            resultData.chatPoints = increase;
                            resultData.chatTimes = 1;
                            resultData.gamePoints = 0;
                            if (resetTotalPointsEveryMonthChecked) {
                                resultData.allPoints = increase;
                                resultData.allTimes = 1;
                                showTipBarrageFunction(logString + packageResult.opIndexDB.insertData[1]);
                            } else {
                                showTipBarrageFunction(logString + packageResult.opIndexDB.insertData[2]);
                            }
                        }
                        resultData.date = todayDate;
                    }
                    // resultData.chatPoints = roundFun(resultData.chatPoints, increaseBit);
                    // resultData.gamePoints = roundFun(resultData.gamePoints, increaseBit);
                    // resultData.allPoints = roundFun(resultData.allPoints, increaseBit);
                    userDataStore.put(resultData).onsuccess = function (event) {
                        // console.log('更新', event.target.result);
                    };
                } else {
                    // console.log("insert");
                    // userData.chatPoints = roundFun(increase,increaseBit);
                    // userData.gamePoints = 0;
                    // userData.allPoints = roundFun(increase,increaseBit);
                    // userData.date = todayDate;
                    let addUserData = {
                        "id": userData.id,
                        "userNick": userData.userNick,
                        "grade": userData.grade,
                        "chatPoints": increase,
                        "chatTimes": 1,
                        "gamePoints": 0,
                        "allPoints": increase,
                        "allTimes": 1,
                        "date": todayDate
                    };
                    // console.log(userData);
                    var db_op_req = userDataStore.add(addUserData);
                    db_op_req.onsuccess = function () {
                        // console.log("存好了");
                    }
                }
                // return event.target.result;
            };
            // options.forEach(function(option) {
            // 	//数据储存
            // 	console.log(option);
            // 	var db_op_req = optionsStore.add(option);
            // 	db_op_req.onsuccess = function() {
            // 		console.log("存好了");
            // 	}
            // });

            req.onerror = function () {
                console.log("数据库出错");

                // version = parseInt(localStorage.getItem("indexdb_version"));
                // localStorage.setItem("indexdb_version", version);
                // console.log("version:",version+",localVersion"+localStorage.getItem("indexdb_version"))


            }
        }

    },
    addData: function (userData) {
        if (!isUpdate) {
            // let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
            // req = indexedDB.open(dbName);
            // req.onsuccess = function (event) {
            //     db = event.target.result;
            // }
            // req.onerror = function () {}
            // var transaction = db.transaction('option', 'readwrite');
            // console.log(tbName);
            // userData = {
            //     id: "1057123760",
            //     userNick: "",
            //     chatPoints: 1,
            //     gamePoints: 1
            // }
            let transaction = indexDataBase.transaction([tbName], 'readwrite');
            transaction.onsuccess = function (event) {
                // console.log('[Transaction] 好了!');
            };
            transaction.onerror = function (event) {
                // console.log('[Transaction] 失败!');
            };
            //读取表名
            let userDataStore = transaction.objectStore(tbName);
            //数据储存
            userDataStore.get(userData.id).onsuccess = function (event) {
                // console.log("id为" + id + "的配置是", event.target.result);
                // seData(event.target.result);
                let resultData = event.target.result;
                if (resultData) {
                    if ("chatPoints" in userData && "gamePoints" in userData) {
                        resultData.chatPoints = resultData.chatPoints + userData.chatPoints;
                        resultData.gamePoints = resultData.gamePoints + userData.gamePoints;
                        resultData.allPoints = resultData.allPoints + userData.chatPoints + userData.gamePoints;
                    } else {
                        if ("chatPoints" in userData) {
                            resultData.chatPoints = resultData.chatPoints + userData.chatPoints;
                            resultData.allPoints = resultData.allPoints + userData.chatPoints;
                        } else if ("gamePoints" in userData) {
                            resultData.gamePoints = resultData.gamePoints + userData.gamePoints;
                            resultData.allPoints = resultData.allPoints + userData.gamePoints;
                        } else {
                        }
                    }
                    userDataStore.put(resultData).onsuccess = function (event) {
                    }
                }
            }
        }
    },
    searchDataByUserId: function (serachType, callback) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        today = new Date(todayDate).getDate();

        let searchUserData = userData;
        // req = indexedDB.open(dbName);
        resArray = new Array();
        // req.onsuccess = function (events) { }
        //     db = events.target.result;
        var trans = indexDataBase.transaction([tbName], IDBTransaction.READ);
        var store = trans.objectStore(tbName);
        // queryReply(tex, searchUserData, event.target.result);
        if (serachType == "all") {
            let dataString = "@" + searchUserData.userNick;
            store.get(searchUserData.id).onsuccess = function (event) {
                data = event.target.result;
                dataString = dataString + ":채팅 횟수:" + data.chatTimes + ",채팅 포인트:" + data.chatPoints + ",게임 포인트:" +
                    data.gamePoints + ",총 횟수:" + data.allTimes + ",총 포인트:" + data.allPoints;
                // console.log(dataString);
                sendMessageCustom(dataString, 1, 4);
            }
        } else {
            let keyRange = IDBKeyRange.lowerBound("");
            let cursorRequest = store.openCursor(keyRange);
            cursorRequest.onsuccess = function (e) {
                let result = e.target.result;
                // console.log(result)
                if (!!result == false) {
                    resArray.sort(function (a, b) {
                        return Number(b[serachType]) - Number(a[serachType]);
                    });
                    callback(resArray);
                    // console.log(dataString);
                    return;
                }
                data = result.value;
                if (serachType != "allPoints" && serachType != "allTimes") {
                    //今天的第一
                    if (today == new Date(data.date).getDate()) {
                        //删除制定列
                        // Reflect.deleteProperty(data, "gamePoints");
                        // Reflect.deleteProperty(data,"date");
                        resArray[resArray.length] = result.value;
                    }
                } else {
                    resArray.push(result.value);
                }
                result.continue();
                // resArray.push(result.value);
            };


        }
    },
    searchData: function () {
        // req = indexedDB.open(dbName);
        // req.onsuccess = function (events) { }
        // 获取数据库
        // db = events.target.result;
        let OBJECT_NAME = tbName;
        let objectStore = indexDataBase.transaction([OBJECT_NAME], 'readwrite').objectStore(OBJECT_NAME);
        var page = 2;
        var page_size = 5;
        resArray = new Array();
        let currentCursor = objectStore.openCursor().onsuccess = e => {

            let cursor = e.target.result;

            if (cursor) {
                if (page > 0) {
                    // console.log(page * page_size);
                    cursor.advance(10);
                    return;
                }
                if (resArray.length <= page_size) {
                    cursor.continue(); // 移到下一个位置
                    resArray.push(cursor.value);

                } else {
                    // console.log("jieshu");
                    // console.log(resArray);
                    return;
                }
            }

        }
        req.onerror = function (events) {
            // console.log("searchById查询出错了");
        }
    },
    searchData2: function (limi) {
        // https://blog.csdn.net/kimbing/article/details/106300340
        // https://developer.mozilla.org/zh-CN/docs/Web/API/IDBKeyRange
        // req = indexedDB.open(dbName);
        // req.onsuccess = function (events) { }
        // 获取数据库
        // db = events.target.result;
        // console.log(db);
        var indexedDBIndex = "zzz8226";
        let OBJECT_NAME = tbName;
        let upperBound = localStorage[indexedDBIndex]; // 取出主键值
        let objectStore = indexDataBase.transaction([OBJECT_NAME], 'readwrite').objectStore(OBJECT_NAME);
        let currentCursor = objectStore.openCursor(IDBKeyRange.upperBound(upperBound, true),
            "prev")
            .onsuccess = e => {
            let cursor = e.target.result;
            if (cursor) {
                solve(cursor);
                cursor.continue(); // 移到下一个位置
            }
        }

        function solve(cursor) {
            // console.log(cursor);
        }

    },
    searchDataLimit: function (pageIndex, sortName, sortType) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        today = new Date(todayDate).getDate();

        // req = indexedDB.open(dbName);
        // req.onsuccess = function (events) {
        // }
        // 获取数据库
        // db = events.target.result;
        if (!sortName && !sortType) {
            // console.log("1");
            let OBJECT_NAME = tbName;
            let objectStore = indexDataBase.transaction([OBJECT_NAME], 'readwrite').objectStore(
                OBJECT_NAME);

            var page = pageIndex -
                1; // 0为第一页
            var page_size = everyPage; // 一页10条数据
            var list = []; // 存放10条数据的数组
            var is_first = true;
            // console.log(objectStore);

            // console.log("pageIndex:" + pageIndex);
            var i = page * page_size;
            objectStore.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;
                // console.log(cursor);
                if (is_first && page > 0) { // 只需要移动一次就行了 如果是第一页 不需要移动
                    cursor.advance(page * page_size) // 移动到第几条
                    is_first = false
                    return
                }
                // 数据到底
                if (cursor === null) {
                    // console.log(list);
                    $("#myTable tbody").children().detach();
                    for (d of list) {
                        i++;
                        // $("#myTable tbody").append("<tr><th>" + i +
                        //     "</th><th>" + d
                        //         .id +
                        //     "</th><th>" + d.userNick + "</th><th>" + convertGrade(d.grade)+ "</th><th>" + d.chatPoints +
                        //     "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints +
                        //     "</th><th>" + d.date + "</th></tr>");
                        $("#myTable tbody").append("<tr><th>" + i +
                            "</th><th>" + d.userNick + "(" + d.id + ")</th><th>" + convertGrade(d.grade) + "</th><th>" + d.chatPoints +
                            "</th><th>" + d.chatTimes + "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints +
                            "</th><th>" + d.allTimes + "</th><th>" + d.date + "</th></tr>");
                    }
                    return;
                }

                list.push(cursor.value)
                if (page_size > list.length && cursor) { // 数据还没到10条
                    cursor.continue()
                } else {
                    // console.log(list); // 拿到10条了
                    $("#myTable tbody").children().detach();
                    for (d of list) {
                        i++;
                        // $("#myTable tbody").append("<tr><th>" + i +
                        //     "</th><th>" + d
                        //         .id +
                        //     "</th><th>" + d.userNick + "</th><th>" + convertGrade(d.grade)+ "</th><th>" + d.chatPoints +
                        //     "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints +
                        //     "</th><th>" + d.date + "</th></tr>");
                        $("#myTable tbody").append("<tr><th>" + i +
                            "</th><th>" + d.userNick + "(" + d.id + ")</th><th>" + convertGrade(d.grade) + "</th><th>" + d.chatPoints +
                            "</th><th>" + d.chatTimes + "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints +
                            "</th><th>" + d.allTimes + "</th><th>" + d.date + "</th></tr>");


                    }
                }
            }
            objectStore.getAll().onsuccess = function (events) {
                var result = events.target.result;
                opIndexDB.showEveryPageIndex(result.length, pageIndex);
            }

            // console.log("-----------getAll---------------");

            // console.log("-----------mozGetAll---------------");
            // studentsStore.mozGetAll().onsuccess = function(events) {
            // 	console.log(events.target.result);
            // }
        } else {
            // console.log("2");
            resArray = new Array();
            var trans = indexDataBase.transaction([tbName], IDBTransaction.READ);
            var store = trans.objectStore(tbName);
            // Get everything in the store;
            var keyRange = IDBKeyRange.lowerBound("");
            var cursorRequest = store.openCursor(keyRange);
            cursorRequest.onsuccess = function (e) {
                var result = e.target.result;
                if (!!result == false) {
                    resArray.sort(function (a, b) {
                        // eval("return Number(b."+sortType+")-Number(a."+sortType+")");
                        if (sortName == "up") {
                            // return Number(eval("a." + sortType)) - Number(eval(
                            //     "b." +
                            //     sortType));
                            return Number(a[sortType]) - Number(b[sortType]);
                        } else if (sortName = "down") {
                            // return Number(eval("b." + sortType)) - Number(eval(
                            //     "a." +
                            //     sortType));
                            return Number(b[sortType]) - Number(a[sortType]);
                        }
                        // return Number(b.eval(sortType))-Number(a.eval(sortType));

                        // if(sortType=="chatPoints"){
                        // 	if(sortName="up"){
                        // 		return Number(a.chatPoints)-Number(b.chatPoints);
                        // 	}else if(sortName="down"){
                        // 		return Number(b.chatPoints)-Number(a.chatPoints);
                        // 	}

                        // }else{

                        // }

                    });
                    // console.log("收集完毕");
                    //print res etc....
                    // callback(resArray);
                    // console.log(resArray);
                    // // pageIndex =0
                    // console.log(pageIndex);
                    // console.log(everyPage);

                    // console.log("resArray:", resArray.length);
                    // for(var i=0;i<resArray.length;i++){

                    // }
                    // console.log("page", pageIndex);
                    opIndexDB.showEveryPageIndex(resArray.length, pageIndex);
                    $("#myTable tbody").children().detach();
                    var d;
                    for (var i = (pageIndex - 1) * everyPage; i < pageIndex *
                    everyPage; i++) {
                        // console.log(resArray[i]);
                        d = resArray[i];
                        if (d) {
                            // $("#myTable tbody").append("<tr><th>" + (i + 1) +
                            //     "</th><th>" + d
                            //         .id +
                            //     "</th><th>" + d.userNick + "</th><th>" + convertGrade(d.grade)+ "</th><th>" + d.chatPoints +
                            //     "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints +
                            //     "</th><th>" + d.date + "</th></tr>");
                            $("#myTable tbody").append("<tr><th>" + (i + 1) +
                                "</th><th>" + d.userNick + "(" + d.id + ")</th><th>" + convertGrade(d.grade) + "</th><th>" + d.chatPoints +
                                "</th><th>" + d.chatTimes + "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints +
                                "</th><th>" + d.allTimes + "</th><th>" + d.date + "</th></tr>");
                        } else {
                            return;
                        }

                    }
                    // console.log("完毕");
                    return;
                }
                //判断是否是今天
                if (sortType != "chatPoints" && sortType != "gamePoints" && sortType != "chatTimes") {
                    resArray[resArray.length] = result.value;
                } else {
                    if (new Date(result.value.date).getDate() == today) {
                        resArray[resArray.length] = result.value;
                    }
                }

                // resArray.push(result.value);
                result.continue();
            };

        }
    },
    showEveryPageIndex: function (allLength, page) {
        $("#allPageValue").val(allLength);
        let allPageLength = allLength % everyPage == 0 ?
            parseInt(allLength / everyPage) : (parseInt(
                allLength / everyPage) + 1);

        //清空下标
        // $("#pageIndex>li").empty();
        $("#pageIndex a").css("visibility", "hidden");
        if (allPageLength > 1) {
            // $("#pagination").show();
            $("#pageIndex").css("visibility", "visible");
            // console.log("allPageLength:", allPageLength);
            var nowPage = page;
            // console.log(limi[0]);
            if (($("#pageIndex li").length - 2) > allPageLength) {
                for (var i = allPageLength + 1; i <= ($("#pageIndex li")
                    .length - 2); i++) {
                    $("#pageIndex>li>a:eq(" + i + ")").css("visibility", "hidden");
                }
            } else {
                $("#pageIndex>li>a:gt(0):lt(6)").css("visibility", "visible");
                $("#pageIndex>li>a").css("visibility", "visible");
            }
            //最后一页
            allPageLength > 6 && $("#lastPage").attr("onclick",
                "changePage(" +
                allPageLength +
                ")").html("<span class='badge'>" + allPageLength +
                "</span>");
            if (!nowPage) {
                nowPage = 1;
                // console.log("隐藏f ,l");
                $("#firstPage,#lastPage").css("visibility", "hidden");
            }
            // console.log("allPageLength:"+allPageLength,"nowPage:"+nowPage);

            if (nowPage <= 3) {
                nowPage = 3;
                $("#firstPage").css("visibility", "hidden");
                // console.log("隐藏first");
            } else {
                if ($("#pageIndex li:eq(1)").text() > 1) {
                    $("#firstPage").css("visibility", "visible");
                } else {
                    $("#firstPage").css("visibility", "hidden");
                }
                // console.log("显示first");
            }
            var ma = allPageLength - nowPage;
            // console.log(ma);
            if (ma <= 3) {
                nowPage = allPageLength - 3;
                $("#lastPage").css("visibility", "hidden");
            } else {
                $("#lastPage").css("visibility", "visible");
            }

            var j = 1;
            for (var i = 1; i <= allPageLength; i++) {
                if (i < nowPage && nowPage - i <= 2 || i >= nowPage &&
                    i - nowPage <= 3) {
                    // console.log("i:", i + "j:", j);
                    //显示
                    $("#pageIndex>li>a:eq(" + j + ")").css("visibility", "visible");

                    $("#pageIndex>li>a:eq(" + j + ")").html(
                        "<span class='badge'>" + i + "</span>");
                    // $("#pageIndex>li>a:eq(" + j + ")")
                    // console.log(page)
                    if (i == page) {
                        $("#pageIndex>li>a:eq(" + j + ")").html(
                            "<span class='badge badge-warning'>" +
                            i + "</span>");
                    }
                    j++;
                }
            }
        } else {
            // $("#pagination").hide();
            $("#pageIndex").css("visibility", "hidden");
        }
    },
    serarchTodaySortRankDataByUserData: function (sortType, callback) {
        // console.log("serarchTodayMaxSortData");
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        today = new Date(todayDate).getDate();
        // req = indexedDB.open(dbName);
        // req.onsuccess = function (events) {} db = events.target.result;
        // 获取数据库
        resArray = new Array();

        var trans = indexDataBase.transaction([tbName], IDBTransaction.READ);
        var store = trans.objectStore(tbName);

        // Get everything in the store;
        var keyRange = IDBKeyRange.lowerBound("");
        var cursorRequest = store.openCursor(keyRange);
        cursorRequest.onsuccess = function (e) {
            var result = e.target.result;
            if (!!result == false) {
                resArray.sort(function (a, b) {
                    // eval("return Number(b."+sortType+")-Number(a."+sortType+")");
                    // return Number(eval("b." + sortType)) - Number(eval("a." +
                    //     sortType));
                    return Number(b[sortType]) - Number(a[sortType]);
                });
                callback(resArray, resArray.length);
                // console.log(resArray);

                return;
            }
            data = result.value;
            //今天的第一
            if (today == new Date(data.date).getDate()) {
                // Reflect.deleteProperty(data, "gamePoints");
                // Reflect.deleteProperty(data,"date");
                resArray[resArray.length] = result.value;
            }
            // resArray.push(result.value);
            result.continue();
        };

    },
    serarchTodayMaxSortData: function (sortType, sortName, callback) {
        // console.log("serarchTodayMaxSortData");
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        today = new Date(todayDate).getDate();
        // req = indexedDB.open(dbName);
        // req.onsuccess = function (events) {
        // }db = events.target.result;
        // 获取数据库
        resArray = new Array();

        var trans = indexDataBase.transaction([tbName], IDBTransaction.READ);
        var store = trans.objectStore(tbName);
        // Get everything in the store;
        var keyRange = IDBKeyRange.lowerBound("");
        var cursorRequest = store.openCursor(keyRange);
        cursorRequest.onsuccess = function (e) {
            var result = e.target.result;
            if (!!result == false) {
                // resArray.sort(function (a, b) {
                //     // eval("return Number(b."+sortType+")-Number(a."+sortType+")");
                //     if (sortName == "up") {
                //         return Number(eval("a." + sortType)) - Number(eval("b." +
                //             sortType));
                //     } else if (sortName = "down") {
                //         return Number(eval("b." + sortType)) - Number(eval("a." +
                //             sortType));
                //     }
                //     // return Number(b.eval(sortType))-Number(a.eval(sortType));
                //
                //     // if(sortType=="chatPoints"){
                //     // 	if(sortName="up"){
                //     // 		return Number(a.chatPoints)-Number(b.chatPoints);
                //     // 	}else if(sortName="down"){
                //     // 		return Number(b.chatPoints)-Number(a.chatPoints);
                //     // 	}
                //
                //     // }else{
                //
                //     // }
                //
                // });
                // //print res etc....
                // resArray[0].resArrLength = resArray.length
                // callback(resArray[0]);

                let max = resArray[0];
                if (sortName == "up") {
                    // let mxPro = eval("max." + sortType);
                    // let itPro = eval("item." + sortType);
                    // resArray.forEach(item =>  mxPro = eval("item." + sortType) < eval("max." + sortType) ? eval("item." + sortType) : eval("max." + sortType));
                    // resArray.forEach(item => max[sortType] = item[sortType] < max[sortType] ? item[sortType] : max[sortType]);
                    resArray.forEach(item => max = item[sortType] < max[sortType] ? item : max);
                } else if (sortName = "down") {
                    // resArray.forEach(item =>  mxPro = eval("item." + sortType) > eval("max." + sortType) ? eval("item." + sortType) : eval("max." + sortType));
                    resArray.forEach(item => max = item[sortType] > max[sortType] ? item : max);
                }
                //print res etc....
                max.resArrLength = resArray.length;
                callback(max);

                return;
            }
            data = result.value;
            if (sortType != "allPoints" && sortType != "allTimes") {
                //今天的第一
                if (today == new Date(data.date).getDate()) {
                    //删除指定属性
                    // Reflect.deleteProperty(data, "gamePoints");
                    // Reflect.deleteProperty(data,"date");
                    resArray[resArray.length] = result.value;
                }
            } else {
                resArray.push(result.value);
            }
            // resArray.push(result.value);
            result.continue();
        };

    },
    serarchData4: function () {
        req = indexedDB.open(dbName);
        req.onsuccess = function (events) {
            // 获取数据库
            db = events.target.result;
            // Use the literal "readonly" instead of IDBTransaction.READ, which is deprecated:
            var trans = db.transaction([tbName], "readonly");
            var store = trans.objectStore(tbName);
            // console.log(store);
            var index = store.index('phonics1_id_unqiue');
            // Get everything in the store:
            var cursorRequest = index.openCursor();
            // It's the same as:
            // var cursorRequest = index.openCursor(null, "next");
            // Or, if you want a "descendent ordering":
            // var cursorRequest = index.openCursor(null, "prev");
            // Note that there's no need to define a key range if you want all the objects

            var res = new Array();

            cursorRequest.onsuccess = function (e) {

                var cursor = e.target.result;
                if (cursor) {
                    res.push(cursor.value);
                    cursor.continue();
                } else {
                    //print res etc....
                    console.llog("fisht");
                }
            };
            // console.log(res);
        }

    },
    updateData: function (diceData, callback) {
        // console.log(diceData);
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        today = new Date(todayDate).getDate();
        req = indexedDB.open(dbName);
        req.onsuccess = function (events) {
            // 获取数据库
            db = events.target.result;
            // var transaction = db.transaction('student', 'readwrite');
            var transaction = db.transaction([tbName], 'readwrite');
            transaction.onsuccess = function (event) {
                // console.log('[Transaction] 好了!');
            };
            transaction.onerror = function (event) {
                // console.log('[Transaction] 失败!');
            };
            //读取表名
            var optionsStore = transaction.objectStore(tbName);
            var callData = new Array();
            optionsStore.get(diceData.userId).onsuccess = function (event) {
                let userResult = event.target.result;
                // console.log(userResult)
                //数据返回
                userResult.gamePoints = userResult.gamePoints + diceData.userAdd;
                userResult.allPoints = userResult.allPoints + diceData.userAdd;
                optionsStore.put(userResult).onsuccess = function (event) {
                    //对象数组加入对象
                    callData.push(userResult);
                    optionsStore.get(diceData.makerId).onsuccess = function (event) {
                        let makerResult = event.target.result;
                        // console.log(makerResult)
                        if (typeof makerResult == "undefined") {
                            let addMakerData = {
                                "id": diceData.makerId,
                                "userNick": diceData.makerNick,
                                "grade": "BJ",
                                "chatPoints": 0,
                                "chatTimes": 0,
                                "gamePoints": diceData.makerAdd,
                                "allPoints": diceData.makerAdd,
                                "allTimes": 0,
                                date: todayDate
                            }
                            optionsStore.add(addMakerData).onsuccess = function (event) {
                                callData.push(addMakerData);
                                callback(callData);
                            };

                        } else {
                            makerResult.allPoints = makerResult.allPoints + diceData.makerAdd;
                            //今天的直接加
                            if (new Date(makerResult.date).getDate() == today) {
                                makerResult.gamePoints = makerResult.gamePoints + diceData.makerAdd;
                            } else {
                                ////日期更新,重置聊天点，游戏点
                                makerResult.chatPoints = 0;
                                makerResult.gamePoints = diceData.makerAdd;
                                makerResult.date = todayDate;
                            }
                            optionsStore.put(makerResult).onsuccess = function (event) {
                                callData.push(makerResult);
                                callback(callData);
                            };
                        }

                    };
                };
            };

        }
        req.onerror = function (events) {
            // console.log("updateData更新出错了");
        }
    },
    clearTable: function () {

        req = indexedDB.open(dbName);
        req.onsuccess = function (events) {
            // 获取数据库
            db = events.target.result;
            let trans = db.transaction([tbName], 'readwrite');
            let dataStore = trans.objectStore(tbName);
            dataStore.getAll().onsuccess = function (events) {
                let result = events.target.result;
                dataStore.clear().onsuccess = function (e) {
                    // console.log(result);
                    if (e.type == 'success') {
                        // INDEXDB.closeDB()
                        // this.closeDB();
                        showTipBarrageFunction("indexdb:" + result.length + packageResult.opIndexDB.clearTable);
                        db.close();
                    }
                }
            }

        }
    },
    deleteTable: function () {

        req = indexedDB.open(dbName);
        req.onsuccess = function (events) {
            // 获取数据库
            db = events.target.result;
            let trans = db.transaction([tbName], 'readwrite');
            let dataStore = trans.objectStore(tbName);
            dataStore.getAll().onsuccess = function (events) {
                let result = events.target.result;
                dataStore.clear().onsuccess = function (e) {
                    // console.log(result);
                    if (e.type == 'success') {
                        // INDEXDB.closeDB()
                        // this.closeDB();
                        showTipBarrageFunction("indexdb:" + result.length + packageResult.opIndexDB.deleteTable);
                        db.close();
                    }
                }
            }

        }
    },
    closeDB: function () {
        // console.log(Salt);
        // Salt.db.close();
    },
    exportDataFunction: function (callback) {
        // req = indexedDB.open(dbName);
        // req.onsuccess = function (events) {}
        //     // 获取数据库
        //     db = events.target.result;
        // Use the literal "readonly" instead of IDBTransaction.READ, which is deprecated:
        let trans = indexDataBase.transaction([tbName], "readonly");
        let dataStore = trans.objectStore(tbName);
        let dataArray = new Array();
        dataStore.getAll().onsuccess = function (e) {
            let result = e.target.result;
            // dataArray.push(result);
            callback(result);
        }

    },
    inportDataFunction: function (userDataArray, callBack) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        today = new Date(todayDate).getDate();
        // req = indexedDB.open(dbName);
        // req.onsuccess = function (events) {}
        //     // 获取数据库
        //     db = events.target.result;
        // Use the literal "readonly" instead of IDBTransaction.READ, which is deprecated:
        var trans = indexDataBase.transaction([tbName], "readwrite");
        var userDataStore = trans.objectStore(tbName);

        for (let i = 0; i < userDataArray.length; i++) {
            let userData = userDataArray[i]
            userDataStore.get(userData.id).onsuccess = function (event) {
                let data = event.target.result;
                if (!data) {
                    userDataStore.add(userData).onsuccess = function () {
                        if (i == userDataArray.length - 1) {
                            // showTipBarrageFunction(userDataArray.length + "개의 데이터 가져오기 성공");
                            showTipBarrageFunction("indexdb:" + userDataArray.length + packageResult.opIndexDB.inportDataFunction);
                            callBack("over");
                        }
                    };
                } else {
                    //是今天累计游戏点聊天点
                    if (data.date == userData.date) {
                        data.chatPoints = data.chatPoints + userData.chatPoints;
                        data.gamePoints = data.gamePoints + userData.gamePoints;
                        data.chatTimes = data.chatTimes + userData.chatTimes;
                    }
                    // else {
                    //     if (data.date == today && userData.date != today) {
                    //         // userData.date = today
                    //     }
                    // }
                    data.allPoints = data.allPoints + userData.allPoints;
                    data.allTimes = data.allTimes + userData.allTimes;
                    //等级不需要导入
                    // data.grade=userData.grade;

                    // let userGrade;
                    // //测试数据
                    // if ("grade" in userData) {
                    //     userGrade = userData.grade;
                    // } else {
                    //     userGrade = "loadding";
                    // }
                    // data.grade = userGrade;

                    userDataStore.put(data).onsuccess = function (event) {
                        // console.log('更新', event.target.result);
                        if (i == userDataArray.length - 1) {
                            // showTipBarrageFunction(userDataArray.length + "개의 데이터 가져오기 성공");
                            showTipBarrageFunction("indexdb:" + userDataArray.length + packageResult.opIndexDB.inportDataFunction);
                            callBack("over");

                        }
                    };
                }
            }
        }
    }
}

// 它会返回所有数据库名称
// window.indexedDB.webkitGetDatabaseNames().onsuccess = function(sender,args)
// {
//     var r = sender.target.result;
//     for(var i in r)
//         indexedDB.deleteDatabase(r[i]);
// };

// indexedDB.deleteDatabase("databaseName");

// if(localStorageType=="indexdb"){
opIndexDB.createTable();


// opIndexDB.serarchData4();

var TodayMaxSortDataInterval;

function stopTodayMaxSortDataInterval() {
    if (typeof TodayMaxSortDataInterval != "undefined") {
        clearInterval(TodayMaxSortDataInterval);
    }
}

function getTodayMaxSortData(idDom, idt) {
    stopTodayMaxSortDataInterval();
    // console.log("-----------------------------");
    TodayMaxSortDataInterval = setTimeout(function () {
        if (localStorageType == "indexdb") {
            if (!isUpdate) {
                opIndexDB.serarchTodayMaxSortData("chatPoints", "down", function (data) {
                    // console.log(data);
                    // console.log("今天的ace："+JSON.stringify(data));
                    // $("#todayChatPointsAce").val(JSON.stringify(data));

                    $("#todayChatPointsAce>th:eq(0)").text("용왕");
                    $("#todayChatPointsAce>th:eq(1)").text(data.userNick + "{" + data.id + "}");
                    $("#todayChatPointsAce>th:eq(2)").text(convertGrade(data.grade));
                    $("#todayChatPointsAce>th:eq(3)").text(data.chatPoints);
                    $("#todayChatPointsAce>th:eq(4)").text(data.chatTimes);
                    $("#todayChatPointsAce>th:eq(5)").text(data.gamePoints);
                    $("#todayChatPointsAce>th:eq(6)").text(data.allPoints);
                    $("#todayChatPointsAce>th:eq(7)").text(data.allTimes);
                    $("#todayChatPointsAce>th:eq(8)").text(data.date);
                    var chatPointsMaxChangeMode = getDomById("chatPointsMaxChangeMode");
                    // if (!ace) {
                    //     ace.userId = data.id;
                    //     ace.userNick = data.userNick;
                    //     ace.maxChatPoint = data.chatPoints;
                    // }
                    //五次以上提醒
                    if (ace.userNick != data.userNick || ace.userId != data.id) {
                        // console.log("龙王变更提醒");
                        ace.userId = data.id;
                        ace.userNick = data.userNick;
                        ace.chatRatio = data.chatPoints;
                        // 용왕이가 AA가 됐어요.
                        let mess = "[" + ace.userNick + "]가 용왕이 됐어요.";
                        let logString = packageResult.getTodayMaxSortData.TodayMaxSortDataInterval[0] + ace.userNick + packageResult.getTodayMaxSortData.TodayMaxSortDataInterval[1];
                        //不包含自身
                        var loginId = localStorage.getItem("loginId");
                        if (!data.id.includes(loginId) && chatPointsMaxChangeMode.checked) {
                            logString = logString + packageResult.getTodayMaxSortData.TodayMaxSortDataInterval[2] + data.allTimes;
                            mess = mess + "오늘 채팅 횟수:" + data.allTimes;
                            sendMessageCustom(mess, 1, 5);
                        }
                        showTipBarrageFunction(logString);
                    }

                });


            }
        } else if (localStorageType == "websql") {
            opWebsql.getMaxData();
            // console.log("查询websql最大值");
        } else {
            stopTodayMaxSortDataInterval();
        }
        // console.log("-----------------------------");
    }, 5000);

}

// getTodayMaxSortData();

// function getData(){
// 	opIndexDB.searchData();
// }

function exportDivFunction() {
    var $exportDiv = $('#exportDiv');
    $exportDiv.modal('toggle');
    if ($exportDiv.css("display") != 'none') {
        //导出数据的时候停止消息
        // showTipBarrageFunction("导入数据 ，停止读取消息!");
        // stopRetrievalMessageFunction();
        let localTableInfromation = tableInfromation;
        // localTableInfromation.dataStoreLength=$("#allPageValue").val();
        $("#exportDivHead").html("");
        $("#exportDivHead").append("<pre class='prohibitSelection prettyprint prettyprinted'>"
            // +"昵称："+localTableName.makerNick+"<br>"
            // +"ID："+localTableName.makerId+"<br>"
            + packageResult.showTableData.belongTo + "：<a href='" + localTableInfromation.link + "'>" + localTableInfromation.makerNick + "{" + localTableInfromation.makerId + "}</a><br>"
            + packageResult.showTableData.tableName + "：" + localTableInfromation.tbName + "<br>"
            + packageResult.showTableData.browser + "：" + localTableInfromation.appUserAgent + "<br>"
            + packageResult.showTableData.tableNumber + "：<span id='bjTablelength'>" + $("#allPageValue").val()
            + "</span></pre>");

        // showTableData(localTableInfromation);

    } else {

    }

}

function createWs() {
    const socket = new WebSocket("wss://localhost:8080/wsadsad")

    // Connection opened
    socket.addEventListener('open', function (event) {
        socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });
}

let clipBoard = navigator.clipboard;

function inportFunction() {
    //清空数据
    $("#exportDivBody").html("");

    // 从剪贴板读取文本
    clipBoard.readText().then(clipText => {
        writeInportData(clipText, packageResult.inportFunction.importFromClibBoard);
    });
    //销毁记录
    // clipBoard.destroy();
}


function writeInportData(inportData, fileName) {
    let langResult = packageResult.inportFunction;
    // $("#exportPre").text(clipText);
    //判断是否是base64
    const isBase = isBase64(inportData);
    let localTableData;
    if (isBase) {
        try {
            //尝试解密
            inportData = base.decode(inportData);
            // 字符串转对象
            let exportTextArray = evil(inportData);
            // const tableInfromation={
            //     makerId:makerId,
            //     makerNick:makerNick,
            //     link:location.href,
            //     tbName:tbName,
            // };
            const tableInfromation = exportTextArray[0];
            // console.log("tableInfromation:", tableInfromation);
            //获取数组字符串名称
            localTableData = exportTextArray[0];
            // makerId: makerId,
            //     makerNick: makerNick,
            //     link: location.href,
            //     tbName: tbName,
            //     appUserAgent: navigator.userAgent,
            showTableData(localTableData, fileName);

            if (tableInfromation.appUserAgent !== navigator.userAgent) {
                if (tbName == tableInfromation.tbName) {
                    exportTextArray = exportTextArray[1];
                    if (Array.isArray(exportTextArray)) {
                        swal({
                            title: langResult.swal.title,
                            text: langResult.swal.text[0] + exportTextArray.length + langResult.swal.text[1],
                            icon: "warning",
                            // buttons: true,
                            buttons: langResult.swal.buttons,
                            dangerMode: true,
                        }).then((willDelete) => {
                            if (willDelete) {
                                swal(langResult.swal2.swal1, {
                                    icon: "success",
                                });
                                if (localStorageType == "indexdb") {
                                    opIndexDB.inportDataFunction(exportTextArray, function (i) {
                                    });
                                } else if (localStorageType == "websql") {
                                    opWebsql.inportDataFunction(exportTextArray, function (i) {
                                    });
                                }
                            } else {
                                swal({
                                    text: langResult.swal2,
                                    timer: 2000
                                });
                                // swal("取消了操作！", "cancel");
                            }
                        });
                    } else {
                        // alert("格式不正确!");
                        swal(langResult.swal4[0], langResult.swal4[1]);
                    }
                    //清空剪贴板
                    clipBoard.writeText('').then(() => {
                        // clipBoard.$message.success('复制成功！');
                    });
                } else {
                    // swal("warning","此表只能导入到"+tableInfromation.makerNick
                    //     +"["+tableInfromation.makerId+"}("
                    //     +tableInfromation.link+")的"+tableInfromation.tbName+"表中!" );

                    swal({
                        title: langResult.swal1.swal1.title,
                        text: langResult.swal1.swal1.text[0] + tableInfromation.makerNick
                            + "[" + tableInfromation.makerId + "}" + langResult.swal1.swal1.text[1] + tableInfromation.tbName + langResult.swal1.swal1.text[2],
                        // error/success/warning/info/question/
                        icon: "warning",
                        // buttons: true,
                        buttons: langResult.swal1.swal1.buttons,
                        dangerMode: true,
                    }).then((willOpen) => {
                        if (willOpen) {
                            swal(langResult.swal1.swal2, {
                                icon: "success",
                            });
                            window.open(tableInfromation.link);
                        } else {
                            // swal("取消了操作", {
                            //     icon: "error",
                            // });
                            swal({
                                title: langResult.swal1.swal3.title,
                                text: langResult.swal1.swal3.text,
                                timer: 2000,
                                showConfirmButton: false
                            });
                            // swal("取消了操作！", "cancel");
                        }
                    });
                }
            } else {
                // swal("必须导入不同的游览器", "cancel");
                // $("#"+localTableData.tbName).css("background-color","red");
                swal({
                    title: langResult.swal3[0],
                    text: langResult.swal3[1],
                    timer: 2000,
                    icon: "warning"
                });
            }


        } catch (e) {
            // swal(langResult.swal3[0], langResult.swal3[1]);
            swal({
                title: langResult.swal4[0],
                text: langResult.swal4[1],
                timer: 2000,
                icon: "error"
            });
        }

    } else {

        swal(langResult.swal4[0], langResult.swal4[1]);
    }
}

function showTableData(tableData, fileName) {
    //清空数据
    // $("#exportDivBody").html("");
    // if (!fileName) {
    //     fileName = "ClipBoard"
    // }
    //
    // $("#exportDivBody").append(
    //     "<div className='alert'><a className='close' data-dismiss='alert'>X</a>"
    //     + "<h4 className='alert-heading'>" + fileName + "</h4>111</div>"
    //     +"<pre id='" + tableData.tbName + "' class='prohibitSelection prettyprint prettyprinted'>"
    //     // +"昵称："+localTableName.makerNick+"<br>"
    //     // +"ID："+localTableName.makerId+"<br>"
    //     + packageResult.showTableData.belongTo + "：<a href='" + tableData.link + "'>" + tableData.makerNick + "{" + tableData.makerId + "}</a><br>"
    //     + packageResult.showTableData.tableName + "：" + tableData.tbName + "<br>"
    //     + packageResult.showTableData.browser + "：" + tableData.appUserAgent + "<br>"
    //     + packageResult.showTableData.tableNumber + "：" + tableData.dataStoreLength
    //     + "</pre>");
    $("#exportDivBody").append(
        "<div className='alert'><h4>" + fileName + "<a className='close' data-dismiss='alert'>X</a></h4></div>"
        + "<pre id='" + tableData.tbName + "' class='prohibitSelection prettyprint prettyprinted'>"
        // +"昵称："+localTableName.makerNick+"<br>"
        // +"ID："+localTableName.makerId+"<br>"
        + packageResult.showTableData.belongTo + "：<a href='" + tableData.link + "'>" + tableData.makerNick + "{" + tableData.makerId + "}</a><br>"
        + packageResult.showTableData.tableName + "：" + tableData.tbName + "<br>"
        + packageResult.showTableData.browser + "：" + tableData.appUserAgent + "<br>"
        + packageResult.showTableData.tableNumber + "：" + tableData.dataStoreLength
        + "</pre>");
}

function exportFunction(type) {
    $("#exportDivBody").html("");

    let resultString = "";
    if (localStorageType == "indexdb") {
        opIndexDB.exportDataFunction(function (dataStore) {
            chioseFunctionByType(dataStore, type);
        });
    } else if (localStorageType == "websql") {
        opWebsql.exportDataFunction(function (dataStore) {
            chioseFunctionByType(dataStore, type);
        });
    }
}

// dataStoreLength:dataStore.length,
function chioseFunctionByType(dataStore, type) {
    //加入表格名称
    let localTableInfromation = tableInfromation;
    localTableInfromation.dataStoreLength = dataStore.length;


    //加入tableInfromation信息之前的数据
    const dtStore = JSON.stringify(dataStore);
    // if (dataStore.length < 5000) {
    //     $("#exportPre").text(dtStore);
    // }
    //加入tableInfromation信息之后的数据
    const dStoreJson = "[" + JSON.stringify(tableInfromation) + "," + dtStore + "]";
    //base64加密
    const baseStoreJson = base.encode(dStoreJson);
    // console.log(type);
    if (type == "clipBoard") {
        showTableData(localTableInfromation, packageResult.chioseFunctionByType.clipBoard);
        writeClipBoard(baseStoreJson);
    } else if (type == "download") {
        showTableData(localTableInfromation, packageResult.chioseFunctionByType.download);
        // downloadTxt(makerNick + "{" + makerId+"_"+localTableInfromation.dataStoreLength+"个}.txt", baseStoreJson);
        const fileName = makerNick + "{" + makerId + "_" + localTableInfromation.dataStoreLength + packageResult.chioseFunctionByType.downloadTxt + "}.txt";
        // const fileName=makerNick + "(" + localTableInfromation.dataStoreLength + ").txt";
        // const fileName=makerNick + "(" + makerId + ")-"+localTableInfromation.dataStoreLength+".txt";

        downloadTxt(fileName, baseStoreJson);
    }
}

var base = new Base64();
var makerId = $("#szBjId").val();
var makerNick = $(".text_information .nickname").text();
const tableInfromation = {
    makerId: makerId,
    makerNick: makerNick,
    link: location.href,
    tbName: tbName,
    appUserAgent: navigator.userAgent,
};

function readClipBoard(callBack) {
    // 从剪贴板读取文本
    clipBoard.readText().then(clipText => {
        callBack(clipText);
    });
}

function writeClipBoard(baseStoreJson) {
    // 写入文本至操作系统剪贴板
    clipBoard.writeText(baseStoreJson).then(() => {
        // clipBoard.$message.success('复制成功！');
        // swal("！", "success");
        swal({
            title: localStorageType + packageResult.writeClipBoard.swal.title,
            text: packageResult.writeClipBoard.swal.text[0] + makerNick + "{" + makerId + "}" + packageResult.writeClipBoard.swal.text[1],
            icon: "success",
            button: packageResult.writeClipBoard.swal.button,
        });
        //三秒后隐藏
        // swal("This modal will disappear soon!", {
        //     buttons: false,
        //     timer: 3000,
        // });
    })

}

function write1() {
    console.log("单击事件");
    // console.log($("#exportText").text());
    // 写入文本至操作系统剪贴板
    clipBoard.writeText($("#myPre").text()).then(() => {
        // clipBoard.$message.success('复制成功！');
        swal("复制成功！", "success");
    })

}

// 写入任意数据（比如图片）至操作系统剪贴板用 clipBoard.write()

function read1() {
    console.log("双击事件");

    // 从剪贴板读取文本
    clipBoard.readText().then(clipText => {
        $("#myPre").text(clipText);
        console.log(clipText);
    })
}


// opIndexDB.searchData();
// opIndexDB.searchData2();

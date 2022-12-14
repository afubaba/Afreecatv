var db;
var msg;
var dbName = 'chatPointsModeDB';
var sql;

var uId;
var uNick;
var tbNm;
var data;
var aurelionSolImgURL = "https://afubaba.github.io/Afreecatv/img/lol/AurelionSol.webp";
var ace={};
var sqlDataArray;
var imgSize;
var appendString;
var today = new Date($("#timeFrequencys").text()).getDate();
var showBarrageImgURL = "https://afubaba.github.io/Afreecatv/logo/400x400.jpeg";

var opWebsql = {
    getDB: function () {
        // console.log(db);
        // if(!db){
        db = openDatabase(dbName, "", 'Test DB', 100 * 1024 * 1024, function (result) {
            // console.log("回调函数");
            // db = result;
            // console.log(result);
            // console.log("回调函数");
        });
        dataBase = db;
        // }else{
        //     console.log("不打开数据库!");
        // }

        // if (!db) {
        //     // console.log("数据库创建失败！");
        //     return;
        // } else {
        //     // console.log("数据库创建成功！");
        // }
    },
    createTable: function (tbNm) {
        this.getDB();
        db.transaction(function (tx) {

            // sql="DROP TABLE IF EXISTS " + tbName;
            // console.log(sql);
            // tx.executeSql(sql, [], function (tx, results) {
            //     // console.log(results.rowsAffected);
            //
            // });

            sql = 'CREATE TABLE IF NOT EXISTS ' + tbNm + ' (id unique,userNick,grade,chatPoints,chatTimes,gamePoints,allPoints,allTimes,date)';
            // console.log(sql);
            tx.executeSql(sql, [], function (tx, results) {
                // console.log(results.rowsAffected);
            });

        });
    },
    deleteTable: function () {
        dataBase.transaction(function (tx) {
            // let searchSql = "delete from " + tbName;
            let deleteSql = "DROP TABLE IF EXISTS " + tbName;
            let dataArea = [];
            tx.executeSql(deleteSql, dataArea, function (tx, results) {
                // console.log('Rows affacted: ' + results.rowsAffected);
                //清空表格
                // $("#myTable tbody").children().detach();
                // opWebsql.searchData(tbName);
                showTipBarrageFunction("websql:" + packageResult.opIndexDB.deleteTable);
            }, function (tx, error) {
                console.log('Error: ' + error.message);
                // showTipBarrageFunction("删除失败");
            });
        });

    },
    clearTable: function () {
        dataBase.transaction(function (tx) {
            let searchSql = "delete from " + tbName;
            // var sql="DROP TABLE"+tbName;

            let dataArea = [];
            tx.executeSql(searchSql, dataArea, function (tx, results) {
                // console.log('Rows affacted: ' + results.rowsAffected);
                //清空表格
                // $("#myTable tbody").children().detach();
                // opWebsql.searchData(tbName);
                showTipBarrageFunction("websql:" + results.rowsAffected + packageResult
                    .opIndexDB.clearTable);
            }, function (tx, error) {
                // console.log('Error: ' + error.message);
                showTipBarrageFunction("삭제 실패");
            });
        });

    },
    searchData: function (tbName, sortType, which, limi, pageIndex) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        dataBase.transaction(function (tx) {
            var sqlSortType;
            if (sortType == "up") {
                // sql="SELECT * FROM " + tbName +" order by 3 desc LIMIT 1,10";
                // sql="SELECT * FROM " + tbName +" order by "+which+" desc LIMIT 1,10";
                sqlSortType = "asc";
            } else if (sortType == "down") {
                // sql="SELECT * FROM " + tbName +" order by 3 asc LIMIT 1,10";
                // sql="SELECT * FROM " + tbName +" order by "+which+" asc LIMIT 1,10";
                sqlSortType = "desc";

            } else {
                // sql="SELECT * FROM " + tbName +" LIMIT 1,10";
                // sql="SELECT * FROM " + tbName +" LIMIT 1,10";
                // which=
            }
            //今天
            var dateString = "";
            if (which == 'chatPoints' || which == 'chatTimes' || which == 3 || which == 'gamePoints') {
                dateString = " where date= ?";
                sqlDataArray = [todayDate];
            } else {
                sqlDataArray = [];
            }
            if (which) {
                which = dateString + " order by " + which;
            }
            // console.log(which);
            var li;
            var i = 1;
            if (!limi) {
                // sql="SELECT * FROM " + tbName +which+" "+sqlSortType+" LIMIT 0,10";
                li = "0," + everyPage;

            } else {
                // sql="SELECT * FROM " + tbName +which+" "+sqlSortType+" LIMIT "+limi[0]+","+limi[1];
                li = limi[0] + "," + limi[1];
                i = limi[0] + 1;
                // console.log(i)
            }

            if (which && sortType) {
                sql = "SELECT * FROM " + tbName + which + " " + sqlSortType + " LIMIT " + li;
            } else {
                sql = "SELECT * FROM " + tbName + " LIMIT " + li;
            }

            // console.log(sql);
            // console.log("----------------");
            // console.log(sqlDataArray);
            tx.executeSql(sql, sqlDataArray, function (tx, results) {

                // console.log(results.rowsAffected);
                var data = results.rows;
                $("#myTable tbody").children().detach();
                // $("#myTable tbody").children().empty();
                // $("#myTable tbody").children().remove();

                for (d of data) {
                    // console.log(i)
                    // $("#myTable tbody").append("<tr><th>" + i + "</th><th>" + d
                    //         .id +
                    //     "</th><th>" + d.userNick + "</th><th>" + d.chatPoints +
                    //     "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints +
                    //     "</th><th>" + d.date + "</th></tr>");
                    $("#myTable tbody").append("<tr><th>" + i +
                        "</th><th>" + d.userNick + "(" + d.id + ")</th><th>" + convertGrade(d.grade) + "</th><th>" + d.chatPoints +
                        "</th><th>" + d.chatTimes + "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints +
                        "</th><th>" + d.allTimes + "</th><th>" + d.date + "</th></tr>");
                    i++;
                }
                if (!which && !sortType || !limi) {
                    //序号变成1
                    $('#pageIndex').children('li').children('a').css('background', '');
                    $('#pageIndex').children('li').children('a:eq(0)').css('background', 'red');
                }

                // console.log(data);
                var searchCountSql = "SELECT count(1) as allCount from " + tbName + dateString;
                // console.log(searchCountSql);
                var allPageLength;
                tx.executeSql(searchCountSql, sqlDataArray, function (tx, results) {
                    $("#allPageValue").val(results.rows[0].allCount);
                    allPageLength = results.rows[0].allCount % everyPage == 0 ?
                        parseInt(results.rows[0].allCount / everyPage) : (parseInt(
                            results.rows[0].allCount / everyPage) + 1);

                    // if(results.rows[0].allCount%everyPage==0){
                    // 	allPageLength=parseInt(results.rows[0].allCount/everyPage);
                    // }else{
                    // 	allPageLength=parseInt(results.rows[0].allCount/everyPage)+1;
                    // }
                    // console.log(allPageLength);
                    // $("#pageIndex").empty();
                    // $("#pageIndex").detach();
                    if (allPageLength > 1) {
                        // $("#pagination").show();
                        $("#pagination").css("visibility", "visible");
                        // console.log("allPageLength:", allPageLength);
                        // console.log(li);
                        // console.log(li.substring(0, li.indexOf(",")));
                        // var nowPage = parseInt(li.substring(0, li.indexOf(",")));
                        var nowPage = pageIndex;
                        // console.log(limi[0]);

                        if (($("#pageIndex li").length - 2) > allPageLength) {
                            for (var i = allPageLength + 1; i <= ($("#pageIndex li")
                                .length - 2); i++) {
                                $("#pageIndex>li>a:eq(" + i + ")").hide();
                            }
                        } else {
                            $("#pageIndex>li>a:gt(0):lt(6)").show();
                            $("#pageIndex>li>a").show();
                        }

                        // console.log(pageIndex);
                        // for (var i = 1; i < 10; i++) {
                        // 	for (var j = 1; j <= j + 6; j++) {
                        // 		console.log(j);
                        // 	}
                        // }
                        //最后一页
                        allPageLength > 6 && $("#lastPage").attr("onclick",
                            "changePage(" +
                            allPageLength +
                            ")").html("<span class='badge'>" + allPageLength +
                            "</span>");
                        if (!nowPage) {
                            nowPage = 1;
                            $("#firstPage,#lastPage").hide();
                        }
                        // console.log("allPageLength:"+allPageLength,"nowPage:"+nowPage);
                        if (nowPage <= 3) {
                            nowPage = 3;
                            $("#firstPage").hide();
                            // console.log("隐藏first");
                        } else {
                            if ($("#pageIndex li:eq(1)").text() > 1) {
                                $("#firstPage").show();
                            } else {
                                $("#firstPage").hide();
                            }
                            // console.log("显示first");
                        }
                        var ma = allPageLength - nowPage;
                        // console.log(ma);
                        if (ma <= 3) {
                            nowPage = allPageLength - 3;
                            $("#lastPage").hide();
                        } else {
                            $("#lastPage").show();
                        }
                        var j = 1;
                        for (var i = 1; i <= allPageLength; i++) {
                            if (i < nowPage && nowPage - i <= 2 || i >= nowPage &&
                                i - nowPage <= 3) {
                                // console.log("i:", i + "j:", j);
                                // if ($("#pageIndex>li>a:eq(" + j + ")").html() ==
                                // 	i) {
                                // 	return;
                                // } else {
                                //显示
                                $("#pageIndex>li>a:eq(" + j + ")").show();

                                $("#pageIndex>li>a:eq(" + j + ")").html(
                                    "<span class='badge'>" + i + "</span>");
                                // $("#pageIndex>li>a:eq(" + j + ")")
                                if (i == pageIndex) {
                                    $("#pageIndex>li>a:eq(" + j + ")").html(
                                        "<span class='badge badge-warning'>" +
                                        i + "</span>");
                                }

                                // }

                                j++;
                            }

                        }
                    } else {
                        // $("#pagination").hide();
                        $("#pagination").css("visibility", "hidden");
                    }

                });

            }, null);

        });

    },
    getMaxData: function (idDom, userId) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        dataBase.transaction(function (tx) {
            // sql = "select id as 身份证,userNick as 昵称,max(chatPoints) as 今日最高分数,max(allPoints) as 总分数最高 from "+tbName;
            // sql = "select userNick as 닉네임,max(chatPoints) as 오늘 채팅 횟수,max(allPoints) as 총 채팅 횟수 from "+tbName;
            //console.log(sql);
            // id ,
            //今天的龙王
            // sql = "select id,userNick ,max(chatPoints) as maxChatPoint,allPoints  from " + tbName +
            // 	" where chatPoints>=5 and date='" + today + "'";
            // sql = "select id,userNick ,max(chatPoints) as maxChatPoint,allPoints  from " + tbName +
            // " where chatPoints>=? and date=?";
            sql = "select id,userNick,grade,max(chatPoints) as maxChatPoint,chatTimes,gamePoints ,allPoints,allTimes  from " +
                tbName +
                " where date=?";
            sqlDataArray = [todayDate];
            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                // console.log(results.rowsAffected);
                data = results.rows[0];
                // $("#todayChatPointsAce>th:eq(0)").text("용왕");
                // $("#todayChatPointsAce>th:eq(1)").text(data.id);
                // $("#todayChatPointsAce>th:eq(2)").text(data.userNick);
                // $("#todayChatPointsAce>th:eq(3)").text(data.maxChatPoint);
                // $("#todayChatPointsAce>th:eq(4)").text(data.gamePoints);
                // $("#todayChatPointsAce>th:eq(5)").text(data.allPoints);
                // $("#todayChatPointsAce>th:eq(6)").text(todayDate);
                $("#todayChatPointsAce>th:eq(0)").text("용왕");
                $("#todayChatPointsAce>th:eq(1)").text(data.userNick + "{" + data.id + "}");
                $("#todayChatPointsAce>th:eq(2)").text(convertGrade(data.grade));
                $("#todayChatPointsAce>th:eq(3)").text(data.maxChatPoint);
                $("#todayChatPointsAce>th:eq(4)").text(data.chatTimes);
                $("#todayChatPointsAce>th:eq(5)").text(data.gamePoints);
                $("#todayChatPointsAce>th:eq(6)").text(data.allPoints);
                $("#todayChatPointsAce>th:eq(7)").text(data.allTimes);
                $("#todayChatPointsAce>th:eq(8)").text(todayDate);
                // console.log(data);
                var chatPointsMaxChangeMode = getDomById("chatPointsMaxChangeMode");
                // if (!ace) {
                //     ace.userId = data.id;
                //     ace.userNick = data.userNick;
                //     ace.maxChatPoint = data.maxChatPoint;
                // }
                //五次以上提醒
                if (ace.userNick != data.userNick || ace.userId != data.id) {
                    // console.log("龙王变更提醒");
                    ace.userId = data.id;
                    ace.userNick = data.userNick;
                    ace.chatRatio = data.maxChatPoint;
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

                    // "<h1>용왕가 변경되었습니다!</h1><hr><img class='showBarrageImg'  src='" +
                    // sessionStorage.getItem(
                    // 	"showBarrageImage") +
                    // "'/>"
                    // );

                }
                //标记ACE
                // console.log("dataId:", data.id + "idDomUserId:", userId);
                // if (data.id == userId && maxChatPoint) {
                // 	// var appendString ="<span style='background-image:url(" + aurelionSolImgURL +
                // 	// 	");color:yellow;font-size:large'>[ACE]</span>"
                // 	imgSize = parseInt(maxChatPoint / 10);
                // 	if (imgSize < 3) {
                // 		imgSize = 3;
                // 	} else if (imgSize > 60) {
                // 		imgSize = 60;
                // 	}
                // 	// console.log(imgSize);
                // 	appendString = "<img style='width:" + imgSize + "px;height:" + imgSize +
                // 	"px;' src ='" +
                // 	aurelionSolImgURL + "' />"
                // 	$(idDom).parent().append(appendString);
                // 	// idDom.innerHTML=idDom.textContent=
                // 	// idDom.innerHTML=idDom.innerHTML+"[ACE]";
                // }

            }, null);

        });

    },
    searchMaxData: function (serachType, callback) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        dataBase.transaction(function (tx) {
            // sql = "select id as 身份证,userNick as 昵称,max(chatPoints) as 今日最高分数,max(allPoints) as 总分数最高 from "+tbName;
            // sql = "select userNick as 닉네임,max(chatPoints) as 오늘 채팅 횟수,max(allPoints) as 총 채팅 횟수 from "+tbName;
            //console.log(sql);
            // id ,
            if (serachType != "allPoints" && serachType != "allTimes") {
                sqlDataArray = [todayDate];
                sql = "select userNick ,max(" + serachType + ") as " + serachType + ",allPoints,count(1) as count  from " + tbName + " where date=?";
            } else {
                sqlDataArray = [];
                sql = "select userNick ,max(" + serachType + ") as " + serachType + ",allPoints,count(1) as count  from " + tbName;
            }
            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                // console.log(results.rowsAffected);
                // console.log(results);
                // console.log(results.length);
                data = results.rows[0];
                // console.log(data);

                // "닉네임:"
                // var dataString = "@" + data.userNick + ",오늘 채팅 횟수:" + data
                // 	.maxChatPoint +
                // 	",총 채팅 횟수:" + data.allPoints;
                data.resArrLength = data.count;
                console.log(data);
                callback(data);

            }, null);

        });
    },
    searchDataByUserId: function (tex) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        var searchUserData = userData;
        // searchUserData.id
        var dataString = "@" + searchUserData.userNick;
        dataBase.transaction(function (tx) {
            // sql = "SELECT * FROM " + tbName + " WHERE id = ?;";
            //console.log(sql);
            var data;
            sqlDataArray = [searchUserData.userId];
            if (tex == "!채팅통계" || tex == "!채팅통계조회") {
                sql = "select * from " + tbName + " where id=?";
                tx.executeSql(sql, sqlDataArray, function (tx, results) {
                    data = results.rows[0];
                    // queryReply(tex, searchUserData, data);
                    dataString = dataString + ":채팅 횟수:" + data.chatTimes + ",채팅 포인트:" + data.chatPoints + ",게임 포인트:" +
                        data.gamePoints + ",총 횟수:" + data.allTimes + ",총 포인트:" + data.allPoints;

                    sendMessageCustom(dataString, 1, 4);
                }, null);
            } else {
                if (tex == "!총포인트") {
                    // sql = "SELECT s.allPoints,(select count(distinct(allPoints)) from " + tbName +
                    // 	" where allPoints >= s.allPoints ) as 'Rank',(select count(1) from " + tbName +
                    // 	" ) as 'count' FROM " + tbName + " as s where s.id=? order by allPoints desc ";

                    sql = "select id,userNick,allPoints,(select count(1) from " + tbName +
                        ") as 'count' from " + tbName + " order by allPoints desc";

                    dataString = dataString + ":누적 총 채팅 포인트:";
                }
                if (tex == "!총횟수") {
                    // sql = "SELECT s.allPoints,(select count(distinct(allPoints)) from " + tbName +
                    // 	" where allPoints >= s.allPoints ) as 'Rank',(select count(1) from " + tbName +
                    // 	" ) as 'count' FROM " + tbName + " as s where s.id=? order by allPoints desc ";

                    sql = "select id,userNick,allTimes,(select count(1) from " + tbName +
                        ") as 'count' from " + tbName + " order by allTimes desc";

                    dataString = dataString + ":누적 총 채팅 횟수:";
                } else if (tex == "!채팅포인트") {
                    dataString = dataString + ":오늘 채팅 포인트:";
                    // sql = "SELECT s.chatPoints,(select count(distinct(chatPoints)) from " + tbName +
                    // 	" where chatPoints >= s.chatPoints and date="+todayDate+" ) as 'Rank',(select count(1) from " +
                    // 	tbName +" where date="+todayDate+" ) as 'count' FROM " + tbName + " as s where s.id=? and date="+todayDate+" order by chatPoints desc ";
                    sql = "select id,userNick,chatPoints,(select count(1) from " + tbName +
                        " where date=" + todayDate + ") as 'count' from " + tbName + " where date=" +
                        todayDate +
                        " order by chatPoints desc";
                } else if (tex == "!채팅횟수") {
                    dataString = dataString + ":오늘 채팅 횟수:";
                    sql = "select id,userNick,chatTimes,(select count(1) from " + tbName +
                        " where date=" + todayDate + ") as 'count' from " + tbName + " where date=" +
                        todayDate + " order by chatTimes desc";
                } else if (tex == "!게임포인트") {
                    dataString = dataString + ":오늘 게임 포인트:";
                    // sql = "SELECT s.gamePoints,(select count(distinct(gamePoints)) from " + tbName +
                    // 	" where gamePoints >= s.gamePoints and date=" + todayDate +
                    // 	" ) as 'Rank',(select count(1) from " +
                    // 	tbName +
                    // 	" where date= " + todayDate + ") as 'count' FROM " + tbName +
                    // 	" as s where s.id=? and date=" + todayDate + " order by gamePoints desc ";
                    sql = "select id,userNick,gamePoints,(select count(1) from " + tbName +
                        " where date=" + todayDate + ") as 'count' from " + tbName + " where date=" +
                        todayDate +
                        " order by gamePoints desc";
                }
                // https://zhuanlan.zhihu.com/p/196445603
                // SELECT (SELECT COUNT(id) FROM skygkrtn AS tbl1 WHERE tbl1.id<=tbl2.id) as seq,tbl2.* FROM skygkrtn AS tbl2 ORDER BY 1 ;
                // SELECT (SELECT COUNT(id) FROM ch1716 AS tbl1 WHERE tbl1.id<=tbl2.id) as seq,tbl2.* FROM ch1716 AS tbl2 ORDER BY 4 desc ;

                // sqlDataArray
                tx.executeSql(sql, [], function (tx, results) {

                    // index = resArray.map(userData => userData.id).indexOf(searchUserData.id);
                    var data = results.rows;
                    for (var i = 0; i < data.length; i++) {
                        var dataResult = data.item(i);
                        if (dataResult.id == searchUserData.userId) {

                            if (tex == "!총포인트") {
                                dataString = dataString + dataResult.allPoints + ",순위:" +
                                    (i + 1) + "/" + dataResult.count;
                            } else if (tex == "!총횟수") {
                                dataString = dataString + dataResult.allTimes + ",순위:" +
                                    (i + 1) + "/" + dataResult.count;
                            } else if (tex == "!채팅포인트") {
                                dataString = dataString + dataResult.chatPoints + ",순위:" +
                                    (i + 1) + "/" + dataResult.count;
                            } else if (tex == "!채팅횟수") {
                                dataString = dataString + dataResult.chatTimes + ",순위:" +
                                    (i + 1) + "/" + dataResult.count;
                            } else if (tex == "!게임포인트") {
                                dataString = dataString + dataResult.gamePoints + ",순위:" +
                                    (i + 1) + "/" + dataResult.count;
                            }
                            sendMessageCustom(dataString, 1, 4);
                            break;
                        }
                    }
                    // queryReply(tex, searchUserData, data);


                }, null);
            }


        });

    },
    insertData: function (userData, idDom) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        var allTbName = "chatPointsMode";
        uId = userData.userId;
        uNick = userData.userNick;
        tbNm = userData.tbName;
        dataBase.transaction(function (tx) {

            // var tbName = "chatPointsMode";
            // sql = 'CREATE TABLE IF NOT EXISTS ' + allTbName +
            // 	' (id unique,userNick ,chatPoints,gamePoints)';
            // //console.log(sql);
            // tx.executeSql(sql);

            // sql = 'INSERT INTO ' + tbNm +
            // 	"(id, userNick,chatPoints,gamePoints) VALUES ('?','?',0,0)";
            // //console.log(sql);
            // tx.executeSql(sql);

            // sql = "SELECT chatPoints,allPoints,date FROM " + tbNm + " WHERE id='" + uId + "'";
            sql = "SELECT * FROM " + tbNm + " WHERE id=?";
            sqlDataArray = [uId];
            // console.log(sqlDataArray);
            // db.transaction(function(tx) {});
            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                // console.log(results);
                let resultRows = results.rows;
                // console.log(resultRows.length);
                // console.log(userData);
                let increase = userData.increase;
                let increaseBit = userData.increaseBit;
                //重置的increase;
                if (resultRows.length == 1) {
                    // console.log("update");
                    let resultData = resultRows[0];
                    let addChatPoints = resultData.chatPoints + increase;

                    // let addGamePoints = roundFun(resultData.gamePoints + increase, increaseBit);

                    let addAllPoints = resultData.allPoints + increase, increaseBit;
                    // console.log(resultData);
                    // console.log(data);
                    // db.transaction(function(tx) {
                    // var sql="UPDATE " + tbNm + " SET fontColor='nice' ,  backColor='good'";
                    // console.log(data.chatPoints);
                    // console.log(typeof data.chatPoints);
                    //今天增加一点
                    // var upChatPoints = (parseInt(data.chatPoints) + 1);

                    //累计增加一点
                    // var upAllPoints = (parseInt(data.allPoints) + 1);
                    // console.log("upAllPoints", upAllPoints);
                    //判断是否错误

                    // upAllPoints = upChatPoints > upAllPoints ? upChatPoints :
                    // 	upAllPoints;
                    // if (upChatPoints > upAllPoints) {
                    // 	upAllPoints = upChatPoints;
                    // }
                    //月份字符串
                    if (resultData.date == todayDate) {
                        sqlDataArray = [addChatPoints, addAllPoints, uId];
                        // sql = "UPDATE " + tbNm +
                        //     " SET chatPoints=chatPoints+1,allPoints=allPoints+1,date=" +
                        //     today + " WHERE id=?";
                        sql = "UPDATE " + tbNm + " SET chatPoints=?,chatTimes=chatTimes+1,allPoints=?,allTimes=allTimes+1 WHERE id=?";
                        //测试数据
                        // sql = "UPDATE " + tbNm + " SET userNick='等待测试',grade='载入中。。。',chatPoints=?,allPoints=? WHERE id=?";
                    } else {
                        let toDate = new Date(todayDate);
                        // toDate.setDate(1);
                        let resuDate = new Date(resultData.date);
                        //判断月份
                        if (toDate.getMonth() == resuDate.getMonth()) {
                            //判断日
                            if (toDate.getDate() == resuDate.getDate()) {
                                sqlDataArray = [addChatPoints, addAllPoints, todayDate, uId];
                                //     " SET chatPoints=chatPoints+1,allPoints=allPoints+1,date=" +
                                //     today + " WHERE id=?";
                                sql = "UPDATE " + tbNm + " SET chatPoints=?,chatTimes=chatTimes+1,allPoints=?,allTimes=allTimes+1,date=? WHERE id=?";
                            } else {
                                //判断昵称是否不一致
                                let userNickSqlString;
                                sqlDataArray = [increase, addAllPoints, todayDate, uId];
                                if (resultData.userNick == uNick) {
                                    userNickSqlString = "";
                                } else {
                                    userNickSqlString = "userNick=?,"
                                    sqlDataArray.unshift(uNick);
                                }
                                //判断等级是否不一致
                                let gradeSqlString;
                                if (resultData.grade == userData.grade) {
                                    gradeSqlString = "";
                                } else {
                                    gradeSqlString = "grade=?,"
                                    sqlDataArray.unshift(userData.grade);
                                }
                                sql = "UPDATE " + tbNm + " SET " + gradeSqlString + userNickSqlString + "chatPoints=?,chatTimes=1,gamePoints=0,allPoints=?,allTimes=allTimes+1,date=? WHERE id=?;";
                                // console.log(sql);
                                // console.log(sqlDataArray);
                                showTipBarrageFunction(uNick + " " + (resuDate.getDate()) + packageResult.opIndexDB.insertData[0]);
                                // console.log("今日积分清零");
                                // sql = "UPDATE " + tbNm + " SET chatPoints=1,date=? WHERE id='" + uId + "';";
                            }
                        } else {
                            // console.log("不是同一个月");
                            let $resetTotalPointsEveryMonth = $("#resetTotalPointsEveryMonth");
                            let resetTotalPointsEveryMonthChecked = $resetTotalPointsEveryMonth.prop("checked");
                            let logString = uNick + " " + (resuDate.getMonth() + 1);

                            // let gradeSqlString;

                            if (resetTotalPointsEveryMonthChecked) {
                                sqlDataArray = [increase, increase, todayDate, uId];
                                sql = "UPDATE " + tbNm + " SET chatPoints=?,chatTimes=1,gamePoints = 0,allPoints=?,allTimes=1,date=? WHERE id=?;";

                                // if (resultData.grade == userData.grade) {
                                //     gradeSqlString="";
                                // } else {
                                //     gradeSqlString="grade=?,"
                                //     sqlDataArray.unshift(userData.grade);
                                //     //测试数据
                                //     // sqlDataArray.unshift("等待测试");
                                // }
                                // sql = "UPDATE " + tbNm + " SET "+gradeSqlString+"chatPoints=?,gamePoints = 0,allPoints=?,date=? WHERE id=?;";
                                showTipBarrageFunction(logString + packageResult.opIndexDB.insertData[1]);
                            } else {
                                sqlDataArray = [increase, addAllPoints, todayDate, uId];
                                sql = "UPDATE " + tbNm + " SET chatPoints=?,chatTimes=1,gamePoints = 0,allPoints=?,allTimes=allTimes+1,date=? WHERE id=?;";

                                // if (resultData.grade == userData.grade) {
                                //     gradeSqlString="";
                                // } else {
                                //     gradeSqlString="grade=?,"
                                //     sqlDataArray.unshift(userData.grade);
                                //     //测试数据
                                //     // sqlDataArray.unshift("等待测试");
                                // }
                                // sql = "UPDATE " + tbNm + " SET "+gradeSqlString+"chatPoints=?,gamePoints = 0,allPoints=?,date=? WHERE id=?;";
                                showTipBarrageFunction(logString + packageResult.opIndexDB.insertData[2]);
                            }


                        }
                    }
                    tx.executeSql(sql, sqlDataArray, function (tx, results) {
                        // console.log(results);
                        // console.log(results.rowsAffected);
                    });

                    // if (today == new Date(resultData.date).getDate()) {
                    // sql = "UPDATE " + tbNm + " SET chatPoints=" +
                    // 	upChatPoints + ",userNick='" + uNick + "',allPoints=" +
                    // 	upAllPoints +
                    // 	" WHERE id='" + uId + "';";


                    // sql = "select id as 身份证,userNick as 昵称,max(chatPoints) as 今日最高分数,max(allPoints) as 总分数最高 from "+tbName;
                    // sql = "select userNick as 닉네임,max(chatPoints) as 오늘 채팅 횟수,max(allPoints) as 총 채팅 횟수 from "+tbName;
                    //console.log(sql);
                    // id ,
                    //今天的龙王
                    // sql = "select id,userNick ,max(chatPoints) as maxChatPoint,allPoints  from " + tbName +
                    // 	" where chatPoints>=5 and date='" + today + "'";
                    // sql =
                    // 	"select id,userNick ,max(chatPoints) as maxChatPoint,allPoints  from " +
                    // 	tbName +
                    // 	" where chatPoints>=? and date=?";
                    // sqlDataArray = [5, today];
                    // tx.executeSql(sql, sqlDataArray, function(tx, results) {
                    // 	// console.log(results.rowsAffected);
                    // 	data = results.rows[0];
                    // 	// console.log(data);
                    // 	var chatPointsMaxChangeMode = getDomById(
                    // 		"chatPointsMaxChangeMode");

                    // 	if (!ace) {
                    // 		ace = data.userNick;
                    // 	}
                    // 	var maxChatPoint = data.maxChatPoint;

                    // 	//五次以上提醒
                    // 	if (ace != data.userNick && maxChatPoint) {
                    // 		// console.log("龙王变更提醒");
                    // 		ace = data.userNick;
                    // 		// 용왕이가 AA가 됐어요.
                    // 		var mess = "용왕이가 [" + ace + "]가 됐어요.";
                    // 		//不包含自身
                    // 		var loginId = localStorage.getItem("loginId");
                    // 		if (!data.id.includes(loginId) &&
                    // 			chatPointsMaxChangeMode.checked) {
                    // 			mess = mess + "오늘 채팅 횟수: " + maxChatPoint;
                    // 			sendMessageCustom(mess, 1, 5);
                    // 		}

                    // 		showTipBarrageFunction(

                    // 			"<div class='alert alert-block disableSelection'><h1>" +
                    // 			mess +
                    // 			"</h1><hr><img class='showBarrageImg'  src='" +
                    // 			sessionStorage.getItem(
                    // 				"showBarrageImage") +
                    // 			"'/></div>"
                    // 		);

                    // 		// "<h1>용왕가 변경되었습니다!</h1><hr><img class='showBarrageImg'  src='" +
                    // 		// sessionStorage.getItem(
                    // 		// 	"showBarrageImage") +
                    // 		// "'/>"
                    // 		// );

                    // 	}
                    //标记ACE
                    // console.log("dataId:", data.id + "idDomUserId:", userId);
                    // if (data.id == uId && maxChatPoint) {

                    // 	// var appendString ="<span style='background-image:url(" + aurelionSolImgURL +
                    // 	// 	");color:yellow;font-size:large'>[ACE]</span>"
                    // 	var imgSize = parseInt(maxChatPoint / 10);

                    // 	if (imgSize < 3) {
                    // 		imgSize = 3;
                    // 	} else if (imgSize > 60) {
                    // 		imgSize = 60;
                    // 	}

                    // 	// console.log(imgSize);
                    // 	var appendString = "<img style='width:" + imgSize +
                    // 		"px;height:" + imgSize +
                    // 		"px;' src ='" +
                    // 		aurelionSolImgURL + "' />"
                    // 	$(idDom).parent().append(appendString);
                    // 	// idDom.innerHTML=idDom.textContent=
                    // 	// idDom.innerHTML=idDom.innerHTML+"[ACE]";
                    // }

                    // }, null);


                    // } else if (today >= (date + 1) || today == 1) {
                    // }

                    // });
                } else if (resultRows.length == 0) {
                    // console.log("insert");
                    // sql = 'INSERT INTO ' + tbNm +
                    // 	"(id, userNick,chatPoints,gamePoints,allPoints) VALUES ('" + uId +
                    // 	"','" + uNick + "',1,1,2,'" + todayDate + "');";
                    // sql = 'INSERT INTO ' + tbNm + " VALUES ('" + uId +
                    // 	"','" + uNick + "',1,0,1,'" + todayDate + "');";
                    sql = 'INSERT INTO ' + tbNm + " VALUES (?,?,?,?,1,0,?,1,?);";
                    // console.log(sql);
                    sqlDataArray = [uId, uNick, userData.grade, increase, increase, todayDate];
                    //测试数据
                    // sqlDataArray = [uId, "等待测试","。。。载入中", increase, increase, todayDate];

                    tx.executeSql(sql, sqlDataArray);

                }
                // console.log(data.chatPoints);
                // console.log(typeof data.chatPoints);


            }, null);


            // sql = "SELECT chatPoints FROM " + allTbName + " WHERE id='" + uId + "'";
            // //console.log(sql);
            // tx.executeSql(sql, [], function(tx, results) {
            // 	console.log(results);
            // 	var resultRows = results.rows;
            // 	data = resultRows[0];
            // 	console.log(data);
            // 	console.log(resultRows.length);
            // 	if (resultRows.length == 0) {

            // 		sql = 'INSERT INTO ' + allTbName +
            // 			"(id, userNick,chatPoints,gamePoints) VALUES ('" + uId +
            // 			"','" + uNick + "',1,1);";
            // 		//console.log(sql);
            // 		tx.executeSql(sql);

            // 	}
            // 	// console.log(data.chatPoints);
            // 	// console.log(typeof data.chatPoints);
            // 	if (resultRows.length == 1) {
            // 		// db.transaction(function(tx) {
            // 		// var sql="UPDATE " + allTbName + " SET fontColor='nice' ,  backColor='good'";
            // 		console.log(data.chatPoints);
            // 		console.log(typeof data.chatPoints);
            // 		var upChatPoints = (parseInt(data.chatPoints) + 1);
            // 		console.log("upChatPoints", upChatPoints);

            // 		var sql = "UPDATE " + allTbName + " SET chatPoints=" +
            // 			upChatPoints + ",userNick='" + uNick +
            // 			"' WHERE id='" + uId + "';";

            // 		console.log(sql)

            // 		tx.executeSql(sql, [], function(tx, results) {
            // 			console.log(results);
            // 			console.log(results.rowsAffected);

            // 		});
            // 		// });
            // 	}


            // }, null);


        });


    },
    addData: function (userData) {
        dataBase.transaction(function (tx) {
            sql = "SELECT * FROM " + tbNm + " WHERE id=?";
            sqlDataArray = [userData.id];
            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                let resultRows = results.rows;
                if (resultRows.length == 1) {
                    let resultData = resultRows[0];
                    sqlDataArray = [userData.id];
                    if ("chatPoints" in userData && "gamePoints" in userData) {
                        sqlDataArray = [resultData.chatPoints + userData.chatPoints, resultData.gamePoints + userData.gamePoints, resultData.allPoints + userData.chatPoints + userData.gamePoints, userData.id];
                        sql = "UPDATE " + tbNm + " SET chatPoints=?,gamePoints=?,allPoints=? WHERE id=?";
                    } else {
                        if ("chatPoints" in userData) {
                            sqlDataArray = [resultData.chatPoints + userData.chatPoints, resultData.allPoints + userData.chatPoints, userData.id];
                            sql = "UPDATE " + tbNm + " SET chatPoints=?,allPoints=? WHERE id=?";
                        } else if ("gamePoints" in userData) {
                            sqlDataArray = [resultData.gamePoints + userData.gamePoints, resultData.allPoints + userData.gamePoints, userData.id];
                            sql = "UPDATE " + tbNm + " SET gamePoints=?,allPoints=? WHERE id=?";
                        } else {
                        }
                    }
                    // console.log(sqlDataArray);
                    // console.log(sql);
                    tx.executeSql(sql, sqlDataArray, function (tx, results) {
                    });
                } else if (resultRows.length == 0) {

                }
            });
        });
    },
    updateData: function (diceData, callback) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        // today= new Date(todayDate).getDate();

        // var tbName = "cpm_1004suna";
        // var diceData = {
        //     "userId": "space8100",
        //     "userNick": "↙↙",
        //     "userAdd": 2,
        //     "makerId": "12354",
        //     "makerNick": "두기_=",
        //     "makerAdd": -2
        // };
        // console.log(diceData)
        // console.log(tbName)
        let sqlDataArray = [diceData.userId];
        // var callData = new Array();
        dataBase.transaction(function (tx) {
            var sql = "UPDATE " + tbName + " SET gamePoints=gamePoints+" + diceData.userAdd +
                ",allPoints=allPoints+" + diceData.userAdd + " WHERE id=?";
            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                if (results.rowsAffected > 0) {
                    //查询庄家是否存在
                    sqlDataArray = [diceData.makerId];
                    sql = "SELECT 1 FROM " + tbName + " WHERE id=?";
                    tx.executeSql(sql, sqlDataArray, function (tx, results) {
                        if (results.rows.length == 0) {
                            // console.log("不存在");
                            sqlDataArray = [diceData.makerId, diceData.makerNick,
                                diceData.makerAdd, diceData.makerAdd, todayDate
                            ];
                            sql = "INSERT INTO " + tbName + " (id,userNick,grade,chatPoints,chatTimes,gamePoints,allPoints,allTimes,date) VALUES (?,?,'BJ', 0,0,?,?,0,? )";
                            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                                //查询插入后的数据
                                sqlDataArray = [diceData.userId, diceData.makerId]
                                sql = "select * from " + tbName +
                                    " WHERE id=? or id=?";
                                // console.log(sql);
                                tx.executeSql(sql, sqlDataArray, function (tx,
                                                                           results) {

                                    callback(results.rows);
                                });
                            });
                        } else if (results.rows.length == 1) {
                            // console.log("存在");
                            //日期更新todayDate
                            if (results.rows[0].date == todayDate) {
                                // console.log("等于");
                                sql = "UPDATE " + tbName + " SET gamePoints=gamePoints+" +
                                    diceData.makerAdd + ",allPoints=allPoints+" + diceData
                                        .makerAdd + " WHERE id=?";
                            } else {
                                // console.log("不等于");
                                sqlDataArray = [todayDate, diceData.makerId];
                                //日期更新,重置聊天点，游戏点
                                sql = "UPDATE " + tbName + " SET chatPoints=0,gamePoints=gamePoints+" +
                                    diceData.makerAdd + ",allPoints=allPoints+" + diceData
                                        .makerAdd + ",date=? WHERE id=?";
                            }
                            // console.log(sql);
                            // console.log(sqlDataArray);

                            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                                //查询更新后的数据
                                sqlDataArray = [diceData.userId, diceData
                                    .makerId
                                ]
                                sql = "select * from " + tbName +
                                    " WHERE id=? or id=?";
                                // console.log(sql);
                                tx.executeSql(sql, sqlDataArray, function (tx, results) {
                                    callback(results.rows);
                                });
                            });
                        }
                    });


                }


            });

        });
    },
    exportDataFunction: function (callback) {
        dataBase.transaction(function (tx) {
            sql = "SELECT * FROM " + tbName;
            tx.executeSql(sql, [], function (tx, results) {
                var data = results.rows;
                callback(Object.values(data));
            });
        });
    },
    inportDataFunction: function (userDataArray, callBack) {

        //不存在创造表格
        this.createTable(tbName);

        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        // today= new Date(todayDate).getDate();
        let sql = "SELECT * FROM " + tbName + " WHERE id=?";
        dataBase.transaction(function (tx) {
            for (let i = 0; i < userDataArray.length; i++) {
                // console.log(i);
                let sqlDataArray = [userDataArray[i].id];
                tx.executeSql(sql, sqlDataArray, function (tx, results) {
                    // console.log(results);
                    let resultRows = results.rows;
                    // console.log(resultRows.length);

                    //测试数据
                    // let userGrade;
                    // if("grade" in  userDataArray[i]){
                    //     userGrade=userDataArray[i].grade;
                    // }else{
                    //     userGrade="loadding";
                    // }

                    if (resultRows.length == 0) {
                        sql = 'INSERT INTO ' + tbName + " VALUES (?,?,?,?,?,?,?,?,?);";
                        // console.log(sql);
                        let sqlDataArray = [userDataArray[i].id, userDataArray[i].userNick, userDataArray[i].grade,
                            userDataArray[i].chatPoints, userDataArray[i].chatTimes, userDataArray[i].gamePoints,
                            userDataArray[i].allPoints, userDataArray[i].allTimes, userDataArray[i].date
                        ];
                        // console.log(sqlDataArray);
                        tx.executeSql(sql, sqlDataArray, function () {
                            if (i == userDataArray.length - 1) {
                                // showTipBarrageFunction(userDataArray.length + "개의 데이터 가져오기 성공");
                                showTipBarrageFunction("websql:" + userDataArray
                                    .length + packageResult.opIndexDB
                                    .inportDataFunction);
                                callBack("over");

                            }
                        });
                    } else if (resultRows.length == 1) {

                        let addAllPoint = resultRows[0].allPoints + userDataArray[i].allPoints;
                        let addAllTimes = resultRows[0].allTimes + userDataArray[i].allTimes;
                        //今天的积累
                        if (resultRows.date == userDataArray[i].date) {
                            let addChatPoint = resultRows[0].chatPoints + userDataArray[i].chatPoints;
                            let addChatTimes = resultRows[0].chatTimes + userDataArray[i].chatTimes;
                            let addGamePoints = resultRows[0].gamePoints + userDataArray[i].gamePoints;

                            // resultRows.chatPoints = resultRows.chatPoints + userDataArray[i].chatPoints;
                            // data.gamePoints = data.gamePoints + userData.gamePoints;
                            // sql = "UPDATE " + tbName +
                            //     " SET chatPoints=chatPoints+" + userDataArray[i].chatPoints + ",grade=" + userGrade +
                            //     ",gamePoints=gamePoints+" + userDataArray[i].gamePoints +
                            //     ",allPoints=allPoints+" + userDataArray[i].allPoints +
                            //     " WHERE id=?";
                            sql = "UPDATE " + tbName + " SET grade=?,chatPoints=?,chatTimes=?,gamePoints=?,allPoints=?,allTimes=? WHERE id=?";
                            sqlDataArray = [userDataArray[i].grade, addChatPoint, addChatTimes, addGamePoints, addAllPoint, addAllTimes, userDataArray[i].id];
                        } else {
                            sql = "UPDATE " + tbName + " SET allPoints=?,allTimes=? WHERE id=?";
                            sqlDataArray = [addAllPoint, addAllTimes, userDataArray[i].id];
                        }

                        // console.log(sql);
                        tx.executeSql(sql, sqlDataArray, function (tx, results) {
                            // console.log(results);
                            // console.log(results.rowsAffected);
                            if (i == userDataArray.length - 1) {
                                // showTipBarrageFunction(userDataArray.length + "개의 데이터 가져오기 성공");
                                showTipBarrageFunction("websql:" + userDataArray
                                    .length + packageResult.opIndexDB
                                    .inportDataFunction);
                                callBack("over");
                            }
                        });
                    } else {
                    }
                });

            }
        });
    }
}


opWebsql.createTable(tbName);

// var tbName = $("#szBjId").val();
// tbName = !isNaN(tbName.substr(0, 1)) ? "cpm_" + tbName : tbName;
var flushInterval;

function getData() {
    $("#myTableHead i").hide();
    $('#myModal').modal('toggle');

    if (typeof flushInterval != "undefined") {
        clearInterval(flushInterval);
    }
    //持续刷新
    changePage(pgIndex);
    flushInterval = setInterval(function () {
        // console.log(pgIndex + ":刷新");
        if ($('#myModal').css("display") != 'none') {
            // console.log(tbName);
            // opWebsql.searchData(tbName)
            !isUpdate && changePage(pgIndex);

        } else {
            // clearInterval(flushInterval);
            if (typeof flushInterval != "undefined") {
                clearInterval(flushInterval);
            }
        }
    }, 5000);


}


function todayChatPointsUp(sort, which) {
    var myData = {};
    var myT = [];
    var myTableData = $("#myTable tbody tr");
    // $("#myTable tbody tr:eq(0) th:gt(1)")[4].textContent
    for (var i = 0; i < myTableData.length; i++) {
        var myTableTr = $("#myTable tbody tr:eq(" + i + ")");


        myData = {
            id: myTableTr.children("th:eq(1)").text(),
            userNick: myTableTr.children("th:eq(2)").text(),
            chatPoints: myTableTr.children("th:eq(3)").text(),
            gamePoints: myTableTr.children("th:eq(4)").text(),
            allPoints: myTableTr.children("th:eq(5)").text(),
            date: myTableTr.children("th:eq(6)").text()
        }
        myT.push(myData);
        // for (var j = 1; j <=6; j++) {
        // 	var myTableTh=myTableTr.children("th:eq("+j+")");

        // }

    }
    // console.log(myT);


    var sortObj;

    if (sort == 'up') {
        sortObj = myT.sort(compareUp(which));
    } else if (sort == 'down') {
        sortObj = myT.sort(compareDown(which));
    }

    // console.log(sortObj);
    var i = 0;
    // $("#myTable tbody").children().empty();
    $("#myTable tbody").children().detach();
    // $("#myTable tbody").children().remove();
    for (d of sortObj) {
        i++;
        // $("#myTable tbody").append("<tr><th>" + i + "</th><th>" + d.id + "</th><th>" + d.userNick + "</th><th>" + d
        //         .chatPoints + "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints + "</th><th>" + d.date +
        //     "</th></tr>");
        $("#myTable tbody").append("<tr><th>" + i +
            "</th><th>" + d.userNick + "(" + d.id + ")</th><th>" + convertGrade(d.grade) + "</th><th>" + d.chatPoints +
            "</th><th>" + d.chatTimes + "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints +
            "</th><th>" + d.allTimes + "</th><th>" + d.date + "</th></tr>");
    }

}

var everyPage;
var everyPageValue = $("#everyPageValue");
//初始化
var ep = localStorage.getItem("everyPageValue");
if (ep == null || ep == "undefined" || ep == "") {
    everyPage = 50;
    localStorage.setItem("everyPageValue", everyPage);

} else {
    everyPage = ep;
}
everyPageValue.val(everyPage);

// everyPage = !isNaN(everyPageValue) ? parseInt(everyPageValue) : 50;

// $("#everyPageValue").focus(() => {
// 	console.log("获得焦点");
// });
everyPageValue.change(() => {
    everyPage = $("#everyPageValue").val();
    if (everyPage != "") {
        localStorage.setItem("everyPageValue", everyPage);
    } else {
        everyPage = 50;
        localStorage.setItem("everyPageValue", everyPage);
        everyPageValue.val(50);
    }
    // everyPageValue.val(everyPage);
    changePage(1);
});
// $("#everyPageValue").blur(() => {
// 	console.log("失去焦点");
// 	everyPageValue = $("#everyPageValue").val();
// 	if (Math.abs(everyPageValue) != everyPage) {
// 		everyPage = !isNaN(everyPageValue) ? parseInt(everyPageValue) : 50;
// 		changePage(1);
// 	}
// });

var srt;
var whih;
var pgIndex = 1;

function changePage(pageIndex) {
    // console.log("changePage");
    // console.log(localStorageType);
    pgIndex = pageIndex;
    $('#pageIndex').children('li').children('a').css('background', '');
    // this.style.backgroundColor ="red";
    // console.log(pageIndex);
    // console.log(srt);
    // console.log(whih);
    //清除图标
    limi = [everyPage * (pageIndex - 1), everyPage];
    // console.log(limi[0]);
    // console.log(limi[1]);
    // opWebsql.searchData(tbName, srt, whih, limi, pageIndex);

    // console.log(limi);
    // opIndexDB.searchDataLimit(pageIndex,srt,whih);
    // opIndexDB.searchData(limi

    if (localStorageType == "indexdb") {
        opIndexDB.searchDataLimit(pageIndex, srt, whih);
    } else if (localStorageType == "websql") {
        opWebsql.searchData(tbName, srt, whih, limi, pageIndex);
    }

}

function todayChatPointsSort(which) {
    updateDatapgIndex = 1;
    // <i class="icon-arrow-up"/>
    //切换类型重置页数1
    if (whih != which) {
        pgIndex = 1;
        whih = which;
    }

    var todayChatPoints = $("#" + which);
    srt = "down";
    var todayChatPointChilren = $("#" + which + ">i");
    if (todayChatPointChilren.length == 0) {
        $("#myTableHead i").hide();
        todayChatPoints.append(
            "<i class='icon-arrow-up' style='display:none'/><i class='icon-arrow-down' style='display:block' />"
        );
        if (localStorageType == "indexdb") {
            opIndexDB.searchDataLimit(1, srt, whih);
        } else if (localStorageType == "websql") {
            opWebsql.searchData(tbName, srt, which);
        }
        // opWebsql.searchData(tbName, srt, which);


        // todayChatPointsUp("up", which);
    } else {

        // &&todayChatPointChilren[1].style.display=="none"
        if (todayChatPointChilren[0].style.display == "none" && todayChatPointChilren[1].style.display == "block") {

            $("#myTableHead i").hide();
            todayChatPointChilren[0].style.display = "block";
            todayChatPointChilren[1].style.display = "none";
            // todayChatPointChilren[0].className = "icon-arrow-up";
            // todayChatPointsUp("up", which);
            srt = "up";
            if (localStorageType == "indexdb") {
                opIndexDB.searchDataLimit(1, srt, whih);
            } else if (localStorageType == "websql") {
                opWebsql.searchData(tbName, srt, which);
            }
        } else {
            $("#myTableHead i").hide();
            todayChatPointChilren[0].style.display = "none";
            todayChatPointChilren[1].style.display = "block";
            // todayChatPointChilren[0].className = "icon-arrow-down";
            // todayChatPointsUp("down", which);
            //

            if (localStorageType == "indexdb") {
                opIndexDB.searchDataLimit(1, srt, whih);
            } else if (localStorageType == "websql") {
                opWebsql.searchData(tbName, srt, which);
            }
        }
    }
}

function compareUp(property) {
    return function (obj1, obj2) {
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1 - value2; // 升序
    }
}

function compareDown(property) {
    return function (obj1, obj2) {
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value2 - value1 // 降序
    }
}

function clearTable() {
    // confirm("현재 모든 데이터를 비우시겠습니까?")
    swal({
        title: packageResult.clearTable.swal1.title,
        text: packageResult.clearTable.swal1.text[0] + "[" + tbName + "]" + packageResult.clearTable.swal1.text[
            1],
        icon: "warning",
        buttons: packageResult.clearTable.swal1.button,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            if (localStorageType == "indexdb") {
                // https://www.csdn.net/tags/MtTaMgysOTg1NDM3LWJsb2cO0O0O.html
                opIndexDB.clearTable();
            } else if (localStorageType == "websql") {
                opWebsql.clearTable();
            }
        } else {
            swal({
                title: packageResult.inportFunction.swal1.swal3.title,
                text: packageResult.inportFunction.swal1.swal3.text,
                timer: 2000,
                showConfirmButton: false
            });
        }
    });

    //刷新
    changePage(1);

}

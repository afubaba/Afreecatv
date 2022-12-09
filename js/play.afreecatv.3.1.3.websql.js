var db;
var msg;
var dbName = 'chatPointsModeDB';
var sql;

var uId;
var uNick;
var tbNm;
var data;
var aurelionSolImgURL = "https://afubaba.github.io/Afreecatv/img/lol/AurelionSol.webp";
var ace;
var sqlDataArray;
var imgSize;
var appendString;
var today = new Date($("#timeFrequencys").text()).getDate();
var showBarrageImgURL = "https://afubaba.github.io/Afreecatv/logo/400x400.jpeg";

var opWebsql = {

    getDB: function () {
        db = openDatabase(dbName, "", 'Test DB', 100 * 1024 * 1024, function (result) {
            db = result;
        });
        if (!db) {
            // console.log("数据库创建失败！");
            return;
        } else {
            // console.log("数据库创建成功！");
        }
    },
    createTable: function (tbNm) {
        this.getDB();
        db.transaction(function (tx) {
            sql = 'CREATE TABLE IF NOT EXISTS ' + tbNm +
                ' (id unique,userNick ,chatPoints,gamePoints,allPoints,date)';
            //console.log(sql);
            tx.executeSql(sql, [], function (tx, results) {
                // console.log(results.rowsAffected);
            });
        });
    },
    deleteTable: function () {
        this.getDB();
        db.transaction(function (tx) {
            var searchSql = "delete from " + tbName;
            var dataArea = [];
            tx.executeSql(searchSql, dataArea, function (tx, results) {
                // console.log('Rows affacted: ' + results.rowsAffected);
                //清空表格
                // $("#myTable tbody").children().detach();
                // opWebsql.searchData(tbName);
                showTipBarrageFunction("websql:" + results.rowsAffected + packageResult
                    .opIndexDB.deleteTable);
            }, function (tx, error) {
                // console.log('Error: ' + error.message);
                showTipBarrageFunction("삭제 실패");
            });
        });

    },
    searchData: function (tbName, sortType, which, limi, pageIndex) {
        this.getDB();
        db.transaction(function (tx) {

            if (sortType == "up") {
                // sql="SELECT * FROM " + tbName +" order by 3 desc LIMIT 1,10";
                // sql="SELECT * FROM " + tbName +" order by "+which+" desc LIMIT 1,10";
                sortType = "asc";
            } else if (sortType == "down") {
                // sql="SELECT * FROM " + tbName +" order by 3 asc LIMIT 1,10";
                // sql="SELECT * FROM " + tbName +" order by "+which+" asc LIMIT 1,10";
                sortType = "desc";

            } else {
                // sql="SELECT * FROM " + tbName +" LIMIT 1,10";
                // sql="SELECT * FROM " + tbName +" LIMIT 1,10";
                // which=
            }
            //今天
            var dateString = "";
            if (which == 'chatPoints' || which == 3) {
                dateString = " where date= " + today;
            }
            which = dateString + " order by " + which;

            var li;
            var i = 1;
            if (!limi) {
                // sql="SELECT * FROM " + tbName +which+" "+sortType+" LIMIT 0,10";
                li = "0," + everyPage;
            } else {
                // sql="SELECT * FROM " + tbName +which+" "+sortType+" LIMIT "+limi[0]+","+limi[1];
                li = limi[0] + "," + limi[1];
                i = limi[0] + 1;
            }

            if (which && sortType) {
                sql = "SELECT * FROM " + tbName + which + " " + sortType + " LIMIT " + li;
            } else {
                sql = "SELECT * FROM " + tbName + " LIMIT " + li;
            }
            // console.log(sql);

            // console.log(sql);
            tx.executeSql(sql, [], function (tx, results) {

                // console.log(results.rowsAffected);

                var data = results.rows;
                $("#myTable tbody").children().detach();
                // $("#myTable tbody").children().empty();
                // $("#myTable tbody").children().remove();
                for (d of data) {

                    $("#myTable tbody").append("<tr><th class='noWrap'>" + i + "</th><th>" + d
                            .id +
                        "</th><th>" + d.userNick + "</th><th>" + d.chatPoints +
                        "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints +
                        "</th><th>" + d.date + "</th></tr>");
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
                tx.executeSql(searchCountSql, [], function (tx, results) {

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
                        $("#pagination").show();
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
                        $("#pagination").hide();
                    }

                });

            }, null);

        });

    },
    getMaxData: function (idDom, userId) {

        this.getDB();
        db.transaction(function (tx) {
            // sql = "select id as 身份证,userNick as 昵称,max(chatPoints) as 今日最高分数,max(allPoints) as 总分数最高 from "+tbName;
            // sql = "select userNick as 닉네임,max(chatPoints) as 오늘 채팅 횟수,max(allPoints) as 총 채팅 횟수 from "+tbName;
            //console.log(sql);
            // id ,
            //今天的龙王
            // sql = "select id,userNick ,max(chatPoints) as maxChatPoint,allPoints  from " + tbName +
            // 	" where chatPoints>=5 and date='" + today + "'";
            // sql = "select id,userNick ,max(chatPoints) as maxChatPoint,allPoints  from " + tbName +
            // " where chatPoints>=? and date=?";
            sql = "select id,userNick,gamePoints ,max(chatPoints) as maxChatPoint,allPoints  from " +
                tbName +
                " where date=?";
            sqlDataArray = [today];
            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                // console.log(results.rowsAffected);
                data = results.rows[0];
                $("#todayChatPointsAce>th:eq(0)").text("용왕");
                $("#todayChatPointsAce>th:eq(1)").text(data.id);
                $("#todayChatPointsAce>th:eq(2)").text(data.userNick);
                $("#todayChatPointsAce>th:eq(3)").text(data.maxChatPoint);
                $("#todayChatPointsAce>th:eq(4)").text(data.gamePoints);
                $("#todayChatPointsAce>th:eq(5)").text(data.allPoints);
                $("#todayChatPointsAce>th:eq(6)").text(today);
                // console.log(data);
                var chatPointsMaxChangeMode = getDomById("chatPointsMaxChangeMode");

                if (!ace) {
                    ace = data.userNick;
                }
                var maxChatPoint = data.maxChatPoint;

                //五次以上提醒
                if (ace != data.userNick && maxChatPoint) {
                    // console.log("龙王变更提醒");
                    ace = data.userNick;
                    // 용왕이가 AA가 됐어요.
                    let mess = "[" + ace + "]가 용왕이 됐어요.";
                    let logString = packageResult.getTodayMaxSortData.TodayMaxSortDataInterval[0] + ace + packageResult.getTodayMaxSortData.TodayMaxSortDataInterval[1];
                    //不包含自身
                    var loginId = localStorage.getItem("loginId");
                    if (!data.id.includes(loginId) && chatPointsMaxChangeMode.checked) {
                        logString = logString + packageResult.getTodayMaxSortData.TodayMaxSortDataInterval[2] + data.allPoints
                        mess = mess + "오늘 채팅 횟수:" + data.allPoints;
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
        this.getDB();
        today = new Date($("#timeFrequencys").text()).getDate();
        db.transaction(function (tx) {
            // sql = "select id as 身份证,userNick as 昵称,max(chatPoints) as 今日最高分数,max(allPoints) as 总分数最高 from "+tbName;
            // sql = "select userNick as 닉네임,max(chatPoints) as 오늘 채팅 횟수,max(allPoints) as 총 채팅 횟수 from "+tbName;
            //console.log(sql);
            // id ,
            if (serachType != "allPoints") {
                sqlDataArray = [today];
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
                callback(data);

            }, null);

        });
    },
    searchDataByUserId: function (tex) {

        var searchUserData = userData;
        // searchUserData.id
        var dataString = "@" + searchUserData.userNick;
        this.getDB();
        db.transaction(function (tx) {
            // sql = "SELECT * FROM " + tbName + " WHERE id = ?;";
            //console.log(sql);
            var data;
            sqlDataArray = [searchUserData.userId];
            if (tex == "!채팅통계조회") {
                sql = "select * from " + tbName + " where id=?";
                tx.executeSql(sql, sqlDataArray, function (tx, results) {
                    data = results.rows[0];
                    // queryReply(tex, searchUserData, data);
                    // console.log(data);
                    dataString = dataString + ":오늘 채팅:" + data.chatPoints + ",오늘 게임:" +
                        data.gamePoints + ",누적 총:" + data.allPoints;
                    // console.log(dataString);
                    sendMessageCustom(dataString, 1, 4);
                }, null);
            } else {
                if (tex == "!총포인트") {
                    sql = "SELECT s.*,(select count(distinct(allPoints)) from " + tbName +
                        " where allPoints >= s.allPoints ) as 'Rank',(select count(1) from " + tbName +
                        " ) as 'count' FROM " + tbName + " as s where s.id=? order by allPoints desc ";
                    dataString = dataString + ":누적 총 포인트:";
                } else if (tex == "!채팅포인트") {
                    dataString = dataString + ":오늘 채팅 포인트:";
                    sql = "SELECT s.*,(select count(distinct(chatPoints)) from " + tbName +
                        " where chatPoints >= s.chatPoints ) as 'Rank',(select count(1) from " +
                        tbName +
                        " ) as 'count' FROM " + tbName + " as s where s.id=? order by chatPoints desc ";
                } else if (tex == "!게임포인트") {
                    dataString = dataString + ":오늘 게임 포인트:";
                    sql = "SELECT s.*,(select count(distinct(gamePoints)) from " + tbName +
                        " where gamePoints >= s.gamePoints ) as 'Rank',(select count(1) from " +
                        tbName +
                        " ) as 'count' FROM " + tbName + " as s where s.id=? order by gamePoints desc ";
                }
                // console.log(searchUserData);

                tx.executeSql(sql, sqlDataArray, function (tx, results) {
                    data = results.rows[0];
                    // queryReply(tex, searchUserData, data);
                    // console.log(data);
                    dataString = dataString + data.allPoints + ",순위:" +
                        data.Rank + "/" + data.count;
                    // console.log(dataString);
                    sendMessageCustom(dataString, 1, 4);
                }, null);
            }


        });

    },
    insertData: function (userData, idDom) {

        today = new Date($("#timeFrequencys").text()).getDate();
        var allTbName = "chatPointsMode";
        uId = userData.userId;
        uNick = userData.userNick;
        tbNm = userData.tbName;
        this.getDB();
        db.transaction(function (tx) {

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
            sql = "SELECT date FROM " + tbNm + " WHERE id=?";
            sqlDataArray = [uId];
            // console.log(sqlDataArray);
            // db.transaction(function(tx) {});
            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                // console.log(results);
                var resultRows = results.rows;
                // console.log(resultRows.length);
                if (resultRows.length == 1) {
                    // console.log("update");
                    let resultData = resultRows[0];
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
                    let resultDate = parseInt(resultData.date);

                    if (today == resultDate) {
                        // sql = "UPDATE " + tbNm + " SET chatPoints=" +
                        // 	upChatPoints + ",userNick='" + uNick + "',allPoints=" +
                        // 	upAllPoints +
                        // 	" WHERE id='" + uId + "';";
                        if (resultData.userNick == uNick) {
                            sqlDataArray = [uId];
                            sql = "UPDATE " + tbNm +
                                " SET chatPoints=chatPoints+1,allPoints=allPoints+1,date=" +
                                today + " WHERE id=?";
                        } else {
                            sqlDataArray = [uNick, uId];
                            sql = "UPDATE " + tbNm +
                                " SET chatPoints=chatPoints+1,userNick=?,allPoints=allPoints+1,date=" +
                                today + " WHERE id=?";
                        }
                        // console.log(sql);
                        tx.executeSql(sql, sqlDataArray, function (tx, results) {
                            // console.log(results);
                            // console.log(results.rowsAffected);

                        });

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
                    } else if (resultDate != today) {
                        // console.log("今日积分清零");

                        sql = "UPDATE " + tbNm + " SET chatPoints=1,date= " + today +
                            " WHERE id='" + uId + "';";
                        // console.log(sql);
                        tx.executeSql(sql, [], function (tx, results) {
                            // console.log(results);
                            // console.log(results.rowsAffected);

                            // showTipBarrageFunction(
                            //     "<div class='alert alert-block disableSelection'><h1>" +
                            //     uNick +
                            //     ",오늘 포인트 제로!</h1><hr><img class='showBarrageImg'  src='" +
                            //     sessionStorage.getItem(
                            //         "showBarrageImage") +
                            //     "'/></div>"
                            // );
                            showTipBarrageFunction(
                                uNick + packageResult.opIndexDB.insertData
                            );
                        });
                    } else {
                        console.log("errors");
                    }

                    // });
                } else if (resultRows.length == 0) {
                    // console.log("insert");
                    // sql = 'INSERT INTO ' + tbNm +
                    // 	"(id, userNick,chatPoints,gamePoints,allPoints) VALUES ('" + uId +
                    // 	"','" + uNick + "',1,1,2,'" + today + "');";
                    // sql = 'INSERT INTO ' + tbNm + " VALUES ('" + uId +
                    // 	"','" + uNick + "',1,0,1,'" + today + "');";
                    sql = 'INSERT INTO ' + tbNm + " VALUES (?,?,1,0,1,?);";
                    // console.log(sql);
                    sqlDataArray = [uId, uNick, today];
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
    updateData: function (diceData, callback) {
        this.getDB();
        today = new Date($("#timeFrequencys").text()).getDate();
        // var tbName = "cpm_1004suna";
        // var diceData = {
        //     "userId": "space8100",
        //     "userNick": "↙↙",
        //     "userAdd": 2,
        //     "makerId": "12354",
        //     "makerNick": "두기_=",
        //     "makerAdd": -2
        // };
        var sqlDataArray = [diceData.userId];
        // var callData = new Array();
        db.transaction(function (tx) {
            var sql = "UPDATE " + tbName + " SET gamePoints=gamePoints+" + diceData.userAdd +
                ",allPoints=allPoints+" + diceData.userAdd + " WHERE id=?";
            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                if (results.rowsAffected > 0) {
                    sqlDataArray = [diceData.makerId];
                    sql = "SELECT 1 FROM " + tbName + " WHERE id=?";
                    tx.executeSql(sql, sqlDataArray, function (tx, results) {
                        if (results.rows.length == 0) {
                            // console.log("不存在");
                            sqlDataArray = [diceData.makerId, diceData.makerNick,
                                diceData.makerAdd, diceData.makerAdd, today
                            ];
                            sql = "INSERT INTO " + tbName +
                                " (id,userNick,chatPoints,gamePoints,allPoints,date) VALUES (?,?, 0, ?,?,? )";
                            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                                //查询插入后的数据
                                sqlDataArray = [diceData.userId, diceData
                                    .makerId
                                ]
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
                            //日期更新today
                            if (results.rows[0].date == today) {
                                sql = "UPDATE " + tbName + " SET gamePoints=gamePoints+" +
                                    diceData.makerAdd + ",allPoints=allPoints+" + diceData
                                        .makerAdd + " WHERE id=?";
                            } else {
                                //日期更新,重置聊天点，游戏点
                                sql = "UPDATE " + tbName + " SET chatPoints=0,gamePoints=" +
                                    diceData.makerAdd + ",allPoints=allPoints+" + diceData
                                        .makerAdd + ",date = " + today + " WHERE id=?";
                            }
                            tx.executeSql(sql, sqlDataArray, function (tx, results) {
                                //查询更新后的数据
                                sqlDataArray = [diceData.userId, diceData
                                    .makerId
                                ]
                                sql = "select * from " + tbName +
                                    " WHERE id=? or id=?";
                                // console.log(sql);
                                tx.executeSql(sql, sqlDataArray, function (tx,
                                                                           results) {

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
        this.getDB();
        db.transaction(function (tx) {
            sql = "SELECT * FROM " + tbName;
            tx.executeSql(sql, [], function (tx, results) {
                var data = results.rows;
                callback(Object.values(data));
            });
        });
    },
    inportDataFunction: function (userDataArray, callBack) {
        today = new Date($("#timeFrequencys").text()).getDate();
        let sql = "SELECT * FROM " + tbName + " WHERE id=?";
        this.getDB();
        db.transaction(function (tx) {
            for (let i = 0; i < userDataArray.length; i++) {
                // console.log(i);
                let sqlDataArray = [userDataArray[i].id];
                tx.executeSql(sql, sqlDataArray, function (tx, results) {
                    // console.log(results);
                    let resultRows = results.rows;
                    // console.log(resultRows.length);
                    if (resultRows.length == 0) {
                        sql = 'INSERT INTO ' + tbName + " VALUES (?,?,?,?,?,?);";
                        // console.log(sql);
                        let sqlDataArray = [userDataArray[i].id, userDataArray[i].userNick,
                            userDataArray[i].chatPoints, userDataArray[i].gamePoints,
                            userDataArray[i].allPoints, userDataArray[i].date
                        ];
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
                        if (resultRows.date == today && userDataArray[i].date == today) {
                            // resultRows.chatPoints = resultRows.chatPoints + userDataArray[i].chatPoints;
                            // data.gamePoints = data.gamePoints + userData.gamePoints;
                            sql = "UPDATE " + tbName +
                                " SET chatPoints=chatPoints+" + userDataArray[i].chatPoints +
                                ",gamePoints=gamePoints+" + userDataArray[i].gamePoints +
                                ",allPoints=allPoints+" + userDataArray[i].allPoints +
                                " WHERE id=?";
                        } else {
                            sql = "UPDATE " + tbName +
                                " SET allPoints=allPoints+" + userDataArray[i].allPoints +
                                " WHERE id=?";
                        }
                        let sqlDataArray = [userDataArray[i].id]
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
        $("#myTable tbody").append("<tr><th>" + i + "</th><th>" + d.id + "</th><th>" + d.userNick + "</th><th>" + d
                .chatPoints + "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints + "</th><th>" + d.date +
            "</th></tr>");
    }

}

var everyPage;
var everyPageValue = $("#everyPageValue");
//初始化
var ep = localStorage.getItem("everyPageValue");
if (ep == null || ep == "undefined") {
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
    ;
    localStorage.setItem("everyPageValue", everyPage)
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
    // opIndexDB.searchData(limi);
    if (localStorageType == "indexdb") {
        opIndexDB.searchDataLimit(pageIndex, srt, whih);
    } else if (localStorageType == "websql") {
        opWebsql.searchData(tbName, srt, whih, limi, pageIndex);
    }

}

function todayChatPointsSort(which) {
    pgIndex = 1;
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
                opIndexDB.deleteTable();
            } else if (localStorageType == "websql") {
                opWebsql.deleteTable();
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

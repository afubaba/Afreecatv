var mysqlHost = "http://localhost:8888/chat_points/";
var opMysql = {
    createTable: function () {
        // http://localhost:8888/chat_points/TestServlet?tbname=abc

        let putData = {"tbname": tbName}

        // ajaxGet("http://192.168.1.2:8888/chat_points/TestServlet",putData);
        ajaxGet(mysqlHost + "TestServlet", putData, function (data) {

        });
    },
    deleteTable: function () {

        ajaxGet(mysqlHost + "DeleteTableServlet", {tableName: tbName}, function (data) {

        })
        return;
        dataBase.transaction(function (tx) {
            // let searchSql = "delete from " + tbName;
            let deleteSql = "  " + tbName;
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

        ajaxGet(mysqlHost + "ClearTableDataServlet", {tableName: tbName}, function (data) {

        })

        return;
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
        // console.log(tbName + "===" + sortType + "===" + which + "===" + limi + "===" + pageIndex);
        let tableSortType;
        if (sortType == "up") {
            tableSortType = "asc";
        } else if (sortType == "down") {
            tableSortType = "desc";
        }
        let sdblData = {
            "tableName": tbName,
            "startIndex": everyPage * (pageIndex - 1),
            "endIndex": everyPage
        }
        let index = (pageIndex - 1) * everyPage + 1;
        if (which || sortType) {
            sdblData.tableSortType = tableSortType;
            sdblData.whitch = which;
            sdblData.today = todayDate;
            // console.log("根据条件分页");

            ajaxGet(mysqlHost + "SearchDataSortLimitServlet", sdblData, function (result) {
                // console.log(result);
                $("#myTable tbody").children().detach();
                for (rs of result.listOutputUser) {
                    $("#myTable tbody").append("<tr><th>" + index +
                        "</th><th>" + rs.userNick + "(" + rs.id + ")</th><th>" + convertGrade(rs.grade) + "</th><th>" + rs.chatPoints +
                        "</th><th>" + rs.chatTimes + "</th><th>" + rs.gamePoints + "</th><th>" + rs.allPoints +
                        "</th><th>" + rs.allTimes + "</th><th>" + rs.date + "</th></tr>");
                    index++;
                }
                showEveryPageIndex(result.quantity, pageIndex);
                // for (rs of result) {
                //     $("#myTable tbody").append("<tr><th>" + index +
                //         "</th><th>" + rs.userNick + "(" + rs.id + ")</th><th>" + convertGrade(rs.grade) + "</th><th>" + rs.chatPoints +
                //         "</th><th>" + rs.chatTimes + "</th><th>" + rs.gamePoints + "</th><th>" + rs.allPoints +
                //         "</th><th>" + rs.allTimes + "</th><th>" + (rs.date.year - 100) + "/" + (rs.date.month + 1) + "/" + rs.date.date + "</th></tr>");
                //     index++;
                // }
            });

        } else {
            // console.log("默认查询");

            ajaxGet(mysqlHost + "SearchDataLimitServlet", sdblData, function (result) {
                // console.log(result);
                $("#myTable tbody").children().detach();

                for (rs of result.listOutputUser) {
                    $("#myTable tbody").append("<tr><th>" + index +
                        "</th><th>" + rs.userNick + "(" + rs.id + ")</th><th>" + convertGrade(rs.grade) + "</th><th>" + rs.chatPoints +
                        "</th><th>" + rs.chatTimes + "</th><th>" + rs.gamePoints + "</th><th>" + rs.allPoints +
                        "</th><th>" + rs.allTimes + "</th><th>" + rs.date + "</th></tr>");
                    index++;
                }
                showEveryPageIndex(result.quantity, pageIndex);
                // for (rs of result) {
                //     $("#myTable tbody").append("<tr><th>" + index +
                //         "</th><th>" + rs.userNick + "(" + rs.id + ")</th><th>" + convertGrade(rs.grade) + "</th><th>" + rs.chatPoints +
                //         "</th><th>" + rs.chatTimes + "</th><th>" + rs.gamePoints + "</th><th>" + rs.allPoints +
                //         "</th><th>" + rs.allTimes + "</th><th>" + (rs.date.year - 100) + "/" + (rs.date.month + 1) + "/" + rs.date.date + "</th></tr>");
                //     index++;
                // }
                // for (rs of result) {
                //     $("#myTable tbody").append("<tr><th>" + i +
                //         "</th><th>" + rs.userNick + "(" + rs.id + ")</th><th>" + convertGrade(rs.grade) + "</th><th>" + rs.chatPoints +
                //         "</th><th>" + rs.chatTimes + "</th><th>" + rs.gamePoints + "</th><th>" + rs.allPoints +
                //         "</th><th>" + rs.allTimes + "</th><th>" + (rs.date.year-100)+"/"+(rs.date.month+1)+"/"+date+ "</th></tr>");
                //     i++;
                // }
            });
        }

        // let searchallDataCountCondition={
        //     "table_name":tbName,
        //     "whitch":which,
        //     "today":todayDate
        // }
        // // console.log(searchallDataCountCondition);
        // ajaxGet(mysqlHost+"SearchAllDataCountServlet", searchallDataCountCondition, function (result) {
        //     // console.log(result);
        //     // 页数下标显示
        //     showEveryPageIndex(result, pageIndex);
        // });

        // console.log(everyPage * (pageIndex - 1) + "===" + everyPage);
        //测试数据


        return;

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

        $("#myTable tbody").children().detach();

        for (d of data) {
            $("#myTable tbody").append("<tr><th>" + i +
                "</th><th>" + d.userNick + "(" + d.id + ")</th><th>" + convertGrade(d.grade) + "</th><th>" + d.chatPoints +
                "</th><th>" + d.chatTimes + "</th><th>" + d.gamePoints + "</th><th>" + d.allPoints +
                "</th><th>" + d.allTimes + "</th><th>" + d.date + "</th></tr>");
            i++;
        }
        // console.log(data);
        var searchCountSql = "SELECT count(1) as allCount from " + tbName + dateString;
        // console.log(searchCountSql);
        tx.executeSql(searchCountSql, sqlDataArray, function (tx, results) {
            // 页数下标显示
            showEveryPageIndex(results.rows[0].allCount, pageIndex);

        });


    },
    getMaxData: function (callback) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        let todaySortCondition = {
            "table_name": tbName,
            // "searchType": "chatPoints",
            "today": todayDate
        }
        ajaxGet(mysqlHost + "SearchTodayMaxSortDataServlet", todaySortCondition, function (data) {

            callback(data);
        });

    },
    searchMaxData: function (serachType, callback) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        let maxSortCondition = {
            "table_name": tbName,
            "searchType": serachType,
            "today": todayDate
        }
        ajaxGet(mysqlHost + "SearchTodayMaxSortDataServlet", maxSortCondition, function (data) {
            callback(data);
        });
        return;
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
                // "닉네임:"
                // var dataString = "@" + data.userNick + ",오늘 채팅 횟수:" + data
                // 	.maxChatPoint +
                // 	",총 채팅 횟수:" + data.allPoints;
                data.resArrLength = data.count;
                callback(data);

            }, null);

        });
    },
    searchDataByUserId: function (searchData) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        let searchUserData = userData;

        // console.log("searchUserData",searchUserData);
        // console.log("searchData",searchData);
        // searchUserData.id
        var dataString = "@" + searchUserData.userNick;

        // sql = "SELECT * FROM " + tbName + " WHERE id = ?;";
        //console.log(sql);
        var data;
        let searchRankDataCondition = {
            "tableName":tbName,
            "id": searchUserData.id,
                // "searchType": searchType,
                // "today": todayDate
            }
            if (searchData.tex == "!채팅통계" || searchData.tex == "!채팅통계조회") {
                ajaxGet(mysqlHost + "SearchDataServlet", searchRankDataCondition, function (dataResult) {
                    // console.log("服务返回数据",dataResult);

                    dataString = dataString + ":채팅 횟수:" + dataResult.chatTimes + ",채팅 포인트:" + dataResult.chatPoints + ",게임 포인트:" +
                    dataResult.gamePoints + ",총 횟수:" + dataResult.allTimes + ",총 포인트:" + dataResult.allPoints;

                    // console.log(dataString);
                //发送信息
                sendMessageCustom(dataString, 1, 4);
            });
                return;
                sql = "select * from " + tbName + " where id=?";
            // queryReply(tex, searchUserData, data);

        } else {
            let searchType="";
            if (searchData.tex == "!총포인트") {
                sql = "select id,userNick,allPoints,(select count(1) from " + tbName +
                ") as 'count' from " + tbName + " order by allPoints desc";

                dataString = dataString + ":누적 총 채팅 포인트:";
                searchType="allPoints";
            } else if (searchData.tex == "!총횟수") {
                sql = "select id,userNick,allTimes,(select count(1) from " + tbName +
                ") as 'count' from " + tbName + " order by allTimes desc";

                dataString = dataString + ":누적 총 채팅 횟수:";
                searchType="allTimes";
            } else if (searchData.tex == "!채팅포인트") {
                dataString = dataString + ":오늘 채팅 포인트:";
                sql = "select id,userNick,chatPoints,(select count(1) from " + tbName + " where date=?) as 'count' from " + tbName + " where date=? order by chatPoints desc";
                searchType="chatPoints";
            } else if (searchData.tex == "!채팅횟수") {
                dataString = dataString + ":오늘 채팅 횟수:";
                sql = "select id,userNick,chatTimes,(select count(1) from " + tbName +
                " where date=?) as 'count' from " + tbName + " where date=? order by chatTimes desc";
                searchType="chatTimes";
            } else if (searchData.tex == "!게임포인트") {
                dataString = dataString + ":오늘 게임 포인트:";
                sql = "select id,userNick,gamePoints,(select count(1) from " + tbName +
                " where date=?) as 'count' from " + tbName + " where date=? order by gamePoints desc";
                searchType="gamePoints";
            }
            searchRankDataCondition.searchType=searchType;
            searchRankDataCondition.today= todayDate;
            ajaxGet(mysqlHost + "SearchRankDataServlet", searchRankDataCondition, function (dataResult) {
                // console.log("排名服务返回数据",dataResult);
                dataString = dataString + dataResult.userData[searchType] + ",순위:" +dataResult.userData["rank"]+"/"+dataResult["quantity"];
                // console.log(dataString);
                sendMessageCustom(dataString, 1, 4);
            });

            return;
            for (var i = 0; i < data.length; i++) {
                var dataResult = data.item(i);
                if (dataResult.id == searchUserData.userId) {

                    if (searchData.tex == "!총포인트") {
                        dataString = dataString + dataResult.allPoints + ",순위:" +
                        (i + 1) + "/" + dataResult.count;
                    } else if (searchData.tex == "!총횟수") {
                        dataString = dataString + dataResult.allTimes + ",순위:" +
                        (i + 1) + "/" + dataResult.count;
                    } else if (searchData.tex == "!채팅포인트") {
                        dataString = dataString + dataResult.chatPoints + ",순위:" +
                        (i + 1) + "/" + dataResult.count;
                    } else if (searchData.tex == "!채팅횟수") {
                        dataString = dataString + dataResult.chatTimes + ",순위:" +
                        (i + 1) + "/" + dataResult.count;
                    } else if (searchData.tex == "!게임포인트") {
                        dataString = dataString + dataResult.gamePoints + ",순위:" +
                        (i + 1) + "/" + dataResult.count;
                    }
                    sendMessageCustom(dataString, 1, 4);
                    break;
                }
            }
        }
    },
    insertData: function (userData) {
        let todayDate = $("#timeFrequencys").text().substring(0, $("#timeFrequencys").text().indexOf("\t"));
        userData.tbName = tbName;
        userData.date = todayDate;
        userData.isResetTotalPointsEveryMonth = $("#resetTotalPointsEveryMonth").prop("checked");
        // console.log(userData);
        
        $.post(mysqlHost + "InsertDataServlet", userData, function (data, status,xhr) {
            // console.log(status); 
            // console.log(xhr);
            if($("#mysql").parent().css("background-color")!="green"){
                $("#mysql").parent().css("background-color","green");

                // $("#websql").parent().css("background-color","");
                // $("#mysql").prop("checked",true); 
                localStorageType="mysql";
                //导入其他数据库
                loadDatabase(localStorageType);
                $("#indexDB").parent().css("background-color","");
            }
            
        }).fail(function (xhr, status, info) {
            // console.log("---------------服务器连接失败-------------------");
            // console.log(userData);
            // $("#mysql").parent().removeClass("label-success").addClass("label-success");
            if($("#mysql").parent().css("background-color")!="red"){
                $("#mysql").parent().css("background-color","red");

                // $("#websql").parent().css("background-color","green");
                // $("#indexDB").prop("checked",true);
                localStorageType="indexdb";
                $("#indexDB").parent().css("background-color","green");

            }
            // opWebsql.insertData(userData);
            opIndexDB.insertData(userData);
            // console.log("---------------服务器连接失败-------------------");
            　　  　 
        });

    },
    addData: function (userData) {

        let addDataCondition = userData;
        addDataCondition.tableName=tbName;
        ajaxGet(mysqlHost + "CustAddDataServlet", addDataCondition, function (data) {
            // console.log(data);
        });
        return;
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

        diceData.today=todayDate;
        diceData.tableName=tbName;
        ajaxGet(mysqlHost + "UpdateDiceDataServlet", diceData, function (data) {

         callback(data);
     });

        return;
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
        ajaxGet(mysqlHost + "ExportAllDataServlet", {tableName: tbName}, function (data) {
            // console.log(data);
            callback(data);
        });
    },
    inportDataFunction: function (userDataArray, callBack) {

        let ajaxPostData = {"tableName": tbName, "userList": JSON.stringify(userDataArray)};
        ajaxPost(mysqlHost + "InportAllDataServlet", ajaxPostData, function (result) {
            callBack(result);
        });

        return;
        // var  formData=new FormData();
        // formData.append("tbName", tbName);
        // formData.append("userList",JSON.stringify(userDataArray));
        // ajaxPostFormData(mysqlHost+"InportAllDataServlet", formData,function(inportData){
        //         console.log(inportData);
        // }) 

        // JSON.stringify();
        // ajaxGet(mysqlHost+"InportAllDataServlet", {tableName:tbName},function(data){
        //   console.log(data);
        // })
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
opMysql.createTable();
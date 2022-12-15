// console.log("play.afreecatv.setting.indexdb.js"); 
var requestSetting;
var dbSetting;
var dbSettingName = 'chatPointsModeDBSetting';
var tbSetting = "myDivSetting";
var opSettingIndexDB = {
    createTable: function () {
        requestSetting = indexedDB.open(dbSettingName);
        // req.onblocked=function(){
        // 	alert("关闭其他窗口");
        // }

        requestSetting.onupgradeneeded = function (e) {
            // console.log("create Tbale创建成功");
            // console.log('onupgradeneeded');

            dbSetting = requestSetting.result;
            // var store = db.createObjectStore("student", {autoIncrement: true}); 使用自增键
            // 创建表
            if (!dbSetting.objectStoreNames.contains(tbSetting)) {

                var store = dbSetting.createObjectStore(tbSetting, {
                    keyPath: 'id'
                });
                // 设置id为主键
                store.createIndex(tbSetting + '_id_unqiue', 'id', {
                    unique: true
                });
            }

        }
        return requestSetting;
    },
    insertData: function (settData, type) {
        // console.log("insertData");
        isUpdate = true;
        requestSetting = opSettingIndexDB.createTable();
        requestSetting.onsuccess = function (e) {
            dbSetting = requestSetting.result;
            // console.log(dbSetting);
            // console.log(dbSetting.version);
            let transaction = dbSetting.transaction([tbSetting], 'readwrite');
            transaction.onsuccess = function (event) {
                // console.log('[Transaction] 好了!');
            };
            transaction.onerror = function (event) {
                // console.log('[Transaction] 失败!');
            };
            //读取表名
            let userDataStore = transaction.objectStore(tbSetting);

            userDataStore.get(settData.id).onsuccess = function (event) {
                // console.log("id为" + id + "的配置是", event.target.result);
                // seData(event.target.result);

                let data = event.target.result;
                // console.log(data);
                if (!data) {
                    //修改
                    userDataStore.put(settData).onsuccess = function () {
                        // console.log("存入设置成功");
                        isUpdate = false;
                        dbSetting.close();
                    }
                } else {
                    if (type == "upload") {
                        // console.log("upload");
                        // console.log("-------start--------");
                        // console.log(settData);

                        // console.log("-------over--------");

                        // id
                        let setArr = ["chatPointsMaxChangeMode", "isSingleIncreaseMaxinum", "chatPointsMode", "chatSportMode", "delayInputId", "isBarrage", "isHalfHourPrompt", "isResetTotalPointsEveryMonth", "isStart", "pictureIntetgralMode", "robotChatCommondCheckboxId"];
                        for (let i = 0; i < setArr.length; i++) {
                            if (setArr[i] in settData) {
                                data[setArr[i]] = settData[setArr[i]];
                            }
                        }
                        userDataStore.put(data).onsuccess = function () {
                            // console.log("upload成功");
                            showTipBarrageFunction(
                                packageResult.opSettingIndexDB.insertData.update
                            );
                            // dbSetting.close();
                            isUpdate = false;
                        }
                    } else if (type == "download") {
                        // console.log("download");
                        // console.log(data);
                        robotChatCommondCheckboxId.checked = data.robotChatCommondCheckboxId;
                        chatSportMode.checked = data.chatSportMode;
                        isSingleIncreaseMaxinum.checked = data.isSingleIncreaseMaxinum;
                        if (data.isSingleIncreaseMaxinum) {
                            $(isSingleIncreaseMaxinum).parent("label").addClass("label-success");
                            $singleIncreaseMaxinumValue.css("visibility", "visible");
                        } else {
                            $(isSingleIncreaseMaxinum).parent("label").removeClass("label-success");
                            $singleIncreaseMaxinumValue.css("visibility", "hidden");
                        }

                        pictureIntetgralMode.checked = data.pictureIntetgralMode;
                        chatPointsMode.checked = data.chatPointsMode;

                        chatPointsMaxChangeMode.checked = data.chatPointsMaxChangeMode;

                        let domArray = [robotChatCommondCheckboxId, chatSportMode, pictureIntetgralMode,
                            chatPointsMode, chatPointsMaxChangeMode
                        ];
                        getLabelStatus(domArray);
                        delayInputId.value = data.delayInputId;

                        // $("#detailedMenu").click();
                        // $('#timeButtonId').click();
                        // $('#timeDivId').collapse("show");

                        //默认开启时间
                        timeButtonFunction();
                        let $halfHourPrompt = $("#halfHourPrompt");
                        $halfHourPrompt.prop("checked", data.isHalfHourPrompt);
                        if ($halfHourPrompt.prop("checked")) {
                            $("#halfHourPromptLabel").addClass("label-warning");
                        } else {
                            $("#halfHourPromptLabel").removeClass("label-warning");
                        }

                        // if (data.isHalfHourPrompt) {
                        //
                        //     $halfHourPrompt.click();
                        // }
                        // setTimeout(function(){
                        // 	$("#basicMenu").click();
                        // },5000);

                        // isAutoTimeStart.checked=data.isAutoTimeStart;

                        //同步运行触发修改速度函数
                        changeSpeed();
                        // setTimeout(function(){},5000);

                        if (data.isStart) {
                            // getDomById('retrievalButtonId').click();
                            setTimeout(function () {
                                retrievalButtonFunction();
                            }, 2000);
                        } else {
                            stopRetrievalMessageFunction();
                            // getDomById('stopRetrievalMessage').click();
                        }
                        //弹慕同步
                        if (data.isBarrage) {
                            // console.log("默认打开但慕")
                            $('#barrageButtonId').attr('data-isBarrage', "open");

                            $('#barrageButtonId').css('background-color', 'green').css('font-size',
                                'large').css('color', 'yellow');

                        } else {
                            // console.log("默认关闭但慕")
                            $('#barrageButtonId').attr('data-isBarrage', "close");
                            $('#barrageButtonId').css('background-color', '#808080').css('font-size',
                                'unset').css('color', 'white');

                        }
                        showTipBarrageFunction(
                            packageResult.opSettingIndexDB.insertData.download
                        );

                        if (data.isResetTotalPointsEveryMonth) {
                            resetTotalPointsEveryMonth.checked = true;
                            $("#resetTotalPointsEveryMonth").parent().addClass("label-success");
                        }

                        dbSetting.close();
                        isUpdate = false;
                    }
                    // console.log("已经存在");
                }
            }
        }
        requestSetting.onerror = function () {
            console.log("requestSetting错误");
        }
    },
    updateSettingData: function () {
        // console.log("updateSettingData");
        isUpdate = true;
        requestSetting = opSettingIndexDB.createTable();
        requestSetting.onsuccess = function (e) {
            dbSetting = requestSetting.result;
            // console.log(dbSetting);
            // console.log(dbSetting.version);
            var transaction = dbSetting.transaction([tbSetting], 'readwrite');
            transaction.onsuccess = function (event) {
                console.log('[Transaction] 好了!');
            };
            transaction.onerror = function (event) {
                console.log('[Transaction] 失败!');
            };
            //读取表名
            var userDataStore = transaction.objectStore(tbSetting);
            userDataStore.get(settData.id).onsuccess = function (event) {

            }
        }
        requestSetting.onerror = function () {
            // console.log("updateSettingData错误");
        }

    },
    writeCommandAuthorityStatus: function (type, whichState) {
        // console.log("updateSettingData");

        // isUpdate = true;

        requestSetting = opSettingIndexDB.createTable();
        requestSetting.onsuccess = function (e) {
            dbSetting = requestSetting.result;
            // console.log(dbSetting);
            // console.log(dbSetting.version);
            var transaction = dbSetting.transaction([tbSetting], 'readwrite');
            transaction.onsuccess = function (event) {
                console.log('[Transaction] 好了!');
            };
            transaction.onerror = function (event) {
                console.log('[Transaction] 失败!');
            };
            //读取表名
            var userDataStore1 = transaction.objectStore(tbSetting);
            // console.log(userDataStore1);
            // console.log(commandAuthorityStatusData);
            let commandAuthorityStatusDataInit = commandAuthorityStatusData.id;

            // linkIndex
            for (let i = 1; i <= object.size; i++) {

                let defaultCommandAuthorityStatusData = {
                    id: "commandAuthorityStatus",
                    isStart: commandAuthorityStatusData.isStart,
                    isBjStart: commandAuthorityStatusData.isBjStart,
                    isLoginUserStart: commandAuthorityStatusData.isLoginUserStart,
                    isManageStart: commandAuthorityStatusData.isManageStart,
                    isTopfanStart: commandAuthorityStatusData.isTopfanStart,
                    isSupporterStart: commandAuthorityStatusData.isSupporterStart,
                    isSubscriptionStart: commandAuthorityStatusData.isSubscriptionStart,
                    isFanStart: commandAuthorityStatusData.isFanStart,
                    isNormalStart: commandAuthorityStatusData.isNormalStart
                }

                defaultCommandAuthorityStatusData.id = defaultCommandAuthorityStatusData.id + i;
                // console.log(i);

                userDataStore1.get(defaultCommandAuthorityStatusData.id).onsuccess = function (event) {
                    let data = event.target.result
                    if (!data) {
                        //添加
                        // console.log(defaultCommandAuthorityStatusData);
                        // console.log("add");
                        userDataStore1.add(defaultCommandAuthorityStatusData).onsuccess = function (
                            event) {
                            // console.log(event.target.result);
                            //开关状态写入
                            $("input[name='isStart']")[i - 1].checked = false;
                            //总开关状态跟随
                            if (i == object.size) {
                                openAllStatus();
                            }
                        }
                    } else {
                        //存在 同步

                        // console.log(data);
                        if (type == "download") {

                            if (whichState == "switchState") {
                                if (data.isStart) {
                                    $("input[name='isStart']")[i - 1].checked = true;
                                } else {
                                    $("input[name='isStart']")[i - 1].checked = false;
                                }
                                //总开关状态跟随
                                if (i == object.size) {
                                    openAllStatus();
                                }
                            } else if (whichState == "authorityState") {
                                //下载状态
                                let checkedCount = 0;

                                if (data.isLoginUserStart) {
                                    $("#commandAuthorityManagementCustomSelect" + i).val("loginUser");
                                    checkedCount++;
                                }
                                if (data.isBjStart) {
                                    $("#commandAuthorityManagementCustomSelect" + i).val("bj");
                                    checkedCount++;
                                }
                                if (data.isManageStart) {
                                    $("#commandAuthorityManagementCustomSelect" + i).val("manager");
                                    checkedCount++;
                                }
                                if (data.isTopfanStart) {
                                    $("#commandAuthorityManagementCustomSelect" + i).val("hot");
                                    checkedCount++;
                                }
                                if (data.isSubscriptionStart) {
                                    $("#commandAuthorityManagementCustomSelect" + i).val(
                                        "subscription");
                                    checkedCount++;
                                }
                                if (data.isSupporterStart) {
                                    $("#commandAuthorityManagementCustomSelect" + i).val("supporter");
                                    checkedCount++;
                                }
                                if (data.isFanStart) {
                                    $("#commandAuthorityManagementCustomSelect" + i).val("fan");
                                    checkedCount++;
                                }
                                if (data.isNormalStart) {
                                    $("#commandAuthorityManagementCustomSelect" + i).val("normal");
                                    checkedCount++;
                                }
                                // console.log(checkedCount);
                                if (checkedCount == 1) {
                                    $("#commandAuthorityManagementCustomCheckbox" + i).hide();
                                } else if (checkedCount > 1) {
                                    $("#commandAuthorityManagementCustomSelect" + i).val("custom");
                                    // $("#commandAuthorityManagementCustomSelect"+i).hide();
                                    $("#commandAuthorityManagementCustomCheckbox" + i).show();
                                    //复选框状态

                                } else {
                                    // $("#commandAuthorityManagementCustomSelect"+i).show();
                                    $("#commandAuthorityManagementCustomSelect" + i).val("");
                                    $("#commandAuthorityManagementCustomCheckbox" + i).hide();
                                    //单选框状态

                                }
                            }


                        } else if (type == "upload") {
                            let customData = {
                                id: commandAuthorityStatusData.id,
                                isStart: $("input[name='isStart']")[i - 1].checked,

                            }

                            //上传状态
                            if (whichState == "switchState") {
                                let isStartEvery = $("input[name='isStart']")[i - 1].checked;
                                // console.log("data:" + data.isStart + "_.isStartEvery:" + isStartEvery)
                                if (data.isStart != isStartEvery) {
                                    data.isStart = isStartEvery;
                                }
                                userDataStore1.put(data).onsuccess = function (event) {
                                    // console.log(event.target.result);
                                }

                            } else if (whichState == "authorityState") {
                                // console.log(applyAllCommandAuthorityStatusId);
                                userDataStore1.get(applyAllCommandAuthorityStatusId).onsuccess =
                                    function (event) {
                                        // console.log(event.target.result);
                                        let applyAllData = event.target.result;
                                        // console.log(applyAllData);
                                        if (data.id != applyAllData.id) {
                                            data.isBjStart = applyAllData.isBjStart,
                                                data.isLoginUserStart = applyAllData.isLoginUserStart,
                                                data.isManageStart = applyAllData.isManageStart,
                                                data.isTopfanStart = applyAllData.isTopfanStart,
                                                data.isSupporterStart = applyAllData.isSupporterStart,
                                                data.isSubscriptionStart = applyAllData
                                                    .isSubscriptionStart,
                                                data.isFanStart = applyAllData.isFanStart,
                                                data.isNormalStart = applyAllData.isNormalStart
                                        }
                                        userDataStore1.put(data).onsuccess = function (event) {
                                            // console.log(event.target.result);

                                            //上传完毕
                                            if (i == object.size) {
                                                //下载当前选择的状态
                                                opSettingIndexDB.writeOneCommandAuthorityStatus(
                                                    applyAllCommandAuthorityStatusData,
                                                    "download");
                                                showTipBarrageFunction(packageResult
                                                    .opSettingIndexDB
                                                    .writeCommandAuthorityStatus);
                                                $(".applyAllBtn").button("reset");
                                            }
                                        }

                                    }


                            } else {

                            }
                        }

                    }
                }
                // userDataStore1.put(commandAuthorityStatusData).onsuccess = function (event) {
                //     console.log(event);
                // }
            }
            //恢复默认值
            // commandAuthorityStatusData.id = commandAuthorityStatusDataInit;


            // userDataStore1.put(commandAuthorityStatusData).onsuccess = function (event) {
            //     console.log(event);
            // }
        }
        requestSetting.onerror = function () {
            // console.log("updateSettingData错误");
        }
    },
    writeOneCommandAuthorityStatus: function (customUpdateData, type) {
        let requestSetting = opSettingIndexDB.createTable();
        requestSetting.onsuccess = function (e) {
            let dbSetting = requestSetting.result;
            var transaction = dbSetting.transaction([tbSetting], 'readwrite');
            transaction.onsuccess = function (event) {
                console.log('[Transaction] 好了!');
            };
            transaction.onerror = function (event) {
                console.log('[Transaction] 失败!');
            };
            //读取表名
            var userDataStore2 = transaction.objectStore(tbSetting);
            userDataStore2.get(customUpdateData.id).onsuccess = function (event) {
                let data = event.target.result
                if (!data) {
                    //添加一个数据
                    //开关状态写入
                    $("input[name='isStart']")[customUpdateData.cmcfIndex - 1].checked = true;

                    //命令选择状态同步
                    $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex).val("");
                    $("#commandAuthorityManagementCustomCheckbox" + customUpdateData.cmcfIndex).hide();

                    //删除指定属性
                    Reflect.deleteProperty(customUpdateData, "cmcfIndex");
                    //添加
                    userDataStore2.add(customUpdateData).onsuccess = function (event) {
                        // console.log(event.target.result);
                        //开关状态写入

                    }
                } else {
                    //存在 同步
                    // console.log(data);
                    if (type == "download") {
                        //下载状态
                        let checkedCount = 0;
                        if (data.isStart) {
                            $("input[name='isStart']")[customUpdateData.cmcfIndex - 1].checked = true;
                        } else {
                            $("input[name='isStart']")[customUpdateData.cmcfIndex - 1].checked = false;
                        }

                        let commandAuthorityManagementCustomCheckbox = $(
                            "#commandAuthorityManagementCustomCheckbox" + customUpdateData
                                .cmcfIndex + " :checkbox");
                        if (data.isLoginUserStart) {
                            //单选框同步下载状态
                            $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex)
                                .val("loginUser");
                            //复选框同步下载状态
                            commandAuthorityManagementCustomCheckbox[0].checked = true;
                            $(commandAuthorityManagementCustomCheckbox[0]).parent("label").addClass(
                                "label-warning");
                            checkedCount++;
                        } else {
                            commandAuthorityManagementCustomCheckbox[0].checked = false;
                            $(commandAuthorityManagementCustomCheckbox[0]).parent("label").removeClass(
                                "label-warning");
                        }
                        if (data.isBjStart) {
                            $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex)
                                .val("bj");
                            //复选框同步下载状态
                            commandAuthorityManagementCustomCheckbox[1].checked = true;
                            $(commandAuthorityManagementCustomCheckbox[1]).parent("label").addClass(
                                "label-warning");
                            checkedCount++;
                        } else {
                            commandAuthorityManagementCustomCheckbox[1].checked = false;
                            $(commandAuthorityManagementCustomCheckbox[1]).parent("label").removeClass(
                                "label-warning");
                        }
                        if (data.isManageStart) {
                            $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex)
                                .val("manager");
                            //复选框同步下载状态
                            commandAuthorityManagementCustomCheckbox[2].checked = true;
                            $(commandAuthorityManagementCustomCheckbox[2]).parent("label").addClass(
                                "label-warning");
                            checkedCount++;
                        } else {
                            commandAuthorityManagementCustomCheckbox[2].checked = false;
                            $(commandAuthorityManagementCustomCheckbox[2]).parent("label").removeClass(
                                "label-warning");
                        }
                        if (data.isTopfanStart) {
                            $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex)
                                .val("hot");
                            //复选框同步下载状态
                            commandAuthorityManagementCustomCheckbox[3].checked = true;
                            $(commandAuthorityManagementCustomCheckbox[3]).parent("label").addClass(
                                "label-warning");
                            checkedCount++;
                        } else {
                            commandAuthorityManagementCustomCheckbox[3].checked = false;
                            $(commandAuthorityManagementCustomCheckbox[3]).parent("label").removeClass(
                                "label-warning");
                        }
                        if (data.isSubscriptionStart) {
                            $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex)
                                .val("subscription");
                            //复选框同步下载状态
                            commandAuthorityManagementCustomCheckbox[4].checked = true;
                            $(commandAuthorityManagementCustomCheckbox[4]).parent("label").addClass(
                                "label-warning");
                            checkedCount++;
                        } else {
                            commandAuthorityManagementCustomCheckbox[4].checked = false;
                            $(commandAuthorityManagementCustomCheckbox[4]).parent("label").removeClass(
                                "label-warning");
                        }
                        if (data.isSupporterStart) {
                            $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex)
                                .val("supporter");
                            //复选框同步下载状态
                            commandAuthorityManagementCustomCheckbox[5].checked = true;
                            $(commandAuthorityManagementCustomCheckbox[5]).parent("label").addClass(
                                "label-warning");
                            checkedCount++;
                        } else {
                            commandAuthorityManagementCustomCheckbox[5].checked = false;
                            $(commandAuthorityManagementCustomCheckbox[5]).parent("label").removeClass(
                                "label-warning");
                        }
                        if (data.isFanStart) {
                            $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex)
                                .val("fan");
                            //复选框同步下载状态
                            commandAuthorityManagementCustomCheckbox[6].checked = true;
                            $(commandAuthorityManagementCustomCheckbox[6]).parent("label").addClass(
                                "label-warning");
                            checkedCount++;
                        } else {
                            commandAuthorityManagementCustomCheckbox[6].checked = false;
                            $(commandAuthorityManagementCustomCheckbox[6]).parent("label").removeClass(
                                "label-warning");
                        }
                        if (data.isNormalStart) {
                            $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex)
                                .val("normal");
                            //复选框同步下载状态
                            commandAuthorityManagementCustomCheckbox[7].checked = true;
                            $(commandAuthorityManagementCustomCheckbox[7]).parent("label").addClass(
                                "label-warning");
                            checkedCount++;
                        } else {
                            commandAuthorityManagementCustomCheckbox[7].checked = false;
                            $(commandAuthorityManagementCustomCheckbox[7]).parent("label").removeClass(
                                "label-warning");
                        }
                        // console.log(checkedCount);
                        if (checkedCount == 1) {
                            $("#commandAuthorityManagementCustomCheckbox" + customUpdateData.cmcfIndex)
                                .hide();
                        } else if (checkedCount > 1) {
                            $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex)
                                .val("custom");
                            // $("#commandAuthorityManagementCustomSelect"+i).hide();
                            $("#commandAuthorityManagementCustomCheckbox" + customUpdateData.cmcfIndex)
                                .show();
                            //复选框状态

                        } else {
                            // $("#commandAuthorityManagementCustomSelect"+i).show();
                            $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex)
                                .val("");
                            $("#commandAuthorityManagementCustomCheckbox" + customUpdateData.cmcfIndex)
                                .hide();
                            //单选框状态

                        }
                    } else if (type == "upload") {
                        //上传状态
                        // console.log(customUpdateData);
                        userDataStore2.put(customUpdateData).onsuccess = function (event) {
                            // console.log(event.target.result);
                        }


                        // if(typeof customUpdateData.isStart!="undefined"){
                        //     data.isStart=customUpdateData.isStart;
                        // }
                        // if(typeof customUpdateData.isStart!="undefined"){
                        //     data.isStart=customUpdateData.isStart;
                        // }

                    }

                }
            }
            // userDataStore1.put(commandAuthorityStatusData).onsuccess = function (event) {
            //     console.log(event);
            // }
        }
        //恢复默认值
        requestSetting.onerror = function () {
            // console.log("updateSettingData错误");
        }


        // userDataStore1.put(commandAuthorityStatusData).onsuccess = function (event) {
        //     console.log(event);
        // }
    },
    searchCommandAuthoritySupport: function (searchData, callback) {
        requestSetting = opSettingIndexDB.createTable();
        requestSetting.onsuccess = function (e) {
            dbSetting = requestSetting.result;
            var transaction = dbSetting.transaction([tbSetting], 'readwrite');
            transaction.onsuccess = function (event) {
                console.log('[Transaction] 好了!');
            };
            transaction.onerror = function (event) {
                console.log('[Transaction] 失败!');
            };
            // "<option value='loginUser'>登录账户</option>\n" +
            // "<option value='bj'>BJ</option>\n" +
            // "<option value='manager'>管理员</option>\n" +
            // "<option value='hot'>超级粉丝</option>\n" +
            // "<option value='subscription'>订阅者</option>\n" +
            // "<option value='supporter'>支持者</option>\n" +
            // "<option value='fan'>粉丝</option>\n" +
            // "<option value='normal'>普通收看者</option>\n" +
            // "<option value='custom'>自定义</option></select>" +
            switch (searchData.grade) {
                case 'loginUser':
                    searchData.grade = 'isLoginUserStart';
                    break;
                case 'manager':
                    searchData.grade = 'isManageStart';
                    break;
                case 'bj':
                    searchData.grade = 'isBjStart';
                    break;
                case 'topfan':
                    searchData.grade = 'isTopfanStart';
                    break;
                case 'supporter':
                    searchData.grade = 'isSupporterStart';
                case 'gudok':
                    searchData.grade = 'isSubscriptionStart';
                    break;
                case 'fan':
                    searchData.grade = 'isFanStart';
                    break;
                case 'user':
                    searchData.grade = 'isNormalStart';
                    break;
                default:
                    searchData.grade = 'lodding';
                    break;
            }
            //读取表名
            var userDataStore3 = transaction.objectStore(tbSetting);

            //表格ID
            var searchDataId = "commandAuthorityStatus" + searchData.objIndex;
            var answerData = {
                isAuthority: false,
                message: ""
            };

            let messageString;
            let logString;
            userDataStore3.get(searchDataId).onsuccess = function (event) {
                let data = event.target.result
                if (!data) {
                    let customData = {
                        id: searchDataId,
                        isStart: false,
                        isBjStart: false,
                        isLoginUserStart: false,
                        isManageStart: false,
                        isTopfanStart: false,
                        isSupporterStart: false,
                        isSubscriptionStart: false,
                        isFanStart: false,
                        isNormalStart: false
                    }
                    //添加一个数据
                    //开关关闭状态写入
                    $("input[name='isStart']")[searchData.objIndex].checked = false;
                    //命令选择状态同步
                    // $("#commandAuthorityManagementCustomSelect" + customUpdateData.cmcfIndex).val("");
                    // $("#commandAuthorityManagementCustomCheckbox" + customUpdateData.cmcfIndex).hide();
                    //添加
                    userDataStore3.add(customData).onsuccess = function (event) {
                        // console.log(event.target.result);
                        //开关状态写入
                        messageString = "@" + searchData.nickName + ":₍" + searchData.tex + "₎ " + packageResult.searchCommandAuthoritySupport.answerData1;
                        logString = "<li style='color: black'>" + messageString;
                        answerData.message = packageResult.searchCommandAuthoritySupport.answerData1;
                        callback(answerData);
                    }
                } else {
                    var loginId = localStorage.getItem("loginId");
                    var loginNick = $(".userInfo .btn-login").text();
                    //等级转换数据库等级
                    // let dataString = "data." + searchData.grade;
                    // eval(dataString)

                    if (data.isStart) {
                        if (data.isLoginUserStart && loginId == searchData.idt && searchData.nickName == loginNick) {
                            messageString = "@" + searchData.nickName + ":₍" + searchData.tex + "₎ " + packageResult.searchCommandAuthoritySupport.answerData2;
                            logString = "<li style='color: green'>" + messageString;
                            // answerData.message = "登录账户满足权限";
                            answerData.message = packageResult.searchCommandAuthoritySupport.answerData2;
                            answerData.isAuthority = true;
                        } else if (data[searchData.grade]) {
                            messageString = "@" + searchData.nickName + ":₍" + searchData.tex + "₎ " + packageResult.searchCommandAuthoritySupport.answerData3;
                            logString = "<li style='color: green'>" + messageString;
                            //开关开启状态写入
                            // $("input[name='isStart" + searchData.objIndex + "']")[1].checked = true;
                            // answerData.message = "满足角色权限";
                            answerData.message = packageResult.searchCommandAuthoritySupport.answerData3;
                            answerData.isAuthority = true;
                        } else {
                            let answerString = "";
                            let logStr = "";
                            if (data.isLoginUserStart) {
                                // answerString=answerString+" 登录账户 ";
                                answerString = answerString + " 로그인 중인 계정 ";
                                logStr = logStr + packageResult.searchCommandAuthoritySupport.answerData4[0];
                            }
                            if (data.isBjStart) {
                                // answerString=answerString+" 主播 ";
                                answerString = answerString + " BJ ";
                                logStr = logStr + packageResult.searchCommandAuthoritySupport.answerData4[1];
                            }
                            if (data.isManageStart) {
                                // answerString=answerString+" 管理员 ";
                                answerString = answerString + " 매니저 ";
                                logStr = logStr + packageResult.searchCommandAuthoritySupport.answerData4[2];
                            }
                            if (data.isTopfanStart) {
                                // answerString=answerString+" 热血粉丝 ";
                                answerString = answerString + " 열혈팬 ";
                                logStr = logStr + packageResult.searchCommandAuthoritySupport.answerData4[3];
                            }
                            if (data.isSubscriptionStart) {
                                // answerString=answerString+" 订阅者 ";
                                answerString = answerString + " 구독자 ";
                                logStr = logStr + packageResult.searchCommandAuthoritySupport.answerData4[4];
                            }
                            if (data.isSupporterStart) {
                                // answerString=answerString+" 支持者 ";
                                answerString = answerString + " 서포터 ";
                                logStr = logStr + packageResult.searchCommandAuthoritySupport.answerData4[5];
                            }
                            if (data.isFanStart) {
                                // answerString=answerString+" 粉丝 ";
                                answerString = answerString + " 팬 ";
                                logStr = logStr + packageResult.searchCommandAuthoritySupport.answerData4[6];
                            }
                            if (data.isNormalStart) {
                                // answerString=answerString+" 观众 ";
                                answerString = answerString + " 일반 참여자 ";
                                logStr = logStr + packageResult.searchCommandAuthoritySupport.answerData4[7];
                            }
                            // answerData.message = "不满足权限,需要"+answerString+"权限";
                            // answerData.message = "@"+searchData.nickName+":("+searchData.tex+") 권한이 없습니다. 이 권한은 "+answerString+"가 필요합니다.";
                            // answerData.message = "@"+searchData.nickName+":("+searchData.tex+") 이 권한은 "+answerString+"가 필요합니다.";
                            messageString = "(" + searchData.tex + ") 이 권한은 " + answerString + "가 필요합니다.";
                            logString = "<li style='color: red'>(" + searchData.tex + ") " + packageResult.searchCommandAuthoritySupport.answerData5[0]
                                + logStr + packageResult.searchCommandAuthoritySupport.answerData5[1];
                            answerData.message = messageString;
                            if ($("#promptOfAuthorizationFailure").prop("checked")) {
                                sendMessageCustom(answerData.message, 1, 5);
                            }
                        }
                        //授权成功增加1游戏积分
                        if (answerData.isAuthority) {
                            let addUserData = {
                                id: searchData.idt,
                                userNick: searchData.nickName,
                                gamePoints: 5
                            }
                            if (localStorageType == "indexdb") {
                                opIndexDB.addData(addUserData);

                            } else if (localStorageType == "websql") {
                                opWebsql.addData(addUserData);
                            } else {

                            }
                        }


                    } else {
                        messageString = "(" + searchData.tex + ")이 명령은 켜져 있지 않습니다.";
                        logString = "<li style='color: orange'>(" + searchData.tex + ")" + packageResult.searchCommandAuthoritySupport.answerData6;
                        // answerData.message = "此命令没有开启";
                        answerData.message = messageString;
                        if ($("#promptOfIsStart").prop("checked")) {
                            sendMessageCustom(answerData.message, 1, 5);
                        }
                    }
                }
                //写入临时日志
                $("#authorizationLogPre").prepend(logString + "&emsp;" + $("#timeFrequencys").text() + "</li>");
                showTipBarrageFunction(logString);
                callback(answerData);
            }
        }
    }
}

function convertGrade(grade) {
    let dataGrade;
    switch (grade) {
        case 'bj':
            // dataGrade = '主播';
            dataGrade = packageResult.searchCommandAuthoritySupport.answerData4[1];
            break;
        case 'manager':
            // dataGrade = '管理员';
            dataGrade = packageResult.searchCommandAuthoritySupport.answerData4[2];
            break;
        case 'topfan':
            // dataGrade = '热血粉丝';
            dataGrade = packageResult.searchCommandAuthoritySupport.answerData4[3];
            break;
        case 'gudok':
            // dataGrade = '订阅者';
            dataGrade = packageResult.searchCommandAuthoritySupport.answerData4[4];
            break;
        case 'supporter':
            dataGrade = packageResult.searchCommandAuthoritySupport.answerData4[5];
            break;
        case 'fan':
            // dataGrade= '粉丝';
            dataGrade = packageResult.searchCommandAuthoritySupport.answerData4[6];
            break;
        case 'user':
            // dataGrade = '普通用户';
            dataGrade = packageResult.searchCommandAuthoritySupport.answerData4[7];
            break;
        // default:
        //     dataGrade = 'lodding';
        //     break;
        default:
            dataGrade = grade;
            break;
    }
    return dataGrade;
}

// basicConfiguration
// robotConfiguration
// detailedConfiguration
var chatSportMode = getDomById("chatSportMode");
var robotChatCommondCheckboxId = getDomById("robotChatCommondCheckboxId");
var chatPointsMode = getDomById("chatPointsMode");
var isSingleIncreaseMaxinum = getDomById("isSingleIncreaseMaxinum");

var pictureIntetgralMode = getDomById("pictureIntetgralMode");

var chatPointsMaxChangeMode = getDomById("chatPointsMaxChangeMode");
var delayInputId = getDomById("delayInputId");
//每月重置积分选项
var resetTotalPointsEveryMonth = getDomById("resetTotalPointsEveryMonth");

let $halfHourPrompt = $("#halfHourPrompt");
var settData = {
    id: "robotConfiguration",
    chatSportMode: chatSportMode.checked,
    isSingleIncreaseMaxinum: isSingleIncreaseMaxinum.checked,
    chatPointsMode: chatPointsMode.checked,
    pictureIntetgralMode: pictureIntetgralMode.checked,
    chatPointsMaxChangeMode: chatPointsMaxChangeMode.checked,
    robotChatCommondCheckboxId: robotChatCommondCheckboxId.checked,
    delayInputId: delayInputId.value,
    isStart: false,
    isBarrage: false,
    isHalfHourPrompt: $halfHourPrompt.prop("checked"),
    isResetTotalPointsEveryMonth: resetTotalPointsEveryMonth.checked
};
$("#isSingleIncreaseMaxinum,#resetTotalPointsEveryMonth,#timesPromptInput,#chrysanthemumCheckBox,#chatPointsMode,#pictureIntetgralMode,#chatPointsMaxChangeMode,#chatSportMode,#robotChatCommondCheckboxId")
    .change(function () {
        if (this.checked) {
            $(this).parent("label").addClass("label-success");
        } else {
            $(this).parent("label").removeClass("label-success");
        }
    });

function getLabelStatus(domArray) {
    for (let i = 0; i < domArray.length; i++) {
        if (domArray[i].checked) {
            $(domArray[i]).parent("label").addClass("label-success");
        } else {
            $(domArray[i]).parent("label").removeClass("label-success");
        }
    }

}

//上传状态
$("#isSingleIncreaseMaxinum,#resetTotalPointsEveryMonth,#pictureIntetgralMode,#halfHourPrompt,#chatPointsMaxChangeMode,#chatPointsMode,#chatSportMode,#accordingNumberWords,#robotChatCommondCheckboxId,#delayInputId")
    .change(
        function () {
            //每月重置积分选项
            settData.isResetTotalPointsEveryMonth = resetTotalPointsEveryMonth.checked;

            if ($halfHourPrompt.prop("checked")) {
                settData.isHalfHourPrompt = true;
            } else {
                settData.isHalfHourPrompt = false;
            }

            if ($("#retrievalButtonId").css("display") == "none") {
                settData.isStart = true;
            } else {
                settData.isStart = false;
            }
            if ($("#barrageButtonId").attr("data-isbarrage") == "open") {
                settData.isBarrage = true;
            } else {
                settData.isBarrage = false;
            }

            chatSportMode = getDomById("chatSportMode");

            // if(chatSportMode.checked){
            //     // $("#clear_chat").click();
            // }
            settData.chatSportMode = chatSportMode.checked;

            settData.isSingleIncreaseMaxinum = isSingleIncreaseMaxinum.checked;

            pictureIntetgralMode = getDomById("pictureIntetgralMode");
            settData.pictureIntetgralMode = pictureIntetgralMode.checked;

            chatPointsMode = getDomById("chatPointsMode");
            settData.chatPointsMode = chatPointsMode.checked;

            chatPointsMaxChangeMode = getDomById("chatPointsMaxChangeMode");
            settData.chatPointsMaxChangeMode =
                chatPointsMaxChangeMode.checked;

            robotChatCommondCheckboxId = getDomById("robotChatCommondCheckboxId");
            settData.robotChatCommondCheckboxId =
                robotChatCommondCheckboxId.checked;

            delayInputId = getDomById("delayInputId");
            settData.delayInputId = delayInputId.value;

            // console.log(settData);
            opSettingIndexDB.insertData(settData, "upload");
        });


// setTimeout(function(){

opSettingIndexDB.insertData(settData, "download");
// },10000);


$('#commandAuthorityManagementModal,#exportDiv,#myModal').modal({
    backdrop: false,
    keyboard: true,
    show: false
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
        "'><span name='loginUser'>loginUser</span><input id='loginUser" + linkIndex +
        "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
        ")'/></label>" +
        "<label class='label' for='bj" + linkIndex + "'><span name='bj'>bj</span><input id='bj" + linkIndex +
        "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
        ")'></label>" +
        "<label class='label' for='manager" + linkIndex +
        "'><span name='manager'>manager</span><input id='manager" + linkIndex +
        "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
        ")'/></label>" +
        "<label class='label' for='hot" + linkIndex + "'><span name='hot'>hot</span><input id='hot" + linkIndex +
        "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
        ")'/></label>" +
        "<label class='label' for='subscription" + linkIndex +
        "'><span name='subscription'>subscription</span><input id='subscription" + linkIndex +
        "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
        ")'/></label>" +
        "<label class='label' for='supporter" + linkIndex +
        "'><span name='supporter'>supporter</span><input id='supporter" + linkIndex +
        "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
        ")'/></label>" +
        "<label class='label' for='fan" + linkIndex + "'><span name='fan'>fan</span><input id='fan" + linkIndex +
        "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" + linkIndex +
        ")'/></label>" +
        "<label class='label' for='normal" + linkIndex + "' ><span name='normal'>normal</span><input id='normal" +
        linkIndex + "' type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(" +
        linkIndex + ")'/></label>" +
        "<br><li id='chooseAll' name='chooseAll' class='btn btn-success' onclick='checkedToggle(\"all\"," +
        linkIndex + ");'></li>" +
        "<li id='chooseNone' name='chooseNone'  class='btn btn-info' onclick='checkedToggle(\"none\"," + linkIndex +
        ");'></li>" +
        "<li id='chooseContrary' name='chooseContrary'  class='btn btn-inverse' onclick='checkedToggle(\"contrary\"," +
        linkIndex + ");'></li></div>" +
        "<button id='applyAllBtn' name='applyAllBtn' class='btn btn-danger applyAllBtn' onclick='applyAllBtnFunction(" +
        linkIndex + ")' data-loading-text='Applying' autocomplete='off'></button></div></div>");
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

$(document).ready(function () {
    $("#myTabbaleLink>li:odd").css("backgroundColor", "#cef"); //奇数行
    $("#myTabbaleLink>li:even").css("backgroundColor", "#ffc"); //偶数行(去掉第一行)【gt(0)：大于0】
});

// $("input[id^='isStart']").click(function(){
//     console.log(this.checked);
//     if(this.checked){
//         $(this).parent("div").parent("div").addClass("label-warning");
//     }else{
//         $(this).parent("div").parent("div").removeClass("label-warning");
//     }
// });
function changeMyTabbalePage(pageIndex) {
    $("#myTabbaleLink>div:eq(" + (pageIndex - 1) + ")").addClass("label-warning")

    $("#myTabbalePage>div").removeClass("active");
    $("#myTabbalePage>div:eq(" + (pageIndex - 1) + ")").addClass("active");
    loadCommandAuthorityManagementStatusFunction(pageIndex);
}

let applyAllCommandAuthorityStatusId;
let applyAllCommandAuthorityStatusData;

//应用所有配置
function applyAllBtnFunction(linkIndex) {
    applyAllCommandAuthorityStatusId = commandAuthorityStatusData.id + linkIndex;
    applyAllCommandAuthorityStatusData = {
        id: applyAllCommandAuthorityStatusId,
        cmcfIndex: linkIndex
    }

    opSettingIndexDB.writeCommandAuthorityStatus("upload", "authorityState");
    $(".applyAllBtn").button("loading");
    // $(".applyAllBtn").button("toggle");

    // $(".applyAllBtn").button("reset");

}

//选择切换
function checkedToggle(selectType, cmcfIndex) {
    let $commandAuthorityManagementCustomCheckbox = $("#commandAuthorityManagementCustomCheckbox" + cmcfIndex +
        " :checkbox");

    if (selectType == "all") {
        $commandAuthorityManagementCustomCheckbox.prop("checked", true);
    } else if (selectType == "none") {
        $commandAuthorityManagementCustomCheckbox.prop("checked", false);
    } else if (selectType == "contrary") {
        $commandAuthorityManagementCustomCheckbox.each(function (i) {
            $(this).prop("checked", !$(this).prop("checked"));
        });
    } else {

    }
    //修改状态存入状态
    changeCommandAuthorityManagementCustomSelectFunction(cmcfIndex);

    var count = 0;
    $commandAuthorityManagementCustomCheckbox.each(function () {
        if (this.checked) {
            count++;
        } else {
            $(this).parent("label").removeClass("label-warning");
        }
    });

    if (count == 0) {
        showTipBarrageFunction(packageResult.checkedToggle.showTipBarrageFunction1);
    } else if (count > 0 && count < $commandAuthorityManagementCustomCheckbox.length) {
        showTipBarrageFunction(packageResult.checkedToggle.showTipBarrageFunction2);
        //刷新状态
        changeMyTabbalePage(cmcfIndex);
    } else {
        showTipBarrageFunction(packageResult.checkedToggle.showTipBarrageFunction3);
        //刷新状态
        changeMyTabbalePage(cmcfIndex);
    }

}

//加载一个数据的状态
function loadCommandAuthorityManagementStatusFunction(cmcfIndex) {
    // console.log("加载" + cmcfIndex);
    let customData = {
        id: commandAuthorityStatusData.id + cmcfIndex,
        isStart: false,
        isBjStart: false,
        isLoginUserStart: false,
        isManageStart: false,
        isTopfanStart: false,
        isSupporterStart: false,
        isSubscriptionStart: false,
        isFanStart: false,
        isNormalStart: false,
        cmcfIndex: cmcfIndex
    }
    opSettingIndexDB.writeOneCommandAuthorityStatus(customData, "download");
}

//批量修改开关
function changeStatus() {
    // console.log("changeStatus");
    if ($("#openAll").prop("checked")) {
        $("input[name='isStart']").prop("checked", true);
        $("#openAllDiv").removeClass("label-default").addClass("label-warning");
    } else {
        $("input[name='isStart']").prop("checked", false);
        $("#openAllDiv").removeClass("label-warning").addClass("label-default");
    }
    opSettingIndexDB.writeCommandAuthorityStatus("upload", "switchState");

}

//总开关按钮状态伴随
function openAllStatus() {
    let count = 0;
    $("input[name='isStart']").each(function (i) {
        if ($(this).prop("checked")) {
            count++;
        }
    });
    if (count >= object.size / 2) {
        $("#openAll").prop("checked", true);
        $("#openAllDiv").removeClass("label-default").addClass("label-warning");
    } else {
        $("#openAll").prop("checked", false);
        $("#openAllDiv").removeClass("label-warning").addClass("label-default");
    }
    // if (count == object.size) {
    //     $("#openAll").prop("checked", true);
    // } else if (count == 0) {
    //     $("#openAll").prop("checked", false);
    // }
}

//修改一个数据
function changeCommandAuthorityManagementCustomSelectFunction(cmcfIndex) {
    //总开关状态
    openAllStatus();

    // commandAuthorityStatusData
    var changeCommandAuthorityManagementCustomSelect = $("#commandAuthorityManagementCustomSelect" + cmcfIndex);
    //是否开启状态
    var changeCommandAuthorityManagementCustomSelectIsStart = $("input[name='isStart']")[cmcfIndex - 1];
    let customData = {
        id: commandAuthorityStatusData.id + cmcfIndex,
        isStart: false,
        isBjStart: false,
        isLoginUserStart: false,
        isManageStart: false,
        isTopfanStart: false,
        isSupporterStart: false,
        isSubscriptionStart: false,
        isFanStart: false,
        isNormalStart: false
    }

    $("#commandAuthorityManagementCustomCheckbox" + cmcfIndex).hide();
    if (changeCommandAuthorityManagementCustomSelectIsStart.checked) {
        customData.isStart = true;
    } else {
        customData.isStart = false;
    }
    switch (changeCommandAuthorityManagementCustomSelect.val()) {
        case "loginUser":
            customData.isLoginUserStart = true;
            break
        case "bj":
            customData.isBjStart = true;
            break;
        case "manager":
            customData.isManageStart = true;
            break;
        case "topfan":
            customData.isTopfanStart = true;
            break;
        case "subscription":
            customData.isSubscriptionStart = true;
            break;
        case "supporter":
            customData.isSupporterStart = true;
            break;
        case "fan":
            customData.isFanStart = true;
            break;
        case "normal":
            customData.isNormalStart = true;
            break;
        case "custom":
            // console.log("custom");
            let commandAuthorityManagementCustomCheckbox = $("#commandAuthorityManagementCustomCheckbox" + cmcfIndex +
                " :checkbox");
            if (commandAuthorityManagementCustomCheckbox[0].checked) {
                customData.isLoginUserStart = true;
            }
            if (commandAuthorityManagementCustomCheckbox[1].checked) {
                customData.isBjStart = true;
            }
            if (commandAuthorityManagementCustomCheckbox[2].checked) {
                customData.isManageStart = true;
            }
            if (commandAuthorityManagementCustomCheckbox[3].checked) {
                customData.isTopfanStart = true;
            }
            if (commandAuthorityManagementCustomCheckbox[4].checked) {
                customData.isSubscriptionStart = true;
            }
            if (commandAuthorityManagementCustomCheckbox[5].checked) {
                customData.isSupporterStart = true;
            }
            if (commandAuthorityManagementCustomCheckbox[6].checked) {
                customData.isFanStart = true;
            }
            if (commandAuthorityManagementCustomCheckbox[7].checked) {
                customData.isNormalStart = true;
            }

            // console.log($("#commandAuthorityManagementCustomCheckbox:checkbox"));
            //
            // console.log(customData);
            $("#commandAuthorityManagementCustomCheckbox" + cmcfIndex).show();

            break;
    }
    opSettingIndexDB.writeOneCommandAuthorityStatus(customData, "upload");
    // console.log(cmcfIndex)
    // console.log(customData)
    // loginUser<input type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(cmcfIndex)'>
    // bj:<input type='checkbox'  onchange='changeCommandAuthorityManagementCustomSelectFunction(cmcfIndex)'>
    // manager:<input type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(cmcfIndex)'>
    // hot:<input type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(cmcfIndex)'>
    // subscription:<input type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(cmcfIndex)'>
    // supporter:<input type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(cmcfIndex)'>
    // fan:<input type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(cmcfIndex)'>
    // normal:<input type='checkbox' onchange='changeCommandAuthorityManagementCustomSelectFunction(cmcfIndex)'>

    // opSettingIndexDB.writeCommandAuthorityStatus("download");


}

// <option value='loginUser'>登录账户</option>
// <option value='bj'>BJ</option>
// <option value='manager'>管理员</option>
// <option value='hot'>超级粉丝</option>
// <option value='subscription'>订阅者</option>
// <option value='supporter'>支持者</option>
// <option value='fan'>粉丝</option>
// <option value='normal'>普通收看者</option>
// <option value='custom'>自定义</option>            break;
//         case "supporter":

var commandAuthorityStatusData = {
    id: "commandAuthorityStatus",
    isStart: false,
    isBjStart: false,
    isLoginUserStart: false,
    isManageStart: false,
    isTopfanStart: false,
    isSupporterStart: false,
    isSubscriptionStart: false,
    isFanStart: false,
    isNormalStart: false
}

function readStatus() {
    opSettingIndexDB.readCommandAuthorityStatus()
}

function writeStatus() {
    //读取权限开关状态
    opSettingIndexDB.writeCommandAuthorityStatus("download", "switchState");
    //读取权限详细状态
    // opSettingIndexDB.writeCommandAuthorityStatus("download","authorityState");

}


function stopReadStatusInterval() {
    //状态同步
    if (typeof readStatusInterval != "undefined") {
        clearInterval(readStatusInterval);
    }
}


let readStatusInterval;

function commandAuthorityManagementFunction() {
    let $commandAuthorityManagementModal = $('#commandAuthorityManagementModal');
    $commandAuthorityManagementModal.modal('toggle');
    //状态同步
    stopReadStatusInterval();
    //通知开关状态同步
    tipStatusFunction();
    //读取权限开关状态
    opSettingIndexDB.writeCommandAuthorityStatus("download", "switchState");

    readStatusInterval = setInterval(function () {
        if ($commandAuthorityManagementModal.css("display") != 'none') {
            //通知开关状态同步
            tipStatusFunction();
            //读取权限开关状态
            opSettingIndexDB.writeCommandAuthorityStatus("download", "switchState");
        } else {
            stopReadStatusInterval();
        }
    }, 5000);
}

//开关优化
// var myTabbaleLinkIsStart=$("#myTabbaleLink :radio[name^='isStart']");
// myTabbaleLinkIsStart.each(function(i){

//     $(this).change(function(){
//         if(i%2==0){
//             console.log(myTabbaleLinkIsStart[i].checked);
//             console.log(myTabbaleLinkIsStart[i+1].checked);

//             myTabbaleLinkIsStart[i].style.visibility="hidden";
//             console.log(myTabbaleLinkIsStart[i]);
//             console.log($(myTabbaleLinkIsStart[i]).prev());
//             $(myTabbaleLinkIsStart[i]).prev().hide();

//             myTabbaleLinkIsStart[i+1].style.visibility="visible";
//             $(myTabbaleLinkIsStart[i+1]).next().show();

//         }else{
//             console.log(myTabbaleLinkIsStart[i-1].checked);
//             console.log(myTabbaleLinkIsStart[i].checked);
//             myTabbaleLinkIsStart[i-1].style.visibility="visible";
//             $(myTabbaleLinkIsStart[i-1]).prev().show();

//             console.log(myTabbaleLinkIsStart[i]);
//             console.log($(myTabbaleLinkIsStart[i]).prev());
//             myTabbaleLinkIsStart[i].style.visibility="hidden";
//             $(myTabbaleLinkIsStart[i]).next().hide();
//         }
//     });

// });

//状态同步
let promptOfIsStart;
let promptOfAuthorizationFailure;

//通知开关状态同步
function tipStatusFunction() {
    promptOfIsStart = localStorage.getItem("promptOfIsStart");

    if (promptOfIsStart == null || promptOfIsStart == "undefined") {
        localStorage.setItem("promptOfIsStart", $("#promptOfIsStart").prop("checked"));
    } else {
        if (evil(promptOfIsStart)) {
            $("#promptOfIsStart").prop("checked", true);
            $("#promptOfIsStartLabel").removeClass("label-default").addClass("label-info");
        } else {
            $("#promptOfIsStart").prop("checked", false);
            $("#promptOfIsStartLabel").removeClass("label-info").addClass("label-default");
        }
    }
    promptOfAuthorizationFailure = localStorage.getItem("promptOfAuthorizationFailure");
    if (promptOfAuthorizationFailure == null || promptOfAuthorizationFailure == "undefined") {
        localStorage.setItem("promptOfAuthorizationFailure", $("#promptOfAuthorizationFailure").prop("checked"))
    } else {
        if (evil(promptOfAuthorizationFailure)) {
            $("#promptOfAuthorizationFailure").prop("checked", true);
            $("#promptOfAuthorizationFailureLabel").removeClass("label-default").addClass("label-success");
        } else {
            $("#promptOfAuthorizationFailure").prop("checked", false);
            $("#promptOfAuthorizationFailureLabel").removeClass("label-success").addClass("label-default");
        }
    }

}

$("#promptOfIsStart,#promptOfAuthorizationFailure").change(function () {
    // console.log($("#promptOfIsStart").prop("checked"));
    // console.log($("#promptOfAuthorizationFailure").prop("checked"));

    if ($("#promptOfIsStart").prop("checked")) {
        $("#promptOfIsStartLabel").removeClass("label-default").addClass("label-info");
    } else {
        $("#promptOfIsStartLabel").removeClass("label-info").addClass("label-default");
    }

    if ($("#promptOfAuthorizationFailure").prop("checked")) {
        $("#promptOfAuthorizationFailureLabel").removeClass("label-default").addClass("label-success");
    } else {
        $("#promptOfAuthorizationFailureLabel").removeClass("label-success").addClass("label-default");
    }

    localStorage.setItem("promptOfIsStart", $("#promptOfIsStart").prop("checked"));
    localStorage.setItem("promptOfAuthorizationFailure", $("#promptOfAuthorizationFailure").prop("checked"));
});


var $singleIncreaseMaxinumValue = $("#singleIncreaseMaxinumValue");
var singleIncreaseMaxinumValueLocalStorage = localStorage.getItem("singleIncreaseMaxinumValue");
singleIncreaseMaxinumValueLocalStorage = parseInt(singleIncreaseMaxinumValueLocalStorage);
if (singleIncreaseMaxinumValueLocalStorage == null || singleIncreaseMaxinumValueLocalStorage == "undefined") {
    localStorage.setItem("singleIncreaseMaxinumValue", 10);
    $singleIncreaseMaxinumValue.val(10);
    singleIncreaseMaxinumValueLocalStorage = 10;
} else {
    $singleIncreaseMaxinumValue.val(singleIncreaseMaxinumValueLocalStorage);
}
$singleIncreaseMaxinumValue.change(() => {

    if ($singleIncreaseMaxinumValue.val() == "") {
        $singleIncreaseMaxinumValue.val(15);
    } else {
        if ($singleIncreaseMaxinumValue.val() < 5) {
            $singleIncreaseMaxinumValue.val(5);
        }
        if ($singleIncreaseMaxinumValue.val() > 30) {
            $singleIncreaseMaxinumValue.val(30);
        }
    }
    // console.log("修改值:"+$accordingNumberWordsValue.val());
    localStorage.setItem("singleIncreaseMaxinumValue", $singleIncreaseMaxinumValue.val());
    singleIncreaseMaxinumValueLocalStorage = $singleIncreaseMaxinumValue.val();
});
var $isSingleIncreaseMaxinum = $("#isSingleIncreaseMaxinum");
$isSingleIncreaseMaxinum.change(function () {
    if ($isSingleIncreaseMaxinum.prop("checked")) {
        // $accordingNumberWordsValue.show();
        $singleIncreaseMaxinumValue.css("visibility", "visible");
    } else {
        // $accordingNumberWordsValue.hide();
        $singleIncreaseMaxinumValue.css("visibility", "hidden");
    }
});
 function getDomById(idDom) {
    idDom = document.getElementById(idDom);
    return idDom;
}

let body = document.getElementsByTagName('body')[0];
window.onload=function(){
  console.log("window.onload");
  $("#write_area").off("paste").off("cut").off("copy");

}

function init() {
    $('#barrageButtonId').css('background-color', 'green').css('font-size', 'large').css('color', 'yellow');
    tipBarrage('start');

}

init();

                        //是否开启弹幕
                        function barrage() {

                            let $barrageButton = $('#barrageButtonId');
                            let isBarrage = $barrageButton.attr('data-isBarrage');
                            if (isBarrage == 'close') {
                                tipBarrage('open');
                                $barrageButton.attr('data-isBarrage', 'open');
                                $barrageButton.css('background-color', 'green').css('font-size', 'large').css('color', 'yellow');

                            } else if (isBarrage == 'open') {
                                tipBarrage('close');
                                $barrageButton.attr('data-isBarrage', 'close');
                                $barrageButton.css('background-color', '#808080').css('font-size', 'unset').css('color', 'white');

                            }
                            // alert($barrageButton.attr('data-isBarrage'));


                        }


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
                                }, 10000)


                            } else if (isBarrage == 'open') {


                                // $('body').hide(1000).show(2000);

                                // $('#chat_area').fadeOut($('#delayInputTextId').val()*2).fadeIn($('#delayInputTextId').val());


                                showLogArray.push(text);
                                createShowLogs();
                            }

                            //只能清理弹幕
                            if ($('.showLog').length > 198) {


                                console.log('清理屏幕');
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
                                    $('#showLog' + randomNo).offset({top: randomNo, left: htmlWidth});
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

                                    showLogDivDom.style.color = $('#background_color').val()
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
                                let minDelay=500;
                                let maxDelay=2000;
                                let showLogDelay=delayInputTextId<minDelay||delayInputTextId>maxDelay?delayInputTextId<minDelay?minDelay:maxDelay : delayInputTextId;
                                showLogSetTimeout(id);
                                function showLogSetTimeout(id) {
                                    var showLogTimeout = setTimeout(function () {
                                        //突出显示
                                        i -= 200;
                                        $(id).offset({left: i});
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

                                console.log(showLogArray)
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
                                    const cssText = 'font-size:888px;width: max-content;background:white;color:blue;height:' + $('body').height() + 'px;position:fixed;top:0px;left:' + $('body').width() + 'px';


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
                                    $('#' + id).offset({left: i});
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

                        //环境部署函数
                        function environmentButtonFunction() {


                        }




                        //检索m消息函数]
                        function retrievalButtonFunction() {
                            // tipBarrage('打开消息阅读');
                            //显示信息
                            $('#showMessageDiv').show();
                            $('#retrievalButtonId').addClass('btn-success').hide();
                            $('#stopRetrievalMessage').removeClass('btn-success').show();

                            //判断当计时器是否重复
                            if ('undefined' != typeof messageInterval) {
                                clearInterval(messageInterval);
                            }

                            function getDom(dom) {
                                var dom = document.getElementById(dom);
                                return dom;
                            }


                            //获取当前内容,以配合还原
                            var testInput_last = getDom('testInput');

                            // 选择框延迟速度dom
                            var delayInputId = getDom('delayInputId');
                            //文本框延迟速度dom
                            var delayInputTextId = getDom('delayInputTextId');
                            //计时器延迟速度value
                            delayInputFrequency = delayInputTextId.value;

                            if (delayInputFrequency == '') {
                                if (delayInputId.value == 'slowSpeed') {
                                    delayInputFrequency = 1000;
                                } else if (delayInputId.value == 'meiumSpeed') {
                                    delayInputFrequency = 500;
                                } else if (delayInputId.value == 'quick') {
                                    delayInputFrequency = 125;
                                }

                            }
                            //赋值文本框延迟显示
                            delayInputTextId.value = delayInputFrequency;

                            //当前速度
                            // console.log(delayInputId.value);
                            //控制台信息数量
                            var consoleCount = 0;
                            var informationSynchronization = getDom('informationSynchronization');

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
                            var initIndex = getDom('nowIndex').value;

                            //自动提速2自动初始化
                            var upperLimit = getDom('upperLimit');
                            if (upperLimit.value == '') {
                                upperLimit.value == '1';
                                getDom('upperLimit').value = '1';
                            }
                            console.log('重启或其开启了messageInterval');


                            //显示
                            messageInterval = setInterval(function () {
                                var idt_last = window.sessionStorage.getItem('idt_last');
                                var text_Last = window.sessionStorage.getItem('text_Last');

                                function getDom(dom) {
                                    var dom = document.getElementById(dom);
                                    return dom;
                                }

                                //清理控制台/当前执行次数
                                consoleCount++;

                                if (consoleCount > 100) {
                                    console.clear();
                                    consoleCount = 0;
                                }


                                //chat_area聊天区域
                                var chat_area = getDom('chat_area');

                                //纠正下标
                                var firstIndex = sessionStorage.getItem('firstIndex');
                                //查找下标所在的chat_area下标1
                                var firstIndexId = document.getElementById('chat_area').children[1].children[0].nextElementSibling.getAttribute('id');
                                if (firstIndex == null) {
                                    sessionStorage.setItem('firstIndex', firstIndexId);
                                }

                                firstIndex = sessionStorage.getItem('firstIndex');

                                var firstIndex2 = document.getElementById('chat_area').children[1].children[0].nextElementSibling.getAttribute('id');


                                var reduceIndex = firstIndex2 - firstIndex;
                                if (firstIndex < 0) {
                                    sessionStorage.setItem('firstIndex', 1);

                                    getDom('nowIndex').value = 1;
                                }
                                if (firstIndex2 < 0) {
                                    sessionStorage.setItem('firstIndex', 1);

                                    getDom('nowIndex').value = 1;
                                }
                                // console.log('firstIndex:' + firstIndex + ',firstIndex2:' + firstIndex2);
                                //如果有变化则做差,并且更新最新的下标


                                if (reduceIndex > 0 && initIndex - reduceIndex > 0) {
                                    // console.log('reduceIndex大于0')
                                    // console.log('做差前,reduceIndex:' + reduceIndex + ',initIndex:' + initIndex);
                                    initIndex = initIndex - reduceIndex;
                                    // console.log('做差后,reduceIndex:' + reduceIndex + ',initIndex:' + initIndex);
                                    getDom('nowIndex').value = initIndex;
                                    sessionStorage.setItem('firstIndex', firstIndex2);
                                } else if (reduceIndex < 0) {
                                    firstIndexId = document.getElementById('chat_area').children[1].children[0].nextElementSibling.getAttribute('id');
                                    sessionStorage.setItem('firstIndex', firstIndexId);
                                    // console.log('reduceIndex小于0');
                                } else {
                                    //错误时重置
                                    firstIndexId = document.getElementById('chat_area').children[1].children[0].nextElementSibling.getAttribute('id');
                                    sessionStorage.setItem('firstIndex', firstIndexId);
                                    // console.log('遇到错误,重置sessionStorage');

                                }

                                if (initIndex < chat_area.childElementCount - 1) {

                                    initIndex++;
                                    getDom('nowIndex').value = initIndex;
                                }

                                //document.getElementById('chat_area').children[2].children[0].nextElementSibling.getAttribute('id');
                                if ('undefined' != chat_area.children[initIndex]) {
                                    //现在的下标
                                    var now_index = chat_area.children[initIndex].children[0].nextElementSibling.getAttribute('id');
                                    var chat_area_Length = document.getElementById('chat_area').childNodes.length - 1;
                                    var last_index = chat_area.children[chat_area_Length].children[0].nextElementSibling.getAttribute('id');
                                    //限制消息同步정보 가 일치 하지 않 는 최대 수량,그리고 속 도 를 올 립 니 다.
                                    if (last_index - now_index >= informationSynchronization.value) {
                                        // console.log('距离超过10,加速起来');
                                        //提速2 设置上限/最快速度
                                        if (delayInputFrequency / 2 >= upperLimit.value) {
                                            delayInputFrequency = delayInputFrequency / 2
                                        }
                                        getDom('delayInputTextId').value = delayInputFrequency;
                                        getDom('retrievalButtonId').click();


                                    } else if (last_index - now_index == 1) {

                                        delayInputFrequency = delayInputFrequency * 2

                                        getDom('delayInputTextId').value = delayInputFrequency;
                                        getDom('retrievalButtonId').click();

                                    }

                                    var nickName = chat_area.children[initIndex].children[0].lastElementChild.getAttribute('user_nick');
                                    //id
                                    var idt = chat_area.children[initIndex].children[0].lastElementChild.getAttribute('user_id');
                                    //内容
                                    // var tex = chat_area.children[initIndex].children[0].nextElementSibling.textContent;


                                    var tex = chat_area.children[initIndex].children[0].nextElementSibling.innerHTML;
                                    var is_mobile = chat_area.children[initIndex].children[0].lastElementChild.getAttribute('is_mobile');
                                    var grade = chat_area.children[initIndex].children[0].lastElementChild.getAttribute('grade');


                                    if (is_mobile == 'false') {
                                        is_mobile = '💻';
                                    } else {

                                        is_mobile = '📱';
                                    }
                                    if (grade == 'user') {
                                        grade = '사용자';
                                    } else if (grade == 'manager') {
                                        grade = '관리원';
                                    } else if (grade == 'bj') {
                                        grade = '앵커';
                                    } else if (grade == 'fan') {
                                        grade = '팬';
                                    } else if (grade == 'topfan') {
                                        grade = '고급팬';
                                    } else if (grade == 'gudok') {
                                        grade = '구독자';
                                    } else {
                                        grade = 'loadding';
                                    }


                                    // console.log('['+grade+']'+nickName+'('+idt+')'+is_mobile+':'+tex+'(延迟:'+delayInputFrequency+'ms)');


                                    //判断内容ID是否相同
                                    if (idt != idt_last || tex != text_Last) {

                                        function getDom(dom) {
                                            var dom = document.getElementById(dom);
                                            return dom;
                                        }

                                        //聊天内容配色

                                        //ｉｄ和内容设置
                                        var idDom = chat_area.children[initIndex].children[0].lastElementChild;
                                        idDom.style.fontSize = 'large';
                                        idDom.style.backgroundColor = 'yellow';
                                        idDom.innerHTML = idDom.textContent + is_mobile;
                                        
                                        var texDom = chat_area.children[initIndex].children[0].nextElementSibling;
                                        // texDom.style.border='2px black solid';
                                        texDom.style.fontSize = 'large';
                                        texDom.style.backgroundColor = 'white';
                                        texDom.style.color = '#0000FF';
                                        var chatSportMode=document.getElementById("chatSportMode");
                                        //聊天内容特效
                                        if(chatSportMode.checked){
                                            $(idDom).fadeOut().fadeIn(1000);
                                            $(texDom).hide().show(1000)
                                            setTimeout(function(){$(texDom).parent('dl').hide(3000);},2000);
                                        }
                                        window.sessionStorage.setItem('idt_last', idt);
                                        window.sessionStorage.setItem('text_Last', tex);

                                        // const showMessageText= '[' + grade + ']' + nickName + '(' + idt + ')' + is_mobile + ':<br/><span style=font-size:large;>' + tex+'</span>';
                                        //记录消息
                                        // getDom('showMessage').innerHTML =showMessageText;

                                        const showMessageText1 = '[' + grade + ']' + nickName + '(' + idt + ')' + is_mobile + ':' + tex;
                                        test(showMessageText1);

                                        //正在读取得消息div ,接收弹幕结果
                                        getDom('showMessage').innerHTML =showMessageText1;

                                        
                                        // getDom('showLog').innerHTML =showMessageText1;
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


                                        //检索m 内通用发送消息方法
                                        //内容
                                        var testInput;
                                        //次数
                                        var inputTimes;
                                        //间隔时间
                                        var inputFrequency;

                                        function sendMessage(message) {
                                            //读取默认配置
                                            testInputValue = getDom('testInput').value;
                                            inputTimesValue = getDom('inputTimes').value;
                                            inputFrequencyValue = getDom('inputFrequency').value;
                                            //发送消息
                                            getDom('testInput').value = message;
                                            getDom('inputTimes').value = 1;
                                            getDom('inputFrequency').value = 1;
                                            getDom('send_message').click();
                                            //还原数据
                                            setTimeout(function () {
                                                getDom('testInput').value = testInputValue;
                                                getDom('inputTimes').value = inputTimesValue;
                                                getDom('inputFrequency').value = inputFrequencyValue;
                                            }, 1500);

                                        }
                                        //打开关闭机器人聊天功能
                                        var robotChatcheckboxId =document.getElementById("robotChatcheckboxId");

                                        if (robotChatcheckboxId.checked) {
                                            //终止(停止)命令!멈추다(任何人)
                                            if (tex == '!stop' || tex == '!멈추다') {
                                            //终止消息提示
                                            document.getElementById('stopButtonId').click();
                                            // alert('['+grade+']'+nickName+'('+idt+')'+is_mobile+':'+tex'你使用终止命令,终止了任何条件程序');
                                            console.log(idt + ':你使用终止命令,终止了部分程序');
                                            //恢复默认
                                            document.getElementById('environmentButtonId').click();
                                            console.log(idt + ':系统恢复默认配置');

                                        }
                                            //部署环境(仅限管理员(id包含10571237))
                                            if (idt.includes('10571237') && tex == '!en' || tex == '!환경' || tex == '!환경배포' || tex == '!start' || tex == '!시작하다' || tex == '!시작') {
                                                document.getElementById('environmentButtonId').click();

                                                getDom('testInput').value = '@' + nickName + ':환경 배치 성공';
                                                getDom('send_message').click();

                                                console.log(idt + '部署环境成功');

                                            }
                                            //聊天热度延迟速度
                                            if (tex == '!채팅속도' || tex == '!지연속도' || tex == '!속도') {
                                                var timeFrequencys = getDom('delayInputTextId').value;

                                                if (timeFrequencys >= 1000) {
                                                    timeFrequencys = timeFrequencys / 1000 + 's';
                                                } else {
                                                    timeFrequencys = timeFrequencys + 'ms';
                                                }
                                                getDom('testInput').value = '@' + nickName + ':관중:' + getDom('nAllViewer').innerHTML + ',채팅속도:' + timeFrequencys;
                                                getDom('send_message').click();


                                            }

                                            //查看指定用户数量
                                            function getGrups(dom1) {
                                            //function getDom(dom) {
                                            //  return document.getElementById(dom);
                                            // }
                                            for (var i = 0; i < getDom(dom1).childElementCount; i++) {
                                                var user_id = getDom(dom1).children.item(i).children.item(0).getAttribute('user_id');
                                                var user_nick = getDom(dom1).children.item(i).children.item(0).getAttribute('user_nick');
                                                console.log(user_nick + ':' + user_id);
                                                text = text + (i + 1) + '.' + user_nick + '(' + user_id + ')';
                                            }
                                        }

                                        if (tex == '!문지기' || tex == '!슈퍼팬') {
                                                //哪个组dom名称
                                                var groupName = '';
                                                var text = '';
                                                // getDom('setbox_viewer').click();
                                                document.getElementById('setbox_viewer').children.item(0).click();
                                                switch (true) {
                                                    case tex == '!manager' || tex == '!문지기':
                                                    // 매니저  管理员
                                                    groupName = 'lv_ul_manager';
                                                    break;
                                                    case tex == '!슈퍼팬':
                                                    // 구독자 高级粉丝
                                                    groupName = 'lv_h3_topfan';
                                                    break;
                                                    case tex == '!팬':
                                                    groupName = 'lv_h3_fan';
                                                    break;
                                                    case tex == '!서포터':
                                                    groupName = 'lv_ul_supporter';
                                                    break;
                                                    default:
                                                    groupName = 'lv_p_bj';
                                                    break;
                                                }


                                                setTimeout(function () {
                                                    getGrups(groupName);
                                                    console.log('text:' + text);
                                                    if (text != '') {
                                                        getDom('testInput').value = text;
                                                        //初始化数据
                                                        getDom('inputFrequency').value = 1;

                                                        getDom('send_message').click();

                                                    } else {
                                                        getDom('testInput').value = tex + ':null';
                                                    }
                                                    getDom('inputFrequency').value = 1;
                                                    // document.getElementById('setbox_viewer').children.item(0).click();

                                                }, 3000);
                                                // document.getElementById('setbox_viewer').children.item(0).click();


                                            }
                                            if (tex == '!open') {

                                                getDom('inputFrequency').value = 6;
                                                document.getElementById('setbox_viewer').children.item(0).click();

                                            }


                                            //!message:q/m/s  /!소식:천천히/중속/서둘러
                                            if (idt.includes('1057123') && tex.includes('!message:') || tex.includes('!m:')) {

                                                //当前速度控制器
                                                var delayInputId = getDom('delayInputId');
                                                //要调节的速度
                                                var speed = tex.substring(tex.indexOf(':') + 1);
                                                //现在的速度
                                                var nowDelayInputId = delayInputId.value;
                                                console.log('speed的值:' + speed);
                                                if (speed == '') {
                                                    console.log('返回当前速度');

                                                    //发送当前速度
                                                    //转换速度英文值为韩语
                                                    if (nowDelayInputId == 'slowSpeed') {
                                                    // getDom('testInput').value=tex+'천천히';
                                                    getDom('write_area').innerHTML = tex + '천천히';
                                                        // send_message
                                                        getDom('btn_send').click();
                                                        //慢速命令
                                                    } else if (nowDelayInputId == 'meiumSpeed') {
                                                    // getDom('testInput').value=tex+'중속';
                                                    getDom('write_area').innerHTML = tex + '중속';
                                                    getDom('btn_send').click();
                                                        //慢速命令
                                                    } else if (nowDelayInputId == 'quick') {
                                                    // getDom('testInput').value=tex+'서둘러';
                                                    getDom('write_area').innerHTML = tex + '서둘러';
                                                    getDom('btn_send').click();
                                                } else {
                                                        //发送
                                                        getDom('write_area').innerHTML = tex + 'null';
                                                        getDom('btn_send').click();


                                                    }


                                                } else {

                                                    if (speed == nowDelayInputId) {
                                                        console.log('当前已经是:' + speed);


                                                    } else {
                                                     //慢速命令
                                                     if (speed == 's' || speed == '천천히') {
                                                        delayInputId.value = 'slowSpeed';
                                                        //慢速命令
                                                    } else if (speed == 'm' || speed == '중속') {
                                                        delayInputId.value = 'meiumSpeed';
                                                        //慢速命令
                                                    } else if (speed == 'q' || speed == '서둘러') {
                                                        delayInputId.value = 'quick';

                                                    }
                                                    //速度调节
                                                    getDom('retrievalButtonId').click();
                                                }

                                            }
                                            console.log('进入调速模式');

                                        }
                                            //发送按钮语言

                                            if (tex == '!보내다' || tex == '!send' || tex == '!发送') {

                                                $('#write_area').html($('#showMessage').html());
                                                getDom('btn_send').click();
                                            }

                                            //语言命令(在有新消息的情况下执行)
                                            // &&tex='!시간'||tex='!时间'
                                            if (idt == '1057123772' && tex == '!시간') {
                                                var date = new Date();
                                                console.log('시간:' + date);
                                            }
                                            // !자동시간알림自动报时间启动
                                            if (idt.includes('10571237') && tex == '!자동시간알림') {
                                                console.log('管理员(' + idt + '):' + '보고시간(自动报时)');
                                                document.getElementById('autoTimeId').click();

                                            }
                                            // !보고시간现在手动的时间
                                            if (tex == '!보고시간' || tex == '!시간' || tex == '!time') {
                                                console.log('管理员(' + idt + '):' + '보고시간(报告时间)');
                                            //获取1-3的随机数字
                                            // console.log(parseInt(Math.random()*NO/1));
                                            var rdmNo = parseInt(Math.random() * 3 / 1 + 1);
                                            setTimeout(function () {
                                                document.getElementById('handTimeId').click();
                                            }, rdmNo * 1000);


                                        }

                                            //!방송시작시간广播开始时间
                                            function getSonButtonDom1(dom) {
                                                dom = document.getElementsByClassName(dom).item(0).children[0].lastChild;
                                                return dom;
                                            }

                                            if (tex == '!방송시작시간') {
                                                var detail_view = getSonButtonDom1('detail_view');

                                                sendMessage(detail_view.textContent);


                                            }


                                            //收藏或者点赞
                                            function getSonButtonDom(dom) {
                                                dom = document.getElementsByClassName(dom).item(0).children[0];
                                                return dom;
                                            }

                                            if (tex == '!별' || tex == '!즐겨찾기' || tex == '!UP' || tex == '!좋아요' || tex == '!좋아') {
                                                //收藏
                                                var bookmarkSonDom;
                                                //点赞
                                                var up_recommend;
                                                switch (true) {
                                                    case tex == '!별' || tex == '!즐겨찾기':
                                                    bookmarkSonDom = getSonButtonDom('bookmark');
                                                    if (bookmarkSonDom.className == '') {
                                                        bookmarkSonDom.click();
                                                        setTimeout(function () {
                                                            bookmarkSonDom = getSonButtonDom('bookmark');
                                                            if (bookmarkSonDom.className == 'on') {
                                                                sendMessage('@' + nickName + ':즐겨찾기 추가 성공');
                                                            } else {
                                                                sendMessage('@' + nickName + ':즐겨찾기 추가 실수');
                                                            }
                                                        }, 1000);
                                                    } else {
                                                            //收藏失败,您已经收藏
                                                            sendMessage('@' + nickName + ':이미 즐겨찾기');
                                                        }
                                                        break;
                                                        case tex == '!UP' || tex == '!좋아요' || tex == '!좋아':
                                                        up_recommend = getSonButtonDom('up_recommend');
                                                        if (up_recommend.className == 'on') {
                                                        //点赞失败,您已经点赞
                                                        sendMessage('@' + nickName + ':이미 좋아요 표시됨');

                                                    } else if (up_recommend.className == '') {
                                                        up_recommend.click();
                                                        setTimeout(function () {
                                                            up_recommend = getSonButtonDom('up_recommend');
                                                            if (up_recommend.className == 'on') {
                                                                console.log('点赞成功:' + up_recommend.className);
                                                                sendMessage('@' + nickName + ':좋아요 성공');
                                                            } else {
                                                                console.log('点赞失败');
                                                                sendMessage('@' + nickName + ':좋아요 실수');
                                                            }
                                                        }, 1000);
                                                    }
                                                    break;
                                                    default:
                                                    break;
                                                }
                                            }


                                            //!멈추다 停止
                                            //内容发送!text:😗😗,2x3  !text:😗,2x0.01  !text:/짱좋아//짱좋아/,3x2
                                            // !text:/즐거워/,5x5 id 는 이것 을 포함 해야만 명령 을 실행 할 수 있 습 니 다.이 명령 은 관리자 의 채 팅 번역 기능 을 닫 아야 합 니 다.수 동 설정 도 같은 효과 입 니 다.
                                            // !text:😗,2x1 명령 권한 이 열 렸 습 니 다.관리자 계 정 이나 앵 커 계 정 은 채 팅 번역 기능 을 닫 아야 합 니 다.

                                            if (tex.includes('!text:') && tex.includes('x')) {
                                                function getDom(dom) {
                                                    var dom = document.getElementById(dom);
                                                    return dom;
                                                }

                                                var testInput = getDom('testInput');
                                                var inputTimes = getDom('inputTimes');
                                                var inputFrequency = getDom('inputFrequency');
                                            //固定位置
                                            var text = tex.substring(6, tex.lastIndexOf(','));
                                            var firstNo = tex.substring(tex.lastIndexOf(',') + 1, tex.lastIndexOf('x'));
                                            var lastNo = tex.substring(tex.lastIndexOf('x') + 1);

                                            //获取1-3的随机数字
                                            // console.log(parseInt(Math.random()*NO/1));
                                            var rdmNo = parseInt(Math.random() * 3 / 1 + 1);
                                            setTimeout(function () {
                                                //发送数据
                                                getDom('testInput').value = text;
                                                getDom('inputTimes').value = firstNo;
                                                getDom('inputFrequency').value = lastNo;
                                                var send_message = getDom('send_message');
                                                send_message.click();
                                                //数据还原1,1
                                                getDom('testInput').value = testInput_last.value;
                                                // getDom('inputTimes').value=inputTimes_last.value;
                                                // getDom('inputFrequency').value=inputFrequency_last.value;
                                                getDom('inputTimes').value = 1;
                                                getDom('inputFrequency').value = 1;
                                            }, rdmNo * 1000);
                                        }
                                    }
                                }
                                le = document.getElementsByTagName('dt').length;
                            }
                                //获取信息的延迟时间
                            }, delayInputFrequency);
}

function isStart() {
                            //渲染特效
                            // $('#retrievalButtonId').toggleClass()
                            $("#retrievalButtonId").toggleClass('btn-success btn-inverse');
                            let showMessageDivClass = $('#showMessageDiv').attr('class');
                            console.log(showMessageDivClass);
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


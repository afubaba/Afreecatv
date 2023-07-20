구글 플러그인 액세스 발표，최신 플러그인 다운로드 주소
谷歌插件访问发布，最新插件下载地址
--
<a href="https://github.com/afubaba/AfreecatvChromeExtensions" target="_blank">플러그인 주소</a>&nbsp;<a href="https://afubaba.github.io/Afreecatv/RobotCommand.html" target="_blank">명령 매뉴얼</a>

<a href="https://github.com/afubaba/AfreecatvChromeExtensions" target="_blank">插件地址</a>&nbsp;<a href="https://afubaba.github.io/Afreecatv/RobotCommand.html" target="_blank">命令手册</a>

# 수동 입력 액세스 (스크립트를 사용하는 로딩 방법 테스트) (대부분의 주요 브라우저에서 아프리카 TV 웹 사이트 홈 페이지에서 콘솔을 사용하여 다음 명령을 입력할 수 있도록 지원합니다. 유람기를 새로 고칠 때 콘솔에 다시 입력해야 합니다. 프로그래밍 기반이 있는 사람에게 적합합니다.)手动输入访问（测试使用脚本的加载方式）（支持大多数主流浏览器的在非洲电视网站主页使用控制台输入下面的命令，刷新游览器时需要在控制台重新输入，适合有编程基础的人）
--
임의의 브라우저에서 F12를 눌러 개발자 도구 창에 들어가 console (또는 콘솔로 번역) 를 찾아 다음 세 가지 방법 중 하나를 복사하여 붙여넣습니다. 온라인 가져오기, 홈 페이지 내 방법의 사람)
在任意浏览器按F12进入开发者工具窗口，找到console（或者翻译为控制台），复制并粘贴以下三种方式之一：在线导入，主页内方式的人）
--
1.최신 자바스크립트 로딩 방식1.最新的JavaScript加载方式
-- 
afreecatv.index.js(콘솔 입력，간소화된 홈페이지)
afreecatv.index.js(控制台输入，简化的主页)

	$("head").append("<script src='https://afubaba.github.io/Afreecatv/js/ajax.afreecatv.index.js'/>");
       

--------------------------------------------------
--
2. iframe 프레임워크를 사용하여 로드 (홈 페이지의 아프리카 로고 이미지를 클릭하면 콘솔에 스크립트를 다시 입력하지 않고 웹 사이트를 새로 고칠 수 있습니다. 홈 페이지의 콘솔에서는 다음과 같은 몇 가지 방법을 사용합니다. 로드 효과는 동일합니다.)
2.使用iframe框架加载（点击主页的非洲Logo图片可以刷新网站，而不用重新在控制台输入脚本，在主页的控制台使用以下几种方式，加载出来效果是一样的）
--
ajax.frame.all.html 온라인 방식 로드(console콘솔 입력，투명한 홈페이지)
ajax.frame.all.html在线加载（控制台输入，透明的主页）
	
       1.$("#list-section").load("https://afubaba.github.io/Afreecatv/ajax.frame.all.html");

       2.$.get("https://afubaba.github.io/Afreecatv/ajax.frame.all.html", function(result){ $("#list-section").html(result);});

       3.$.ajax({
               url:'https://afubaba.github.io/Afreecatv/ajax.frame.all.html',
               type:'get',
               success:function(result,statis){
                   console.log(result);
                   console.log(statis);
                   $("#broadlist_area").html(result);
               },
               error:function(error,errorMessage){
                   console.log(error);
                   console.log(errorMessage);
               }
           });
       4.fetch("https://afubaba.github.io/Afreecatv/ajax.frame.all.html").then((response) => {
	       if (response.ok) {
		       response.text().then(function(resolve) {
			 	$("#broadlist_area").html(resolve);
			})
		}
       }, (error) => {
              console.log(error);
       });


------------------------------------------------------------------------------------------------------------------------

--
3. html 태그 교체 방식을 지원하여 지정된 생방송실에 들어가서 다음 몇 개의 파일 내용을 파일 이름 태그로 복사하여 파일 이름 태그를 교체한 다음 start를 클릭하여 시작(이 버전은 개념판, 최초 버전)3.支持html标签替换方式，需要进入指定的直播间， 复制以下几个文件内容到文件名标签 替换文件名标签，然后点击start启动 (此版本为概念版，最初始的版本)
--
------------------------------------------------------------------------------------------------------------------------

       list_area대체 방법(모든브라우저지원).html
       list_area替代方法（支持所有浏览器）.html
       
       chat_write 대체 방법(Chrome을 핵심으로 하는 브라우저만 해당, 파이어폭스가 start를 클릭하면 반응하지 않아 시작할 수 없음).html
       chat_write替代方法（仅限以Chrome为核心的浏览器，火狐点击start没反应，无法启动）.html
 ------------------------------------------------------------------------------------------------------------------------       

# Afreecatv.html

------------------------------------------------------------------------------------------------------------------------
ChromeExtension：chrome모든 크롬 내장 유람 플러그인 버전 1.1 발표
--
simpleChromeExtension-master.crt 파일:chrome 플러그인，simpleChromeExtension-master.pem:chrome 플러그인 키
이 플러그인은 특수효과 외부의 특수효과를 자동으로 영구적으로 보존하고 다음에 유람기를 시작하면 다시 컨트롤러에 입력할 필요가 없습니다. 다운로드한 후 크롬 핵으로 끌어가는 유람기 확장 플러그인을 사용하여 메인 사이트를 직접 방문할 수 있습니다.https://afreecatv.com, 추가 작업 없이 효과를 자동으로 액세스


모든 유람 기 에서 console 컨트롤 러 를 찾 아 다음 세 가지 방식 중 하 나 를 복사 하여 붙 여 넣 습 니 다.온라인 도입, 홈 페이지 내 방식
--
一.최신 자바스크립트 로딩 방식
--     
afreecatv.index.js(console콘솔 입력，간소화된 홈페이지)

       $("head").append("<script src='https://afubaba.github.io/Afreecatv/js/afreecatv.index.js'/>");
       

二.Afreecatv 엔 터 테 인 먼 트 코드
--
ajax.frame.all.html 온라인 방식 로드(console콘솔 입력，투명한 홈페이지)

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

------------------------------------------------------------------------------------------------------------------------

三.모든 브라우저가 어디에서나 복사됨.html 홈 페이지 에 붙 여 넣 기 내용 을 수 동 으로 복사 합 니 다.
------------------------------------------------------------------------------------------------------------------------
좋아 하 는 앵 커 사이 에서 바 꾸 기.

       list_area대체 방법(모든브라우저지원).html
       chat_write대체 방법(크롬 브라우저 전용).html
 ------------------------------------------------------------------------------------------------------------------------       


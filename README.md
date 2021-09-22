# Afreecatv.html
一.최신 자바스크립트 로딩 방식 (console콘솔 입력，간소화된 홈페이지)
-------------------------------------------------------------------
       $("head").append("<script src='https://afubaba.github.io/Afreecatv/js/afreecatv.index.js'></script>");
       

二.Afreecatv 엔 터 테 인 먼 트 코드
       홈 페이지 내 방식
------------------------------------------------------------------------------------------------------------------------

모든 유람 기 에서 console 컨트롤 러 를 찾 아 다음 세 가지 방식 중 하 나 를 복사 하여 붙 여 넣 습 니 다.온라인 도입
--
ajax.frame.all.html 온라인 방식 로드

1.$("#list-section").load("https://raw.githubusercontent.com/afubaba/Afreecatv/main/ajax.frame.all.html");


2.$.get("https://raw.githubusercontent.com/afubaba/Afreecatv/main/ajax.frame.all.html", function(result){ $("#list-section").html(result);});

3.$.ajax({
        url:'https://raw.githubusercontent.com/afubaba/Afreecatv/main/ajax.frame.all.html',
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
모든 브라우저가 어디에서나 복사됨.html 홈 페이지 에 붙 여 넣 기 내용 을 수 동 으로 복사 합 니 다.
------------------------------------------------------------------------------------------------------------------------

   좋아 하 는 앵 커 사이 에서 바 꾸 기.
   ------------------------------------------------------------------------------------------------------------------------
       list_area대체 방법(모든브라우저지원).html
       chat_write대체 방법(크롬 브라우저 전용).html


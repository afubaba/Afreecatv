# 一.플러그인 액세스 사용（플러그인 유람기를 설치하면 자원을 자동으로 호출합니다. 매번 컨트롤러에서 자원을 중복 호출할 필요가 없습니다. 초보자에게 적합합니다.）

------------------------------------------------------------------------------------------------------------------------
chrome모든 크롬 내장 유람 플러그인 발표,(.crx 파일:chrome 플러그인)
--
v1.1-mv2（edge, whale,google-chrome 등 크롬 핵심 유람기만 지원）:이 버전은 Manifest mv2를 사용하여 플러그인으로github 자원에 접근하여(https://github.com/afubaba/Afreecatv) 네트워크 속도가 좋은 클라이언트를 위해 사용합니다
--
v1.2-mv2（edge, whale,google-chrome 등 크롬 핵심 유람기만 지원）:이 버전은 Manifest mv2를 사용하여 플러그인으로github 자원에 접근하여(https://github.com/afubaba/Afreecatv) 네트워크 속도가 좋은 클라이언트를 위해 사용합니다
--
v2.1-mv2（모든 유람기를 겸용하다）:이 버전은 Manifest mv2를 플러그인으로 사용하여 로컬 정적 자원에 접근하여 네트워크 속도 지연을 낮추고 스크립트 속도를 향상시킵니다.
--
v2.2-mv2（모든 유람기를 겸용하다）:이 버전은 Manifest mv2를 플러그인으로 사용하여 로컬 정적 자원에 접근하여 네트워크 속도 지연을 낮추고 스크립트 속도를 향상시킵니다.
--
3.1-mv3:새로운 Manifest v3 테스트 중
--
사용법:이 확장은 압축 해제판 확장으로 크롬 핵심 유람기는 개발자 모드를 열고 압축된 패키지를 불러옵니다. 화호 유람기는 이 프로그램을 디버깅하고 확장을 임시로 불러옵니다.중국어와 한국어만 지원됩니다.
개성화된 부분 내용 옵션은 클라이언트에 저장되며 새 생방송에 들어가면 다시 설정할 필요가 없습니다. 이 확장 프로그램은 어떠한 정보도 올리지 않습니다. 기능 부분은 인스타그램에 연결된 사용자의 모든 앨범을 자동으로 열 수 있습니다.
이 플러그인은 특수효과 외부의 특수효과를 자동으로 영구적으로 보존하고 다음에 유람기를 시작하면 다시 컨트롤러에 입력할 필요가 없습니다. 다운로드한 후 크롬 핵으로 끌어가는 유람기 확장 플러그인을 사용하여 메인 사이트를 직접 방문할 수 있습니다.https://afreecatv.com, 추가 작업 없이 효과를 자동으로 액세스

최신 플러그인 다운로드 주소：https://github.com/afubaba/AfreecatvChromeExtensions
--
# 二.수동 입력 액세스（대부분의 메인스트림급 유람기 콘솔 입력，유람기를 새로 고칠 때 컨트롤러에서 다시 호출해야 합니다,프로그래밍 기초가 있는 사람에게 적합하다）
모든 유람 기 에서 console 컨트롤 러 를 찾 아 다음 세 가지 방식 중 하 나 를 복사 하여 붙 여 넣 습 니 다.온라인 도입, 홈 페이지 내 방식
--
1.최신 자바스크립트 로딩 방식
--     
afreecatv.index.js(console콘솔 입력，간소화된 홈페이지)

       $("head").append("<script src='https://afubaba.github.io/Afreecatv/js/ajax.afreecatv.index.js'/>");
       

2.Afreecatv 엔 터 테 인 먼 트 코드
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

3.모든 브라우저가 어디에서나 복사됨.html 홈 페이지 에 붙 여 넣 기 내용 을 수 동 으로 복사 합 니 다.
------------------------------------------------------------------------------------------------------------------------
좋아 하 는 앵 커 사이 에서 바 꾸 기.

       list_area대체 방법(모든브라우저지원).html
       chat_write대체 방법(크롬 브라우저 전용).html
 ------------------------------------------------------------------------------------------------------------------------       


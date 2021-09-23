<%@page import="org.apache.tomcat.util.http.parser.Cookie"%>
<%@page%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.util.Date"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>首页</title>
<!-- <script type="text/javascript" src="js/jquery-3.4.1.js"></script> -->
<!--    手机自适应网页-->
<meta charset="UTF-8" name="viewport"
	content="width=device-width, initial-scale=1" />

<style type="text/css">
@import url("css/index.css");

@import "css/bootstrap.min.css";

@import "css/debug.css";
</style>

<link rel="stylesheet" type="text/css" href="css/sys_exploy.css"></link>


<!-- <link rel="stylesheet" type="text/css" href="web.css" media="screen"> -->

<link rel="stylesheet" type="text/css" href="css/bootstrap.css"></link>
<script type="text/javascript" src="js/jquery1.7.2.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>

<%--<script type="text/javascript" src="webjars/jquery/1.7.2/jquery.min.js"></script>--%>



<script type="text/javascript" src="js/bootstrap-dropdown-2.0.2.js"></script>

<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/background.js"></script>
<script type="text/javascript" src="js/popup-new-window.js"></script>
<script type="text/javascript" src="js/debug.js"></script>


<%--    <script src="js/sys_exploy.js"></script>--%>


</head>

<body style="text-align: center;">
	<!-- <video src="video/aa.mp4" autoplay="autoplay" controls></video> -->


	<div class="navigationBar">

		<div class="navbar">

			<%--        class="navbar-inner"--%>

			<div>
				<div class="container">

					<ul class="nav nav-pills">
						<li><select id="changeBackground"
							onchange="changeBackgroundImage()">
								<option id="whiteBack" value="white">white</option>
								<option id="blackBack" value="black">black</option>
								<option id="onlineBack" selected="selected">online</option>

						</select></li>
						<li class="active"><a href="index.jsp">首页</a></li>

						<li class="dropdown" id="menutest1" style="display: none"><a
							class="dropdown-toggle" data-toggle="dropdown" href="#menutest1">
								下拉项 <b class="caret"></b>
						</a>
							<ul id="dropdown-menu1" class="dropdown-menu">
								<li><a href="#">动作</a></li>
								<li><a href="#">另一个动作</a></li>
								<li><a href="#">其他</a></li>
								<li class="divider"></li>
								<li><a href="#">被间隔的链接</a></li>
							</ul></li>
						<%--                    <li class='active'>--%>
						<%--                        <a data-toggle="dropdown" href="#menutest1">点击我看看</a>--%>
						<%--                    </li>--%>


						<li class="dropdown" id="menutest2"><a
							class="dropdown-toggle" data-toggle="dropdown" href="#menutest2">
								<i class="icon-tint icon-white"></i> 开发功能 <b class="caret"></b>
						</a>
							<ul class="dropdown-menu">


								<li><a href="#">签到</a></li>
								<li><a href="jsp/createDatebase.jsp">快速创建数据库</a></li>
								<li><a href="#">手机适配</a></li>
								<li class="divider"></li>
								<li><a href="#"
									onclick="changeMenus('testGoAdminController')">thymeleaf-language</a></li>
								<li><a href="#"
									onclick="changeMenus('test/echarts-index-test.jsp')">echarts-index-test</a></li>
							</ul></li>


						<li class="dropdown" id="menutest3"><a
							class="dropdown-toggle" data-toggle="dropdown" href="#menutest3">
								<i class="icon-folder-open icon-white"></i> 文件管理功能<b
								class="caret"></b> <a href="javascript:;"
								onclick="openRequestedPopup('TestServlet');"><i
									class="icon-plus-sign icon-white"></i>FileAdmin</a> <a
								href="javascript:;"
								onclick="openRequestedPopup('goCommunionController');"><i
									class="icon-plus-sign icon-white"></i>即时聊天</a>


						</a>
							<ul class="dropdown-menu">
								<li><a onclick="changeMenus('TestServlet')">文件管理</a></li>


								<li><a href="AdminServlet?req=download">进入下载页面</a></li>
								<li><a href="html/notebook.html">记事本</a></li>
								<li class="divider"></li>
								<li><a href="html/notebook.html">yasuo</a></li>

							</ul></li>

						<li class="dropdown" id="menutest4"><a
							class="dropdown-toggle" data-toggle="dropdown" href="#menutest4">
								<i class="icon-refresh icon-white"></i> 测试功能 <b class="caret"></b>
						</a>
							<ul class="dropdown-menu">
								<li><a href="AdminServlet?req=codeProduct">代码生成器</a></li>
								<li><a href="#">代码测试机</a></li>
								<li><a href="test/TestLoginServlet.jsp">进入测试页 </a></li>
								<li class="divider"></li>
								<li><a href="#">被间隔的链接</a></li>

							</ul></li>

						<li class="dropdown" id="menutest5"><a
							class="dropdown-toggle" data-toggle="dropdown" href="#menutest5">
								<i class="icon-exclamation-sign icon-white"></i> 娱乐功能 <b
								class="caret"></b>
						</a>
							<ul class="dropdown-menu">
								<li><a onclick="changeMenus('html/LOL.html')">LOL</a></li>
								<li><a href="GoSuperAdminServlet">韩语学习</a></li>

								<!-- <li><a href="jsp/video-index.jsp">电影播放器</a></li> -->
								<li><a onclick="changeMenus('videoPlayController')">电影播放器</a></li>
								<!-- <li><a href="jsp/audio-index.jsp">音乐播放器</a></li> -->
								<li><a onclick="changeMenus('audioPlayerController')">音乐播放器
								</a></li>


								<li class="divider"></li>
								<li><a onclick="changeMenus('pdfReadController')">pdf阅读器</a></li>
								<li><a onclick="changeMenus('pdfShowController')">pdf阅读器</a></li>

								<li><a onclick="changeMenus('videoPlayController')">pdf阅读器</a></li>
								<li class="divider"></li>
								<li><button
										onclick="changeMenus('https://play.afreecatv.com/1004suna/234559302')">aftv11</button></li>
								<li><button
										onclick="changeMenus('https://play.afreecatv.com/thelddl/234892854')">aftv22</button></li>

								<li><button
										onclick="changeMenus('https://play.afreecatv.com/eunz1nara/235769928')">aftv33</button></li>
								<li><button onclick="changeMenus('https://afreecatv.com')">afreecatv</button></li>


							</ul></li>




						<li class="dropdown" id="menutest6"><a
							class="dropdown-toggle" data-toggle="dropdown" href="#menutest6">
								<i class="icon-asterisk  icon-white"></i> 管理员 <b class="caret"></b>
						</a>
							<ul class="dropdown-menu">
								<li><a href="AdminServlet?req=updateUser">修改用户</a></li>

								<li><a
									onclick="changeMenus('CheckServlet?inputUser=admin&inputPassword=admin')">adminIndex</a>
								</li>

								<li><a href="#">자명종</a></li>
								<li><a href="#" onclick="changeMenus('plan_table.html')">计划表</a></li>
								<li class="divider"></li>

								<li><a href="GoSuperAdminServlet">超级管理员入口</a></li>


							</ul></li>

						<li class="dropdown" id="menutest7">
							<%--                        href="#menutest7"--%> <a
							class="dropdown-toggle" data-toggle="dropdown"> <i
								class="icon-question-sign icon-white"></i> 帮助 <b class="caret"></b>
						</a>
							<ul class="dropdown-menu">
								<li><a href="AdminServlet?req=updateUser">Translate</a></li>
								<li class="divider"></li>
								<li><a href="#">被间隔的链接</a></li>
								<li><a href="html/website.html" target="_blank">网址大全</a></li>

							</ul>
						</li>


						<li class="dropdown" id="menutest8">
							<%--                       --%> <a class="dropdown-toggle"
							data-toggle="dropdown" href="#menutest8"> <i
								class="icon-eye-open icon-white"></i>DeBug <b class="caret"></b>
						</a>
							<ul class="dropdown-menu">

								<li><a href="javascript:;" onclick="openDebug()">show
										border</a></li>
								<li><a href="javascript:;" onclick="clearAllBackground()">hide
										all background</a></li>

								<li class="divider"></li>

							</ul>
						</li>


						<li><input type="text" />seach <i
							class="icon-search icon-white"></i></li>


					</ul>
				</div>
			</div>
		</div>


		<div style="text-align: right;border:1px red solid">

			<i class="icon-user icon-white"></i> ${requestScope.nickName}
			<%
				String reques = (String) request.getAttribute("nickName");

			if (reques != null) {
				out.print(",欢迎你,<a id='removeLogin'href='LoginoutServlet'onclick='logout()' style='margin-right: 200px'>注销</a>");

			} else {
				out.print("<a id='loginLogin' href='jsp/login/login.jsp' style='margin-right: 200px'>登录</a>");
			}
			%>

		</div>

		<div class="menuLists">


			<div class="tabbable">
				<ul class="nav nav-tabs">
					<li class="active"><a href="#1" data-toggle="tab">章节 1</a></li>
					<li><a href="#2" data-toggle="tab">章节 2</a></li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane active" id="1">
						<p>这里是章节 1.</p>
					</div>
					<div class="tab-pane" id="2">
						<p>这里是章节 2.</p>
					</div>
				</div>
			</div>



			<%--        <iframe src="CheckServlet?inputUser=admin&inputPassword=admin" style="width: 100%;height:  1000px">--%>

			<%--        </iframe>--%>

			<iframe id="myShowMenu" src=""
				style="width: 100%; height: 1000px; border: 5px yellow dotted">
			</iframe>

		</div>

		Languages: <a id="langSetCN" onclick="changeLanguages('zh')">Chinese&nbsp&nbsp</a><a
			id="langSetUS" onclick="changeLanguages('en')">English&nbsp&nbsp</a><a
			id="langSetKR" onclick="changeLanguages('ko')">Korean</a> <br />
		Made in milk 2020
	</div>


	<%--<h2>首页</h2>--%>

	<%--<iframe style="width: 100%;height: 100%" src="html/sys_exploy.html">--%>
	<%--    --%>
	<%--</iframe>--%>


	<div class="mydiv" style="display: none">
		<div class="mydiv1">

			<h2 align="center">Milk Exploy System</h2>

		</div>
		<div class="mydiv2">
			<div align="center">
				<input type="text" id="select" align="left" value="input answer" />
				<input type="button" onclick="found()" value="查询" />
				<ul>
					<%--                <li>提示1</li>--%>
					<%--                <li>提示2</li>--%>
				</ul>
			</div>
		</div>

		<div class="myddiv" style="text-align: center">
			<div name="text" align="center"></div>
			<div name="text" align="center"></div>
			<div name="text" align="center"></div>
			<div name="text" align="center"></div>
			<div name="text" align="center"></div>
			<div name="text" align="center"></div>
			<div name="text" align="center"></div>
			<div name="text" align="center"></div>
			<div name="text" align="center"></div>
			<div name="text" align="center"></div>
			<div name="text" align="center"></div>
			<div name="text" align="center"></div>
		</div>

		<div id="showTime"></div>
	</div>


	</br>

	<%!public String n;

	public void hello() {
		n = "11";
	}

	;

	Date d = new Date();%>

	<%
		//    out.print("本机时间是：" + d + "<br/>");
	//    out.print("局部变量");
	//    String name = "aaa";
	//    out.print(name + "<br/>后面<br/>" + n);
	//    //request.getCharacterEncoding();
	//    request.getParameter("11");
	//    request.getParameterValues("11");

	//request.getRequestDispatcher("b.jsp").forward(request, response);
	//request.getContextPath();//获取项目的ServletContex对象
	//request.getParameterNames();
	//request.getParameterMap();

	hello();

	/*request.getRequestDispatcher("/WEB-INF/a.jsp").forward(request,response);
	 */
	%>

	<%--<%=name + "<br/>后面<br/>" + n%>--%>

</body>
</html>
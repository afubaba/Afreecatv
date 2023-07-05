// cookie관련 함수들을 정의한다.

var pdboxCookie = new Array();

function Parse_Cookie(doc)
{
	var cookieList = doc.cookie.split("; ");

	pdboxCookie = new Array();
	for(var i = 0; i < cookieList.length; i++)
	{
		var name = cookieList[i].split("=");
		pdboxCookie[unescape(name[0])] = unescape(name[1]);
	}

	return cookieList.length;
}

function Read_Cookie(name)
{
	for(cookie in pdboxCookie)
	{
		if(cookie == name)
		{
			if(pdboxCookie[cookie] != "undefined")
				return pdboxCookie[cookie];
		}
	}

	return "";
}

function Set_Pop_Cookie(doc, name)
{
	Parse_Cookie(doc);
	var popupcookie = Read_Cookie("ChkPopUp");
	var value = "";

	if(popupcookie == "")
	{
		value = name + "|1";
	}
	else
	{
		var List = popupcookie.split("&");
		var hasName = false;

		for(var i = 0; i < List.length; i++)
			{
			var PopUpName = List[i].split("|");

			if ( PopUpName == "" )
				break ;

			if ( name == PopUpName[0] )
			{
				var chgName = PopUpName[0] + "|1";
				value += chgName + "&" ;
				hasName = true;
			}
			else
			{
				value += List[i] + "&" ;
			}

			}// end of for()

		if(hasName == false)
		{
			value += name + "|1";
			}
		}// end of if...else...

	var expireDate = new Date;
	if(name=="speed_notice") {		// 일주일간 안보이기
		expireDate.setTime(expireDate.getTime() + 60*60*24*7);
	}
	else {
		expireDate.setTime(expireDate.getTime() + 60*60*24*1000);
	}
	var option1 = "expires="+expireDate.toGMTString() ;
    var option2 = "path=/" ;

	doc.cookie = "ChkPopUp=" + value + "; " + option1 + "; " + option2 ;
	return ;
}

function Is_Pop_View(doc, name)
{
	Parse_Cookie(doc);
	var popupcookie = Read_Cookie("ChkPopUp");

	if ( popupcookie == "" )
		return 0 ;

	var List = popupcookie.split("&") ;

	for(var i = 0; i < List.length; i++)
	{
		var PopUpName = List[i].split("|") ;
		if ( name == PopUpName[0] )
			return PopUpName[1] ;
	}

	return 0;
}

function setCookie( name, value, domain, expiredays )
{
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + "; domain="+domain+";" ;
}
/**
 * 
 */
window.onload = function() {
	//全局变量
	$name = $("#name");
	$website = $("#website");
	$remarks = $("#remarks");
	$showLinkTbodyId = $("#showLinkTbodyId");
	//数据操作
	$updateOneLink = $("#updateOneLink");
	$deleteOneLink = $("#deleteOneLink");

	$website.focus(function() {

	});
	$website.blur(function() {
		if (!$website.val().includes("https://")) {
			$website.val("https://" + $website.val());
		}
	});
	//初始化时显示数据
	searchAllLink();

}

//加密同步
function asisServet() {
	const config = {
		name: 'lsqy',
		password: 'yourpassword',
		ak: 'XXXXXXXXXX',
		sk: 'XXXXXXXXXX'
	}
	console.log(config);

	// 生成blob对象
	const blobContent = new Blob(
		[JSON.stringify(config, null, 2)],
		{ type: 'application/json' }
	);
	console.log(blobContent);
	// 构建下载链接
	const blobUrl = window.URL.createObjectURL(blobContent)

	document.write = blobUrl;

	document.body.innerHTML = blobUrl;

}
//插入一个链接
function addOneLink() {
	var students = [
		{ name: $name.val(), website: $website.val(), remarks: $remarks.val() },
	];

	if ('indexedDB' in window) {

		//删除数据库
		//deleteMyDatabase("TestDB");
		/*insertOneLink(students);*/
		opreationIndexDB("TestDB", 1, "link", students, "insertOneData");

	} else {
		console.log("你的游览器不支持indexDB");
	}


}
function deleteOneLink(id) {
	console.log(id);
	opreationIndexDB("TestDB", 1, "link", id, "deleteOneLink");
}
function updateOneLink(id) {
	console.log(id);
	var students = [
		{ id: id, name: $name.val(), website: $website.val(), remarks: $remarks.val() },
	];
	searchAllLink();
}

function searchAllLink() {
	console.log("全部");
	opreationIndexDB("TestDB", 1, "link", null, "serachAllData");
}




//查找
function searchOneLink() {
	console.log("查找一个");
	linkObject = { id: 3, website: "https://www.afreecatv.com" };
	opreationIndexDB("TestDB", 1, "link", linkObject, "searchOneLink");
}



//数据返回操作
function allDataCallback(result) {
	/*	let $name = $("#name");
		let $website = $("#website");
		let $remarks = $("#remarks");
		let $showLinkTbodyId = $("#showLinkTbodyId");*/

	$showLinkTbodyId.empty();
	for (var i = 0; i < result.length; i++) {
		/*console.log(result[i]);*/
		$showLinkTbodyId.append("<tr><th>" + (i + 1) + "</th><th>" + result[i].id + "</th><td><a href=" + result[i].website + " target=_blank >" + result[i].name + "</a></td><td><a href=" + result[i].website + " target=_blank >" + result[i].website + "</a></td><td>" + result[i].remarks + "</td></tr>");

	}
	//点击数据的时候
	$("td").click(function() {
		//清除其他th,td的背景色
		$("#showLinkTbodyId td,th").css("background-color", "").css("color", "blue").css("font-size", "large");
		//渲染选中的
		$(this).parent().children().css("background-color", "black").css("color", "white").css("font-size", "30px");
		//id赋值事件
		$deleteOneLink.attr("onclick", "deleteOneLink(" + $(this).parent().children().get(1).innerText + ")");
		$updateOneLink.attr("onclick", "updateOneLink(" + $(this).parent().children().get(1).innerText + ")");
		//同步要操作的数据
		$name.val($(this).parent().children().get(2).innerText)
		$website.val($(this).parent().children().get(3).innerText);
		$remarks.val($(this).parent().children().get(4).innerText);

	});
}








/*var debug = { hello: "world" };
			var blob = new Blob([JSON.stringify(debug)], { type: 'application/json' });
			console.log(blob);*/
/*function createDateabase() {
	if ('indexedDB' in window) {
		// 如果数据库不存在则创建，如果存在但是version更大，会自动升级不会复制原来的版本
		console.log("创建数据库对象：");
		console.log(indexedDB.deleteDatabase);
		var req = indexedDB.open("TestDB1", 1);


		console.log(req);
		req.onupgradeneeded = function(e) {

			console.log('onupgradeneeded');
			var db = req.result;
			// var store = db.createObjectStore("student", {autoIncrement: true}); 使用自增键
			// 创建student表
			var store = db.createObjectStore("student", { keyPath: 'id' });
			// 设置id为主键
			store.createIndex('student_id_unqiue', 'id', { unique: true });
		}

		req.onsuccess = function(event) {
			console.log('onsuccess');
			//声明数据



			var students = [
				{ id: 1, name: '小叶', age: '11' },
				{ id: 2, name: '小王', age: '12' },
				{ id: 3, name: '小张', age: '13' },
				{ id: 4, test: 'test' }
			];
			// 获取数据库
			var db = event.target.result;
			// var transaction = db.transaction('student', 'readwrite');
			var transaction = db.transaction(['student'], 'readwrite');

			transaction.onsuccess = function(event) {
				console.log('[Transaction] 好了!');
			};

			//读取表名
			var studentsStore = transaction.objectStore('student');
			students.forEach(function(student) {
				//数据储存
				var db_op_req = studentsStore.add(student);
				db_op_req.onsuccess = function() {
					console.log("存好了");
				}
			});

			studentsStore.count().onsuccess = function(event) {
				console.log('学生个数', event.target.result);
			};

			// 获取id为1的学生
			studentsStore.get(1).onsuccess = function(event) {
				console.log('id为1的学生', event.target.result);
			};

			// 更新id为1的学生
			students[0].name = '小小叶';
			studentsStore.put(students[0]).onsuccess = function(event) {
				console.log('更新id为1的学生姓名', event.target.result);
			};

			// 删除id为2的学生
			studentsStore.delete(2).onsuccess = function(event) {
				console.log('id为2的学生已经删除');
			};
		}

		req.onerror = function() {
			console.log("数据库出错");
		}
	} else {
		console.log('你的浏览器不支持IndexedDB');
	}
}
*/
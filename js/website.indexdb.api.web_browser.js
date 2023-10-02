/**
 * 我的indexdb使用库
 */
//删除指定数据库
function deleteMyDatabase(databaseName) {
	try {
		indexedDB.deleteDatabase(databaseName);
		console.log("deleteMyDatabase：删除数据库成功！");

	} catch (event) {
		//删除数据库失败
		console.log("删除数据库失败");
		console.log(event);

	}

}

//创建或者连接数据库对象
function getIndexDB(dbName, target) {
	/*固定的数据*/
	console.log("创建或者连接数据库对象：start");
	var req = indexedDB.open(dbName, target);
	console.log(req);
	return req;
};


function opreationIndexDB(dbName, target, tableName, students, opreation) {
	//获取数据库
	var req = getIndexDB(dbName, target);
	/*触发条件：
	1.数据库被打开
	2.打开数据库的版本号高于当前被持久话的数据库版本号*/
	req.onupgradeneeded = function(e) {
		console.log('onupgradeneeded');
		var db = req.result;
		// 创建student表
		//使用自增键
		//keyPath: 'id'自动同步key的id增加到我的数据
		var store = db.createObjectStore(tableName, { keyPath: 'id', autoIncrement: true });
		//自己设置ID
		//var store = db.createObjectStore("link", { keyPath: 'id' });
		// 设置id为主键
		store.createIndex(tableName + '_id_unqiue', 'id', { unique: true });
	}

	/*需要操作的数据*/
	req.onsuccess = function(event) {
		console.log('onsuccess');
		// 获取数据库
		var db = event.target.result;
		// var transaction = db.transaction('student', 'readwrite');
		//事物
		var transaction = db.transaction(['link'], 'readwrite');
		transaction.onsuccess = function(event) {
			console.log('[Transaction] 好了!');
		};
		transaction.onerror = function(event) {
			console.log('[Transaction] 错误!');
		};
		//读取表名
		var studentsStore = transaction.objectStore(tableName);
		console.log(studentsStore);

		switch (opreation) {
			case "insertOneData":
				insertOneLink(students, studentsStore);
				break;

			case "deleteOneLink":
				deleteOneData(studentsStore, students)
				break;
			case "updateOneLink":
				updateOneData(studentsStore, students)
				break;
			case "searchOneLink":
				searchOneData(studentsStore, students);
				break;
			case "serachAllData":
				getAllData(studentsStore);
				break;


		}
		/*studentsStore.count().onsuccess = function(event) {
			alert("插入成功");
			console.log('onsuccess:数据库个数：', event.target.result);
		};*/
	}

	req.onerror = function() {
		console.log("数据库出错");

	}

}
//删除一个数据
function deleteOneData(studentsStore, students) {
	studentsStore.delete(students).onsuccess = function(event) {
		console.log("id为" + students + "的学生已经删除");
		//更新显示的全部数据
		opreationIndexDB("TestDB", 1, "link", null, "serachAllData");
	};
}
//更新一个数据
function updateOneData(studentsStore, students) {
	console.log("indexdb:" + "更新");
	console.log(students[0]);
	console.log(students[0].no);
	console.log("----------------------------");
	console.log("更新数据");
	/*deleteOneData(studentsStore, students[0].no);*/
	console.log("------------put--------------");
	//查找
	studentsStore.get(students[0].id).onsuccess = function(event) {
		/*students[0].no=event.target.result.no;*/

		/*		console.log(event.target.result);
				event.target.result.no = students[0].no;
				event.target.result.name = students[0].name;
				event.target.result.website = students[0].website;
				event.target.result.remarks = students[0].remarks;
		
				console.log(students);
				console.log(event.target.result);
				studentsStore.put(event.target.result);*/

		console.log(event.target.result);
		console.log("更新数据");
		//更新
		studentsStore.put(students[0]).onsuccess = function(events) {
			console.log(events.target.result);
			//更新显示的全部数据
			opreationIndexDB("TestDB", 1, "link", null, "serachAllData");
		}


	};



	/*	console.log("-----------getAllKeys---------------");
		studentsStore.getAllKeys.onsuccess = function(events) {
			console.log(events.target.result);
		}*/

	/*console.log("-----------getKey---------------");
	studentsStore.getKey().onsuccess = function(events) {
		console.log(events.target.result);
	}*/
	/*console.log("-----------index---------------");
	studentsStore.index().onsuccess = function(events) {
		console.log(events.target.result);
	}*/

	/*	console.log("-----------getAll---------------");
		studentsStore.getAll().onsuccess = function(events) {
			console.log(events.target.result);
		}
		console.log("-----------mozGetAll---------------");
		studentsStore.mozGetAll().onsuccess = function(events) {
			console.log(events.target.result);
		}
	*/
	/*	console.log("-----------openCursor---------------");
		studentsStore.openCursor().onsuccess = function(events) {
			console.log(events.target.result);
		}*/
	/*	console.log("-----------openKeyCursor---------------");
		studentsStore.openKeyCursor().onsuccess = function(events) {
	
			console.log(events.target.result);
	
			var result = [];
			var cursor = events.target.result;
			if (cursor) {
				// cursor.value就是数据对象
	
				// 游标没有遍历完，继续
				result.push(cursor.value);
				cursor.continue();
			} else {
				// 如果全部遍历完毕...调用回调函数返回操作
				console.log(result);
			}
	
		}*/


	console.log("-----------put---------------");
	//更新显示的全部数据
	/*opreationIndexDB("TestDB", 1, "link", null, "serachAllData");*/
}
//读取单个
function getData(stroe, index) {
	var request = stroe.get(index);
	request.onsuccess = function(e) {
		var list = e.target.result;
		returnResult(list);
	}
}
//查询单个
function searchOneData(studentsStore, linkObject) {
	console.log(linkObject);
	/*studentsStore.getAll().onsuccess=function(events){
		console.log(events.target.result);	
	}*/
	//重复数据的结果集
	var result = [];
	studentsStore.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;

		if (cursor) {
			// cursor.value就是数据对象
			//手动设置编号重写为key
			/*cursor.value.no = cursor.key;*/
			// 游标没有遍历完，继续

			if (cursor.value.website == linkObject.website) {
				result.push(cursor.value);
			}
			cursor.continue();
		} else {
			// 如果全部遍历完毕...调用回调函数返回操作
			console.log(result);
		}

	}

}


//读全部信息
function getAllData(store) {
	var result = [];
	store.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
			// cursor.value就是数据对象
			//手动设置编号重写为key
			/*cursor.value.no = cursor.key;*/
			// 游标没有遍历完，继续
			result.push(cursor.value);
			cursor.continue();
		} else {
			// 如果全部遍历完毕...调用回调函数返回操作
			allDataCallback(result);
		}

	}
}








//插入数据
function insertOneLink(students, studentsStore) {
	students.forEach(function(student) {
		//数据储存	
		var db_op_req = studentsStore.add(student);
		db_op_req.onsuccess = function() {
			console.log("存好了");
			opreationIndexDB("TestDB", 1, "link", null, "serachAllData");
		}
	});
}



/*	studentsStore.count().onsuccess = function(event) {
		alert("插入成功");
		console.log('onsuccess:数据库个数：', event.target.result);
	};
	studentsStore.count().onerror = function(even) {
		alert("插入失败");
		console.log('onerror:数据库个数：', event);
	};

	// 获取id为1的学生
	console.log("-------------- 获取id为1的学生-----------------");
	console.log(studentsStore.get(1));

	studentsStore.get(1).onsuccess = function(event) {
		console.log('onsuccess:id为1的数据：', event.target.result);
	};
	studentsStore.get(1).onerror = function(event) {
		console.log('onerror:id为1的数据：', event.target.result);
		console.log(event);
	};
	console.log("-------------- 获取id为1的学生-----------------");*/
/*
		// 更新id为1的学生
		students[0].name = '小小叶';
		studentsStore.put(students[0]).onsuccess = function(event) {
			console.log('更新id为1的学生姓名', event.target.result);
		};

		// 删除id为2的学生
		studentsStore.delete(2).onsuccess = function(event) {
			console.log('id为2的学生已经删除');
		};*/

//清理表格数据studentsStore


//生成任意文件并且下载
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

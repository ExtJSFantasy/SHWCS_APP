//mui.ajax请求数据
function mAjax(url, params, callback) {
	var _checkData = JSON.parse(getLsItem("checkData"));
	var _token_type = _checkData.token_type;
	var _accessToken = _checkData.access_token;
	mui.ajax(url, {
		data: params,
		dataType: 'json',
		type: 'get',
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", _token_type + " " + _accessToken);
		},
		/*beforeSend: function() {
	       	plus.nativeUI.showWaiting("加载中。。。");
	       // mask.show();//显示遮罩层
	    },
	    complete: function() {
	        plus.nativeUI.closeWaiting();
	       // mask.close();//关闭遮罩层
	    },*/
		//async:false,//同步操作
		success: function(data) {
			callback(data)
		},
		error: function(xhr, type, errorThrown) {
			console.log(xhr);
			console.log(type);
			mui.toast("请求异常")
		}
	})
}

function mpostAjax(_url, params, successCallback, errCallback) {
	var _checkData = JSON.parse(getLsItem("checkData"));
	var _token_type = _checkData.token_type;
	var _accessToken = _checkData.access_token;
	mui.ajax(_url, {
		data: params,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		//timeout: 10000, //超时时间设置为10秒；
		headers: {
			'Content-Type': 'application/json'
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", _token_type + " " + _accessToken);
		},
		success: function(data) {
			successCallback(data)
		},
		error: function(xhr, type, errorThrown) {
			errCallback(xhr, type, errorThrown)
		}
	});
}
//包含
function arrContain(arr, e) {
	for(i = 0; i < arr.length; i++) {
		if(arr[i].id == e)
			return true;
	}
	return false;
}
//包含
function arrContain2(newarr, e) {
	console.log(newarr + "----" + e);
		for(i = 0; i < newarr.length; i++) {
			if(newarr[i].steps.id == e)
				return true;
		}
		return false;
}

//按某个属性排序
function compare(property) {
	return function(obj1, obj2) {
		var value1 = obj1[property]
		var value2 = obj2[property]
		return value1 - value2 // 升序
	}
}

function getAppName() {
	console.log();
	return "SHWCS";
}

/****************************LocalStorage操作********************************/
/**
 * 获取localStorage存储的key，前面加上MES-
 * @param  {String} key 原始key
 * @return {String}     前面加了MES-的key
 */
function getLsKey(key) {
	if(key == null) return '';
	return getAppName() + '-' + key;
}
/**
 * 根据key获取localStorage的值
 * @param  {String} key 键
 * @return {String}     值
 */
function getLsItem(key) {
	return localStorage.getItem(this.getLsKey(key));
}
/**
 * 根据key获取localStorage的值
 * @param  {String} key 键
 * @param  {String} value 值
 */
function setLsItem(key, value) {
	localStorage.setItem(this.getLsKey(key), value);
}
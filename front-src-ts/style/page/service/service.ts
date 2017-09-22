import { AjaxPost } from '../../../other-component/build/AjaxPost-0.0.1.js';
let _window: any = window;
export function requestVCode() {
	console.log(AjaxPost)
}
var registerPost_loading_getUserInfo = false;
export function ServiceGetUserInfo(success, complete = function(){}, prompt = function(){}, force = false) {
	if (!force && registerPost_loading_getUserInfo) {
		prompt();
		return;
	}
	registerPost_loading_getUserInfo = true;
	
	AjaxPost({
		url: '//mns.hupu.com/surennvshen/ajax/get_user_info',
		dataType: 'json',
		success: function(jsondata){
			success(jsondata);
		},
		complete: function(){
			registerPost_loading_getUserInfo = false;
			complete();
		}
	});
}

var registerPost_loading_registerPost = false;
export function ServiceRegisterPost(data: any, success, complete, prompt) {
	if (registerPost_loading_registerPost) {
		prompt();
		return;
	}
	registerPost_loading_registerPost = true;
	
	AjaxPost({
		url: '//mns.hupu.com/surennvshen/ajax/login',
		dataType: 'json',
		data: data,
		success: function(jsondata){
			success(jsondata);
		},
		complete: function(){
			registerPost_loading_registerPost = false;
			complete();
		}
	});
}

var registerPost_loading_requestVCode = false;
export function ServiceRequestVCode(data, success, complete = function(){}, prompt = function(){}){
	if (registerPost_loading_requestVCode) {
		prompt();
		return;
	}
	registerPost_loading_requestVCode = true;
	
	AjaxPost({
		url: '//mns.hupu.com/surennvshen/ajax/sms',
		dataType: 'json',
		data: data,
		success: function(jsondata){
			success(jsondata);
		},
		complete: function(){
			registerPost_loading_requestVCode = false;
			complete();
		}
	});
}

var registerPost_loading_requestSignUp = false;
export function ServiceRequestSignUp(data, success, complete = function(){}, prompt = function(){}){
	if (registerPost_loading_requestSignUp) {
		prompt();
		return;
	}
	registerPost_loading_requestSignUp = true;
	
	AjaxPost({
		url: '//mns.hupu.com/surennvshen/ajax/sign',
		dataType: 'json',
		data: data,
		success: function(jsondata){
			success(jsondata);
		},
		complete: function(){
			registerPost_loading_requestSignUp = false;
			complete();
		}
	});
}

var registerPost_loading_requestGoddess = false;
export function ServiceRequestGoddess(data, success, complete = function(){}, prompt = function(){}){
	if (registerPost_loading_requestGoddess) {
		prompt();
		return;
	}
	registerPost_loading_requestGoddess = true;
	
	AjaxPost({
		url: '//mns.hupu.com/surennvshen/ajax/goddess_list',
		dataType: 'json',
		data: data,
		success: function(jsondata){
			success(jsondata);
		},
		complete: function(){
			registerPost_loading_requestGoddess = false;
			complete();
		}
	});
}

// 过时
var ServiceRequestSendScore_num_use_over = false;
var ServiceRequestSendScore_num_use_over_msg = '';
var ServiceRequestSendScore_hupu_no_login = false;
var ServiceRequestSendScore_hupu_no_login_msg = '';
export function ServiceRequestSendScore(data, success){
	if (ServiceRequestSendScore_num_use_over) {
		alert(ServiceRequestSendScore_num_use_over_msg)
		return 
	}
	if (ServiceRequestSendScore_hupu_no_login){
		WhetherToLogin();
		return
	}
	data.sid = _window.sid;
	AjaxPost({
		url: '//mns.hupu.com/surennvshen/ajax/score',
		dataType: 'json',
		data: data,
		success: function(jsondata){
			success(jsondata);
			if (jsondata.code == -2) {
				ServiceRequestSendScore_num_use_over_msg = jsondata.message;
				ServiceRequestSendScore_num_use_over = true;
			}else if (jsondata.code == -1) {
				ServiceRequestSendScore_hupu_no_login_msg = jsondata.message;
				ServiceRequestSendScore_hupu_no_login = true;
				WhetherToLogin();
			}
		}
	});
}
export function ServiceRequestSendScoreV2(data, success, complete){
	data.sid = _window.sid;
	AjaxPost({
		url: '//mns.hupu.com/surennvshen/ajax/score',
		dataType: 'json',
		data: data,
		success: function(jsondata){
			if (jsondata.code == 0) {
				// 打分成功
				success(jsondata);
			}else if (jsondata.code == -1) {
				ServiceRequestSendScore_hupu_no_login_msg = jsondata.message;
				WhetherToLogin();
			}else{
				alert(jsondata.message);
			}
		},
		complete: function(){
			complete();
		}
	});
}
function WhetherToLogin(){
	if (confirm(ServiceRequestSendScore_hupu_no_login_msg)) {
		var a = document.createElement('a');
		a.href = 'https://passport.hupu.com/pc/login';
		a.click();
	}
}

export function ScoreEscape(item){
	if (item.score == 10) {
		item._score = item.score;
		item.score = 9.9;
	}
	item.scoreInt = Math.floor(item.score);
	item['score-int'] = item.scoreInt;
	item.scorePoint = Math.floor(item.score * 10 % 10);
	item['score-point'] = item.scorePoint;
	return item;
}
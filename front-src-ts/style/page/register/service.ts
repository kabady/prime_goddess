import { AjaxPost } from '../../../other-component/build/AjaxPost-0.0.1.js';

export function requestVCode() {
	console.log(AjaxPost)
}
var registerPost_loading = false;
export function registerPost(data: any, success, complete, prompt) {
	if (registerPost_loading) {
		prompt();
		return;
	}
	registerPost_loading = true;
	
	console.log(AjaxPost)

	success();
	setTimeout( ()=>{
		registerPost_loading = false;
		complete()
	}, 1000)
}
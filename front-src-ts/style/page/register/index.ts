import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js'
import { ServiceRequestVCode, ServiceRegisterPost, ServiceGetUserInfo } from '../service/service.ts';
import { verificationPhone } from '../../../other-component/build/Verification-0.0.1.js';
import { APP } from '../../../entry/main.ts';

export default class RegisterPage extends Page {
	yzmBtnTxtElem: any;
	yzmBtnTxt: any;

	phoneInputElem: any;
	yzmInputElem: any;
	yzmBtnElem: any;

	suerBtnElem: any;

	promptTimeHide: any;
	promptTimeInit: any;

	app: APP;
	constructor(app: APP) {
		let option = {
			el: $.render(HTML).getEl(0),
			Event: () => {
				this.Event();
			}
		}
		super(option);

		this.yzmBtnTxtElem = this.domElem.find('.yzm .prompt-box span');
		this.yzmBtnTxt = this.yzmBtnTxtElem.text();

		this.phoneInputElem = this.domElem.find('.phone .txt');
		this.yzmInputElem = this.domElem.find('.yzm .txt');

		this.app = app;
	}
	Event(){
		this.yzmBtnElem = this.domElem.find('.yzm .prompt-box');
		this.yzmBtnElem.on('click', (e) => {
			$.pdsp(e);

			var data_phone = this.phoneInputElem.getEl(0).value;
			if (verificationPhone(data_phone)) {
				this.yzmBtnElem.addClass('pointer-events-none')
				ServiceRequestVCode({
					phone: data_phone
				}, (jsondata) => {
					if (jsondata.code == 0) {
						this.startVCodeCountDowm(60);
					}else{
						alert(jsondata.message)
					}
				}, () => {
					this.yzmBtnElem.removeClass('pointer-events-none');
				});
			}else{
				this.showPhonePrompt();
			}
		});

		this.suerBtnElem = this.domElem.find('.action .sure-btn');
		this.suerBtnElem.on('click', (e) => {
			$.pdsp(e);

			var phoneNumber = this.phoneInputElem.getEl(0).value;
			var vCodeNumber = this.yzmInputElem.getEl(0).value;
			this.suerBtnElem.addClass('pointer-events-none');
			ServiceRegisterPost({
				phone: phoneNumber,
				authcode: vCodeNumber,
			}, (jsondata) => {
				if (jsondata.code == 0) {
					this.whereMeGo(this.suerBtnElem);
				}else{
					alert(jsondata.message);
				}
			}, () => {
				this.suerBtnElem.removeClass('pointer-events-none');
			}, () => {
				alert('正在提交信息中....')
			});
		});

		this.domElem.find('.rule-btn').on('click', (e) => {
			$.pdsp(e);
			this.app.get('rule').showWithAnimate();
			this.hideWithAnimate();
		})
		this.domElem.find('.action .backhome-btn').on('click', (e) => {
			$.pdsp(e);
			this.app.get('home').showWithAnimate();
			this.hideWithAnimate();
		});
	}
	showPhonePrompt(){
		clearTimeout(this.promptTimeHide);
		clearTimeout(this.promptTimeInit);

		var ElemAPI = this.domElem.find('.phone .prompt .prompt-txt-box');
		ElemAPI.addClass('show');
		var ElemAnimationTime = .5;
		var ElemShowTime = 2;
		
		this.promptTimeHide = setTimeout( () => {
			ElemAPI.removeClass('show').addClass('hide')
		}, (ElemAnimationTime + ElemShowTime) * 1000);
		this.promptTimeInit = setTimeout( () => {
			ElemAPI.removeClass('hide').removeClass('show');
		}, (ElemAnimationTime + ElemShowTime + ElemAnimationTime) * 1000);
	}
	startVCodeCountDowm(times: number){
		if (times < 0) {
			this.yzmBtnTxtElem.text( this.yzmBtnTxt );
			this.yzmBtnElem.removeClass('pointer-events-none')
			return;
		}
		this.yzmBtnTxtElem.text(times + 's');
		setTimeout( () => {
			this.startVCodeCountDowm(--times);
		}, 1000)
	}
	whereMeGo(elem){
		elem.addClass('pointer-events-none')
		ServiceGetUserInfo((jsondata) => {
			if (jsondata.code == -1) {
				this.app.get('register').showWithAnimate();
				this.hideWithAnimate();
			}else if (jsondata.code == -2) {
				this.app.get('upload').showWithAnimate();
				this.hideWithAnimate();
			}else if (jsondata.code == 0) {
				this.app.get('uploadUser').showWithAnimate();
				this.hideWithAnimate();
			}
		}, () => {
			elem.removeClass('pointer-events-none')
		});
	}
}



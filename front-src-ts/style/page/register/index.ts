import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js'
import { requestVCode, registerPost } from './service.ts';
import { verificationPhone } from '../../../other-component/build/Verification-0.0.1.js';
import { APP } from '../../../entry/main.ts';

export default class RegisterPage extends Page {
	yzmBtnTxtElem: any;
	yzmBtnTxt: any;

	phoneInputElem: any;
	yzmBtnElem: any;

	suerBtnElem: any;

	promptTimeHide: any;
	promptTimeInit: any;

	app: APP
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

		this.app = app;
	}
	Event(){
		this.yzmBtnElem = this.domElem.find('.yzm .prompt-box')
		this.yzmBtnElem.on('click', (e) => {
			$.pdsp(e);

			if (verificationPhone(this.phoneInputElem.getEl(0).value)) {
				this.yzmBtnElem.addClass('pointer-events-none')
				requestVCode();
				this.startVCodeCountDowm(1);
			}else{
				this.showPhonePrompt();
			}
		});

		this.suerBtnElem = this.domElem.find('.action .sure-btn');
		this.suerBtnElem.on('click', (e) => {
			$.pdsp(e);

			var phoneNumber = this.phoneInputElem.getEl(0).value;
			var vCodeNumber = this.phoneInputElem.getEl(0).value;
			this.suerBtnElem.addClass('pointer-events-none');
			registerPost({
				phoneNumber: phoneNumber,
				vCodeNumber: vCodeNumber,
			}, () => {
				console.log('success')
			}, () => {
				console.log('complete')
				this.suerBtnElem.removeClass('pointer-events-none');
			}, () => {
				alert('正在提交信息中....')
			});
		});

		this.domElem.find('.rule-btn').on('click', (e) => {
			$.pdsp(e);
			alert('rule-page')
		})
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
			ElemAPI.removeClass('hide').removeClass('show')
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
}



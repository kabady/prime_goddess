import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js';
import { APP } from '../../../entry/main.ts';

import ImgMove from '../../../other-component/build/ImgMove-0.0.1.js';
import { ImageRotateFilter } from '../../../other-component/build/ImgKind.js';
import CanvasImg from '../../../other-component/build/CanvasImg.js';

import { ServiceGetUserInfo, ScoreEscape } from '../service/service.ts';
let _window: any = window;

export default class ContestUserPage extends Page {
	app: APP;
	uploadBtn: any;
	fileInput: any;
	userImage: any;
	userImgMove: any;

	promptTimeInit: any;
	promptTimeHide: any;
	userInfo: any;
	userInfoState: number;
	constructor(app: APP) {
		let option = {
			el: $.render(HTML).getEl(0),
			init: () =>{
				this.userInfoState = 0;
			},
			beforeshow: () => {
				this.loadUserInfo();
			},
			Event: () => {
				this.event();
			}
		}
		super(option);

		this.app = app;
	}
	event(){
		this.domElem.find('.backhome-btn').on('click', (e) => {
			$.pdsp(e);
			this.app.get('home').showWithAnimate();
			this.hideWithAnimate();
		});
	}
	injectUserInfo(userInfo){
		this.userInfo = userInfo;
		this.userInfoState = 1;
	}
	loadUserInfo(){
		if (this.userInfoState == 1) {
			// state = 1
			// 数据是新的正确
			// state = 0
			// 没有数据
			// state = 2
			// 数据已经过时
			this.setUserInfo();
			return ;
		}
		ServiceGetUserInfo((jsondata) => {
			if (jsondata.code == 0) {
				this.injectUserInfo(jsondata.data);
				this.setUserInfo();
			}else{
				alert(jsondata.message);
			}
		}, undefined, undefined, true);
	}
	userInfoOutdate(){
		this.userInfoState = 2;
	}
	setUserInfo(){
		var userInfo = this.userInfo;
		if (userInfo.status == 0) {
			this.domElem.find('.picture .user-mask').css({display: 'block'})
			this.domElem.find('.picture .activity-info').css({display: 'none'})
		}else if (userInfo.status == 1) {
			this.domElem.find('.picture .user-mask').css({display: 'none'})
			this.domElem.find('.picture .activity-info').css({display: 'block'})
		}
		userInfo = ScoreEscape(userInfo);

		this.domElem.find('.sorce .int').text( userInfo.scoreInt );
		this.domElem.find('.sorce .point').text( userInfo.scorePoint );
		this.domElem.find('.rank-num .num').text( userInfo.rank );
		this.domElem.find('.user-img').setAttr('src', userInfo.pic);
		this.domElem.find('#username').text(userInfo.name);
		this.domElem.find('#userdetail span').text(userInfo.intro);
		_window.wx && _window.wx.ready(function() {

		    var shareData = {
		        title: userInfo.share_title,
		        desc: userInfo.share_title,
		        link: userInfo.share_link,
		        imgUrl: userInfo.share_pic,
		        success: function() {},
		        cancel: function() {}
		    };
		    _window.wx.onMenuShareTimeline(shareData);
		    _window.wx.onMenuShareAppMessage(shareData);
		});
	}
}

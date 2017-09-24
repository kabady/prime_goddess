import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js';
import { APP } from '../../../entry/main.ts';

import { ServiceRequestGoddess, ServiceRequestSendScoreV2, ScoreEscape } from '../service/service.ts'

export default class ContestPage extends Page {
	app: APP;
	scoreToolElem: any;
	touchSelect: TouchSelect;
	goddessList: Array<any>;
	firstGoddessItem: any;
	goddessIndex: number;

	pictureImageElem: any;
	infoNameElem: any;
	infoNameDetailElem: any;
	scoreIntElem: any;
	scorePointElem: any;
	rankNumElem: any;
	constructor(app: APP) {
		let option = {
			el: $.render(HTML).getEl(0),
			init: () => {
				this.theInit();
			},
			aftershowInit: () =>{
				this.touchSelect = new TouchSelect(
					this.domElem.find('.score-tool .score-list').getEl(0).clientWidth,
					11
				)
			},
			beforeshow: () => {
				this.clearView();
				this.clearSelect();
				this.goddessIndex = 0;
				this.goddessList = [];
				this.addGoddessItem(() => {
					this.setGoddessView(0);
				});
			},
			Event: () => {
				this.event();
			}
		}
		super(option);
		this.app = app;

		this.pictureImageElem = this.domElem.find('.picture img');
		this.infoNameElem = this.domElem.find('.info .name');
		this.infoNameDetailElem = this.domElem.find('.info .detail');
		this.scoreIntElem = this.domElem.find('.sorce .int');
		this.scorePointElem = this.domElem.find('.sorce .point');
		this.rankNumElem = this.domElem.find('.rank-num .num')
	}
	theInit(){
		this.goddessList = [];
	}
	event(){
		this.domElem.find('.action .backhome-btn').on('click', (e) => {
			$.pdsp(e);

			this.app.get('home').showWithAnimate();
			this.hideWithAnimate();
		})

		this.domElem.find('.action .next-prime-goddess-btn').on('click', (e) => {
			$.pdsp(e);

			this.requestNextGoddess();
		});

		this.scoreToolElem = this.domElem.find('.score-tool .score-list');
		this.scoreToolElem.on('touchstart touchmove', (e) => {
			$.pdsp(e);
			this.scoreSelect(e.changedTouches[0] || e.changedTouches[0] || e.targetTouches[0]);
		});
		this.scoreToolElem.on('touchend', (e) => {
			$.pdsp(e);
			this.scoreToolElem.addClass('pointer-events-none');
			var score = this.scoreSelect(e.changedTouches[0] || e.changedTouches[0] || e.targetTouches[0]);
			setTimeout(() => {
				this.requestNextGoddess(score);
				this.scoreToolElem.removeClass('pointer-events-none');
			}, 300)
		})
	}
	addGoddessItem(handle = function() {} ){
		var data = this.firstGoddessItem && { ssid: this.firstGoddessItem.ssid }
		this.firstGoddessItem = '';
		ServiceRequestGoddess(data, (jsondata) => {
			if (jsondata.code == 0) {
				this.goddessList = this.goddessList.concat(jsondata.data);

				console.log(this.goddessList)
				handle();
			}else{
				alert(jsondata.message);
			}
		})
	}
	requestNextGoddess(score?){
		if (score) {
			this.sendGoddessScore(score, () => {
				this.showNextGoddess()
			});
		}else{
			this.clearSelect();
			this.showNextGoddess();
		}
	}
	showNextGoddess(){
		var index = this.goddessIndex + 1;
		if (index >= this.goddessList.length - 2) {
			this.addGoddessItem();
		}
		if (index < this.goddessList.length) {
			this.setGoddessView(index);
		}
	}
	setFirstGoddes(goddess){
		this.firstGoddessItem = goddess;
	}
	setGoddessView(index){
		let item = this.goddessList[index];
		try{
			item = ScoreEscape(item);
		}catch(e){
			alert('你的女神走丢了...请稍后重试');
			return;
		}

		this.pictureImageElem.setAttr('src', item.pic )
		this.infoNameElem.text( item.name );
		this.infoNameDetailElem.text( item.intro );
		this.scoreIntElem.text( item.scoreInt );
		this.scorePointElem.text( item.scorePoint );
		this.rankNumElem.text( item.rank );

		this.goddessIndex = index;
	}
	scoreSelect(touches){
		let selectNum = this.touchSelect.getSelect( touches.clientX )
		this.scoreToolElem.setAttr('equal-index', '_' + selectNum)
		return selectNum;
	}
	clearSelect(){
		this.scoreToolElem.removeAttr('equal-index');
	}
	clearView(){
		this.pictureImageElem.removeAttr('src')
		this.infoNameElem.text( '' );
		this.infoNameDetailElem.text( '' );
		this.scoreIntElem.text( '0' );
		this.scorePointElem.text( '0' );
		this.rankNumElem.text( '100+' );
	}
	sendGoddessScore(score: number, handle){
		var item = this.goddessList[this.goddessIndex];
		ServiceRequestSendScoreV2({ssid: item.ssid, score: score}, (jsondata) => {
			console.log( jsondata );
			this.clearSelect();
			handle();
		}, () => {
			
		})
	}
}

class TouchSelect {
	eachSelectWidth: number;
	selectNum: number;
	constructor(touchWidth, selectNum) {
		this.eachSelectWidth = touchWidth / selectNum;
		this.selectNum = selectNum;
	}
	getSelect(offsetX){
		var whichSelect = offsetX / this.eachSelectWidth;
		whichSelect = Math.floor(whichSelect)
		if (whichSelect >= this.selectNum) {
			whichSelect = this.selectNum - 1;
		}else if(whichSelect < 0){
			whichSelect = 0;
		}
		return whichSelect;
	}
}
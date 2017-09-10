import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js';
import { APP } from '../../../entry/main.ts';


export default class ContestPage extends Page {
	app: APP;
	scoreToolElem: any;
	touchSelect: TouchSelect;
	constructor(app: APP) {
		let option = {
			el: $.render(HTML).getEl(0),
			aftershowInit: () =>{
				this.touchSelect = new TouchSelect(
					this.domElem.find('.score-tool .score-list').getEl(0).clientWidth,
					11
				)
			},
			Event: () => {
				this.event();
			}
		}
		super(option);

		this.app = app;
	}
	event(){
		this.domElem.find('.action .backhome-btn').on('click', (e) => {
			$.pdsp(e);

			this.app.get('home').showWithAnimate();
			this.hideWithAnimate();
		})

		this.domElem.find('.action .next-prime-goddess-btn').on('click', (e) => {
			$.pdsp(e);

			this.nextPrimeGoddess();
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
				this.nextPrimeGoddess(score);
				this.scoreToolElem.removeClass('pointer-events-none');
			}, 300)
		})
	}
	scoreSelect(touches){
		let selectNum = this.touchSelect.getSelect( touches.clientX )
		this.scoreToolElem.setAttr('equal-index', '_' + selectNum)
		return selectNum;
	}
	clearSelect(){
		this.scoreToolElem.removeAttr('equal-index');
	}
	nextPrimeGoddess(score: number = -1){
		let testname = this.domElem.find('.info .name').text()
		this.domElem.find('.info .name').text(testname + ' _' + score);
		console.log(score)
		this.clearSelect();
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
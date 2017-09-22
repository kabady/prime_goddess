import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js'
import { APP } from '../../../entry/main.ts';
import { ServiceGetUserInfo } from '../service/service.ts'
let _window: any = window;

// _window.score_button_open = 1;
// _window.rank_button_open = 1;

export default class HomePage extends Page {
	app: APP;
	constructor(app: APP) {
		let option = {
			el: $.render(HTML).getEl(0),
			Event: () => {
				this.event();
			}
		}
		super(option);

		this.app = app;
	}
	event(){
		this.domElem.find('.action .rule-btn').on('click', (e) => {
			$.pdsp(e);

			this.app.get('rule').showWithAnimate();
			this.hideWithAnimate();
		});

		if (_window.rank_button_open) {
			this.domElem.find('.action .rank-btn').addClass('open')
			this.domElem.find('.action .rank-btn').on('click', (e) => {
				$.pdsp(e);

				this.app.get('rank').showWithAnimate();
				this.hideWithAnimate();
			});
		}else{
			this.domElem.find('.action .rank-btn').addClass('close')
		}
		if (_window.score_button_open) {
			this.domElem.find('.action .score-btn').addClass('open')
			this.domElem.find('.action .score-btn').on('click', (e) => {
				$.pdsp(e);
				
				this.app.get('contest').showWithAnimate();
				this.hideWithAnimate();
			});
		}else{
			this.domElem.find('.action .score-btn').addClass('close')
		}

		this.domElem.find('.action .upload-btn').on('click', (e) => {
			$.pdsp(e);
			var target = e.currentTarget;
			$.render(target).addClass('pointer-events-none')
			ServiceGetUserInfo((jsondata) => {
				if (jsondata.code == -1) {
					this.app.get('register').showWithAnimate();
					this.hideWithAnimate();
				}else if (jsondata.code == -2) {
					this.app.get('upload').showWithAnimate();
					this.hideWithAnimate();
				}else if (jsondata.code == 0) {
					(<any>this.app.get('uploadUser')).injectUserInfo(jsondata.data);
					this.app.get('uploadUser').showWithAnimate();
					this.hideWithAnimate();
				}
			}, () => {
				$.render(target).removeClass('pointer-events-none')
			});
		});
	}
}
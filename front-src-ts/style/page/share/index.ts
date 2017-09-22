import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js';
import { APP } from '../../../entry/share.ts';
import { ScoreEscape } from '../service/service.ts';

let _window: any = window;

export default class SharePage extends Page {
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

		let item = _window.data;

		item = ScoreEscape(item);

		this.domElem.find('.main-img').setAttr('src', item.pic );
		this.domElem.find('.sorce .int').text(item.scoreInt );
		this.domElem.find('.sorce .point').text( item.scorePoint );
		this.domElem.find('.rank-num .num').text( item.rank );
		this.domElem.find('.info .name').text( item.name );
		this.domElem.find('.info .detail').text( item.intro );
	}
	event(){
		// this.domElem.find('.more-prime-goddess').on('click', (e) => {
		// 	$.pdsp(e);
		// })
	}
}
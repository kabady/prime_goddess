import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js'
import { APP } from '../../../entry/main.ts';

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
		this.domElem.find('.action .rank-btn').on('click', (e) => {
			$.pdsp(e);

			this.app.get('rank').showWithAnimate();
			this.hideWithAnimate();
		});
		this.domElem.find('.action .score-btn').on('click', (e) => {
			$.pdsp(e);

			this.app.get('contest').showWithAnimate();
			this.hideWithAnimate();
		});
		this.domElem.find('.action .upload-btn').on('click', (e) => {
			$.pdsp(e);

			this.app.get('upload').showWithAnimate();
			this.hideWithAnimate();
		});
	}
}
import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js';
import { APP } from '../../../entry/main.ts';

import ImgMove from '../../../other-component/build/ImgMove-0.0.1.js';
import { ImageRotateFilter } from '../../../other-component/build/ImgKind.js';
import CanvasImg from '../../../other-component/build/CanvasImg.js';

export default class ContestUserPage extends Page {
	app: APP;
	uploadBtn: any;
	fileInput: any;
	userImage: any;
	userImgMove: any;

	promptTimeInit: any;
	promptTimeHide: any;
	constructor(app: APP) {
		let option = {
			el: $.render(HTML).getEl(0),
			aftershowInit: () => {

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
}

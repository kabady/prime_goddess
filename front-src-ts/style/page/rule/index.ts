import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js';
import VerticalSwiper from '../../../other-component/build/VerticalSwiper-0.0.2.js';
import { APP } from '../../../entry/main.ts';

export default class HomePage extends Page {
	app: APP;
	constructor(app: APP) {
		let option = {
			el: $.render(HTML).getEl(0),
			aftershowInit: function() {
				new VerticalSwiper({
					swiper: this.domElem.find('.v-swiper-container'),
					wrapper: this.domElem.find('.v-swiper-wrapper')
				});
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
	}
}
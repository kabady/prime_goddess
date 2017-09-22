import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js';
import VerticalSwiper from '../../../other-component/build/VerticalSwiper-0.0.2.js';
import { APP } from '../../../entry/main.ts';

export default class Loader extends Page {
	constructor() {
		let option = {
			el: $.render(HTML).getEl(0),
			Event: () => {
				this.event();
			}
		}
		super(option);

	}
	event(){}
	destroy(){
		this.hide();
		// this.domElem.remove()
	}
}
let loader = new Loader();
$('.app .app-wrapper').append(loader.domElem.getElemList());
export function loaderShow() {
	
	loader.show();
}
export function loaderHide() {
	loader.destroy();
}
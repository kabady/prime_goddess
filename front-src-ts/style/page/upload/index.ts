import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js';
import { APP } from '../../../entry/main.ts';


export default class ContestPage extends Page {
	app: APP;
	uploadBtn: any;
	fileInput: any;
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
		// #########
		// ios10 加了这个选择不会出现相册
		// androud 不加这个不会有照相功能
		// 兼容 设备代码
		this.fileInput = this.domElem.find('.file-input');
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
		if (isAndroid) {
		    this.fileInput.setAttr('capture', 'camera');
		}
		this.fileInput.on('change', (e) => {
			this.uploadBtn.addClass('pointer-events-none');
			alert(111)
		});
	}
}

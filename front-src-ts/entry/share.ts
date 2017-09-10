import Rem from '../other-component/build/Rem.js';
Rem.init();
import '../other-component/build/reset-1.0.0.css';
import './index.scss';

let $ = require('../other-component/build/DomAPI-0.0.4.js')

import Page from '../other-component/build/Page-0.0.2.js';

import sharePage from '../style/page/share/index.ts';

export class APP {
	DOMAPI: any = $('.app .app-wrapper');
	page: any = {};
	constructor() {
		// 分享页
		this.page.share = new sharePage(this);
		this.DOMAPI.append( this.page.share.domElem.getElemList() )
		
	}
	start(){
		this.page.share.show();
	}
	get(PageName): Page{
		return this.page[PageName];
	}
}
var app = new APP( );
app.start();

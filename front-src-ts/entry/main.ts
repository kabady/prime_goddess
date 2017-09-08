import Rem from '../other-component/build/Rem.js';
Rem.init();
import '../other-component/build/reset-1.0.0.css';
import './index.scss';

let $ = require('../other-component/build/DomAPI-0.0.3.js')

import HomePage from '../style/page/home/index.ts';

class APP {
	DOMAPI: any = $('.app .app-wrapper');
	page: any = {};
	constructor() {
		this.page.home = new HomePage();
		this.DOMAPI.append( this.page.home.domElem.getElemList() )
	}
	start(){
		this.page.home.show();
	}
}

var app = new APP( );
app.start();
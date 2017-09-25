import Rem from '../other-component/build/Rem.js';
Rem.init();
import '../other-component/build/reset-1.0.0.css';
import './index.scss';

let $ = require('../other-component/build/DomAPI-0.0.4.js')

import Page from '../other-component/build/Page-0.0.2.js';

import HomePage from '../style/page/home/index.ts';
import RegisterPage from '../style/page/register/index.ts';
import RulePage from '../style/page/rule/index.ts';
import RankPage from '../style/page/rank/index.ts';
import ContestPage from '../style/page/contest/index.ts';
import uploadPage from '../style/page/upload/index.ts';
import uploadUserPage from '../style/page/uploadUser/index.ts';

let _window:any = window;
export class APP {
	DOMAPI: any = $('.app .app-wrapper');
	page: any = {};
	constructor() {
		// 首页
		this.page.home = new HomePage(this);
		this.DOMAPI.append( this.page.home.domElem.getElemList() )
		// 注册页
		this.page.register = new RegisterPage(this);
		this.DOMAPI.append( this.page.register.domElem.getElemList() )
		// 规则页
		this.page.rule = new RulePage(this);
		this.DOMAPI.append( this.page.rule.domElem.getElemList() )
		// 排行榜页
		this.page.rank = new RankPage(this);
		this.DOMAPI.append( this.page.rank.domElem.getElemList() )
		// 打分页
		this.page.contest = new ContestPage(this);
		this.DOMAPI.append( this.page.contest.domElem.getElemList() )
		// 上传图片页
		this.page.upload = new uploadPage(this);
		this.DOMAPI.append( this.page.upload.domElem.getElemList() )
		// 上传图片用户页
		this.page.uploadUser = new uploadUserPage(this);
		this.DOMAPI.append( this.page.uploadUser.domElem.getElemList() )
	}
	start(){
		
		let page = GetQueryString('page')
		if (this.page[page] === undefined) {
			page = 'home';
		}
		this.page[page].show();
	}
	get(PageName): Page{
		return this.page[PageName];
	}
}
var app = new APP( );
app.start();

function GetQueryString(name: string): string { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return (r[2]); return null; 
}
_window.version_surennvshen = '1.1.1';
import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js';
import { APP } from '../../../entry/main.ts';
import { ScoreEscape } from '../service/service.ts'

let _window: any = window;

let rank_item_html_template = `
	<div data-index="$idx$" class="rank-item rank-$idx$">
		<div class="picture">
			<div class="over">
				<img data-src="$pic$" alt="">
			</div>
		</div>
		<div class="info">
			<div class="score">
				<span class="g">$score-int$</span>
				<span class="g">.</span>
				<span>$score-point$</span>
				<span>分</span>
			</div>
			<div class="name">$name$</div>
		</div>
	</div>
`;
export default class HomePage extends Page {
	app: APP;
	constructor(app: APP) {
		let option = {
			el: $.render(HTML).getEl(0),
			beforeshowInit: function() {
				this.domElem.find('img[data-src]').each((elem) => {
					var elemAPI = $.render(elem)
					elemAPI.setAttr('src', elemAPI.getAttr('data-src') );
					elemAPI.removeAttr('data-src');
				})
			},
			beforeshow: function(){
				$('.app').addClass('rank-view');
			},
			beforehide: function(){
				$('.app').removeClass('rank-view');
			},
			init(){
				this.initHtml();
			},
			Event: () => {
				this.event();
			}
		}
		super(option);

		this.app = app;
	}
	initHtml(){
		var rank_item_html = '';
		for (let i = 0, len = _window.rank_list.length; i < len; i++) {
			let item = _window.rank_list[i];
			let theItemHtml = rank_item_html_template;
			item = ScoreEscape(item);
			
			for(let key in item){
				if (item.hasOwnProperty(key)) {
					theItemHtml = theItemHtml.replace(new RegExp('\\$' + key + '\\$', 'g'), item[key]);
				}
			}
			rank_item_html += theItemHtml;
		}
		this.domElem.find('.rank-list').getEl(0).innerHTML = rank_item_html;
	}
	event(){
		this.domElem.find('.longzhu-ad .close-ad').on('click', (e) => {
			$.pdsp(e);

			this.domElem.find('.longzhu-ad').remove();
		})
		this.domElem.find('.action .backhome-btn .click-area').on('click', (e) => {
			$.pdsp(e);

			this.app.get('home').showWithAnimate();
			this.hideWithAnimate();
		});

		this.domElem.find('.rank-item').on('click', (e) => {
			var index = $.render(e.currentTarget).getAttr('data-index') - 1;
			
			var contestPage: any = this.app.get('contest')
			contestPage.setFirstGoddes(_window.rank_list[index]);

			this.app.get('contest').showWithAnimate();
			this.hideWithAnimate();
		})
	}
}


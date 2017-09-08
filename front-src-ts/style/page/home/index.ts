import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.3.js' );
import Page from '../../../other-component/build/Page-0.0.1.js'

export default class HomePage extends Page {
	constructor() {
		let option = {
			el: $.render(HTML).getEl(0)
		}
		super(option);
	}
}
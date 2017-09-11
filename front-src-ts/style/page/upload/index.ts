import './index.scss';
let HTML = require( './index.html' );

let $ = require( '../../../other-component/build/DomAPI-0.0.4.js' );
import Page from '../../../other-component/build/Page-0.0.2.js';
import { APP } from '../../../entry/main.ts';

import ImgMove from '../../../other-component/build/ImgMove-0.0.1.js';
import { ImageRotateFilter } from '../../../other-component/build/ImgKind.js';
import CanvasImg from '../../../other-component/build/CanvasImg.js';

export default class ContestPage extends Page {
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
		this.domElem.find('.picture').addClass('waiting-load')
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
			this.fileInput.addClass('pointer-events-none');
			var target = e.target || e.srcElement
			if (target && target.files && target.files[0]) {
				this.domElem.find('.picture').removeClass('waiting-load').addClass('operating-img');
				ImageRotateFilter(target.files[0], (img) => {
					
					$.render(img).addClass('user-img');
					this.domElem.find('.user-img').replace(img);
					this.userImgMove = new ImgMove(
						img,
						null,
						this.domElem.find('.picture .user-event').getEl(0),
					);

					this.userImage = img;
					let containerWidth = this.userImage.clientWidth;
					let containerHeight = this.userImage.clientHeight;

		            this.userImgMove.setConatinerClip({
		                width: containerWidth,
		                height: containerHeight
		            });

		            let clip;
	                if (this.userImage.naturalHeight / this.userImage.naturalWidth < containerHeight / containerWidth) {
	                    clip = {
	                        width: this.userImage.clientHeight / this.userImage.naturalHeight * this.userImage.naturalWidth,
	                        height: containerHeight,
	                        clientX: 0,
	                        clientY: 0
	                    }
	                    // img.style.cssText = 'height: 100%;width: auto;'
	                }else{
	                    // img.style.cssText = 'width: 100%;height: auto;'
	                    clip = {
	                        width: containerWidth,
	                        height: this.userImage.clientWidth / this.userImage.naturalWidth * this.userImage.naturalHeight,
	                        clientX: 0,
	                        clientY: 0
	                    }
	                }
		            this.userImgMove.setClip(clip);
				})
			}
		});

		this.domElem.find('.sure-btn').on('click', (e) => {
			$.pdsp(e);
			let username = this.domElem.find('#username').getEl(0).value;
			let userdetail = this.domElem.find('#userdetail').getEl(0).value;
			if (this.userImgMove === undefined) {
				this.showUserNamePrompt('请选择图片');
			}else if (username == undefined || username == null || username == '') {
				this.showUserNamePrompt('请填写姓名');
			}else if (userdetail == undefined || userdetail == null || userdetail == '') {
				this.showUserNamePrompt('请填写简介');
			}else{
				let canvasImgRender = new CanvasImg();
				let imgMask = this.domElem.find('.user-event').getEl(0);
				let clip_width = imgMask.clientWidth;
				let clip_height = imgMask.clientHeight;

				canvasImgRender.setConatinerClip({
					width: clip_width,
					height: clip_height
				});

				canvasImgRender.pushImgMove(this.userImgMove);
				let imgsrc = canvasImgRender.render();
				// $('body').append( $.render('<img style="position: absolute;left: 0;bottom: 0;width: 100%;" src="'+imgsrc+'">').getEl(0) )
				
			}
		});
	}
	showUserNamePrompt(txt: string = '请填写姓名'){
		this.domElem.find('.name .prompt-float-box span').text(txt);

		let ElemAPI = this.domElem.find('.name .prompt-float-box').removeClass('hide').addClass('show');
		var ElemAnimationTime = .5;
		var ElemShowTime = 2;
		
		this.promptTimeHide = setTimeout( () => {
			ElemAPI.removeClass('show').addClass('hide')
		}, (ElemAnimationTime + ElemShowTime) * 1000);
		this.promptTimeInit = setTimeout( () => {
			ElemAPI.removeClass('hide').removeClass('show')
		}, (ElemAnimationTime + ElemShowTime + ElemAnimationTime) * 1000);
	}
}

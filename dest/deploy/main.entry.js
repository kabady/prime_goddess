/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var a = document.createElement('a');
var a_pathname = document.createElement('a');
var __dirname__list = null;
var __dirname = null;

var __protocol = location.protocol;
var __host = location.host;
var __origin = __protocol + '//' + __host;

setDirName(location.pathname);

function dir2List(path) {
    var pathListNew = [],
        pathList = path.split('/');

    for (var i = 0, len = pathList.length - 1; i < len; i++) {
        if (pathList[i] != '') {
            pathListNew.push(pathList[i]);
        }
    }

    return pathListNew;
}
function dirList2String(pathList) {
    return '/' + pathList.join('/') + '/';
}
function setDirName(path) {
    a.href = path;
    path = a.pathname;
    __protocol = a.protocol;
    __host = a.host;
    __origin = __protocol + '//' + __host;
    __dirname__list = dir2List(path);
    __dirname = dirList2String(__dirname__list);
}

var Cache = {
    update: setDirName,
    getPath: function getPath() {
        return __dirname;
    },
    resolve: function resolve(url) {
        a_pathname.href = __origin + __dirname + url;

        var search = a_pathname.search;
        var hash = a_pathname.hash;

        return a_pathname.href;
    }
};

try {
    Cache.update(document.querySelector('[main-js]').src);
} catch (e) {
    console.error('script 缺少 main-js 属性');
}

module.exports = Cache;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dom 元素操作
 *
 * * 1. 元素选择
 * * 2.
 */
function each(list, handle) {
    for (var i = 0; i < list.length; i++) {
        var result = handle.call(this, list[i], i) || { returnBreak: false };
        if (result.returnBreak === true) {
            return result.returnValue;
        }
    }
}

function _$(selector, elem) {
    return elem ? elem.querySelector(selector) : document.querySelector(selector);
}

function _$s(selector, elem) {
    return elem ? elem.querySelectorAll(selector) : document.querySelectorAll(selector);
}

function $$(elemSelector) {
    return new DomAPI(elemSelector);
}
//########################################################
// ClassList
//########################################################
var CommonClassList = {
    add: addClass,
    remove: removeClass,
    contains: containsClass
};
$$.ClassList = {
    add: addClass,
    remove: removeClass,
    contains: containsClass
};

function containsClass(elem, className) {
    if (!elem) {
        return 'there is no elem';
    }

    var classList = getClassList(elem);
    if (contains(classList, className) < 0) {
        return false;
    }
    return true;
}

function addClass(elem, className) {
    if (!elem) {
        return 'there is no elem';
    }

    var classList = getClassList(elem);
    if (contains(classList, className) < 0) {
        classList.push(className);
    }
    setClassList(elem, classList);
    return elem;
}

function removeClass(elem, className) {
    if (!elem) {
        return 'there is no elem';
    }

    var classList = getClassList(elem);
    var index = contains(classList, className);
    if (index >= 0) {
        classList.splice(index, 1);
        setClassList(elem, classList);
    }
    return elem;
}

function contains(classList, className) {
    for (var i = 0, len = classList.length; i < len; i++) {
        if (classList[i] == className) {
            return i;
        }
    }
    return -1;
}

function getClassList(elem) {
    var classList = (elem.className || '').split(' ');
    for (var i = classList.length - 1; i >= 0; i--) {
        if (classList[i] === '') {
            classList.splice(i, 1);
        }
    }
    return classList;
}

function setClassList(elem, classList) {
    elem.className = classList.join(' ');
}
//########################################################

//########################################################
// attribute
//########################################################
var CommonAttr = function CommonAttr(elem) {
    return {
        get: get,
        set: set,
        remove: remove
    };

    function get(name) {
        return elem && elem.getAttribute(name);
    }

    function set(name, value) {
        elem && elem.setAttribute(name, value);
        return this;
    }

    function remove(name) {
        elem && elem.removeAttribute(name);
        return this;
    }
};
$$.Attr = CommonAttr;
//########################################################

//########################################################
// fast render
//########################################################
function CommonFastRender(str) {
    var div = document.createElement('div');
    div.innerHTML = str;

    var childElements = [];
    for (var i = 0, len = div.childNodes.length - 1; i <= len; i++) {
        if (div.childNodes[i].nodeType == 1) {
            childElements.push(div.childNodes[i]);
        }
    }
    return childElements;
}
$$.isDOMElement = function (obj) {
    return !!(obj && typeof window !== 'undefined' && (obj === window || obj.nodeType));
};
$$.render = function (str) {
    if (typeof str === 'string') {
        var elemList = CommonFastRender(str);
    } else if ($$.isDOMElement(str)) {
        var elemList = [str];
    } else if (str instanceof Array || !isNaN(str.length - 0)) {
        var elemList = Array.prototype.slice.call(str);
    }
    return new DomAPI().setElemList(elemList);
};
//########################################################

//########################################################
// dom 事件 ctrl
//########################################################
$$.Event = {
    on: function on(elem, eventType, next, useCapture) {
        useCapture = useCapture ? true : false;
        if (!elem) {
            return 'has no element in bindEvent';
        }
        if (elem != window && typeof elem.length === 'number' && !elem.nodeType) {
            for (var i = elem.length - 1; i >= 0; i--) {
                bind(elem[i], eventType, next, useCapture);
            }
        } else {
            bind(elem, eventType, next, useCapture);
        }

        function bind(elem, eventType, next, useCapture) {
            var eventTypes = eventType.split(' ');
            for (var i = eventTypes.length - 1; i >= 0; i--) {
                if (elem.addEventListener) {
                    elem.addEventListener(eventTypes[i], next, useCapture);
                } else if (elem.detachEvent) {
                    elem.detachEvent('on' + eventTypes[i], next);
                } else {
                    elem['on' + eventTypes[i]] = next;
                }
            }
        }
    },
    off: function off(elem, eventType, next, useCapture) {
        useCapture = useCapture || false;

        if (!elem) {
            return 'has no element in bindEvent';
        }
        if (elem != window && typeof elem.length === 'number') {
            for (var i = elem.length - 1; i >= 0; i--) {
                unbind(elem[i], eventType, next, useCapture);
            }
        } else {
            unbind(elem, eventType, next, useCapture);
        }

        function unbind(elem, eventType, next, useCapture) {
            var eventTypes = eventType.split(' ');
            for (var i = eventTypes.length - 1; i >= 0; i--) {
                if (elem.removeEventListener) {
                    elem.removeEventListener(eventTypes[i], next, useCapture);
                } else if (elem.detachEvent) {
                    elem.detachEvent('on' + eventTypes[i], next);
                } else {
                    elem['on' + eventTypes[i]] = null;
                }
            }
        }
    }
    //########################################################
};function DomAPI(elemSelector, elemParent) {
    var self = this;
    if (elemSelector !== undefined) {
        self.elemSelector = elemSelector;
    }

    self.elemParent = elemParent || [];
    self.elemExecute = false;

    self.elemList = null;

    self.length = 0;
    self.size = function () {
        return self.getElemList().length;
    };
    self.getElemList = function (index) {
        if (self.elemList == null) {

            self.elemParent = [].slice.call(self.elemParent);

            if (self.elemParent.length === 0) {
                self.elemList = _$s(self.elemSelector);
            } else {
                self.elemList = [];
                each(self.elemParent, function (elemParent) {
                    self.elemList = [].slice.call(_$s(self.elemSelector, elemParent)).concat(self.elemList);
                });
            }
        }
        if (index === undefined) {
            return self.elemList;
        } else {
            return self.elemList[index];
        }
    };
    self.getEl = function (index) {
        return self.getElemList(index);
    };
    self.setElemList = function (elemList) {
        self.elemList = elemList;
        return self;
    };
    //########################################################
    // Class ctrl
    //########################################################
    //
    self.find = function (selector) {
        return new DomAPI(selector, self.getElemList());
        var elemList = self.getElemList();
        var findElemList = [];
        each(elemList, function (elem) {
            findElemList = [].slice.call(_$s(selector, elem)).concat(findElemList);
        });
        self.setElemList(findElemList);
    };
    //########################################################
    // Class ctrl
    //########################################################
    //
    self.addClass = function (className) {
        each(self.getElemList(), function (elem) {
            CommonClassList.add(elem, className);
        });
        return self;
    };
    self.removeClass = function (className) {
        each(self.getElemList(), function (elem) {
            CommonClassList.remove(elem, className);
        });
        return self;
    };
    // 元素列表是否每个元素都存在这个className
    // 每个元素存在ClassName，返回true
    // 每个元素不存在ClassName，返回false
    self.containClass = function (className) {
        var defaultValue = true;
        var value = each(self.getElemList(), function (elem) {
            if (CommonClassList.contains(elem, className) === false) {
                return {
                    returnValue: false,
                    returnBreak: true
                };
            }
        });

        return value === undefined ? defaultValue : value;
    };
    // 元素列表
    self.containClassFilter = function (className, containHandler, notContainHandler) {
        each(self.getElemList(), function (elem, i) {
            if (CommonClassList.contains(elem, className)) {
                containHandler && containHandler(elem, i);
            } else {
                notContainHandler && notContainHandler(elem, i);
            }
        });
        return self;
    };
    //########################################################


    //########################################################
    // attribute ctrl
    //########################################################
    self.getAttr = function (name, handle) {
        var elemList = self.getElemList();
        if (typeof handle == 'function') {
            each(elemList, function (elem) {
                handle(CommonAttr(elem).get(name));
            });
        } else {
            return CommonAttr(elemList[0]).get(name);
        }
    };
    self.setAttr = function (name, value) {
        each(self.getElemList(), function (elem) {
            CommonAttr(elem).set(name, value);
        });
    };
    self.removeAttr = function (name) {
        each(self.getElemList(), function (elem) {
            CommonAttr(elem).remove(name);
        });
    };
    //######################################################## 

    //########################################################
    // dom 插入删除 ctrl
    //########################################################
    self.append = function (insertElemList) {
        each(self.getElemList(), function (elem) {
            if (typeof insertElemList.length == 'number') {
                each(insertElemList, function (insertElem) {
                    elem.appendChild(insertElem);
                });
            } else {
                elem.appendChild(insertElemList);
            }
        });
    };
    self.appendBefore = function (insertElemList) {
        each(self.getElemList(), function (elem) {
            if (typeof insertElemList.length == 'number') {
                each(insertElemList, function (insertElem) {
                    elem.insertBefore(insertElem, elem.children[0]);
                });
            } else {
                elem.insertBefore(insertElem, elem.children[0]);
            }
        });
    };
    self.remove = function () {
        each(self.getElemList(), function (elem) {
            if (elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
        });
    };
    //########################################################

    //########################################################
    // dom 事件 ctrl
    //########################################################
    self.on = function (eventType, next, useCapture) {
        var self = this;
        each(eventType.split(' '), function (theEventType) {
            $$.Event.on(self.getElemList(), theEventType, next, useCapture);
        });
    };

    self.off = function (eventType, next, useCapture) {
        $$.Event.off(this.getElemList(), eventType, next, useCapture);
    };
    self.each = function (handle) {
        var elemList = this.getElemList();
        for (var i = elemList.length - 1; i >= 0; i--) {
            handle(elemList[i], i);
        }
    };
    //########################################################


    //########################################################
    // style 样式 ctrl
    //########################################################
    self.css = function (cssStyle) {
        var elemList = self.getElemList();
        each(elemList, function (elem) {
            for (var styleName in cssStyle) {
                if (cssStyle.hasOwnProperty(styleName)) {
                    elem.style[styleName] = cssStyle[styleName];
                }
            }
        });
        return this;
    };
    self.cssArray = function (cssStyleList) {
        var self = this;
        cssStyleList = cssStyleList || [];
        each(cssStyleList, function (cssStyle) {
            self.css(cssStyle);
        });
        return this;
    };
    self.index = function (index) {
        return $$.render([this.getElemList(index)]);
    };

    self.height = function (value) {
        each(self.getElemList(), function (elem) {
            elem.style.height = value + 'px';
        });
    };
    self.width = function (value) {
        each(self.getElemList(), function (elem) {
            elem.style.width = value + 'px';
        });
    };

    //########################################################
    // innerhtml innerText  ctrl
    //########################################################
    self.text = function (text) {
        var elemList = self.getElemList();
        if (text === undefined) {
            each(elemList, function (elem) {
                var theText = '';
                theText = elem.innerText;
                theText = theText === '' ? elem.textContext : theText;
                text = theText;
            });
            return text;
        }
        each(elemList, function (elem) {
            elem.innerText = text;
            elem.textContext = text;
        });
    };
    self.html = function (html) {
        if (html === undefined) {
            each(elemList, function (elem) {
                html = elem.innerHTML;
            });
            return html;
        }
        var elemList = self.getElemList();
        each(elemList, function (elem) {
            elem.innerHTML = html;
        });
    };

    //########################################################
    // position  ctrl
    //########################################################
    self.positionTop = function () {
        var elemList = self.getElemList();
        var top = 0;
        if (elemList[0]) {
            var elem = elemList[0];
            while (elem.tagName != 'BODY' && elem.tagName != 'HTML') {
                top += elem.offsetTop;
                elem = elem.parentNode;
            }

            return top;
        } else {
            return 0;
        }
    };
    self.parents = function (parentNodeSelector) {
        var elemList = [];
        if (parentNodeSelector) {
            var parentCandidate = $$(parentNodeSelector).getElemList();
            var elem = this.getElemList(0).parentNode;
            var parentNodeFind = false;
            while (elem.tagName !== 'BODY' && parentNodeFind === false) {
                each(parentCandidate, function (elemCandidate) {
                    if (elem == elemCandidate) {
                        elemList.push(elemCandidate);
                        parentNodeFind = true;
                    }
                });
                elem = elem.parentNode;
            }
        } else {
            each(this.getElemList(), function (elem) {
                elemList.push(elem.parentNode);
            });
        }
        return $$.render(elemList);
    };
}

//########################################################
// event preventDefault and stopPropagation  ctrl
//########################################################
$$.pdsp = function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
};
//########################################################


//########################################################
// Class mark
//########################################################
$$.Class = DomAPI;
$$.version = '0.0.4';
module.exports = $$;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(14);

var _DomAPI = __webpack_require__(3);

var _DomAPI2 = _interopRequireDefault(_DomAPI);

var _ViewTransition = __webpack_require__(9);

var _ViewTransition2 = _interopRequireDefault(_ViewTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(option) {
        var _this = this;

        _classCallCheck(this, _class);

        if (this.domElem) {} else if (option.el instanceof _DomAPI2.default.Class) {
            this.domElem = opt.el;
        } else if (typeof option.el == 'string') {
            // 字符串
            this.domElem = (0, _DomAPI2.default)(option.el);
        } else if (option.el.nodeType && (option.el.nodeType == 1 || option.el.nodeType == 9)) {
            // 元素对象
            this.domElem = _DomAPI2.default.render([option.el]);
        }
        this.domElem.addClass('view').addClass('hide');
        this.showMark = false;

        option.init && option.init.call(this, this.getElem());
        option.Event && option.Event.call(this, this.getElem());

        this.__event = {};
        this.__event.beforeshow = option.beforeshow;
        this.__event.aftershow = option.aftershow;
        this.__event.beforehide = option.beforehide;
        this.__event.afterhide = option.afterhide;

        this.__disposableEvent = {};
        this.__disposableEvent.beforeshow = function () {
            _this.__disposableEvent.beforeshow = function () {};option.beforeshowInit && option.beforeshowInit.call(_this, _this.getElem());
        };
        this.__disposableEvent.aftershow = function () {
            _this.__disposableEvent.aftershow = function () {};option.aftershowInit && option.aftershowInit.call(_this, _this.getElem());
        };
        this.__disposableEvent.beforehide = function () {
            _this.__disposableEvent.beforeshow = function () {};option.beforehideInit && option.beforehideInit.call(_this, _this.getElem());
        };
        this.__disposableEvent.afterhide = function () {
            _this.__disposableEvent.beforeshow = function () {};option.afterhideInit && option.afterhideInit.call(_this, _this.getElem());
        };
        this.hide();
    }

    _createClass(_class, [{
        key: 'distory',
        value: function distory() {
            this.domElem && this.domElem.remove();
        }
    }, {
        key: 'getElem',
        value: function getElem() {
            return this.domElem;
        }
    }, {
        key: 'getOriginalElem',
        value: function getOriginalElem() {
            return this.domElem.getElemList(0);
        }
    }, {
        key: 'showWithAnimate',
        value: function showWithAnimate(animateHandle) {
            var _this2 = this;

            if (this.isShow() === true) {
                return 'page is showing';
            }
            this.showMark = true;
            (0, _ViewTransition2.default)({
                elem: this.getOriginalElem(),
                start: 'hide',
                end: 'show',
                complete: function complete() {
                    _this2.__event.aftershow && _this2.__event.aftershow.call(_this2, _this2.getElem());
                    _this2.__disposableEvent.aftershow();
                    typeof animateHandle == 'function' && animateHandle.call(_this2);
                }
            });
            this.__event.beforeshow && this.__event.beforeshow.call(this, this.getElem());
            this.__disposableEvent.beforeshow();
        }
    }, {
        key: 'hideWithAnimate',
        value: function hideWithAnimate(animateHandle) {
            var _this3 = this;

            if (this.isShow() === false) {
                return 'page is hidding';
            }
            this.showMark = false;
            this.__disposableEvent.beforehide();
            (0, _ViewTransition2.default)({
                elem: this.getOriginalElem(),
                start: 'show',
                end: 'hide',
                complete: function complete() {
                    _this3.__event.afterhide && _this3.__event.afterhide.call(_this3, _this3.getElem());
                    _this3.__disposableEvent.afterhide();
                    typeof animateHandle == 'function' && animateHandle.call(_this3);
                }
            });
            this.__event.beforehide && this.__event.beforehide.call(this, this.getElem());
            this.__disposableEvent.beforehide();
        }
    }, {
        key: 'show',
        value: function show() {
            if (this.isShow() === true) {
                return 'page is showing';
            }
            this.showMark = true;
            this.__event.beforeshow && this.__event.beforeshow.call(this, this.getElem());
            this.__disposableEvent.beforeshow();
            this.getElem().removeClass('hide');
            this.getElem().addClass('show');

            this.__event.aftershow && this.__event.aftershow.call(this, this.getElem());
            this.__disposableEvent.aftershow();
        }
    }, {
        key: 'hide',
        value: function hide() {
            if (this.isShow() === false) {
                return 'page is hidding';
            }
            this.showMark = false;
            this.__event.beforehide && this.__event.beforehide.call(this, this.getElem());
            this.__disposableEvent.beforehide();
            this.getElem().removeClass('show');
            this.getElem().addClass('hide');

            this.__event.afterhide && this.__event.afterhide.call(this, this.getElem());
            this.__disposableEvent.afterhide();
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return this.showMark;
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dom 元素操作
 *
 * * 1. 元素选择
 * * 2.
 */
function each(list, handle) {
    for (var i = 0; i < list.length; i++) {
        var result = handle.call(this, list[i], i) || { returnBreak: false };
        if (result.returnBreak === true) {
            return result.returnValue;
        }
    }
}

function _$(selector, elem) {
    return elem ? elem.querySelector(selector) : document.querySelector(selector);
}

function _$s(selector, elem) {
    return elem ? elem.querySelectorAll(selector) : document.querySelectorAll(selector);
}

function $$(elemSelector) {
    return new DomAPI(elemSelector);
}
//########################################################
// ClassList
//########################################################
var CommonClassList = {
    add: addClass,
    remove: removeClass,
    contains: containsClass
};
$$.ClassList = {
    add: addClass,
    remove: removeClass,
    contains: containsClass
};

function containsClass(elem, className) {
    if (!elem) {
        return 'there is no elem';
    }

    var classList = getClassList(elem);
    if (contains(classList, className) < 0) {
        return false;
    }
    return true;
}

function addClass(elem, className) {
    if (!elem) {
        return 'there is no elem';
    }

    var classList = getClassList(elem);
    if (contains(classList, className) < 0) {
        classList.push(className);
    }
    setClassList(elem, classList);
    return elem;
}

function removeClass(elem, className) {
    if (!elem) {
        return 'there is no elem';
    }

    var classList = getClassList(elem);
    var index = contains(classList, className);
    if (index >= 0) {
        classList.splice(index, 1);
        setClassList(elem, classList);
    }
    return elem;
}

function contains(classList, className) {
    for (var i = 0, len = classList.length; i < len; i++) {
        if (classList[i] == className) {
            return i;
        }
    }
    return -1;
}

function getClassList(elem) {
    var classList = (elem.className || '').split(' ');
    for (var i = classList.length - 1; i >= 0; i--) {
        if (classList[i] === '') {
            classList.splice(i, 1);
        }
    }
    return classList;
}

function setClassList(elem, classList) {
    elem.className = classList.join(' ');
}
//########################################################

//########################################################
// attribute
//########################################################
var CommonAttr = function CommonAttr(elem) {
    return {
        get: get,
        set: set,
        remove: remove
    };

    function get(name) {
        return elem && elem.getAttribute(name);
    }

    function set(name, value) {
        elem && elem.setAttribute(name, value);
        return this;
    }

    function remove(name) {
        elem && elem.removeAttribute(name);
        return this;
    }
};
$$.Attr = CommonAttr;
//########################################################

//########################################################
// fast render
//########################################################
function CommonFastRender(str) {
    var div = document.createElement('div');
    div.innerHTML = str;

    var childElements = [];
    for (var i = 0, len = div.childNodes.length - 1; i <= len; i++) {
        if (div.childNodes[i].nodeType == 1) {
            childElements.push(div.childNodes[i]);
        }
    }
    return childElements;
}
$$.isDOMElement = function (obj) {
    return !!(obj && typeof window !== 'undefined' && (obj === window || obj.nodeType));
};
$$.render = function (str) {
    if (typeof str === 'string') {
        var elemList = CommonFastRender(str);
    } else if ($$.isDOMElement(str)) {
        var elemList = [str];
    } else if (str instanceof Array || !isNaN(str.length - 0)) {
        var elemList = Array.prototype.slice.call(str);
    }
    return new DomAPI().setElemList(elemList);
};
//########################################################

//########################################################
// dom 事件 ctrl
//########################################################
$$.Event = {
    on: function on(elem, eventType, next, useCapture) {
        useCapture = useCapture ? true : false;
        if (!elem) {
            return 'has no element in bindEvent';
        }
        if (elem != window && typeof elem.length === 'number' && !elem.nodeType) {
            for (var i = elem.length - 1; i >= 0; i--) {
                bind(elem[i], eventType, next, useCapture);
            }
        } else {
            bind(elem, eventType, next, useCapture);
        }

        function bind(elem, eventType, next, useCapture) {
            var eventTypes = eventType.split(' ');
            for (var i = eventTypes.length - 1; i >= 0; i--) {
                if (elem.addEventListener) {
                    elem.addEventListener(eventTypes[i], next, useCapture);
                } else if (elem.detachEvent) {
                    elem.detachEvent('on' + eventTypes[i], next);
                } else {
                    elem['on' + eventTypes[i]] = next;
                }
            }
        }
    },
    off: function off(elem, eventType, next, useCapture) {
        useCapture = useCapture || false;

        if (!elem) {
            return 'has no element in bindEvent';
        }
        if (elem != window && typeof elem.length === 'number') {
            for (var i = elem.length - 1; i >= 0; i--) {
                unbind(elem[i], eventType, next, useCapture);
            }
        } else {
            unbind(elem, eventType, next, useCapture);
        }

        function unbind(elem, eventType, next, useCapture) {
            var eventTypes = eventType.split(' ');
            for (var i = eventTypes.length - 1; i >= 0; i--) {
                if (elem.removeEventListener) {
                    elem.removeEventListener(eventTypes[i], next, useCapture);
                } else if (elem.detachEvent) {
                    elem.detachEvent('on' + eventTypes[i], next);
                } else {
                    elem['on' + eventTypes[i]] = null;
                }
            }
        }
    }
    //########################################################
};function DomAPI(elemSelector, elemParent) {
    var self = this;
    if (elemSelector !== undefined) {
        self.elemSelector = elemSelector;
    }

    self.elemParent = elemParent || [];
    self.elemExecute = false;

    self.elemList = null;

    self.length = 0;
    self.size = function () {
        return self.getElemList().length;
    };
    self.getElemList = function (index) {
        if (self.elemList == null) {

            self.elemParent = [].slice.call(self.elemParent);

            if (self.elemParent.length === 0) {
                self.elemList = _$s(self.elemSelector);
            } else {
                self.elemList = [];
                each(self.elemParent, function (elemParent) {
                    self.elemList = [].slice.call(_$s(self.elemSelector, elemParent)).concat(self.elemList);
                });
            }
        }
        if (index === undefined) {
            return self.elemList;
        } else {
            return self.elemList[index];
        }
    };
    self.setElemList = function (elemList) {
        self.elemList = elemList;
        return self;
    };
    //########################################################
    // Class ctrl
    //########################################################
    //
    self.find = function (selector) {
        return new DomAPI(selector, self.getElemList());
        var elemList = self.getElemList();
        var findElemList = [];
        each(elemList, function (elem) {
            findElemList = [].slice.call(_$s(selector, elem)).concat(findElemList);
        });
        self.setElemList(findElemList);
    };
    //########################################################
    // Class ctrl
    //########################################################
    //
    self.addClass = function (className) {
        each(self.getElemList(), function (elem) {
            CommonClassList.add(elem, className);
        });
        return self;
    };
    self.removeClass = function (className) {
        each(self.getElemList(), function (elem) {
            CommonClassList.remove(elem, className);
        });
        return self;
    };
    // 元素列表是否每个元素都存在这个className
    // 每个元素存在ClassName，返回true
    // 每个元素不存在ClassName，返回false
    self.containClass = function (className) {
        var defaultValue = true;
        var value = each(self.getElemList(), function (elem) {
            if (CommonClassList.contains(elem, className) === false) {
                return {
                    returnValue: false,
                    returnBreak: true
                };
            }
        });

        return value === undefined ? defaultValue : value;
    };
    // 元素列表
    self.containClassFilter = function (className, containHandler, notContainHandler) {
        each(self.getElemList(), function (elem, i) {
            if (CommonClassList.contains(elem, className)) {
                containHandler && containHandler(elem, i);
            } else {
                notContainHandler && notContainHandler(elem, i);
            }
        });
        return self;
    };
    //########################################################


    //########################################################
    // attribute ctrl
    //########################################################
    self.getAttr = function (name, handle) {
        var elemList = self.getElemList();
        if (typeof handle == 'function') {
            each(elemList, function (elem) {
                handle(CommonAttr(elem).get(name));
            });
        } else {
            return CommonAttr(elemList[0]).get(name);
        }
    };
    self.setAttr = function (name, value) {
        each(self.getElemList(), function (elem) {
            CommonAttr(elem).set(name, value);
        });
    };
    self.removeAttr = function (name) {
        each(self.getElemList(), function (elem) {
            CommonAttr(elem).remove(name);
        });
    };
    //######################################################## 

    //########################################################
    // dom 插入删除 ctrl
    //########################################################
    self.append = function (insertElemList) {
        each(self.getElemList(), function (elem) {
            if (typeof insertElemList.length == 'number') {
                each(insertElemList, function (insertElem) {
                    elem.appendChild(insertElem);
                });
            } else {
                elem.appendChild(insertElemList);
            }
        });
    };
    self.appendBefore = function (insertElemList) {
        each(self.getElemList(), function (elem) {
            if (typeof insertElemList.length == 'number') {
                each(insertElemList, function (insertElem) {
                    elem.insertBefore(insertElem, elem.children[0]);
                });
            } else {
                elem.insertBefore(insertElem, elem.children[0]);
            }
        });
    };
    self.remove = function () {
        each(self.getElemList(), function (elem) {
            if (elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
        });
    };
    //########################################################

    //########################################################
    // dom 事件 ctrl
    //########################################################
    self.on = function (eventType, next, useCapture) {
        $$.Event.on(this.getElemList(), eventType, next, useCapture);
    };

    self.off = function (eventType, next, useCapture) {
        $$.Event.off(this.getElemList(), eventType, next, useCapture);
    };
    self.each = function (handle) {
        var elemList = this.getElemList();
        for (var i = elemList.length - 1; i >= 0; i--) {
            handle(elemList[i], i);
        }
    };
    //########################################################


    //########################################################
    // style 样式 ctrl
    //########################################################
    self.css = function (cssStyle) {
        var elemList = self.getElemList();
        each(elemList, function (elem) {
            for (var styleName in cssStyle) {
                if (cssStyle.hasOwnProperty(styleName)) {
                    elem.style[styleName] = cssStyle[styleName];
                }
            }
        });
    };
    self.cssArray = function (cssStyleList) {
        var self = this;
        cssStyleList = cssStyleList || [];
        each(cssStyleList, function (cssStyle) {
            self.css(cssStyle);
        });
    };
    self.index = function (index) {
        return $$.render([this.getElemList(index)]);
    };

    self.height = function (value) {
        each(self.getElemList(), function (elem) {
            elem.style.height = value + 'px';
        });
    };
    self.width = function (value) {
        each(self.getElemList(), function (elem) {
            elem.style.width = value + 'px';
        });
    };

    //########################################################
    // innerhtml innerText  ctrl
    //########################################################
    self.text = function (text) {
        var elemList = self.getElemList();
        each(elemList, function (elem) {
            elem.innerText = text;
            elem.textContext = text;
        });
    };
    self.html = function (html) {
        var elemList = self.getElemList();
        each(elemList, function (elem) {
            elem.innerHTML = html;
        });
    };

    //########################################################
    // position  ctrl
    //########################################################
    self.positionTop = function () {
        var elemList = self.getElemList();
        var top = 0;
        if (elemList[0]) {
            var elem = elemList[0];
            while (elem.tagName != 'BODY' && elem.tagName != 'HTML') {
                top += elem.offsetTop;
                elem = elem.parentNode;
            }

            return top;
        } else {
            return 0;
        }
    };
    self.parents = function (parentNodeSelector) {
        var elemList = [];
        if (parentNodeSelector) {
            var parentCandidate = $$(parentNodeSelector).getElemList();
            var elem = this.getElemList(0).parentNode;
            var parentNodeFind = false;
            while (elem.tagName !== 'BODY' && parentNodeFind === false) {
                each(parentCandidate, function (elemCandidate) {
                    if (elem == elemCandidate) {
                        elemList.push(elemCandidate);
                        parentNodeFind = true;
                    }
                });
                elem = elem.parentNode;
            }
        } else {
            each(this.getElemList(), function (elem) {
                elemList.push(elem.parentNode);
            });
        }
        return $$.render(elemList);
    };
}

//########################################################
// event preventDefault and stopPropagation  ctrl
//########################################################
$$.pdsp = function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
};
//########################################################


//########################################################
// Class mark
//########################################################
$$.Class = DomAPI;
$$.version = '0.0.2';
module.exports = $$;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var _window = window;
var _document = document;
_window.onresize = a;
function a() {
    var c = _document.getElementsByTagName('html')[0];
    var b = c.clientWidth;
    c.style.fontSize = b / 20 / 16 * 100 + 'px';
}
function Init() {
    a();
}
exports.Init = Init;
;
exports.default = { init: Init };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./reset-1.0.0.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!./reset-1.0.0.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (option) {
    var elem = _DomAPI2.default.render([option.elem]),
        start = option.start,
        end = option.end,
        complete = option.complete;

    var transitionName = a + start + '-' + end;

    elem.removeClass(start).addClass(transitionName);
    // ClassList.remove(elem, start);
    // ClassList.add(elem, transitionName);

    elem.on('animationend webkitAnimationEnd', animationend);
    // Event.bind(elem, 'animationend', animationend)
    // Event.bind(elem, 'webkitAnimationEnd', animationend)

    function animationend(e) {
        elem.removeClass(transitionName).addClass(end);
        // ClassList.remove(elem, transitionName);
        // ClassList.add(elem, end);
        complete && complete();

        elem.off('animationend webkitAnimationEnd', animationend);
        // Event.unbind(elem, 'animationend', animationend)
        // Event.unbind(elem, 'webkitAnimationEnd', animationend)
    }
};

var _DomAPI = __webpack_require__(5);

var _DomAPI2 = _interopRequireDefault(_DomAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var a = 'transition-view-'; // 页面过渡

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, button, textarea, input, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tborder: 0;\r\n\tfont-size: 100%;\r\n\tfont: inherit;\r\n\tvertical-align: baseline;\r\n}\r\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\nbody {\r\n\tfont-family: 'Microsoft Yahei';\r\n\tline-height: 1;\r\n}\r\nol, ul {\r\n\tlist-style: none;\r\n}\r\nblockquote, q {\r\n\tquotes: none;\r\n}\r\nblockquote:before, blockquote:after, q:before, q:after {\r\n\tcontent: '';\r\n\tcontent: none;\r\n}\r\ntable {\r\n\tborder-collapse: collapse;\r\n\tborder-spacing: 0;\r\n}\r\nimg{\r\n\tdisplay: block;\r\n\tmargin: 0 auto;\r\n}\r\nhtml{\r\n\tmin-height: 100%;\r\n}", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "html, body {\n  height: 5.248rem; }\n\nbody {\n  font-size: 10px; }\n\n.app {\n  height: 5.248rem; }\n\n.pointer-events-none {\n  pointer-events: none; }\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".transition-view-show-hide {\n  pointer-events: none;\n  -webkit-transform: translateZ(0);\n     -moz-transform: translateZ(0);\n          transform: translateZ(0);\n  -webkit-animation: transition-view-hide-animation ease .3s forwards;\n     -moz-animation: transition-view-hide-animation ease .3s forwards;\n       -o-animation: transition-view-hide-animation ease .3s forwards;\n          animation: transition-view-hide-animation ease .3s forwards; }\n\n@-webkit-keyframes transition-view-hide-animation {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-moz-keyframes transition-view-hide-animation {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-o-keyframes transition-view-hide-animation {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@keyframes transition-view-hide-animation {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n.transition-view-hide-show {\n  pointer-events: none;\n  z-index: 50;\n  -webkit-transform: translateZ(0);\n     -moz-transform: translateZ(0);\n          transform: translateZ(0);\n  -webkit-animation: transition-view-show-animation ease .3s forwards;\n     -moz-animation: transition-view-show-animation ease .3s forwards;\n       -o-animation: transition-view-show-animation ease .3s forwards;\n          animation: transition-view-show-animation ease .3s forwards; }\n\n@-webkit-keyframes transition-view-show-animation {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-moz-keyframes transition-view-show-animation {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-o-keyframes transition-view-show-animation {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes transition-view-show-animation {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n.transition-view-show-hide-left {\n  pointer-events: none;\n  -webkit-transform: translateZ(0);\n     -moz-transform: translateZ(0);\n          transform: translateZ(0);\n  -webkit-animation: transition-view-hide-animation-left ease .3s forwards;\n     -moz-animation: transition-view-hide-animation-left ease .3s forwards;\n       -o-animation: transition-view-hide-animation-left ease .3s forwards;\n          animation: transition-view-hide-animation-left ease .3s forwards; }\n\n@-webkit-keyframes transition-view-hide-animation-left {\n  0% {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  100% {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0); } }\n\n@-moz-keyframes transition-view-hide-animation-left {\n  0% {\n    -moz-transform: translate3d(0, 0, 0);\n         transform: translate3d(0, 0, 0); }\n  100% {\n    -moz-transform: translate3d(-100%, 0, 0);\n         transform: translate3d(-100%, 0, 0); } }\n\n@-o-keyframes transition-view-hide-animation-left {\n  0% {\n    transform: translate3d(0, 0, 0); }\n  100% {\n    transform: translate3d(-100%, 0, 0); } }\n\n@keyframes transition-view-hide-animation-left {\n  0% {\n    -webkit-transform: translate3d(0, 0, 0);\n       -moz-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  100% {\n    -webkit-transform: translate3d(-100%, 0, 0);\n       -moz-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0); } }\n\n.transition-view-hide-show-left {\n  pointer-events: none;\n  z-index: 50;\n  -webkit-transform: translateZ(0);\n     -moz-transform: translateZ(0);\n          transform: translateZ(0);\n  -webkit-animation: transition-view-show-animation-left ease .3s forwards;\n     -moz-animation: transition-view-show-animation-left ease .3s forwards;\n       -o-animation: transition-view-show-animation-left ease .3s forwards;\n          animation: transition-view-show-animation-left ease .3s forwards; }\n\n@-webkit-keyframes transition-view-show-animation-left {\n  0% {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n  100% {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); } }\n\n@-moz-keyframes transition-view-show-animation-left {\n  0% {\n    -moz-transform: translate3d(100%, 0, 0);\n         transform: translate3d(100%, 0, 0); }\n  100% {\n    -moz-transform: translate3d(0, 0, 0);\n         transform: translate3d(0, 0, 0); } }\n\n@-o-keyframes transition-view-show-animation-left {\n  0% {\n    transform: translate3d(100%, 0, 0); }\n  100% {\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes transition-view-show-animation-left {\n  0% {\n    -webkit-transform: translate3d(100%, 0, 0);\n       -moz-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n  100% {\n    -webkit-transform: translate3d(0, 0, 0);\n       -moz-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); } }\n\n.transition-view-show-hide-scale {\n  pointer-events: none;\n  z-index: 51;\n  -webkit-transform: translateZ(0);\n     -moz-transform: translateZ(0);\n          transform: translateZ(0);\n  -webkit-animation: transition-view-hide-animation-scale ease .3s forwards;\n     -moz-animation: transition-view-hide-animation-scale ease .3s forwards;\n       -o-animation: transition-view-hide-animation-scale ease .3s forwards;\n          animation: transition-view-hide-animation-scale ease .3s forwards; }\n\n@-webkit-keyframes transition-view-hide-animation-scale {\n  0% {\n    -webkit-transform: translate3d(0, 0, 0) scale(1);\n            transform: translate3d(0, 0, 0) scale(1); }\n  100% {\n    -webkit-transform: translate3d(0, 0, 0) scale(0);\n            transform: translate3d(0, 0, 0) scale(0); } }\n\n@-moz-keyframes transition-view-hide-animation-scale {\n  0% {\n    -moz-transform: translate3d(0, 0, 0) scale(1);\n         transform: translate3d(0, 0, 0) scale(1); }\n  100% {\n    -moz-transform: translate3d(0, 0, 0) scale(0);\n         transform: translate3d(0, 0, 0) scale(0); } }\n\n@-o-keyframes transition-view-hide-animation-scale {\n  0% {\n    transform: translate3d(0, 0, 0) scale(1); }\n  100% {\n    transform: translate3d(0, 0, 0) scale(0); } }\n\n@keyframes transition-view-hide-animation-scale {\n  0% {\n    -webkit-transform: translate3d(0, 0, 0) scale(1);\n       -moz-transform: translate3d(0, 0, 0) scale(1);\n            transform: translate3d(0, 0, 0) scale(1); }\n  100% {\n    -webkit-transform: translate3d(0, 0, 0) scale(0);\n       -moz-transform: translate3d(0, 0, 0) scale(0);\n            transform: translate3d(0, 0, 0) scale(0); } }\n\n.transition-view-hide-show-scale {\n  pointer-events: none;\n  z-index: 50;\n  -webkit-transform: translateZ(0);\n     -moz-transform: translateZ(0);\n          transform: translateZ(0);\n  -webkit-animation: transition-view-show-animation-scale ease .3s forwards;\n     -moz-animation: transition-view-show-animation-scale ease .3s forwards;\n       -o-animation: transition-view-show-animation-scale ease .3s forwards;\n          animation: transition-view-show-animation-scale ease .3s forwards; }\n\n@-webkit-keyframes transition-view-show-animation-scale {\n  0% {\n    -webkit-transform: translate3d(0, 0, 0) scale(0);\n            transform: translate3d(0, 0, 0) scale(0); }\n  100% {\n    -webkit-transform: translate3d(0, 0, 0) scale(1);\n            transform: translate3d(0, 0, 0) scale(1); } }\n\n@-moz-keyframes transition-view-show-animation-scale {\n  0% {\n    -moz-transform: translate3d(0, 0, 0) scale(0);\n         transform: translate3d(0, 0, 0) scale(0); }\n  100% {\n    -moz-transform: translate3d(0, 0, 0) scale(1);\n         transform: translate3d(0, 0, 0) scale(1); } }\n\n@-o-keyframes transition-view-show-animation-scale {\n  0% {\n    transform: translate3d(0, 0, 0) scale(0); }\n  100% {\n    transform: translate3d(0, 0, 0) scale(1); } }\n\n@keyframes transition-view-show-animation-scale {\n  0% {\n    -webkit-transform: translate3d(0, 0, 0) scale(0);\n       -moz-transform: translate3d(0, 0, 0) scale(0);\n            transform: translate3d(0, 0, 0) scale(0); }\n  100% {\n    -webkit-transform: translate3d(0, 0, 0) scale(1);\n       -moz-transform: translate3d(0, 0, 0) scale(1);\n            transform: translate3d(0, 0, 0) scale(1); } }\n\n.app {\n  position: relative;\n  width: 100%;\n  min-height: 100%;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box; }\n  .app .app-wrapper {\n    position: relative;\n    height: 100%;\n    width: 100%;\n    overflow: hidden; }\n    .app .app-wrapper > .view {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      width: 100%; }\n\n.stream-app {\n  height: auto; }\n  .stream-app body {\n    height: auto; }\n    .stream-app body .app {\n      height: auto;\n      min-height: none; }\n      .stream-app body .app .app-wrapper {\n        height: auto;\n        min-height: R(1006); }\n        .stream-app body .app .app-wrapper .view {\n          position: static;\n          height: auto; }\n          .stream-app body .app .app-wrapper .view .content {\n            position: relative; }\n\n.view.show, .float.show {\n  display: block; }\n\n.view.hide, .float.hide {\n  display: none; }\n\n.view .bg, .float .bg {\n  width: 100%;\n  display: block; }\n\n.view .content, .float .content {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  min-height: 100%;\n  overflow: hidden; }\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./Page-0.0.1.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./Page-0.0.1.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("slogan.e777315f268c5067b2a2dc6db84f89d0.png");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(36);
var HTML = __webpack_require__(31);
var $ = __webpack_require__(3);
var Page_0_0_2_js_1 = __webpack_require__(4);
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage(app) {
        var _this = this;
        var option = {
            el: $.render(HTML).getEl(0),
            Event: function () {
                _this.event();
            }
        };
        _this = _super.call(this, option) || this;
        _this.app = app;
        return _this;
    }
    HomePage.prototype.event = function () {
        var _this = this;
        this.domElem.find('.action .rule-btn').on('click', function (e) {
            $.pdsp(e);
            _this.app.get('rule').showWithAnimate();
            _this.hideWithAnimate();
        });
        this.domElem.find('.action .rank-btn').on('click', function (e) {
            $.pdsp(e);
            _this.app.get('rank').showWithAnimate();
            _this.hideWithAnimate();
        });
        this.domElem.find('.action .score-btn').on('click', function (e) {
            $.pdsp(e);
            _this.app.get('contest').showWithAnimate();
            _this.hideWithAnimate();
        });
        this.domElem.find('.action .upload-btn').on('click', function (e) {
            $.pdsp(e);
            _this.app.get('upload').showWithAnimate();
            _this.hideWithAnimate();
        });
    };
    return HomePage;
}(Page_0_0_2_js_1.default));
exports.default = HomePage;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(37);
var HTML = __webpack_require__(32);
var $ = __webpack_require__(3);
var Page_0_0_2_js_1 = __webpack_require__(4);
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage(app) {
        var _this = this;
        var option = {
            el: $.render(HTML).getEl(0),
            aftershowInit: function () {
            },
            Event: function () {
                _this.event();
            }
        };
        _this = _super.call(this, option) || this;
        _this.app = app;
        return _this;
    }
    HomePage.prototype.event = function () {
        var _this = this;
        this.domElem.find('.longzhu-ad .close-ad').on('click', function (e) {
            $.pdsp(e);
            _this.domElem.find('.longzhu-ad').remove();
        });
        this.domElem.find('.action .backhome-btn .click-area').on('click', function (e) {
            $.pdsp(e);
            _this.app.get('home').showWithAnimate();
            _this.hideWithAnimate();
        });
    };
    return HomePage;
}(Page_0_0_2_js_1.default));
exports.default = HomePage;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(38);
var HTML = __webpack_require__(33);
var $ = __webpack_require__(3);
var Page_0_0_2_js_1 = __webpack_require__(4);
var service_ts_1 = __webpack_require__(43);
var Verification_0_0_1_js_1 = __webpack_require__(24);
var RegisterPage = (function (_super) {
    __extends(RegisterPage, _super);
    function RegisterPage(app) {
        var _this = this;
        var option = {
            el: $.render(HTML).getEl(0),
            Event: function () {
                _this.Event();
            }
        };
        _this = _super.call(this, option) || this;
        _this.yzmBtnTxtElem = _this.domElem.find('.yzm .prompt-box span');
        _this.yzmBtnTxt = _this.yzmBtnTxtElem.text();
        _this.phoneInputElem = _this.domElem.find('.phone .txt');
        _this.app = app;
        return _this;
    }
    RegisterPage.prototype.Event = function () {
        var _this = this;
        this.yzmBtnElem = this.domElem.find('.yzm .prompt-box');
        this.yzmBtnElem.on('click', function (e) {
            $.pdsp(e);
            if (Verification_0_0_1_js_1.verificationPhone(_this.phoneInputElem.getEl(0).value)) {
                _this.yzmBtnElem.addClass('pointer-events-none');
                service_ts_1.requestVCode();
                _this.startVCodeCountDowm(1);
            }
            else {
                _this.showPhonePrompt();
            }
        });
        this.suerBtnElem = this.domElem.find('.action .sure-btn');
        this.suerBtnElem.on('click', function (e) {
            $.pdsp(e);
            var phoneNumber = _this.phoneInputElem.getEl(0).value;
            var vCodeNumber = _this.phoneInputElem.getEl(0).value;
            _this.suerBtnElem.addClass('pointer-events-none');
            service_ts_1.registerPost({
                phoneNumber: phoneNumber,
                vCodeNumber: vCodeNumber,
            }, function () {
                console.log('success');
            }, function () {
                console.log('complete');
                _this.suerBtnElem.removeClass('pointer-events-none');
            }, function () {
                alert('正在提交信息中....');
            });
        });
        this.domElem.find('.rule-btn').on('click', function (e) {
            $.pdsp(e);
            alert('rule-page');
        });
    };
    RegisterPage.prototype.showPhonePrompt = function () {
        clearTimeout(this.promptTimeHide);
        clearTimeout(this.promptTimeInit);
        var ElemAPI = this.domElem.find('.phone .prompt .prompt-txt-box');
        ElemAPI.addClass('show');
        var ElemAnimationTime = .5;
        var ElemShowTime = 2;
        this.promptTimeHide = setTimeout(function () {
            ElemAPI.removeClass('show').addClass('hide');
        }, (ElemAnimationTime + ElemShowTime) * 1000);
        this.promptTimeInit = setTimeout(function () {
            ElemAPI.removeClass('hide').removeClass('show');
        }, (ElemAnimationTime + ElemShowTime + ElemAnimationTime) * 1000);
    };
    RegisterPage.prototype.startVCodeCountDowm = function (times) {
        var _this = this;
        if (times < 0) {
            this.yzmBtnTxtElem.text(this.yzmBtnTxt);
            this.yzmBtnElem.removeClass('pointer-events-none');
            return;
        }
        this.yzmBtnTxtElem.text(times + 's');
        setTimeout(function () {
            _this.startVCodeCountDowm(--times);
        }, 1000);
    };
    return RegisterPage;
}(Page_0_0_2_js_1.default));
exports.default = RegisterPage;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(39);
var HTML = __webpack_require__(34);
var $ = __webpack_require__(3);
var Page_0_0_2_js_1 = __webpack_require__(4);
var VerticalSwiper_0_0_2_js_1 = __webpack_require__(25);
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage(app) {
        var _this = this;
        var option = {
            el: $.render(HTML).getEl(0),
            aftershowInit: function () {
                new VerticalSwiper_0_0_2_js_1.default({
                    swiper: this.domElem.find('.v-swiper-container'),
                    wrapper: this.domElem.find('.v-swiper-wrapper')
                });
            },
            Event: function () {
                _this.event();
            }
        };
        _this = _super.call(this, option) || this;
        _this.app = app;
        return _this;
    }
    HomePage.prototype.event = function () {
        var _this = this;
        this.domElem.find('.action .backhome-btn').on('click', function (e) {
            $.pdsp(e);
            _this.app.get('home').showWithAnimate();
            _this.hideWithAnimate();
        });
    };
    return HomePage;
}(Page_0_0_2_js_1.default));
exports.default = HomePage;


/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AjaxPost = AjaxPost;
exports.JSONP = JSONP;
exports.AjaxData = AjaxData;

var _DomAPI = __webpack_require__(5);

var _DomAPI2 = _interopRequireDefault(_DomAPI);

var _CreateId = __webpack_require__(23);

var _CreateId2 = _interopRequireDefault(_CreateId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AjaxPost(options) {
    var Cache = {};
    Cache.url = options.url;
    Cache.data = options.data || {};
    Cache.async = options.async === false ? false : true;
    Cache.noCache = options.noCache === true ? true : false;
    Cache.type = options.type || 'POST';
    Cache.type = Cache.type.toUpperCase();
    Cache.dataType = options.dataType || '';
    Cache.dataType = Cache.dataType.toUpperCase();
    Cache.autoSend = options.autoSend === false ? false : true;

    Cache.success = function () {};
    Cache.error = function () {};
    Cache.complete = function () {};
    Cache.beforeSend = function () {};
    Cache.afterSend = function () {};
    // ajax 状态
    // ajax state
    // 0，对应常量UNSENT，表示XMLHttpRequest实例已经生成，但是open()方法还没有被调用。
    // 1，对应常量OPENED，表示send()方法还没有被调用，仍然可以使用setRequestHeader()，设定HTTP请求的头信息。
    // 2，对应常量HEADERS_RECEIVED，表示send()方法已经执行，并且头信息和状态码已经收到。
    // 3，对应常量LOADING，表示正在接收服务器传来的body部分的数据，如果responseType属性是text或者空字符串，responseText就会包含已经收到的部分信息。
    // 4，对应常量DONE，表示服务器数据已经完全接收，或者本次接收已经失败了。
    Cache.STATE_UNSENT = 0;
    Cache.STATE_OPENED = 1;
    Cache.STATE_HEADERS_RECEIVED = 2;
    Cache.STATE_LOADING = 3;
    Cache.STATE_DONE = 4;
    Cache.state = Cache.STATE_UNSENT;

    Cache.success = options.success || Cache.success;
    Cache.error = options.error || Cache.error;
    Cache.complete = options.complete || Cache.complete;
    Cache.beforeSend = options.beforeSend || Cache.beforeSend;
    Cache.afterSend = options.afterSend || Cache.afterSend;

    Constructor();

    var CacheAPI = {};
    // 回调函数
    // set callback function
    CacheAPI.setSuccess = setSuccess;
    CacheAPI.setError = setError;
    CacheAPI.setComplete = setComplete;
    CacheAPI.setBeforeSend = setBeforeSend;
    CacheAPI.setAfterSend = setAfterSend;
    // 运行函数
    // run function
    CacheAPI.send = AJAX_Send;

    CacheAPI.distory = distory;

    return CacheAPI;

    function AJAX_Send() {
        if (Cache.state === Cache.STATE_OPENED) {
            Cache.beforeSend();
            Cache.xmlhttp.send(Cache.reqData + '');
            Cache.afterSend();
            readystatechange(Cache.STATE_HEADERS_RECEIVED);
        }
    }
    function AJAX_Success(JSONP_Data) {
        Cache.success(JSONP_Data);
        Cache.complete();
    }
    function AJAX_Error() {
        Cache.error();
        Cache.complete();
    }
    function AJAX_Complete() {
        (0, _DomAPI2.default)('body').removeChild(script);
        window[Cache.data[Cache.CallBackName]] = null;
    }
    function setSuccess(success) {
        Cache.success = success;
        return CacheAPI;
    }
    function setError(error) {
        Cache.error = error;
        return CacheAPI;
    }
    function setComplete(complete) {
        Cache.complete = complete;
        return CacheAPI;
    }
    function setBeforeSend(beforeSend) {
        Cache.beforeSend = beforeSend;
        return CacheAPI;
    }
    function setAfterSend(afterSend) {
        Cache.afterSend = afterSend;
        return CacheAPI;
    }

    function distory() {
        Cache = null;
        CacheAPI = null;
    }
    function Constructor() {
        if (window.XMLHttpRequest) {
            Cache.xmlhttp = new window.XMLHttpRequest();
        } else {
            Cache.xmlhttp = new ActiveXObject("Microsoft.Cache.XMLHTTP");
        }
        if (!Cache.xmlhttp) {
            return 'not support ajax';
        }
        Cache.data = AjaxData(Cache.data, Cache.type);

        // 设置 ajax 状态变化
        readystatechange(Cache.xmlhttp.readyState);
        Cache.xmlhttp.onreadystatechange = readystatechange;

        if (Cache.type === 'POST') {
            Cache.reqURL = Cache.url;
            Cache.reqData = Cache.data;
        } else if (Cache.type === 'GET') {
            Cache.reqURL = Cache.url + (Cache.noCache ? Cache.data.push({ ajaxtimestamp: new Date().getTime() }) : Cache.data); // 设置是否清楚缓存
            Cache.reqData = undefined;
        }
        Cache.xmlhttp.open(Cache.type, Cache.reqURL, Cache.async);
        Cache.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        if (Cache.autoSend) {
            AJAX_Send();
        }
    }
    function AJAX_Done() {
        if (Cache.xmlhttp.status == 200 || Cache.xmlhttp.status == 304) {
            try {
                Cache.res = window.decodeURI(Cache.xmlhttp.responseText);
            } catch (e) {
                Cache.res = Cache.xmlhttp.responseText;
            }

            if (Cache.dataType === 'JSON') {
                Cache.res = eval('(' + Cache.res + ')');
            }

            AJAX_Success(Cache.res);
        } else {
            AJAX_Error();
        }
    }

    function readystatechange(state) {
        var state = typeof state === 'number' ? state : Cache.xmlhttp.readyState;
        if (Cache.state === state) {
            return 'state not change';
        }
        Cache.state = state;
        switch (state) {
            case Cache.STATE_UNSENT:

                break;
            case Cache.STATE_OPENED:

                break;
            case Cache.STATE_HEADERS_RECEIVED:

                break;
            case Cache.STATE_LOADING:

                break;
            case Cache.STATE_DONE:
                AJAX_Done();
                CacheAPI.distory();
                break;
            default:
        }
    }
}

function JSONP(options) {
    var Cache = {};
    Cache.id = (0, _CreateId2.default)();

    Cache.success = function () {};
    Cache.error = function () {};
    Cache.complete = function () {};

    Cache.success = options.success || Cache.success;
    Cache.error = options.error || Cache.error;
    Cache.complete = options.complete || Cache.complete;

    Cache.url = options.url;
    Cache.CallBackName = options.CallBackName || 'jsonp';
    Cache.data = options.data || {};

    function Constructor() {
        Cache.data[Cache.CallBackName] = 'jsonp_' + Cache.id;
        var data = AjaxData(Cache.data, 'GET');

        window[Cache.data[Cache.CallBackName]] = JSONP_Success;

        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.src = Cache.url + data;
        script.onerror = JSONP_Error;
        script.onload = JSONP_Complete;
        Cache.script = script;

        (0, _DomAPI2.default)('body').append([script]);
    }
    Constructor();

    var CacheAPI = {};
    CacheAPI.setSuccess = setSuccess;
    CacheAPI.setError = setError;
    CacheAPI.setComplete = setComplete;

    return CacheAPI;
    function JSONP_Success(JSONP_Data) {
        Cache.success(JSONP_Data);
        Cache.complete();
    }
    function JSONP_Error() {
        Cache.error();
        Cache.complete();
    }
    function JSONP_Complete() {
        (0, _DomAPI2.default)('body').getElemList(0).removeChild(Cache.script);
        window[Cache.data[Cache.CallBackName]] = null;
    }
    function setSuccess(success) {
        Cache.success = success;
        return CacheAPI;
    }
    function setError(error) {
        Cache.error = error;
        return CacheAPI;
    }
    function setComplete(complete) {
        Cache.complete = complete;
        return CacheAPI;
    }
}
function AjaxData(data, type) {
    type = type || '';
    type = type.toUpperCase() === 'POST' ? 'POST' : 'GET';
    var dataArr = [];

    var ajaxData = dealData(data, type);
    return returnData();

    function returnData() {
        var theData = {};
        theData.push = pushData;
        theData.valueOf = function () {
            return window.encodeURI(ajaxData);
        };
        return theData;
    }

    function pushData(data) {
        ajaxData = dealData(data, type);
        return returnData();
    }
    function dealData(data, type) {

        for (var key in data) {
            dataArr.push(key + '=' + data[key]);
        }
        if (type === 'GET') {
            return '?' + dataArr.join('&');
        } else if (type === 'POST') {
            return dataArr.join('&');
        } else {
            return '?' + dataArr.join('&');
        }
    }
}

exports.default = AjaxPost;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var style_transition = '-webkit-transition: @{{value}};\
                                 -moz-transition: @{{value}};\
                                 -mos-transition: @{{value}};\
                                  -ms-transition: @{{value}};\
                                   -o-transition: @{{value}};\
                                      transition: @{{value}};';

var transition_duration = '-webkit-transition-duration: @{{value}};\
                        -moz-transition-duration: @{{value}};\
                        -mos-transition-duration: @{{value}};\
                         -ms-transition-duration: @{{value}};\
                          -o-transition-duration: @{{value}};\
                             transition-duration: @{{value}};';

var style_transform = '-webkit-transform: @{{value}};\
                    -moz-transform: @{{value}};\
                    -mos-transform: @{{value}};\
                     -ms-transform: @{{value}};\
                      -o-transform: @{{value}};\
                         transform: @{{value}};';
var style = {
    'transition': style_transition,
    'transition-duration': transition_duration,
    'transform': style_transform
};

function AutoprefixerCssStyle(cssName, value) {
    return style[cssName].replace(/\s/g, '').replace(/@\{\{value\}\}/g, value);
}
AutoprefixerCssStyle.obj = function (cssName, value) {
    var prefixer = {};
    prefixer['-webkit-' + cssName] = value;
    prefixer['-moz-' + cssName] = value;
    prefixer['-mos-' + cssName] = value;
    prefixer['-ms-' + cssName] = value;
    prefixer['-o-' + cssName] = value;
    prefixer['' + cssName] = value;
    return prefixer;
};
AutoprefixerCssStyle.obj = function (cssName, value) {
    var prefixer = {};
    var cssNameUpper = cssName.replace(/^./, cssName[0].toUpperCase());
    prefixer['webkit' + cssNameUpper] = value;
    prefixer['moz' + cssNameUpper] = value;
    prefixer['mos' + cssNameUpper] = value;
    prefixer['ms' + cssNameUpper] = value;
    prefixer['o' + cssNameUpper] = value;
    prefixer['' + cssName] = value;
    return prefixer;
};
AutoprefixerCssStyle.array = function (cssName, value) {
    return [AutoprefixerCssStyle.obj(cssName, value)];
};
module.exports = AutoprefixerCssStyle;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var i = 0;
var base_id = new Date().getTime();
module.exports = function () {
    i++;
    return 'creatid__id__' + base_id + i;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function verificationPhone(phoneNumber) {
    return (/^1[3578]\d{9}$/.test(phoneNumber)
    );
}
exports.verificationPhone = verificationPhone;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = VerticalSwiper;

var _DomAPI = __webpack_require__(5);

var _DomAPI2 = _interopRequireDefault(_DomAPI);

var _AutoprefixerCssStyle = __webpack_require__(22);

var _AutoprefixerCssStyle2 = _interopRequireDefault(_AutoprefixerCssStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VerticalSwiper(option) {
    this.setScrollTop = function (time) {
        time = time || 0;
        this.domElem.cssArray(_AutoprefixerCssStyle2.default.array('transform', 'translateZ(0) translate(0, ' + -this.scrollTop + 'px)').concat(_AutoprefixerCssStyle2.default.array('transition', 'transform ' + time + 's')));

        this.updateTrain(time);
    };
    this.Event = function () {
        var self = this;
        this.EventHandleElem.on('touchstart', function (e) {
            self.touchmoveClientY = JSON.parse(getTouchPostion(e)).clientY;
            self.touchmoveTimeStamp = e.timeStamp;
            self.touchstartTime = e.timeStamp;
            self.touchstartPosition = getTouchPostion(e);

            self.setScrollTop();

            return _DomAPI2.default.pdsp(e);
        });
        this.EventHandleElem.on('touchend', function (e) {
            self.touchmoveClientY = 0;
            self.touchstartPosition = {};
            self.touchstartTime = 0;

            var interval = e.timeStamp - self.touchmoveTimeStamp;
            interval = 400 / interval;
            var lastMove = Math.min(self.touchmoveLastMove * interval * .5, this.clientHeight * .5);
            self.scrollTop += lastMove;
            if (self.scrollTop < 0) {
                self.scrollTop = 0;
            } else if (self.scrollTop > self.scrollHeight - self.clientHeight) {
                self.scrollTop = self.scrollHeight - self.clientHeight;
            }
            // self.domElem.cssArray(AutoprefixerCssStyle.array('transform', 'translateZ(0) translate(0, '+(-self.scrollTop)+'px)').concat(AutoprefixerCssStyle.array('transition', 'transform .5s')));
            self.setScrollTop(.5);
            return _DomAPI2.default.pdsp(e);
        });
        this.EventHandleElem.on('touchmove', function (e) {
            var timeStamp = e.timeStamp;
            self.touchmoveTimeStamp = timeStamp;

            var clientY = JSON.parse(getTouchPostion(e)).clientY;
            var move = self.touchmoveClientY - clientY;
            if (Math.abs(move) < 5) {
                console.log('not small');
                return _DomAPI2.default.pdsp(e);
            }
            self.touchmoveClientY = clientY;
            self.touchmoveLastMove = move;
            if (self.scrollTop + move > 0 && self.scrollTop + move < self.scrollHeight - self.clientHeight) {
                self.scrollTop += move;
            } else {
                self.scrollTop += move * .5;
            }
            self.setScrollTop();

            return _DomAPI2.default.pdsp(e);
        });

        function getTouchPostion(e) {
            var touchstartPosition = {};
            try {
                var touch = e.changedTouches[0] || e.targetTouches[0];
            } catch (e) {
                var touch = {};
            }
            touchstartPosition = {
                clientX: touch.clientX,
                clientY: touch.clientY
            };
            return JSON.stringify(touchstartPosition);
        }
    };
    this.getElemHeight = function (elem) {
        elem.style.cssText = 'visibility: hidden;display: block';

        try {
            var height = elem.clientHeight;
        } catch (e) {
            var height = 0;
        }

        elem.style.cssText = '';
        return height;
    };
    this.updateTrain = function (time) {
        if (this.trackY && this.trainY) {
            var trainMaxTop = this.trackYLenght - this.trainYLenght;
            var contentMaxTop = this.scrollHeight - this.clientHeight;
            this.trainY.cssArray([{ top: this.scrollTop / contentMaxTop * trainMaxTop + 'px' }].concat(_AutoprefixerCssStyle2.default.array('transition', 'top ' + time + 's')));
        }
    };
    this.init = function (opt) {
        opt = opt || option;

        this.clientHeight = 0;
        this.scrollTop = 0;

        this.clientHeight = this.getElemHeight(opt.swiper.getElemList(0));
        this.scrollHeight = this.getElemHeight(opt.wrapper.getElemList(0));

        this.EventHandleElem = opt.swiper;
        this.domElem = opt.wrapper;
        this.scrollTop = 0;
        this.touchstartTime = 0;
        this.touchstartPosition = {};
        this.touchmoveClientY = 0;
        this.touchmoveTimeStamp = 0;
        this.touchmoveLastMove = 0;

        this.domElem.getElemList(0).style.cssText = '';

        if (opt.trackY && opt.trainY) {
            this.trackY = opt.trackY;
            this.trainY = opt.trainY;

            this.trackYLenght = this.getElemHeight(opt.trackY.getElemList(0));
            this.trainYLenght = this.clientHeight / this.scrollHeight * this.trackYLenght;

            this.trainY.css({ height: this.trainYLenght + 'px', top: 0 });
        }

        this.Event();
    };

    this.init(option);
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".home .slogan {\n  margin: 0.54187rem auto 0;\n  width: 2.9312rem;\n  height: 2.30827rem;\n  display: block; }\n  .home .slogan img {\n    width: 100%;\n    height: 100%;\n    display: block; }\n\n.home .action {\n  margin-top: 0.6912rem;\n  width: 100%;\n  text-align: center; }\n  .home .action .score-btn {\n    display: inline-block;\n    vertical-align: top;\n    margin: 0 0.08533rem 0.17067rem;\n    width: 2.56rem;\n    height: 0.42667rem;\n    background: url(" + __webpack_require__(46) + ");\n    background-size: 100% 100%; }\n  .home .action .rank-btn, .home .action .upload-btn {\n    display: inline-block;\n    vertical-align: top;\n    margin: 0 0.08533rem 0.17067rem;\n    width: 1.19467rem;\n    height: 0.42667rem;\n    background-size: 100% 100%; }\n  .home .action .rank-btn {\n    background-image: url(" + __webpack_require__(45) + "); }\n  .home .action .upload-btn {\n    background-image: url(" + __webpack_require__(47) + "); }\n  .home .action .rule-btn {\n    padding: 0 0.08533rem;\n    line-height: 1.5;\n    min-width: 0.85333rem;\n    display: inline-block;\n    vertical-align: top; }\n", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".rank {\n  font-size: 0; }\n  .rank .rank-list {\n    margin-top: 0.32rem;\n    position: relative;\n    display: inline-block;\n    width: 100%;\n    text-align: center;\n    padding-top: 1.40373rem; }\n    .rank .rank-list .rank-item {\n      width: 0.55467rem;\n      position: relative;\n      display: inline-block;\n      margin: 0 0.08533rem; }\n      .rank .rank-list .rank-item .picture {\n        -moz-box-sizing: border-box;\n             box-sizing: border-box;\n        width: 100%;\n        padding-top: 100%;\n        border-radius: 1000px;\n        background: #ffd154;\n        border: 2px solid #ffd154;\n        position: relative; }\n        .rank .rank-list .rank-item .picture img {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n          display: block;\n          background: #fff;\n          border-radius: 1000px; }\n        .rank .rank-list .rank-item .picture:before {\n          position: absolute;\n          z-index: 1; }\n      .rank .rank-list .rank-item .info .score {\n        margin-top: 0.04267rem;\n        font-size: 0;\n        text-align: center;\n        padding-left: 0.04267rem;\n        line-height: 1.3; }\n        .rank .rank-list .rank-item .info .score span {\n          font-size: 0.09387rem;\n          color: #ffd155;\n          font-weight: bold; }\n        .rank .rank-list .rank-item .info .score .g {\n          font-size: 0.13653rem; }\n      .rank .rank-list .rank-item .info .name {\n        font-size: 0.1024rem;\n        color: #fff;\n        line-height: 1.3;\n        text-align: center;\n        word-break: break-all;\n        word-wrap: break-word;\n        height: 0.17067rem; }\n    .rank .rank-list .rank-1, .rank .rank-list .rank-2, .rank .rank-list .rank-3 {\n      margin: 0; }\n      .rank .rank-list .rank-1 .picture, .rank .rank-list .rank-2 .picture, .rank .rank-list .rank-3 .picture {\n        position: relative; }\n        .rank .rank-list .rank-1 .picture:before, .rank .rank-list .rank-2 .picture:before, .rank .rank-list .rank-3 .picture:before {\n          content: '';\n          display: block;\n          position: absolute;\n          width: 0.26027rem;\n          height: 0.23467rem; }\n    .rank .rank-list .rank-2 {\n      position: absolute;\n      top: 0;\n      left: 0.192rem;\n      width: 0.768rem;\n      margin-top: 0.17067rem; }\n      .rank .rank-list .rank-2 .picture:before {\n        top: -0.1536rem;\n        left: 0rem;\n        background-image: url(" + __webpack_require__(49) + ");\n        background-size: 100% 100%; }\n    .rank .rank-list .rank-3 {\n      position: absolute;\n      top: 0;\n      right: 0.192rem;\n      width: 0.768rem;\n      margin-top: 0.17067rem; }\n      .rank .rank-list .rank-3 .picture:before {\n        top: -0.1536rem;\n        left: 0rem;\n        background-image: url(" + __webpack_require__(50) + ");\n        background-size: 100% 100%; }\n    .rank .rank-list .rank-1 {\n      width: 0.93867rem;\n      position: absolute;\n      top: 0;\n      left: 50%;\n      -webkit-transform: translate(-50%, 0);\n         -moz-transform: translate(-50%, 0);\n           -o-transform: translate(-50%, 0);\n              transform: translate(-50%, 0);\n      border-radius: 1000px; }\n      .rank .rank-list .rank-1 .picture:before {\n        top: -0.14507rem;\n        left: 0.05547rem;\n        background-image: url(" + __webpack_require__(48) + ");\n        background-size: 100% 100%; }\n    .rank .rank-list .rank-4, .rank .rank-list .rank-5, .rank .rank-list .rank-6 {\n      padding-top: 0.13653rem;\n      display: inline-block;\n      vertical-align: top;\n      width: 0.68267rem;\n      margin: 0 0.17067rem;\n      height: 1.14347rem; }\n      .rank .rank-list .rank-4 .picture, .rank .rank-list .rank-5 .picture, .rank .rank-list .rank-6 .picture {\n        border-radius: 4px 50% 50% 50%; }\n        .rank .rank-list .rank-4 .picture:before, .rank .rank-list .rank-5 .picture:before, .rank .rank-list .rank-6 .picture:before {\n          top: -2px;\n          left: 0;\n          color: #9450e7;\n          font-size: 0.08533rem;\n          width: 0.08533rem;\n          line-height: 1.6;\n          text-align: center; }\n    .rank .rank-list .rank-4 .picture:before {\n      content: '4'; }\n    .rank .rank-list .rank-5 .picture:before {\n      content: '5'; }\n    .rank .rank-list .rank-6 .picture:before {\n      content: '6'; }\n    .rank .rank-list .rank-7, .rank .rank-list .rank-8, .rank .rank-list .rank-9, .rank .rank-list .rank-10 {\n      padding-top: 0.13653rem;\n      display: inline-block;\n      vertical-align: top;\n      height: 1.07093rem; }\n      .rank .rank-list .rank-7 .picture, .rank .rank-list .rank-8 .picture, .rank .rank-list .rank-9 .picture, .rank .rank-list .rank-10 .picture {\n        border-radius: 4px 50% 50% 50%; }\n        .rank .rank-list .rank-7 .picture:before, .rank .rank-list .rank-8 .picture:before, .rank .rank-list .rank-9 .picture:before, .rank .rank-list .rank-10 .picture:before {\n          top: -2px;\n          left: 0;\n          color: #9450e7;\n          font-size: 0.08533rem;\n          width: 0.08533rem;\n          line-height: 1.15;\n          text-align: center; }\n    .rank .rank-list .rank-7 .picture:before {\n      content: '7'; }\n    .rank .rank-list .rank-8 .picture:before {\n      content: '8'; }\n    .rank .rank-list .rank-9 .picture:before {\n      content: '9'; }\n    .rank .rank-list .rank-10 .picture:before {\n      content: '10'; }\n  .rank .action .backhome-btn {\n    display: block;\n    margin: 0 auto;\n    width: 2.7904rem;\n    height: 0.45653rem;\n    background-image: url(" + __webpack_require__(51) + ");\n    background-size: 100% 100%; }\n    .rank .action .backhome-btn .click-area {\n      width: 2.73067rem;\n      height: 0.384rem;\n      display: block;\n      margin: 0 auto; }\n  .rank .longzhu-ad {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%; }\n    .rank .longzhu-ad img {\n      width: 100%;\n      height: 100%;\n      display: block; }\n    .rank .longzhu-ad .close-ad {\n      position: absolute;\n      right: 0.04267rem;\n      bottom: 0.29867rem;\n      width: 0.128rem;\n      height: 0.128rem; }\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".register .slogan {\n  width: 1.5104rem;\n  height: 1.19467rem;\n  margin: 0.4352rem auto 0; }\n  .register .slogan img {\n    display: block;\n    width: 100%;\n    height: 100%; }\n\n.register .form {\n  margin-top: 0.3328rem; }\n\n.register .input-box {\n  margin: 0 auto;\n  width: 2.56rem;\n  height: 0.42667rem;\n  border: 1px solid #fff;\n  border-radius: 1000px;\n  color: #fff;\n  background-color: rgba(255, 255, 255, 0.1);\n  position: relative; }\n  .register .input-box label {\n    position: absolute;\n    top: 0;\n    left: 0;\n    color: #fff;\n    font-size: 0.11093rem;\n    line-height: 0.42667rem;\n    text-indent: 0.18773rem; }\n  .register .input-box .txt {\n    display: block;\n    width: 100%;\n    height: 100%;\n    background-color: transparent;\n    padding-left: 0.68693rem;\n    -moz-box-sizing: border-box;\n         box-sizing: border-box;\n    font-size: 0.128rem;\n    color: #fff; }\n\n.register .phone.input-box {\n  margin-bottom: 0.21333rem; }\n  .register .phone.input-box .txt {\n    padding-right: 0.4096rem; }\n  .register .phone.input-box .prompt {\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 0.4096rem;\n    height: 100%; }\n    .register .phone.input-box .prompt .prompt-box {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n         -moz-transform: translate(-50%, -50%);\n           -o-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%);\n      width: 0.17067rem;\n      height: 0.17067rem;\n      background-image: url(" + __webpack_require__(56) + ");\n      background-size: 100% 100%; }\n      .register .phone.input-box .prompt .prompt-box .prompt-txt-box {\n        position: absolute;\n        right: -0.05973rem;\n        bottom: 120%;\n        width: 0.72533rem;\n        height: 0.29867rem;\n        display: none;\n        -webkit-transform-origin: 0.59733rem bottom;\n           -moz-transform-origin: 0.59733rem bottom;\n             -o-transform-origin: 0.59733rem bottom;\n                transform-origin: 0.59733rem bottom; }\n        .register .phone.input-box .prompt .prompt-box .prompt-txt-box.show {\n          -webkit-animation: prompt-txt-box-show .5s forwards;\n             -moz-animation: prompt-txt-box-show .5s forwards;\n               -o-animation: prompt-txt-box-show .5s forwards;\n                  animation: prompt-txt-box-show .5s forwards;\n          display: block; }\n\n@-webkit-keyframes prompt-txt-box-show {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@-moz-keyframes prompt-txt-box-show {\n  0% {\n    -moz-transform: scale(0);\n         transform: scale(0); }\n  100% {\n    -moz-transform: scale(1);\n         transform: scale(1); } }\n\n@-o-keyframes prompt-txt-box-show {\n  0% {\n    -o-transform: scale(0);\n       transform: scale(0); }\n  100% {\n    -o-transform: scale(1);\n       transform: scale(1); } }\n\n@keyframes prompt-txt-box-show {\n  0% {\n    -webkit-transform: scale(0);\n       -moz-transform: scale(0);\n         -o-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n       -moz-transform: scale(1);\n         -o-transform: scale(1);\n            transform: scale(1); } }\n        .register .phone.input-box .prompt .prompt-box .prompt-txt-box.hide {\n          -webkit-animation: prompt-txt-box-hide .5s forwards;\n             -moz-animation: prompt-txt-box-hide .5s forwards;\n               -o-animation: prompt-txt-box-hide .5s forwards;\n                  animation: prompt-txt-box-hide .5s forwards;\n          display: block; }\n\n@-webkit-keyframes prompt-txt-box-hide {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1); }\n  100% {\n    -webkit-transform: scale(0);\n            transform: scale(0); } }\n\n@-moz-keyframes prompt-txt-box-hide {\n  0% {\n    -moz-transform: scale(1);\n         transform: scale(1); }\n  100% {\n    -moz-transform: scale(0);\n         transform: scale(0); } }\n\n@-o-keyframes prompt-txt-box-hide {\n  0% {\n    -o-transform: scale(1);\n       transform: scale(1); }\n  100% {\n    -o-transform: scale(0);\n       transform: scale(0); } }\n\n@keyframes prompt-txt-box-hide {\n  0% {\n    -webkit-transform: scale(1);\n       -moz-transform: scale(1);\n         -o-transform: scale(1);\n            transform: scale(1); }\n  100% {\n    -webkit-transform: scale(0);\n       -moz-transform: scale(0);\n         -o-transform: scale(0);\n            transform: scale(0); } }\n        .register .phone.input-box .prompt .prompt-box .prompt-txt-box img {\n          display: block;\n          height: 100%;\n          width: 100%; }\n        .register .phone.input-box .prompt .prompt-box .prompt-txt-box span {\n          position: absolute;\n          top: 0;\n          left: 0;\n          display: block;\n          font-size: 0.1024rem;\n          line-height: 0.256rem;\n          color: #792dc8;\n          position: absolute;\n          width: 100%;\n          height: 0.256rem;\n          text-align: center; }\n\n.register .yzm.input-box .txt {\n  padding-right: 0.81067rem; }\n\n.register .yzm.input-box .prompt {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 0.81067rem;\n  height: 100%; }\n  .register .yzm.input-box .prompt .prompt-box {\n    background-color: #fff;\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: block;\n    width: 100%;\n    height: 100%;\n    border-radius: 0 1000px 1000px 0;\n    text-align: center;\n    font-size: 0.11093rem;\n    color: #9450e7;\n    text-decoration: none;\n    line-height: 0.42667rem; }\n\n.register .action {\n  margin-top: 0.34133rem; }\n  .register .action .sure-btn {\n    width: 2.56rem;\n    height: 0.42667rem;\n    display: block;\n    margin: 0 auto;\n    background-image: url(" + __webpack_require__(57) + ");\n    background-size: 100% 100%; }\n\n.register p.p1, .register p.p2 {\n  color: #fff;\n  font-size: 0.1024rem;\n  line-height: 1.8;\n  text-align: center;\n  margin-top: 0.72533rem; }\n\n.register p.p2 {\n  color: #ffd35c;\n  margin-top: 0; }\n  .register p.p2 a {\n    text-decoration: none;\n    color: inherit; }\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".rule .slogan {\n  margin: 0.31573rem auto 0;\n  width: 1.12213rem;\n  height: 0.88747rem;\n  display: block; }\n  .rule .slogan img {\n    width: 100%;\n    height: 100%;\n    display: block; }\n\n.rule h3 {\n  margin-top: 0.17067rem;\n  font-size: 0.1536rem;\n  line-height: 1.5;\n  color: #ffd35c;\n  text-align: center; }\n\n.rule .v-swiper-container {\n  margin: 0.17067rem auto 0;\n  height: 2.56rem;\n  width: 2.64533rem;\n  overflow: hidden; }\n  .rule .v-swiper-container p {\n    font-size: 0.1024rem;\n    line-height: 2;\n    margin: 0 auto;\n    color: #fff; }\n\n.rule .action {\n  margin-top: 0.34133rem;\n  width: 100%;\n  text-align: center; }\n  .rule .action .backhome-btn {\n    display: block;\n    margin: 0 auto 0.17067rem;\n    width: 1.536rem;\n    height: 0.384rem;\n    background: url(" + __webpack_require__(58) + ");\n    background-size: 100% 100%; }\n", ""]);

// exports


/***/ }),
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"view home\">\r\n\t<img src=\"" + __webpack_require__(44) + "\" alt=\"\" class=\"bg\">\r\n\t<div class=\"content\">\r\n\t\t<div class=\"slogan\">\r\n\t\t\t<img src=\"" + __webpack_require__(15) + "\" alt=\"\">\r\n\t\t</div>\r\n\t\t<div class=\"action\">\r\n\t\t\t<a href=\"\" class=\"score-btn\"></a>\r\n\t\t\t<a href=\"\" class=\"rank-btn\"></a>\r\n\t\t\t<a href=\"\" class=\"upload-btn\"></a>\r\n\t\t\t<a href=\"\" class=\"rule-btn\">活动规则说明</a>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"view rank\">\r\n\t<img src=\"" + __webpack_require__(52) + "\" alt=\"\" class=\"bg\">\r\n\t<div class=\"content\">\r\n\t\t<div class=\"rank-list\">\r\n\t\t\t<div class=\"rank-item rank-1\">\r\n\t\t\t\t<div class=\"picture\">\r\n\t\t\t\t\t<img src=\"http://qqtu8.net/f/20140309150741.jpg\" alt=\"\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info\">\r\n\t\t\t\t\t<div class=\"score\">\r\n\t\t\t\t\t\t<span class=\"g\">9</span>\r\n\t\t\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t\t\t<span>2</span>\r\n\t\t\t\t\t\t<span>分</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"name\">李杨</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"rank-item rank-2\">\r\n\t\t\t\t<div class=\"picture\">\r\n\t\t\t\t\t<img src=\"http://qqtu8.net/f/20140309150741.jpg\" alt=\"\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info\">\r\n\t\t\t\t\t<div class=\"score\">\r\n\t\t\t\t\t\t<span class=\"g\">9</span>\r\n\t\t\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t\t\t<span>2</span>\r\n\t\t\t\t\t\t<span>分</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"name\">李杨</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"rank-item rank-3\">\r\n\t\t\t\t<div class=\"picture\">\r\n\t\t\t\t\t<img src=\"http://qqtu8.net/f/20140309150741.jpg\" alt=\"\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info\">\r\n\t\t\t\t\t<div class=\"score\">\r\n\t\t\t\t\t\t<span class=\"g\">9</span>\r\n\t\t\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t\t\t<span>2</span>\r\n\t\t\t\t\t\t<span>分</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"name\">李杨</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"rank-item rank-4\">\r\n\t\t\t\t<div class=\"picture\">\r\n\t\t\t\t\t<img src=\"http://qqtu8.net/f/20140309150741.jpg\" alt=\"\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info\">\r\n\t\t\t\t\t<div class=\"score\">\r\n\t\t\t\t\t\t<span class=\"g\">9</span>\r\n\t\t\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t\t\t<span>2</span>\r\n\t\t\t\t\t\t<span>分</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"name\">李杨</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"rank-item rank-5\">\r\n\t\t\t\t<div class=\"picture\">\r\n\t\t\t\t\t<img src=\"http://qqtu8.net/f/20140309150741.jpg\" alt=\"\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info\">\r\n\t\t\t\t\t<div class=\"score\">\r\n\t\t\t\t\t\t<span class=\"g\">9</span>\r\n\t\t\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t\t\t<span>2</span>\r\n\t\t\t\t\t\t<span>分</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"name\">李杨</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"rank-item rank-6\">\r\n\t\t\t\t<div class=\"picture\">\r\n\t\t\t\t\t<img src=\"http://qqtu8.net/f/20140309150741.jpg\" alt=\"\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info\">\r\n\t\t\t\t\t<div class=\"score\">\r\n\t\t\t\t\t\t<span class=\"g\">9</span>\r\n\t\t\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t\t\t<span>2</span>\r\n\t\t\t\t\t\t<span>分</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"name\">李杨</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"rank-item rank-7\">\r\n\t\t\t\t<div class=\"picture\">\r\n\t\t\t\t\t<img src=\"http://qqtu8.net/f/20140309150741.jpg\" alt=\"\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info\">\r\n\t\t\t\t\t<div class=\"score\">\r\n\t\t\t\t\t\t<span class=\"g\">9</span>\r\n\t\t\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t\t\t<span>2</span>\r\n\t\t\t\t\t\t<span>分</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"name\">李杨</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"rank-item rank-8\">\r\n\t\t\t\t<div class=\"picture\">\r\n\t\t\t\t\t<img src=\"http://qqtu8.net/f/20140309150741.jpg\" alt=\"\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info\">\r\n\t\t\t\t\t<div class=\"score\">\r\n\t\t\t\t\t\t<span class=\"g\">9</span>\r\n\t\t\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t\t\t<span>2</span>\r\n\t\t\t\t\t\t<span>分</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"name\">李杨</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"rank-item rank-9\">\r\n\t\t\t\t<div class=\"picture\">\r\n\t\t\t\t\t<img src=\"http://qqtu8.net/f/20140309150741.jpg\" alt=\"\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info\">\r\n\t\t\t\t\t<div class=\"score\">\r\n\t\t\t\t\t\t<span class=\"g\">9</span>\r\n\t\t\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t\t\t<span>2</span>\r\n\t\t\t\t\t\t<span>分</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"name\">李杨</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"rank-item rank-10\">\r\n\t\t\t\t<div class=\"picture\">\r\n\t\t\t\t\t<img src=\"http://qqtu8.net/f/20140309150741.jpg\" alt=\"\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"info\">\r\n\t\t\t\t\t<div class=\"score\">\r\n\t\t\t\t\t\t<span class=\"g\">9</span>\r\n\t\t\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t\t\t<span>2</span>\r\n\t\t\t\t\t\t<span>分</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"name\">李杨</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"action\">\r\n\t\t\t<div class=\"backhome-btn\"><a class=\"click-area\"></a></div>\r\n\t\t</div>\r\n\t\t<a class=\"longzhu-ad\" href=\"javascript: void(0)\">\r\n\t\t\t<img class=\"\" src=\"" + __webpack_require__(53) + "\" alt=\"\">\r\n\t\t\t<i class=\"close-ad\"></i>\r\n\t\t</a>\r\n\t</div>\r\n</div>";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"view register\">\r\n\t<img src=\"" + __webpack_require__(54) + "\" alt=\"\" class=\"bg\">\r\n\t<div class=\"content\">\r\n\t\t<div class=\"slogan\">\r\n\t\t\t<img src=\"" + __webpack_require__(15) + "\" alt=\"\">\r\n\t\t</div>\r\n\t\t<div class=\"form\">\r\n\t\t\t<form>\r\n\t\t\t\t<div class=\"input-box phone\">\r\n\t\t\t\t\t<label>手机号：</label>\r\n\t\t\t\t\t<input class=\"txt\" type=\"tel\" name=\"\">\r\n\t\t\t\t\t<div class=\"prompt\">\r\n\t\t\t\t\t\t<div class=\"prompt-box\">\r\n\t\t\t\t\t\t\t<div class=\"prompt-txt-box\">\r\n\t\t\t\t\t\t\t\t<img src=\"" + __webpack_require__(55) + "\">\r\n\t\t\t\t\t\t\t\t<span>手机号</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"input-box yzm\">\r\n\t\t\t\t\t<label>验证码：</label>\r\n\t\t\t\t\t<input class=\"txt\" type=\"txt\" name=\"\">\r\n\t\t\t\t\t<div class=\"prompt\">\r\n\t\t\t\t\t\t<a href=\"\" class=\"prompt-box\">\r\n\t\t\t\t\t\t\t<span>获取验证码</span>\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</form>\r\n\t\t</div>\r\n\t\t<div class=\"action\">\r\n\t\t\t<a href=\"\" class=\"sure-btn\"></a>\r\n\t\t\t<p class=\"p1\">\r\n\t\t\t\t注册即代表认同 \r\n\t\t\t</p>\r\n\t\t\t<p class=\"p2\">\r\n\t\t\t\t<a href=\"\" class=\"rule-btn\">\r\n\t\t\t\t\t《步行街素人女神大赛参赛须知》\r\n\t\t\t\t</a>\r\n\t\t\t</p>\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</div>";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"view rule\">\r\n\t<img src=\"" + __webpack_require__(59) + "\" alt=\"\" class=\"bg\">\r\n\t<div class=\"content\">\r\n\t\t<div class=\"slogan\">\r\n\t\t\t<img src=\"" + __webpack_require__(15) + "\" alt=\"\">\r\n\t\t</div>\r\n\t\t<h3>参赛须知</h3>\r\n\t\t<div class=\"v-swiper-container\">\r\n\t\t\t<div class=\"v-swiper-wrapper\">\r\n\t\t\t\t<p>\r\n\t\t\t\t\t一、参选女生承诺使用本人真实照片参与比赛，一旦被发现上传照片非本人，活动方有权取消参赛资格以及通过赛事获得的荣誉、奖励等；\r\n\t\t\t\t</p>\r\n\t\t\t\t<p>\r\n\t\t\t\t\t二、参选女生同意活动方使用所上传照片用于活动宣传及后续推广；\r\n\t\t\t\t</p>\r\n\t\t\t\t<p>\r\n\t\t\t\t\t三、参选女生同意获得“步行街素人女神”称号之后，在2017年10月1日-10月7日期间，使用龙珠直播平台与虎扑用户直播互动；\r\n\t\t\t\t</p>\r\n\t\t\t\t<p>\r\n\t\t\t\t\t四、参选女生同意获得“步行街素人女神”称号之后，在2017年10月1日-2018年9月30日期间，与虎扑签订为期一年的经纪合同，在此期间内将配合虎扑展开各类商业活动；\r\n\t\t\t\t</p>\r\n\t\t\t\t<p>\r\n\t\t\t\t\t五、活动方保留迫于不可抗拒力量取消评选活动的权利。\r\n\t\t\t\t</p>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"action\">\r\n\t\t\t<a href=\"\" class=\"backhome-btn\"></a>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ }),
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rem_js_1 = __webpack_require__(6);
Rem_js_1.default.init();
__webpack_require__(7);
__webpack_require__(8);
var $ = __webpack_require__(3);
var index_ts_1 = __webpack_require__(16);
var index_ts_2 = __webpack_require__(18);
var index_ts_3 = __webpack_require__(19);
var index_ts_4 = __webpack_require__(17);
var index_ts_5 = __webpack_require__(64);
var index_ts_6 = __webpack_require__(76);
var APP = (function () {
    function APP() {
        this.DOMAPI = $('.app .app-wrapper');
        this.page = {};
        // 首页
        this.page.home = new index_ts_1.default(this);
        this.DOMAPI.append(this.page.home.domElem.getElemList());
        // 注册页
        this.page.register = new index_ts_2.default(this);
        this.DOMAPI.append(this.page.register.domElem.getElemList());
        // 规则页
        this.page.rule = new index_ts_3.default(this);
        this.DOMAPI.append(this.page.rule.domElem.getElemList());
        // 排行榜页
        this.page.rank = new index_ts_4.default(this);
        this.DOMAPI.append(this.page.rank.domElem.getElemList());
        // 打分页
        this.page.contest = new index_ts_5.default(this);
        this.DOMAPI.append(this.page.contest.domElem.getElemList());
        // 上传图片页
        this.page.upload = new index_ts_6.default(this);
        this.DOMAPI.append(this.page.upload.domElem.getElemList());
    }
    APP.prototype.start = function () {
        var page = GetQueryString('page');
        if (this.page[page] === undefined) {
            page = 'home';
        }
        this.page[page].show();
    };
    APP.prototype.get = function (PageName) {
        return this.page[PageName];
    };
    return APP;
}());
exports.APP = APP;
var app = new APP();
app.start();
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return (r[2]);
    return null;
}


/***/ }),
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AjaxPost_0_0_1_js_1 = __webpack_require__(21);
function requestVCode() {
    console.log(AjaxPost_0_0_1_js_1.AjaxPost);
}
exports.requestVCode = requestVCode;
var registerPost_loading = false;
function registerPost(data, success, complete, prompt) {
    if (registerPost_loading) {
        prompt();
        return;
    }
    registerPost_loading = true;
    console.log(AjaxPost_0_0_1_js_1.AjaxPost);
    success();
    setTimeout(function () {
        registerPost_loading = false;
        complete();
    }, 1000);
}
exports.registerPost = registerPost;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("bg.22f011cecfc5aa98536981b352674228.jpg");

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("rank.d2489e2f136406783977fdf56d40cb7a.png");

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("score.b83c3258d4db3b165f8633e1e049a90d.png");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("upload.d98e4e2177e7dd29c6182852d35eaf0f.png");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("1.ecbfaebda86a5fe7b2f26c0028368297.png");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("2.a044158f7fcb6c53dc9ec53f348d68a2.png");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("3.6460ecff0f6752d9d78adc696a14ef09.png");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("backhome.0fa342c80158b51e3659706fefc897b8.png");

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("bg.4f6dd080cd4880ac61785276c6a0f17a.jpg");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("longzhu.f28da27bf78fedc703e1355ba71c872c.png");

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("bg.9e7573b686e214822b46c41cccf21cd3.jpg");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("phone_prompt.5f7c4374a10f0f7ffbbf299b754e5539.png");

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("prompt_btn.b093d85295f82700c9e11242ab497aa1.png");

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("sure_btn.ec7a70747359dc242f05d8a9132cef35.png");

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("backhome.6f4d1c7674ff516847d863fba3bb4916.png");

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("bg.5b884080e77fe7c79ea4a40210e008ef.jpg");

/***/ }),
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(67);
var HTML = __webpack_require__(66);
var $ = __webpack_require__(3);
var Page_0_0_2_js_1 = __webpack_require__(4);
var ContestPage = (function (_super) {
    __extends(ContestPage, _super);
    function ContestPage(app) {
        var _this = this;
        var option = {
            el: $.render(HTML).getEl(0),
            aftershowInit: function () {
                _this.touchSelect = new TouchSelect(_this.domElem.find('.score-tool .score-list').getEl(0).clientWidth, 11);
            },
            Event: function () {
                _this.event();
            }
        };
        _this = _super.call(this, option) || this;
        _this.app = app;
        return _this;
    }
    ContestPage.prototype.event = function () {
        var _this = this;
        this.domElem.find('.action .backhome-btn').on('click', function (e) {
            $.pdsp(e);
            _this.app.get('home').showWithAnimate();
            _this.hideWithAnimate();
        });
        this.domElem.find('.action .next-prime-goddess-btn').on('click', function (e) {
            $.pdsp(e);
            _this.nextPrimeGoddess();
        });
        this.scoreToolElem = this.domElem.find('.score-tool .score-list');
        this.scoreToolElem.on('touchstart touchmove', function (e) {
            $.pdsp(e);
            _this.scoreSelect(e.changedTouches[0] || e.changedTouches[0] || e.targetTouches[0]);
        });
        this.scoreToolElem.on('touchend', function (e) {
            $.pdsp(e);
            _this.scoreToolElem.addClass('pointer-events-none');
            var score = _this.scoreSelect(e.changedTouches[0] || e.changedTouches[0] || e.targetTouches[0]);
            setTimeout(function () {
                _this.nextPrimeGoddess(score);
                _this.scoreToolElem.removeClass('pointer-events-none');
            }, 300);
        });
    };
    ContestPage.prototype.scoreSelect = function (touches) {
        var selectNum = this.touchSelect.getSelect(touches.clientX);
        this.scoreToolElem.setAttr('equal-index', '_' + selectNum);
        return selectNum;
    };
    ContestPage.prototype.clearSelect = function () {
        this.scoreToolElem.removeAttr('equal-index');
    };
    ContestPage.prototype.nextPrimeGoddess = function (score) {
        if (score === void 0) { score = -1; }
        var testname = this.domElem.find('.info .name').text();
        this.domElem.find('.info .name').text(testname + ' _' + score);
        console.log(score);
        this.clearSelect();
    };
    return ContestPage;
}(Page_0_0_2_js_1.default));
exports.default = ContestPage;
var TouchSelect = (function () {
    function TouchSelect(touchWidth, selectNum) {
        this.eachSelectWidth = touchWidth / selectNum;
        this.selectNum = selectNum;
    }
    TouchSelect.prototype.getSelect = function (offsetX) {
        var whichSelect = offsetX / this.eachSelectWidth;
        whichSelect = Math.floor(whichSelect);
        if (whichSelect >= this.selectNum) {
            whichSelect = this.selectNum - 1;
        }
        else if (whichSelect < 0) {
            whichSelect = 0;
        }
        return whichSelect;
    };
    return TouchSelect;
}());


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".contest .picture {\n  position: relative; }\n  .contest .picture img {\n    width: 3.2rem;\n    height: 4.01067rem;\n    display: block;\n    background-color: #fff; }\n  .contest .picture .sorce {\n    position: absolute;\n    top: 0.17067rem;\n    left: 0.14507rem;\n    font-size: 0; }\n    .contest .picture .sorce span {\n      font-size: 0.17067rem;\n      color: #9450e7;\n      line-height: 1; }\n    .contest .picture .sorce .g {\n      font-size: 0.42667rem;\n      line-height: 1; }\n  .contest .picture .rank-num {\n    position: absolute;\n    right: 0.14933rem;\n    top: 0.1024rem;\n    padding-top: 0.17067rem; }\n    .contest .picture .rank-num .crown {\n      position: absolute;\n      top: 0;\n      right: 0;\n      display: block;\n      width: 0.20907rem;\n      height: 0.17067rem;\n      background-image: url(" + __webpack_require__(69) + ");\n      background-size: 100% 100%; }\n    .contest .picture .rank-num p {\n      color: #9450e7;\n      font-size: 0.128rem;\n      line-height: 1.15;\n      text-align: right; }\n  .contest .picture .info {\n    position: absolute;\n    bottom: 0;\n    background-color: rgba(148, 80, 231, 0.6);\n    width: 100%;\n    padding: 0.10667rem 0; }\n    .contest .picture .info .name {\n      margin: 0 auto;\n      font-size: 0.1536rem;\n      width: 2.944rem;\n      color: #fff;\n      line-height: 1.5;\n      word-wrap: normal;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden; }\n    .contest .picture .info .detail {\n      margin: 0 auto;\n      font-size: 0.09387rem;\n      width: 2.944rem;\n      color: #fff;\n      line-height: 1.5;\n      height: 0.2816rem;\n      overflow: hidden;\n      word-break: break-all;\n      word-wrap: break-word; }\n\n.contest .score-tool {\n  display: block;\n  width: 3.15861rem;\n  height: 0.25173rem;\n  margin: 0 auto;\n  position: relative;\n  padding-top: 0.2304rem;\n  padding-bottom: 0.08533rem; }\n  .contest .score-tool .bg {\n    margin: 0 auto;\n    display: block;\n    width: 2.944rem;\n    height: 100%;\n    background-image: url(" + __webpack_require__(71) + ");\n    background-size: 100% 100%; }\n  .contest .score-tool .score-list {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    font-size: 0;\n    white-space: nowrap; }\n    .contest .score-tool .score-list .score-item {\n      display: inline-block;\n      vertical-align: top;\n      width: 0.28715rem;\n      height: 100%;\n      position: relative; }\n      .contest .score-tool .score-list .score-item:before {\n        content: '';\n        position: absolute;\n        width: 100%;\n        height: 0.01707rem;\n        top: 0.26453rem; }\n      .contest .score-tool .score-list .score-item:first-child:before {\n        width: 50%;\n        right: 0; }\n      .contest .score-tool .score-list .score-item:last-child:before {\n        width: 50%;\n        left: 0; }\n      .contest .score-tool .score-list .score-item:after {\n        display: none;\n        content: '';\n        width: 0.05973rem;\n        height: 0.05973rem;\n        background-image: url(" + __webpack_require__(74) + ");\n        background-size: 100% 100%;\n        position: absolute;\n        top: 0.2432rem;\n        left: 50%;\n        -webkit-transform: translate(-50%, 0);\n           -moz-transform: translate(-50%, 0);\n             -o-transform: translate(-50%, 0);\n                transform: translate(-50%, 0); }\n  .contest .score-tool .score-list[equal-index=_0] .score-item[score-index=_0]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_0] .score-item[score-index=_0]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_0] .score-item[score-index=_1]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_0] .score-item[score-index=_1]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_0] .score-item[score-index=_1]:before {\n    width: 50%; }\n  .contest .score-tool .score-list[equal-index=_0] .score-item[score-index=_1]:after {\n    width: 0.21333rem;\n    height: 0.21333rem;\n    background-image: url(" + __webpack_require__(75) + ");\n    top: 0.17067rem; }\n  .contest .score-tool .score-list[equal-index=_1] .score-item[score-index=_0]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_1] .score-item[score-index=_0]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_1] .score-item[score-index=_1]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_1] .score-item[score-index=_1]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_1] .score-item[score-index=_2]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_1] .score-item[score-index=_2]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_1] .score-item[score-index=_2]:before {\n    width: 50%; }\n  .contest .score-tool .score-list[equal-index=_1] .score-item[score-index=_2]:after {\n    width: 0.21333rem;\n    height: 0.21333rem;\n    background-image: url(" + __webpack_require__(75) + ");\n    top: 0.17067rem; }\n  .contest .score-tool .score-list[equal-index=_2] .score-item[score-index=_0]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_2] .score-item[score-index=_0]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_2] .score-item[score-index=_1]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_2] .score-item[score-index=_1]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_2] .score-item[score-index=_2]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_2] .score-item[score-index=_2]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_2] .score-item[score-index=_3]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_2] .score-item[score-index=_3]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_2] .score-item[score-index=_3]:before {\n    width: 50%; }\n  .contest .score-tool .score-list[equal-index=_2] .score-item[score-index=_3]:after {\n    width: 0.21333rem;\n    height: 0.21333rem;\n    background-image: url(" + __webpack_require__(75) + ");\n    top: 0.17067rem; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_0]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_0]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_1]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_1]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_2]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_2]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_3]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_3]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_4]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_4]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_4]:before {\n    width: 50%; }\n  .contest .score-tool .score-list[equal-index=_3] .score-item[score-index=_4]:after {\n    width: 0.21333rem;\n    height: 0.21333rem;\n    background-image: url(" + __webpack_require__(75) + ");\n    top: 0.17067rem; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_0]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_0]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_1]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_1]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_2]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_2]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_3]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_3]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_4]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_4]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_5]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_5]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_5]:before {\n    width: 50%; }\n  .contest .score-tool .score-list[equal-index=_4] .score-item[score-index=_5]:after {\n    width: 0.21333rem;\n    height: 0.21333rem;\n    background-image: url(" + __webpack_require__(75) + ");\n    top: 0.17067rem; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_0]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_0]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_1]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_1]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_2]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_2]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_3]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_3]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_4]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_4]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_5]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_5]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_6]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_6]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_6]:before {\n    width: 50%; }\n  .contest .score-tool .score-list[equal-index=_5] .score-item[score-index=_6]:after {\n    width: 0.21333rem;\n    height: 0.21333rem;\n    background-image: url(" + __webpack_require__(75) + ");\n    top: 0.17067rem; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_0]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_0]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_1]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_1]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_2]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_2]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_3]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_3]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_4]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_4]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_5]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_5]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_6]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_6]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_7]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_7]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_7]:before {\n    width: 50%; }\n  .contest .score-tool .score-list[equal-index=_6] .score-item[score-index=_7]:after {\n    width: 0.21333rem;\n    height: 0.21333rem;\n    background-image: url(" + __webpack_require__(75) + ");\n    top: 0.17067rem; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_0]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_0]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_1]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_1]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_2]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_2]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_3]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_3]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_4]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_4]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_5]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_5]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_6]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_6]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_7]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_7]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_8]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_8]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_8]:before {\n    width: 50%; }\n  .contest .score-tool .score-list[equal-index=_7] .score-item[score-index=_8]:after {\n    width: 0.21333rem;\n    height: 0.21333rem;\n    background-image: url(" + __webpack_require__(75) + ");\n    top: 0.17067rem; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_0]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_0]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_1]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_1]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_2]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_2]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_3]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_3]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_4]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_4]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_5]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_5]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_6]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_6]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_7]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_7]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_8]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_8]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_9]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_9]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_9]:before {\n    width: 50%; }\n  .contest .score-tool .score-list[equal-index=_8] .score-item[score-index=_9]:after {\n    width: 0.21333rem;\n    height: 0.21333rem;\n    background-image: url(" + __webpack_require__(75) + ");\n    top: 0.17067rem; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_0]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_0]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_1]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_1]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_2]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_2]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_3]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_3]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_4]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_4]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_5]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_5]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_6]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_6]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_7]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_7]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_8]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_8]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_9]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_9]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_10]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_10]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_10]:before {\n    width: 50%; }\n  .contest .score-tool .score-list[equal-index=_9] .score-item[score-index=_10]:after {\n    width: 0.21333rem;\n    height: 0.21333rem;\n    background-image: url(" + __webpack_require__(75) + ");\n    top: 0.17067rem; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_0]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_0]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_1]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_1]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_2]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_2]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_3]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_3]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_4]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_4]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_5]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_5]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_6]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_6]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_7]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_7]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_8]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_8]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_9]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_9]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_10]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_10]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_11]:before {\n    background-color: #ffa9e1; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_11]:after {\n    display: block; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_11]:before {\n    width: 50%; }\n  .contest .score-tool .score-list[equal-index=_10] .score-item[score-index=_11]:after {\n    width: 0.21333rem;\n    height: 0.21333rem;\n    background-image: url(" + __webpack_require__(75) + ");\n    top: 0.17067rem; }\n\n.contest .action {\n  position: relative; }\n  .contest .action .slogan {\n    margin: 0 auto;\n    display: block;\n    width: 0.67413rem;\n    height: 0.53333rem; }\n  .contest .action .backhome-btn {\n    position: absolute;\n    top: 50%;\n    left: 0.128rem;\n    -webkit-transform: translate(0, -50%);\n       -moz-transform: translate(0, -50%);\n         -o-transform: translate(0, -50%);\n            transform: translate(0, -50%);\n    width: 0.59307rem;\n    height: 0.27307rem;\n    background-image: url(" + __webpack_require__(72) + ");\n    background-size: 100% 100%; }\n  .contest .action .next-prime-goddess-btn {\n    position: absolute;\n    top: 50%;\n    right: 0.128rem;\n    -webkit-transform: translate(0, -50%);\n       -moz-transform: translate(0, -50%);\n         -o-transform: translate(0, -50%);\n            transform: translate(0, -50%);\n    width: 0.37547rem;\n    height: 0.27307rem;\n    background-image: url(" + __webpack_require__(73) + ");\n    background-size: 100% 100%; }\n", ""]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"view contest\">\r\n\t<img src=\"" + __webpack_require__(68) + "\" alt=\"\" class=\"bg\">\r\n\t<div class=\"content\">\r\n\t\t<div class=\"picture\">\r\n\t\t\t<img src=\"" + __webpack_require__(70) + "\" alt=\"\">\r\n\t\t\t<div class=\"sorce\">\r\n\t\t\t\t<span class=\"g\">8</span>\r\n\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t<span>8</span>\r\n\t\t\t\t<span>分</span>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"rank-num\">\r\n\t\t\t\t<i class=\"crown\"></i>\r\n\t\t\t\t<p>当前排名</p>\r\n\t\t\t\t<p class=\"num\">100+</p>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"info\">\r\n\t\t\t\t<p class=\"name\">新垣结衣</p>\r\n\t\t\t\t<p class=\"detail\">1988年6月11日出生于冲绳县那霸市。日本女演员、歌手、模特。毕业于日出高中。</p>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"score-tool\">\r\n\t\t\t<div class=\"bg\"></div>\r\n\t\t\t<div class=\"score-list\">\r\n\t\t\t\t<div class=\"score-item\" score-index=\"_1\"></div>\r\n\t\t\t\t<div class=\"score-item\" score-index=\"_2\"></div>\r\n\t\t\t\t<div class=\"score-item\" score-index=\"_3\"></div>\r\n\t\t\t\t<div class=\"score-item\" score-index=\"_4\"></div>\r\n\t\t\t\t<div class=\"score-item\" score-index=\"_5\"></div>\r\n\t\t\t\t<div class=\"score-item\" score-index=\"_6\"></div>\r\n\t\t\t\t<div class=\"score-item\" score-index=\"_7\"></div>\r\n\t\t\t\t<div class=\"score-item\" score-index=\"_8\"></div>\r\n\t\t\t\t<div class=\"score-item\" score-index=\"_9\"></div>\r\n\t\t\t\t<div class=\"score-item\" score-index=\"_10\"></div>\r\n\t\t\t\t<div class=\"score-item\" score-index=\"_11\"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"action\">\r\n\t\t\t<img class=\"slogan\" src=\"" + __webpack_require__(15) + "\" alt=\"\">\r\n\t\t\t<a href=\"\" class=\"backhome-btn\"></a>\r\n\t\t\t<a href=\"\" class=\"next-prime-goddess-btn\"></a>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("bg.efff75a4ec72ca7c08a587cf806e2273.jpg");

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("crown.f9a92943f9b4eb150dad2434dfa894d9.png");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("demo.b4a93aeddf2c77b50a20e8d30ebcbfc0.jpg");

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("score-bg.7d3b312c10fb5ed40f88546e02766387.png");

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("backhome.851cb3163206f296c8f2486f6911ddb0.png");

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("next_prime_goddess.99215192ff20fead3b376003cd061753.png");

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("score-over.0b0d201f89f31bc5d3a37018d8cfe9bf.png");

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("score-cur.8974e2bfcc7803627e87e5c458521245.png");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(79);
var HTML = __webpack_require__(78);
var $ = __webpack_require__(3);
var Page_0_0_2_js_1 = __webpack_require__(4);
var ContestPage = (function (_super) {
    __extends(ContestPage, _super);
    function ContestPage(app) {
        var _this = this;
        var option = {
            el: $.render(HTML).getEl(0),
            Event: function () {
                _this.event();
            }
        };
        _this = _super.call(this, option) || this;
        _this.app = app;
        return _this;
    }
    ContestPage.prototype.event = function () {
        var _this = this;
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
        this.fileInput.on('change', function (e) {
            _this.uploadBtn.addClass('pointer-events-none');
            alert(111);
        });
    };
    return ContestPage;
}(Page_0_0_2_js_1.default));
exports.default = ContestPage;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".upload {\n  background-color: #9450e7; }\n  .upload .picture {\n    position: relative;\n    width: 100%;\n    height: 4.01067rem; }\n    .upload .picture .icon-upload {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n         -moz-transform: translate(-50%, -50%);\n           -o-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%);\n      width: 0.52053rem;\n      height: 0.81493rem;\n      background-image: url(" + __webpack_require__(81) + ");\n      background-size: 100% 100%; }\n      .upload .picture .icon-upload .file-input {\n        width: 100%;\n        height: 100%;\n        opacity: 0;\n        display: block; }\n    .upload .picture .main-img {\n      width: 3.2rem;\n      height: 4.01067rem;\n      display: block;\n      background-color: #fff; }\n  .upload .info {\n    background-color: #a973ec;\n    height: 0.78933rem; }\n  .upload .action .sure-btn {\n    display: block;\n    background: #ffd35c url(" + __webpack_require__(82) + ") no-repeat center center;\n    background-size: 0.61013rem 0.14933rem;\n    height: 0.448rem;\n    width: 100%; }\n", ""]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"view upload\">\r\n\t<img src=\"" + __webpack_require__(80) + "\" alt=\"\" class=\"bg\">\r\n\t<div class=\"content\">\r\n\t\t<div class=\"picture\">\r\n\t\t\t<div class=\"icon-upload\">\r\n\t\t\t\t<input class=\"file-input\" name=\"file\" name=\"file\" accept=\"image/*\" type=\"file\">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"info\">\r\n\t\t\t\r\n\t\t</div>\r\n\t\t<div class=\"action\">\r\n\t\t\t<a href=\"\" class=\"sure-btn\"></a>\r\n\t\t</div>\r\n\t</div>\r\n\t\r\n</div>";

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("bg.7081ea7b72cde241c8e93b7a371cd9bd.jpg");

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("icon_upload.7ea31da208ad2bfc8111a37df9eed8d3.png");

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("sure_btn.040048b969853bc0b5c4eb2096c3a237.png");

/***/ })
/******/ ]);
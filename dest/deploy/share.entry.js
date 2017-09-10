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
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
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
__webpack_require__(40);
var HTML = __webpack_require__(35);
var $ = __webpack_require__(3);
var Page_0_0_2_js_1 = __webpack_require__(4);
var SharePage = (function (_super) {
    __extends(SharePage, _super);
    function SharePage(app) {
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
    SharePage.prototype.event = function () {
        this.domElem.find('.more-prime-goddess').on('click', function (e) {
            $.pdsp(e);
        });
    };
    return SharePage;
}(Page_0_0_2_js_1.default));
exports.default = SharePage;


/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".share .picture {\n  position: relative; }\n  .share .picture img {\n    width: 3.2rem;\n    height: 4.01067rem;\n    display: block;\n    background-color: #fff; }\n  .share .picture .sorce {\n    position: absolute;\n    top: 0.17067rem;\n    left: 0.14507rem;\n    font-size: 0; }\n    .share .picture .sorce span {\n      font-size: 0.17067rem;\n      color: #9450e7;\n      line-height: 1; }\n    .share .picture .sorce .g {\n      font-size: 0.42667rem;\n      line-height: 1; }\n  .share .picture .rank-num {\n    position: absolute;\n    right: 0.14933rem;\n    top: 0.1024rem;\n    padding-top: 0.17067rem; }\n    .share .picture .rank-num .crown {\n      position: absolute;\n      top: 0;\n      right: 0;\n      display: block;\n      width: 0.20907rem;\n      height: 0.17067rem;\n      background-image: url(" + __webpack_require__(61) + ");\n      background-size: 100% 100%; }\n    .share .picture .rank-num p {\n      color: #9450e7;\n      font-size: 0.128rem;\n      line-height: 1.15;\n      text-align: right; }\n  .share .picture .info {\n    position: absolute;\n    bottom: 0;\n    background-color: rgba(148, 80, 231, 0.6);\n    width: 100%;\n    padding: 0.10667rem 0; }\n    .share .picture .info .name {\n      margin: 0 auto;\n      font-size: 0.1536rem;\n      width: 2.944rem;\n      color: #fff;\n      line-height: 1.5;\n      word-wrap: normal;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden; }\n    .share .picture .info .detail {\n      margin: 0 auto;\n      font-size: 0.09387rem;\n      width: 2.944rem;\n      color: #fff;\n      line-height: 1.5;\n      height: 0.2816rem;\n      overflow: hidden;\n      word-break: break-all;\n      word-wrap: break-word; }\n\n.share .action .more-prime-goddess {\n  margin: 0.34133rem auto 0;\n  display: block;\n  width: 2.56rem;\n  height: 0.42667rem;\n  background-image: url(" + __webpack_require__(62) + ");\n  background-size: 100% 100%; }\n", ""]);

// exports


/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"view share\">\r\n\t<img src=\"" + __webpack_require__(60) + "\" alt=\"\" class=\"bg\">\r\n\t<div class=\"content\">\r\n\t\t<div class=\"picture\">\r\n\t\t\t<img src=\"" + __webpack_require__(63) + "\" alt=\"\">\r\n\t\t\t<div class=\"sorce\">\r\n\t\t\t\t<span class=\"g\">8</span>\r\n\t\t\t\t<span class=\"g\">.</span>\r\n\t\t\t\t<span>8</span>\r\n\t\t\t\t<span>分</span>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"rank-num\">\r\n\t\t\t\t<i class=\"crown\"></i>\r\n\t\t\t\t<p>当前排名</p>\r\n\t\t\t\t<p class=\"num\">100+</p>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"info\">\r\n\t\t\t\t<p class=\"name\">新垣结衣</p>\r\n\t\t\t\t<p class=\"detail\">1988年6月11日出生于冲绳县那霸市。日本女演员、歌手、模特。毕业于日出高中。</p>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"action\">\r\n\t\t\t<a href=\"\" class=\"more-prime-goddess\"></a>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
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
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rem_js_1 = __webpack_require__(6);
Rem_js_1.default.init();
__webpack_require__(7);
__webpack_require__(8);
var $ = __webpack_require__(3);
var index_ts_1 = __webpack_require__(20);
var APP = (function () {
    function APP() {
        this.DOMAPI = $('.app .app-wrapper');
        this.page = {};
        // 分享页
        this.page.share = new index_ts_1.default(this);
        this.DOMAPI.append(this.page.share.domElem.getElemList());
    }
    APP.prototype.start = function () {
        this.page.share.show();
    };
    APP.prototype.get = function (PageName) {
        return this.page[PageName];
    };
    return APP;
}());
exports.APP = APP;
var app = new APP();
app.start();


/***/ }),
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("bg.efff75a4ec72ca7c08a587cf806e2273.jpg");

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("crown.f9a92943f9b4eb150dad2434dfa894d9.png");

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("more_prime_goddess.69504eb0164f9e513800692aa725cedc.png");

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0);module.exports = path.resolve("demo.b4a93aeddf2c77b50a20e8d30ebcbfc0.jpg");

/***/ })
/******/ ]);
(function (root, factory) {
	'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else {
        factory();
    }
}(this, function () {
	'use strict';

	return {
		on: function (eventName, selector, delegatedSelector, func) {
			var nodes = [];

			if (typeof selector === 'string') {
				nodes = document.querySelectorAll(selector);
			}
			else if (!(selector instanceof NodeList)) {
				nodes = [selector];
			}

			if (typeof Element.prototype.addEventListener === 'undefined') {
				Element.prototype.addEventListener = function (eventName, callback) {
					return this.attachEvent('on' + eventName, callback);
				};
			}

			(function (delegatedSelector) {
				var eventCallback = function (event) {
					var target = event.target || event.srcElement,
						delegatedNodes;

					if (target) {
						if (!event.stopPropagation) {
							event.stopPropagation = function () {
								event.returnValue = false;
							};
						}

						if (typeof delegatedSelector === 'function') {
							func = delegatedSelector;
						}
						else if (typeof delegatedSelector === 'string') {
							delegatedNodes = this.querySelectorAll(delegatedSelector);
						}

						if (delegatedNodes && typeof delegatedNodes === 'object') {
							for (var i = 0, l = delegatedNodes.length; i < l; i++) {
								if (delegatedNodes[i] === target) {
									func.call(target, event);
									break;
								}
							}
						}
						else {
							func.call(target, event);
						}
					}
				};

				for (var i = 0, l = nodes.length; i < l; i++) {
					nodes[i].addEventListener(eventName, eventCallback, false);
				}
			}(delegatedSelector));
		}
	};
}));
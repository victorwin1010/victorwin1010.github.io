'use strict';

/// remove-node.js
/// world ISOLATED
/// alias rmn.js
/// dependency run-at.fn
/// dependency safe-self.fn
function removeNode(
	element = '',
	needle = '',
	run = ''
) {	
	  if ( element === '' || needle === '' ) { return; }
	  const safe = safeSelf();
	  const reNeedle = safe.patternToRegex(needle);
	  let timer;
	  const remnode = () => {
				timer = undefined;
		        try {
				const nodes = document.querySelectorAll(element);
				if ( nodes.length > 0 ) {
					for (const node of nodes) {
						if (reNeedle.test(node.outerHTML)) {
						    node.remove(); 
					   }     
					}
				}	
			    } catch { }
      };
	  const mutationHandler = mutations => {
		if ( timer !== undefined ) { return; }
		let skip = true;
		for ( let i = 0; i < mutations.length && skip; i++ ) {
		    const { type, addedNodes, removedNodes } = mutations[i];
		    if ( type === 'attributes' ) { skip = false; }
		    for ( let j = 0; j < addedNodes.length && skip; j++ ) {
			if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		    for ( let j = 0; j < removedNodes.length && skip; j++ ) {
			if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		}
		if ( skip ) { return; }
		timer = self.requestAnimationFrame(remnode);
	  };
	  const start = ( ) => {
		remnode();
		if ( /\bloop\b/.test(run) === false ) { return; }
		const observer = new MutationObserver(mutationHandler);
		observer.observe(document.documentElement, {
		    childList: true,
		    subtree: true,
		});
	  };
	  runAt(( ) => { start(); }, /\bcomplete\b/.test(run) ? 'idle' : 'interactive');
}

/// rename-attr.js
/// alias rna.js
/// world ISOLATED
/// dependency run-at.fn
// example.com##+js(rna, [selector], oldattr, newattr)
function renameAttr(
	selector = '',
	oldattr = '',
	newattr = '',
	run = '' 
) {
	if ( selector === '' || oldattr === '' || newattr === '' ) { return; }
	let timer;
	const renameattr = ( ) => {
		timer = undefined;
		const elems = document.querySelectorAll(selector);
		try {
			for ( const elem of elems ) {
				if ( elem.hasAttribute( oldattr ) ) {
				     const value = elem.getAttribute( oldattr );		
				     elem.removeAttribute( oldattr );
				     elem.setAttribute( newattr, value );
				}
			}	
		} catch { }
	};
	const mutationHandler = mutations => {
		if ( timer !== undefined ) { return; }
		let skip = true;
		for ( let i = 0; i < mutations.length && skip; i++ ) {
		    const { type, addedNodes, removedNodes } = mutations[i];
		    if ( type === 'attributes' ) { skip = false; }
		    for ( let j = 0; j < addedNodes.length && skip; j++ ) {
			if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		    for ( let j = 0; j < removedNodes.length && skip; j++ ) {
			if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		}
		if ( skip ) { return; }
		timer = self.requestAnimationFrame(renameattr);
	};
	const start = ( ) => {
		renameattr();
		if ( /\bloop\b/.test(run) === false ) { return; }
		const observer = new MutationObserver(mutationHandler);
		observer.observe(document.documentElement, {
		    childList: true,
		    subtree: true,
		});
	};
	runAt(( ) => { start(); }, /\bcomplete\b/.test(run) ? 'idle' : 'interactive');
}

/// replace-attr.js
/// alias rpla.js
/// world ISOLATED
/// dependency run-at.fn
// example.com##+js(rpla, [selector], oldattr, newattr, newvalue)
function replaceAttr(
	selector = '',
	oldattr = '',
	newattr = '',
	value = '',
	run = '' 
) {
	if ( selector === '' || oldattr === '' || newattr === '' ) { return; }
	let timer;
	const replaceattr = ( ) => {
		timer = undefined;
		const elems = document.querySelectorAll(selector);
		try {
			for ( const elem of elems ) {
				if ( elem.hasAttribute( oldattr ) ) {
				     elem.removeAttribute( oldattr );		
				     elem.setAttribute( newattr, value );
				}
			}	
		} catch { }
	};
	const mutationHandler = mutations => {
		if ( timer !== undefined ) { return; }
		let skip = true;
		for ( let i = 0; i < mutations.length && skip; i++ ) {
		    const { type, addedNodes, removedNodes } = mutations[i];
		    if ( type === 'attributes' ) { skip = false; }
		    for ( let j = 0; j < addedNodes.length && skip; j++ ) {
			if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		    for ( let j = 0; j < removedNodes.length && skip; j++ ) {
			if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		}
		if ( skip ) { return; }
		timer = self.requestAnimationFrame(replaceattr);
	};
	const start = ( ) => {
		replaceattr();
		if ( /\bloop\b/.test(run) === false ) { return; }
		const observer = new MutationObserver(mutationHandler);
		observer.observe(document.documentElement, {
		    childList: true,
		    subtree: true,
		});
	};
	runAt(( ) => { start(); }, /\bcomplete\b/.test(run) ? 'idle' : 'interactive');
}

/// add-class.js
/// alias ac.js
/// dependency run-at.fn
/// world ISOLATED
// example.com##+js(ac, class, [selector])
function addClass(
	needle = '',
	selector = '' 
) {
	if ( needle === '' ) { return; }
	const needles = needle.split(/\s*\|\s*/);
	if ( selector === '' ) { selector = '.' + needles.map(a => CSS.escape(a)).join(',.'); }
	const addclass = ( ) => {
		const nodes = document.querySelectorAll(selector);
		try {
			for ( const node of nodes ) {
			      node.classList.add(...needles);
			}
		} catch { }
	};
	runAt(( ) => { addclass(); }, 'interactive');
}

/// replace-class.js
/// alias rpc.js
/// world ISOLATED
/// dependency run-at.fn
// example.com##+js(rpc, [selector], oldclass, newclass)
function replaceClass(
	selector = '',
	oldclass = '',
	newclass = '', 
	run = ''
) {
	if ( selector === '' || oldclass === '' || newclass === '' ) { return; }
	let timer;
	const replaceclass = ( ) => {
	  timer = undefined;	
	  const nodes = document.querySelectorAll(selector);
	  try {
		for ( const node of nodes ) {
		      if ( node.classList.contains(oldclass) ) {	
			   node.classList.replace(oldclass, newclass);
		      }	      
		}
	  } catch { }
	};
	const mutationHandler = mutations => {
	if ( timer !== undefined ) { return; }
	let skip = true;
	for ( let i = 0; i < mutations.length && skip; i++ ) {
	    const { type, addedNodes, removedNodes } = mutations[i];
	    if ( type === 'attributes' ) { skip = false; }
	    for ( let j = 0; j < addedNodes.length && skip; j++ ) {
		if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
	    }
	    for ( let j = 0; j < removedNodes.length && skip; j++ ) {
		if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
	    }
	}
	if ( skip ) { return; }
	timer = self.requestAnimationFrame(replaceclass);
	};
	const start = ( ) => {
	replaceclass();
	if ( /\bloop\b/.test(run) === false ) { return; }
	const observer = new MutationObserver(mutationHandler);
	observer.observe(document.documentElement, {
	    childList: true,
	    subtree: true,
	});
	};
	runAt(( ) => { start(); }, /\bcomplete\b/.test(run) ? 'idle' : 'interactive');
}

/// append-elem.js
/// alias ape.js
/// dependency run-at.fn
/// world ISOLATED
// example.com##+js(ape, [selector], element, attribute, value)
function appendElem(
	selector = '',
	elem = '',
	attr = '',
	value = '' 
) {
	if ( selector === '' ) { return; }
	const appendNode = ( ) => {
		try {
			const elements = document.querySelectorAll(selector);
			for ( const element of elements ) {
			      const node = document.createElement(elem);
			      node.setAttribute(attr, value);
			      element.append(node);
			}
		} catch { }
	};
	runAt(( ) => { appendNode(); }, 'interactive');
}

/// callfunction.js
/// alias cf.js
/// dependency run-at.fn
// example.com##+js(cf, funcName)
function callFunction(
	funcCall = ''
) {
	      if ( funcCall === '' ) { return; }
	      const funcInvoke = ( ) => { 
			try { 
				self.requestAnimationFrame(funcCall)
			} catch { }
	      };	      
	      runAt(( ) => { funcInvoke(); }, 'idle');
}

/// no-alert-if.js
/// alias noaif.js
// example.com##+js(noaif, text)
function noAlertIf(
        needle = ''
) {
                const needleNot = needle.charAt(0) === '!';
                if ( needleNot ) { needle = needle.slice(1); }
                if ( /^\/.*\/$/.test(needle) ) {
                    needle = needle.slice(1, -1);
                } else if ( needle !== '' ) {
                    needle = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                }
                const log = needleNot === false && needle.length === 0 ? console.log.bind(console) : undefined;
                const reNeedle = new RegExp(needle);
                self.alert = new Proxy(self.alert, {
                        apply: (target, thisArg, args) => {
		            let params;
			    try {
                            	  params = String(args);
			    } catch { }	    
                            let defuse = false;
                            if ( log !== undefined ) {
                                 log('uBO: alert("%s")', params);
                            } else if ( reNeedle.test(params) !== needleNot ) {
                                 defuse = reNeedle.test(params) !== needleNot;
                            }
                            if ( !defuse ) {
                                 return Reflect.apply(target, thisArg, args);
                            }  
                        },
			get: (target, prop, receiver) => {
                	    if ( prop === 'toString' ) {
                    		 return target.toString.bind(target);
                	}
                		return Reflect.get(target, prop, receiver);
            		},
                });
}

/// insert-child-before.js
/// alias icb.js
/// world ISOLATED
/// dependency run-at.fn
// example.com##+js(icb, element, node)
function insertChildBefore( 
	selector = '',
	element = '',
	run = '' 
) {
	if ( selector === '' || element === '' ) { return; }
	let timer;
	const insertelem = () => {
		timer = undefined;
		try {
			const elems = document.querySelectorAll(selector);
			const nodes = document.querySelectorAll(element);
			for (let i = 0; i < elems.length; i++) {
			    elems[i].before(nodes[i]);
			}	
		} catch { }
	};
	const mutationHandler = mutations => {
		if ( timer !== undefined ) { return; }
		let skip = true;
		for ( let i = 0; i < mutations.length && skip; i++ ) {
		    const { type, addedNodes, removedNodes } = mutations[i];
		    if ( type === 'attributes' ) { skip = false; }
		    for ( let j = 0; j < addedNodes.length && skip; j++ ) {
			if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		    for ( let j = 0; j < removedNodes.length && skip; j++ ) {
			if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		}
		if ( skip ) { return; }
		timer = self.requestAnimationFrame(insertelem);
	};
	const start = ( ) => {
		insertelem();
		if ( /\bloop\b/.test(run) === false ) { return; }
		const observer = new MutationObserver(mutationHandler);
		observer.observe(document.documentElement, {
		    childList: true,
		    subtree: true,
		});
	};
	runAt(( ) => { start(); }, /\bcomplete\b/.test(run) ? 'idle' : 'interactive');
}

/// insert-child-after.js
/// alias ica.js
/// world ISOLATED
/// dependency run-at.fn
// example.com##+js(ica, element, node)
function insertChildAfter( 
	selector = '',
	element = '',
	run = '' 
) {
	if ( selector === '' || element === '' ) { return; }
	let timer;
	const insertelem = () => {
		timer = undefined;
		try {
			const elems = document.querySelectorAll(selector);
			const nodes = document.querySelectorAll(element);
			for (let i = 0; i < elems.length; i++) {
			    elems[i].after(nodes[i]);
			}	
		} catch { }
	};
	const mutationHandler = mutations => {
		if ( timer !== undefined ) { return; }
		let skip = true;
		for ( let i = 0; i < mutations.length && skip; i++ ) {
		    const { type, addedNodes, removedNodes } = mutations[i];
		    if ( type === 'attributes' ) { skip = false; }
		    for ( let j = 0; j < addedNodes.length && skip; j++ ) {
			if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		    for ( let j = 0; j < removedNodes.length && skip; j++ ) {
			if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
		    }
		}
		if ( skip ) { return; }
		timer = self.requestAnimationFrame(insertelem);
	};
	const start = ( ) => {
		insertelem();
		if ( /\bloop\b/.test(run) === false ) { return; }
		const observer = new MutationObserver(mutationHandler);
		observer.observe(document.documentElement, {
		    childList: true,
		    subtree: true,
		});
	};
	runAt(( ) => { start(); }, /\bcomplete\b/.test(run) ? 'idle' : 'interactive');
}

/// set-inner-html.js
/// alias sih.js
/// dependency run-at.fn
/// world ISOLATED
function setInnerHTML(
         selector = '',
         text = ''    
) {
    if ( selector === '' || text === '' ) { return; }
    const innerHTML = ( ) => {
          const nodes = document.querySelectorAll(selector);
          try {
		 for ( const node of nodes ) {
		      if ( node ) { node.innerHTML = text; }
		 }
	  } catch { }
    };
    runAt(( ) => { innerHTML(); }, 'interactive');
}

/// move-attr-prop.js
/// alias map.js
/// dependency run-at.fn
/// world ISOLATED
// example.com##+js(map, [selector], [selector2], attr, attr2)
function moveAttrProp(
	selector = '',
	element = '',
	newattr = '',
	oldattr = '' 
) {
	if ( selector === '' || element === '') { return; }
	const map = ( ) => {
		try {
			const elem = document.querySelectorAll(selector);
			const elem2 = document.querySelectorAll(element);
			for (let i = 0; i < elem.length; i++) {
			     elem[i].setAttribute(newattr, elem2[i].getAttribute(oldattr));
			}
		} catch { }
	};
	runAt(( ) => { map(); }, 'interactive');
}

/// no-beacon.js
/// alias nob.js
/// dependency run-at.fn
/// dependency safe-self.fn
function noBeaconIf(
        url = '',
        data = ''
) {
        const safe = safeSelf();
        const extraArgs = safe.getExtraArgs(Array.from(arguments), 2);
        const reUrl = safe.patternToRegex(url);
        const reData = safe.patternToRegex(data);
	const log = url.length === 0 && data.length === 0 ? console.log.bind(console) : undefined;
        const trapBeacons = ( ) => {
           const beaconHandler = {
                apply: (target, thisArg, args) => {
                    let url, data;
                    try {
                          url = String(args[0]);
                          data = String(args[1]);
                    } catch { }	    
                    const matchesNeedle = safe.RegExp_test.call(reUrl, url);
                    const matchesData = safe.RegExp_test.call(reData, data);
                    const matchesEither = matchesNeedle || matchesData;
                    const matchesBoth = matchesNeedle && matchesData;
                    if ( log !== undefined ) {
                        log(`sendBeacon('${url}', '${data}')`);
                    }
                    if ( matchesBoth ) { return; }
                    return Reflect.apply(target, thisArg, args);
                },
                get: (target, prop, receiver) => {
                    if ( prop === 'toString' ) {
                        return target.toString.bind(target);
                    }
                        return Reflect.get(target, prop, receiver);
                },
            };
           self.navigator.sendBeacon = new Proxy(self.navigator.sendBeacon, beaconHandler);
        };
        runAt(( ) => { trapBeacons(); }, extraArgs.runAt);
}

/// trusted-set-attr.js
/// alias tsa.js
/// dependency run-at.fn
/// world ISOLATED
// example.com##+js(tsa, attr, value, [selector], runValue)
function setAttr(
	token = '',
	attrValue = '',
	selector = '',
	run = '' 
) {
	if ( token === '' ) { return; }
	const tokens = token.split(/\s*\|\s*/);
	if ( selector === '' ) { selector = `[${tokens.join('],[')}]`; }
	let timer;
	const setAttr = () => {
	timer = undefined;	
	const nodes = document.querySelectorAll(selector);
	try {
		for (const node of nodes) {
			for ( const attr of tokens ) {
			      if ( attr !== attrValue) { 
				   node.setAttribute(attr, attrValue);
				   break;   
			      }	      
			}
		}
	} catch { }
	};
	const mutationHandler = mutations => {
	if ( timer !== undefined ) { return; }
	let skip = true;
	for ( let i = 0; i < mutations.length && skip; i++ ) {
	    const { type, addedNodes, removedNodes } = mutations[i];
	    if ( type === 'attributes' ) { skip = false; }
	    for ( let j = 0; j < addedNodes.length && skip; j++ ) {
		if ( addedNodes[j].nodeType === 1 ) { skip = false; break; }
	    }
	    for ( let j = 0; j < removedNodes.length && skip; j++ ) {
		if ( removedNodes[j].nodeType === 1 ) { skip = false; break; }
	    }
	}
	if ( skip ) { return; }
	timer = self.requestAnimationFrame(setAttr);
	};
	const start = ( ) => {
	setAttr();
	if ( /\bloop\b/.test(run) === false ) { return; }
	const observer = new MutationObserver(mutationHandler);
	observer.observe(document.documentElement, {
	    attributes: true,
	    attributeFilter: tokens,
	    childList: true,
	    subtree: true,
	});
	};
	runAt(( ) => { start(); }, /\bcomplete\b/.test(run) ? 'idle' : 'interactive');
}

/// global-eval.js
/// alias goeval.js
/// dependency run-at.fn
/// world ISOLATED
// example.com##+js(goeval, codetext, runValue)
function globalEval(
    text = '',
    run= 'interactive'
) {
    if (text === '') { return; }
    console.log('test');
    const injectCode =()=>{
        try {
            const script = document.createElement('script');
            script.textContent = text;
            document.body.appendChild(script);
            script.onload = function() {
                document.body.removeChild(script);
            };
            if (!script.src) {
                document.body.removeChild(script);
            }
        } catch(e) {console.log('goeval: ',e)}
    };
    runAt(()=>{ injectCode(); }, run);
}

/// json-override.js
/// alias jsonride.js
/// world ISOLATED
// example.com##+js(jsonride, jProps, cValue,needle)
function jsonOverride(
    jProps = '',
    cValue = '',
    needle = '.*',
){
    if (jProps === "''" || jProps === '' || jProps === null || jProps === undefined){return;}
    if (needle === "''" || needle === '' || needle === null || needle === undefined){needle='.*';}
    function deepOverride(obj, pattern, newValue) {
        if (typeof obj !== 'object' || obj === null) {
            throw new Error("Invalid object: The first argument must be a non-null object.");
        }
        if (typeof pattern !== 'string') {
            throw new Error("Invalid pattern: The second argument must be a string.");
        }
        const keys = pattern.split('.');
        function recursiveOverride(currentObj, currentKeys, index) {
            const key = currentKeys[index];
            if (index === currentKeys.length - 1) {
                if (Array.isArray(currentObj)) {
                    currentObj.forEach(item => {
                        if (typeof item === 'object' && item !== null) {
                            item[key] = newValue;
                        }
                    });
                } else if (typeof currentObj === 'object' && currentObj !== null) {
                    currentObj[key] = newValue;
                }
                return;
            }
            if (key === '*') {
                for (const k in currentObj) {
                    if (currentObj.hasOwnProperty(k)) {
                        recursiveOverride(currentObj[k], currentKeys, index + 1);
                    }
                }
            } else if (key === '[]') {
                if (Array.isArray(currentObj)) {
                    currentObj.forEach(item => {
                        recursiveOverride(item, currentKeys, index + 1);
                    });
                }
            } else {
                if (currentObj[key] !== undefined) {
                    recursiveOverride(currentObj[key], currentKeys, index + 1);
                }
            }
        }
        recursiveOverride(obj, keys, 0);
    }
    var smartJsonOverride = function(propertyName, overrideValue, reStack = ".*") {
        reStack = new RegExp(reStack, "g");
        var realParse = JSON.parse;
        JSON.parse = function(text, reviver) {
            try {
                var obj = realParse(text, reviver);
                if (!obj) return obj;
                var stackTrace = (new Error).stack;
                if (reStack.test(stackTrace)) {
                    deepOverride(obj, propertyName, overrideValue);
                }
                return obj;
            } catch (error) {
                console.error("Error parsing JSON:", error.message);
                return null;
            }
        };
    };
    if (cValue === 'undefined') {
        cValue = undefined;
    } else if (cValue === 'false') {
        cValue = false;
    } else if (cValue === 'true') {
        cValue = true;
    } else if (cValue === 'null') {
        cValue = null;
    } else if (cValue === "''" || cValue === '') {
        cValue = '';
    } else if (cValue === '[]') {
        cValue = [];
    } else if (cValue === '{}') {
        cValue = {};
    }
    window.smartJsonOverride = smartJsonOverride;
    smartJsonOverride(jProps, cValue, needle);
}

/// set-json.js
/// alias gson.js
/// world ISOLATED
function setJson(
    jsonprop,
    cValue,
    needle 
) {
    console.log(jsonprop, "-", cValue, "-", needle)
    var overrideObject = function(obj, propertyName, overrideValue) {
        var overriden = false;
        for (var key in obj)
            if (obj.hasOwnProperty(key) && key === propertyName) {
                obj[key] = overrideValue;
                overriden = true
            } else if (obj.hasOwnProperty(key) && typeof obj[key] === "object")
            if (overrideObject(obj[key], propertyName, overrideValue)) overriden = true;
        return overriden
    };
    var smartJSONParseOverride = function(propertyName, overrideValue, reStack = ".*") {
        reStack = new RegExp(reStack, "g");
        console.log(propertyName, "-", overrideValue, "-", reStack)
        var realParse = JSON.parse;
        JSON.parse = function(text, reviver) {
            var obj = realParse(text, reviver);
            if (!obj) return obj;
            var stackTrace = (new Error).stack;
            if (reStack.test(stackTrace))
                if (overrideObject(obj, propertyName, overrideValue));
            return obj
        }
    };
    if (cValue === 'undefined') {
        cValue = undefined;
    } else if (cValue === 'false') {
        cValue = false;
    } else if (cValue === 'true') {
        cValue = true;
    } else if (cValue === 'null') {
        cValue = null;
    } else if (cValue === "''" || cValue === '') {
        cValue = '';
    } else if (cValue === '[]') {
        cValue = [];
    } else if (cValue === '{}') {
        cValue = {};
    } else {
        Cvalue = Cvalue;
    }
    window.smartJSONParseOverride = smartJSONParseOverride;
if(needle=== "''" || needle === '' || needle === '' || needle === null || needle === undefined){
    smartJSONParseOverride(jsonprop, cValue);
}else{
    smartJSONParseOverride(jsonprop, cValue,needle );
}
}

/// ubo-define-property.fn
function uboDefineProperty(){
 var t,e,n,h=Object.defineProperty;function v(t){this.b=t,this.h=Object.create(null)}function p(t,e,n,i){this.a=t,this.i=e,this.c=n,this.f=i}function s(){this.g=/^([^\\\.]|\\.)*?\./,this.j=/\\(.)/g,this.a=new t}function g(t,e,n){for(var i in n.h){var r,o,a,c,u,f,l,s,b=n.h[i];e.h[i]?(r=t,o=e.h[i],!(a=b).f||o.f||void 0===o.a.b||o.g||(o.g=_(a.f)),o.c&&a.c&&o.c!==a.c&&g(r,o.c,a.c)):(o=r=void 0,a=t,c=e,u=b.i,l=!1,(f=void 0!==c.b)&&(o=k(c.b,u))&&!o.configurable&&(l=!0,r=c.b[u]),g(a,s=l?d(a,r):new v(b.c.b),b.c),s=new p(c,u,s,b.f),c.h[u]=s,f&&(s.g=o,f=function(n,i){var t=i.f;if(t&&!("beforeGet"in t||"beforeSet"in t))return _(t);var e={get:function(){var t,e=i.f;return e&&e.beforeGet&&e.beforeGet.call(this,i.a.b),e=(e=i.g)?O(e)?e.value:e.get?e.get.call(this):void 0:(e=i.a.b,i.i in e&&null!==(e=G(e))?(t=M.call(e,i.i))?t.call(this):e[i.i]:void 0),this!==i.a.b&&!m.call(i.a.b,this)||w(n,e,i.c),e},set:function(t){var e;return t=this===i.a.b||m.call(i.a.b,this)?(i.f&&i.f.beforeSet&&(t=i.f.beforeSet.call(this,t,this)),!(!(e=i.g)||!O(e)||e.value!==t)||(e=y(i,t,this),x(t)&&(t=d(n,t),g(n,t,i.c)),e)):y(i,t,this)}};return t&&j(t,e,S),e}(a,s),l?w(a,r,b.c):(h(c.b,u,f),o&&O(o)&&(P(f,o.value,c.b),w(a,o.value,b.c)))))}}function w(t,e,n){x(e)&&g(t,e=d(t,e),n)}function y(t,e,n){var i=t.g;return i?P(i,e,n):null!==(i=G(t.a.b))&&(i=o.call(i,t.i))?i.call(n,e):!!r(t.a.b)&&(t.g={value:e,configurable:!0,writable:!0,enumerable:!0},!0)}function d(t,e){var n=t.a.get(e);return n||(n=new v(e),t.a.set(e,n)),n}function O(t){return void 0!==t.writable}function j(t,e,n){for(var i=0,r=n.length;i<r;i++){var o=n[i];o in t&&(e[o]=t[o])}}function _(t){if(t){var e={};return j(t,e,i),e}}function P(t,e,n){return O(t)?!!t.writable&&(t.value=e,!0):!!t.set&&(t.set.call(n,e),!0)}t="function"==typeof WeakMap?WeakMap:(e=0,(n=function(){this.a=(e+=Math.random()).toString()}).prototype.set=function(t,e){var n=t[this.a];return n&&n[0]===t?n[1]=e:h(t,this.a,{value:[t,e],writable:!0}),this},n.prototype.get=function(t){var e;return(e=t[this.a])&&e[0]===t?e[1]:void 0},n.prototype.has=function(t){var e=t[this.a];return!!e&&e[0]===t},n);var b,i="configurable enumerable value get set writable".split(" "),S=i.slice(0,2),k=Object.getOwnPropertyDescriptor,r=Object.isExtensible,G=Object.getPrototypeOf,m=Object.prototype.isPrototypeOf,M=Object.prototype.__lookupGetter__||function(t){return(t=a(this,t))&&t.get?t.get:void 0},o=Object.prototype.__lookupSetter__||function(t){return(t=a(this,t))&&t.set?t.set:void 0};function a(t,e){if(e in t){for(;!s.hasOwnProperty.call(t,e);)t=G(t);return k(t,e)}}function x(t){var e=typeof t;return"function"==e||"object"==e&&null!==t}return function(t,e,n){var i=b=b||new s;n=n||window;var r=new v;t+=".";for(var o,a,c,u=r||new v,f=i.g,l=i.j;t;){if(null===(o=f.exec(t)))throw 1;o=o[0].length,a=t.slice(0,o-1).replace(l,"$1"),t=t.slice(o),(o=u.h[a])?c=o.c:(o=new p(u,a,c=new v),u.h[a]=o),u=c}if(!o)throw 1;(t=o).f=e,w(i,n,r)}
}

/// viki-video-player.js
/// alias vikiplay.js
/// dependency run-at.fn
/// dependency ubo-define-property.fn
/// world ISOLATED
function vikiVideoPlayer() {
    const viki_defineProperty = uboDefineProperty();
    function injectCode() {
        viki_defineProperty('VikiMediaPlayer.create', {
            value: (elem, props) => {
                try {
                    props['preset'] = 'vikipass';
                    props['queue'] = props['queue'].filter(keys => keys.type !== 'bumper');
                    return new VikiMediaPlayer(elem, props)
                } catch (e) {}
            }
        });
    }
    runAt(() => { injectCode();}, 'interactive');
}

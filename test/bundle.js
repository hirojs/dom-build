(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const DEFAULT_UNITS = {
    fontSize            : 'px',

    top                 : 'px',
    right               : 'px',
    bottom              : 'px',
    left                : 'px',

    width               : 'px',
    minWidth            : 'px',
    maxWidth            : 'px',

    height              : 'px',
    minHeight           : 'px',
    maxHeight           : 'px',

    outlineWidth        : 'px',

    margin              : 'px',
    marginTop           : 'px',
    marginRight         : 'px',
    marginBottom        : 'px',
    marginLeft          : 'px',

    padding             : 'px',
    paddingTop          : 'px',
    paddingRight        : 'px',
    paddingBottom       : 'px',
    paddingLeft         : 'px',

    borderTopWidth      : 'px',
    borderRightWidth    : 'px',
    borderBottomWidth   : 'px',
    borderLeftWidth     : 'px'
};

module.exports = function dombuild(tag) {
    return append(createElement(tag), arguments, 1);
}

function append(el, items, startOffset) {
    for (var i = startOffset, len = items.length; i < len; ++i) {
        var item = items[i];
        while (typeof item === 'function') {
            item = item();
        }
        if (typeof item === 'string' || typeof item === 'number') {
            if (el.nodeType === 1) {
                el.appendChild(document.createTextNode(item));    
            } else if (el.nodeType === 3) {
                el.appendData(item);
            }
        } else if (Array.isArray(item)) {
            append(el, item, 0);
        } else if (!item) {
            continue;
        } else if (item.nodeType) {
            el.appendChild(item);
        } else {
            for (var k in item) {
                var v = item[k];
                if (typeof v === 'function' && k[0] === 'o' && k[1] === 'n') {
                    el.addEventListener(k.substr(2), v);
                } else if (k === 'style') {
                    if (typeof v === 'string') {
                        el.style.cssText = v;
                    } else {
                        for (var prop in v) {
                            var propVal = v[prop];
                            if (typeof propVal === 'number' && DEFAULT_UNITS[prop]) {
                                propVal += DEFAULT_UNITS[prop];
                            }
                            el.style[prop] = propVal;
                        }   
                    }
                } else if (k === 'properties' && typeof v === 'object') {
                    for (var prop in v) {
                        el[prop] = v[prop];
                    }
                } else if (k === 'innerHTML') {
                    el.innerHTML = v;
                } else {
                    el.setAttribute(k, v);
                }
            }
        }
    }
    return el;
}

function createElement(tag) {
    if (tag.length) {
        var m;
        if ((m = /^([\w-]+)?(#[\w-]+)?((\.[\w-]+)*)$/.exec(tag))) {
            var el = document.createElement(m[1] || 'div');
            if (m[2]) el.id = m[2].substr(1);
            if (m[3]) el.className = m[3].replace(/\./g, ' ').trim();
            return el;
        } else if (tag === '%text') {
            return document.createTextNode('');
        }
    }
    throw new Error("invalid tag");
}
},{}],2:[function(require,module,exports){
var d = require('..');

window.init = function() {
  
  var foo;
  var ui = d('#root.a.b.c',
    "This is a text node", d('br'),
    "This is another text node", d('br'),
    foo = d('span',
      { properties: { a: 123 } },
      d('%text',
        'This is an explicit text node; it will be returned.',
        ' Multiple strings ',
        'can be added'
      )
    ),
    d('br'),
    d('a.active',
      { href: "/foo/bar",
        onclick: function(evt) { evt.preventDefault(); alert("hello!"); } },
      "Click me! ", [
        d("b", "here's some bold text"),
        " ",
        d("i", "here's some italic text")
      ]
    ),
    d("div", {style: {width: 100, height: 100, backgroundColor: 'red'}}, 0, null, void 0, false),
    d("div", {innerHTML: '<b>HERE IS <i>SOME RAW</i> HTML</b>'})
  );

  document.body.appendChild(ui);

  console.log(ui);
  console.log(foo.a, typeof foo.a);

}
},{"..":1}]},{},[2]);

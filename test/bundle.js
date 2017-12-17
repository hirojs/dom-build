(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = dombuild;

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

function dombuild(tag) {
    return builder(arguments);
}

function builder(args) {
    var el = createElement(args[0]);
    append(el, args, 1);
    return el;
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
                el.nodeValue += item;
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
                } else {
                    el.setAttribute(k, v);
                }
            }
        }
    }
}

function createElement(tag) {
    if (tag.length) {
        var m;
        if ((m = /^([\w-]+)?(#[\w-]+)?((\.[\w-]+)*)$/.exec(tag))) {
            var el = document.createElement(m[1] || 'div');
            if (m[2]) el.id = m[2].substr(1);
            if (m[3]) el.className = m[3].replace(/\./g, ' ').trim();
            return el;
        } else if ((m = /^%text$/.exec(tag))) {
            return document.createTextNode('');
        }
    }
    throw new Error("invalid tag");
}
},{}],2:[function(require,module,exports){
var d = require('..');

window.init = function() {
  
  var ui = d('#root.a.b.c',
    "This is a text node", d('br'),
    "This is another text node", d('br'),
    d('span',
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
    d("div", {style: {width: 100, height: 100, backgroundColor: 'red'}}, 0, null, void 0, false)
  );

  document.body.appendChild(ui);

  console.log(ui);

}
},{"..":1}]},{},[2]);

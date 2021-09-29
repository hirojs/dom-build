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

function setAttribute(el, k, v) {
    if (v === true) {
        el.setAttribute(k, '');
    } else if (v !== false) {
        el.setAttribute(k, v);
    }
}

const setters = {
    style(el, v) {
        if (typeof v === 'string') {
            el.style.cssText = v;
        } else {
            for (let prop in v) {
                let pv = v[prop];
                if (typeof pv === 'number' && DEFAULT_UNITS[prop]) {
                    pv += DEFAULT_UNITS[prop];
                }
                el.style[prop] = pv;
            }
        }
    },
    properties(el, v) {
        for (let prop in v) {
            el[prop] = v[prop];
        }
    },
    innerHTML(el, v) {
        el.innerHTML = v;
    },
    data(el, v) {
        for (let prop in v) {
            setAttribute(el, `data-${prop}`, v[prop]);
        }
    }
};

function append(el, items, startOffset) {
    for (let i = startOffset, len = items.length; i < len; ++i) {
        let item = items[i];
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
            for (let k in item) {
                const v = item[k];
                if (setters[k]) {
                    setters[k](el, v);
                } else if (typeof v === 'function' && k[0] === 'o' && k[1] === 'n') {
                    el.addEventListener(k.substr(2), v);
                } else {
                    setAttribute(el, k, v);
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
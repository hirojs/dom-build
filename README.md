# dom-build

Build DOM trees in Javascript.

## Installation

Install:

```shell
npm install --save @hirojs/dom-build
```

Require:

```javascript
const D = require('@hirojs/dom-build');
```

## Usage

The general form is:

```javascript
D(selector, contents...)
```

Selector defines the type/ID/classlist of the created element and usually takes the form `element#id.class1.class2.class3`; all components are optional but at least one must be present. If `element` is omitted, `div` is assumed. A second selector form, `%text`, is available for creating text nodes.

Each item in `contents` can be one of:

  - `string` or `number`: appended to element as text
  - `Array`: all array contents are appended to the element, recursively
  - DOM element or text node: appended to element
  - object: each key-value pair is considered according to the following rules:
    - `key == style`: if value is string, assigned to `element.style.cssText`; if object, each key/value pair is attached to `element.style`
    - `key == "properties"`: value must be an object; each key/value pair is attached directly to `element`
    - `key == "innerHTML"`: value is assigned to `element.innerHTML`
    - `key == "data"`: value must be an object; each key/value pair is mapped to a corresponding `data-` attribute on the element
    - all other key/value pairs are attached as attributes to `element`, with some special rules:
      - `value === true`: a no-value boolean attribute is set
      - `value === false`: no attribute is set
      - `typeof(value) == "function"`: an event listener is attached if `key` starts with `on` e.g. `onmouseover`
      - `typeof(value) == "object"`: attribute value is JSON-encoded

Any falsey values (`false`, `null`, `undefined`) in `contents` are skipped.

Any functions present in `contents` will be called to yield a value; if another function is returned, this will be called, and so on, until a non-function value is received.

## Example

```javascript
const D = require('@hirojs/dom-build');

var ui = D('#root.a.b.c',

  "This is a text node", D('br'),
  "This is another text node", D('br'),
  
  D('span',
    // Properties will be attached directly to the object
    { properties: { a: 123 } },

    // Create a text object by concatenating 3 strings
    D('%text',
      'This is an explicit text node; it will be returned.',
      ' Multiple strings ',
      'can be added'
    )
  ),

  D('br'),

  D('a.active',
    { href: "/foo/bar",
      // Added as a click event listener
      onclick: function(evt) { evt.preventDefault(); alert("hello!"); } },
    "Click me! ", [
      D("b", "here's some bold text"),
      " ",
      D("i", "here's some italic text")
    ]
  ),

  // Set style properties.
  // Also note the trailing falsey values are skipped as children for this element
  D("div", {style: {width: 100, height: 100, backgroundColor: 'red'}}, 0, null, void 0, false),

  // Set innerHTML directly
  D("div", {innerHTML: '<b>HERE IS <i>SOME RAW</i> HTML</b>'}),

  // Element is omitted so will be div.data-indicator
  // This will set data-test="100" and data-json='{"foo":"bar"}'
  D(".data-indicator", {data: {test: 100, json:{foo: "bar"}}}, 'the data value is:')
);
````

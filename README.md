# dom-build

Build DOM trees in Javascript.

```javascript
var d = require('@hirojs/dom-build');

var el = d('#root.a.b.c',
  "This is a text node", d('br'),
  "This is another text node", d('br'),
  d('span.myMessage',
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
  d("div", {style: {width: 100, height: 100, backgroundColor: 'red'}})
);
````

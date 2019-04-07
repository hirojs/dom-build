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
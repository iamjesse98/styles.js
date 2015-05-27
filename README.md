# Dynamically generate CSS in JavaScript

As was recommended by Christopher Chedeau in his talk about CSS, it is recommended to forego global CSS entirely, and use local CSS instead. However, Christopher suggests embedding styles directly in the DOM element itself. As a result, we lose the ability to style multiple elements using the developer console.

Fortunately, this is where `styles.js` comes in.

You declaratively define styles using JavaScript objects, which `styles.js` will interpret then apply styles to globally unique class names. You then assign the DOM elements with the class names, to apply the styles that you want.

## Usage

Install `styles.js` with npm:

```shell
npm install styles.js
```

Then, you generate a set of classes, and inject a new stylesheet like so:

```javascript
var createStyles = require('createStyles');

var myBoxStyles = createStyles({
  box: {
    backgroundColor: 'blue',
    color: 'white'
  },

  inner: {
    padding: '10px',
    color: 'red'
  }
}, 'My App Name');

var div = document.createElement('div');

div.setAttribute('class', myBoxStyles.box);
```

## License

`styles.js` is [MIT-Licensed](https://github.com/shovon/styles.js/blob/master/LICENSE)
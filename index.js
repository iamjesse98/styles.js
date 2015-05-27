'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = create;
exports.generateCSS = generateCSS;
exports.generateStyles = generateStyles;
exports.fill = fill;
exports.indent = indent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

// TODO: test this.
function hyphenize(str) {
  return str.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase();
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// TODO: rename this to `UniqueClassnameGenerator`

var CSSGenerator = (function () {
  function CSSGenerator() {
    _classCallCheck(this, CSSGenerator);

    this.incrementor = 0;
  }

  _createClass(CSSGenerator, [{
    key: 'generateUniqueClassnames',

    /**
     * @param {Object} obj
     * @param {String} appName
     * @param {String} uid
     * @param {Boolean} increment
     * @return {Object}
     */
    value: function generateUniqueClassnames(obj) {
      var appName = arguments[1] === undefined ? function () {
        throw new Error('Missing parameter');
      } : arguments[1];

      var _this = this;

      var uid = arguments[2] === undefined ? guid() : arguments[2];
      var increment = arguments[3] === undefined ? true : arguments[3];

      if (!appName) {}
      return Object.keys(obj).map(function (key) {
        var result = _defineProperty({}, key, '' + hyphenize(key) + '-' + appName + '-' + uid + '-' + _this.incrementor);
        if (increment) {
          _this.incrementor++;
        }
        return result;
      }).reduce(function (keyVal, prev) {
        return (0, _objectAssign2['default'])({}, keyVal, prev);
      });
    }
  }]);

  return CSSGenerator;
})();

exports.CSSGenerator = CSSGenerator;

var _create = (function () {
  var generator = new CSSGenerator();

  return function create(obj, appName) {
    var classNames = generator.generateUniqueClassnames(obj, hyphenize(appName));
    var css = generateCSS(obj, classNames);

    if (typeof HTMLDocument !== 'undefined' && typeof document !== 'undefined' && document instanceof HTMLDocument) {

      var style = document.createElement('style');

      document.getElementsByTagName('head')[0].appendChild(style);
      style.innerHTML = css;
    } else {
      console.log(css);
    }
    return classNames;
  };
})();

/**
 * Given the object that declares our CSS, dynamically generate a set of class
 * names, associate them with their originally intended class names.
 *
 * Also generate the CSS code, and inject it into the DOM.
 *
 * @param {Object} obj
 * @param {String} appName
 * @return {Object}
 */

function create() {
  for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  return _create.apply(undefined, params);
}

/**
 * Given an object of objects that describe style, generate the CSS.
 *
 * Requires the object as parameter, as well as the appName.
 *
 * The third parameter should be left blank for security reasons.
 *
 * @param {Object} obj
 * @param {String} appName
 * @param {String} uid (optional, and recommended not to set this)
 * @return {String}
 */

function generateCSS(obj, classHash) {
  return Object.keys(obj).map(function (key) {
    var className = classHash[key];
    var styles = indent(generateStyles(obj[key]));
    var css = '.' + className + ' {\n' + styles + '\n}';
    return css;
  }).join('\n\n');
}

function generateStyles(obj) {
  return Object.keys(obj).map(function (key) {
    return '' + hyphenize(key) + ': ' + obj[key] + ';';
  }).join('\n');
}

function fill(strToRepeat, count) {
  return Array(count + 1).join(strToRepeat);
}

function indent(string) {
  var amount = arguments[1] === undefined ? 2 : arguments[1];

  var lines = string.split('\n');
  var fillerString = fill(' ', amount);
  var joined = lines.map(function (line) {
    return '' + fillerString + '' + line;
  }).join('\n');
  return '' + fillerString + '' + joined.trim();
}

// TODO: turn this function into its own module.


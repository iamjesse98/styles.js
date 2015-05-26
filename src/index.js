import assign from 'object-assign';

// TODO: test this.
function hyphenize(str) {
  return str.replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase();
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// TODO: rename this to `UniqueClassnameGenerator`
export class CSSGenerator {
  constructor() {
    this.incrementor = 0
  }

  /**
   * @param {Object} obj
   * @param {String} appName
   * @param {String} uid
   * @param {Boolean} increment
   * @return {Object}
   */
  generateUniqueClassnames(
    obj,
    // TODO: turn this function into its own module.
    appName = (() => { throw new Error('Missing parameter'); }),
    uid = guid(),
    increment = true
  ) {
    if (!appName) {  }
    return Object.keys(obj).map(key => {
      const result = {
        [key]: `${hyphenize(key)}-${appName}-${uid}-${this.incrementor}`
      };
      if (increment) {
        this.incrementor++;
      }
      return result;
    }).reduce((keyVal, prev) => assign({}, keyVal, prev));
  }
}

const _create = (function () {
  const generator = new CSSGenerator();

  return function create(obj, appName) {
    const classNames = generator
      .generateUniqueClassnames(obj, hyphenize(appName));
    const css = generateCSS(obj, classNames);

    console.log(css);
    return classNames;
  }
}());

/**
 * @param {Object} obj
 * @param {String} appName
 * @return {Object}
 */
export default function create(...params) { return _create(...params); }

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
export function generateCSS(obj, classHash) {
  return Object.keys(obj).map(key => {
    const className = classHash[key];
    const styles = indent(generateStyles(obj[key]));
    const css = `.${className} {\n${styles}\n}`;
    return css;
  }).join('\n\n');
}

export function generateStyles(obj) {
  return Object.keys(obj).map(key => {
    return `${hyphenize(key)}: ${obj[key]};`;
  }).join('\n');
}

export function fill(strToRepeat, count) {
  return Array(count + 1).join(strToRepeat);
}

export function indent(string, amount = 2) {
  const lines = string.split('\n');
  const fillerString = fill(' ', amount);
  const joined = lines.map(line => `${fillerString}${line}`).join('\n');
  return `${fillerString}${joined.trim()}`;
}

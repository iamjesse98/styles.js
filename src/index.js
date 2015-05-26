import assign from 'object-assign';

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

export function create(obj) {
  // TODO: use map-reduce, rather than just reduce.
  return Object.keys(obj).reduce((prev, key) => {
    const className = `${key}-${guid()}`;
    const styles = obj[key];
    Object.keys(obj[key]).map((prev, attribute) => {
      return `${prev}\n  ${hyphenize(key)}: ${obj[key][attribute]};`;
    }, '');
    return assign(
      prev,
      {
        [obj[key]]: className
      }
    )
  }, {});
}

export function generateCSS(obj) {
  return Object.keys(obj).map(key => {
    return `${hyphenize(key)}: ${obj[key]};`;
  }).join('\n');
}

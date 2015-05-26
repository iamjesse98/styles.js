import expect from 'expect.js';
import { generateCSS, fill, indent } from './src';

describe('generateCSS', () => {
  it('should generate some valid CSS', () => {
    const css = generateCSS({
      backgroundColor: 'black',
      backgroundImage: 'url(\'something.png\')'
    });

    expect(css)
      .to
      .be('background-color: black;\nbackground-image: url(\'something.png\');');
  });
});

describe('fill', () => {
  it('should fill a string with x number of', () => {
    const string = fill('-', 4);
    expect(string).to.be('----');
  });
});

describe('indent', () => {
  it('should indent string, at every newline', () => {
    const string = indent('a\nb\nc');
    expect(string).to.be('  a\n  b\n  c');
  })
});

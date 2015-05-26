import expect from 'expect.js';
import { generateCSS } from './src';

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
import expect from 'expect.js';
import {
  generateStyles,
  generateCSS,
  generateUniqueClassnames,
  fill,
  indent,
  CSSGenerator
} from './src';

describe('generateStyles', () => {
  it('should generate some valid styles', () => {
    const css = generateStyles({
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

describe('CSSGenerator', () => {
  describe('generateUniqueClassnames', () => {
    it('should generate unique classNames, and associate them with their original class names', () => {
      const generator = new CSSGenerator();
      const generated = generator.generateUniqueClassnames({
        someClass: {
          backgroundColor: 'black',
          color: 'white'
        },
        anotherClass: {
          backgroundColor: 'white',
          color: 'black'
        }
      }, 'some-app', 'null', false);

      expect(generated).to.eql({
        someClass: 'some-class-some-app-null-0',
        anotherClass: 'another-class-some-app-null-0',
      });
    });
  });
});

describe('generateCSS', () => {
  it('should generate the CSS for a given object', () => {
    const cssObj = {
      something: {
        backgroundColor: 'black',
        backgroundImage: 'url(\'something.png\')'
      }
    };

    const generator = new CSSGenerator();
    const classNames = generator
      .generateUniqueClassnames(cssObj, 'some-app', 'null', false);

    const string = generateCSS(cssObj, classNames);

    expect(string).to.be([
      '.something-some-app-null-0 {',
      '  background-color: black;',
      '  background-image: url(\'something.png\');',
      '}'
    ].join('\n'));
  });
});

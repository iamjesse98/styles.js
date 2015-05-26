import createStyles from './src';

const css = createStyles({
  someClass: {
    backgroundColor: 'black',
    color: 'white'
  },

  anotherClass: {
    backgroundColor: 'white',
    color: 'black'
  }
}, 'some-app');

// console.log(css);
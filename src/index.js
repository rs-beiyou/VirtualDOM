let obj = {};
Object.defineProperty(obj, 'hello', {
  get() {
    console.log('get');
  },
  set(val) {
    console.log('set' + val);
  }
});
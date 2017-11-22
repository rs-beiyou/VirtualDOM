import Dep from './dep';
import Watcher from './watcher';
let dep = new Dep();
class VsDom {
  constructor(option) {
    this.option = option || {};
    this.init();
  }
  init() {
    this.element = document.getElementById(this.option.el.replace('#', ''));
    this.observe();
    let dom = this.nodeToFragment();
    this.element.appendChild(dom);
  }
  nodeToFragment() {
    let node = this.element;
    let fragment = document.createDocumentFragment();
    let child = null;
    while (node.firstChild) {
      child = node.firstChild;
      this.compile(child);
      fragment.appendChild(child);
    }
    return fragment;
  }
  compile(node) {
    let data = this.option.data;
    let reg = /\{\{(.*)\}\}/;
    if (node.nodeType === 1) {
      let attr = node.attributes;
      for (let i = 0, len = attr.length; i < len; i++) {
        if (attr[i].nodeName == 'v-model') {
          let name = attr[i].nodeValue;
          node.addEventListener('input', (e) => {
            data[name] = e.target.value;
          });
          node.value = data[name];
          node.removeAttribute('v-model');
        }
      }
    }
    if (node.nodeType === 3) {
      if (reg.test(node.nodeValue)) {
        let name = RegExp.$1;
        name = name.trim();
        node.nodeValue = data[name];
        new Watcher();
      }
    }
  }
  observe() {
    let data = this.option.data;
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
      get() {
        if (Dep.target) dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal === val) return;
        val = newVal;
      }
    });
  }
}
export default VsDom;
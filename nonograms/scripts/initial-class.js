export class InitialElement {
  constructor (node, element, classes) {
    // console.log(this.element,  this.classes);
    
    this.node = node;
    this.element = element;
    this.classes = classes;
    this.child = this.createDomNode();
    this.appendDomNode();
  }

  createDomNode (){
    // console.log(this.element,  this.classes);
    const node = document.createElement(this.element);
    node.className = this.classes;
    return node;
  }
  appendDomNode() {
    // console.log(this.node, this.child);
    this.node.append(this.child);
  }
  returnChild() {
    // console.log(this.node, this.child);
    return this.child;
  }
}
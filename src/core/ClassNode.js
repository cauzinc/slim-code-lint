module.exports = class ClassNode {
  constructor(name, source) {
    this.name = name
    this.source = source
    this.children = []
  }
  insertChild (nodeList) {
    let list = nodeList.filter(item => item instanceof ClassNode)
    this.children.push(...list)
  }
}
let taskQueue = []

module.exports = class ClassNode {
  constructor(name, source) {
    this.name = name
    this.source = source
    this.redundant = false
    this.children = []
  }
  insertChild (nodeList) {
    let list = nodeList.filter(item => item instanceof ClassNode)
    this.children.push(...list)
  }
  deleteChild (node) {
    let index = this.children.findIndex(item => item === node)
    if (index >= 0) {
      this.children.splice(index, 1)
    }
  }
  /**
   * 删除节点
   * */
  removedFromParent (parent) {
    parent.insertChild(this.children)
    parent.deleteChild(this)
  }

  // 合并节点

}
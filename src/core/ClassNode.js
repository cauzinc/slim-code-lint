module.exports = class ClassNode {
  constructor(name, source) {
    this.name = name
    this.source = source || {}
    this.parent = null
    // 合并后也要维护一个被合并的dom的原始node list
    this.mergedList = []
    this.redundant = false
    this.children = []
  }
  insertChild (nodeList) {
    let list = nodeList.filter(item => item instanceof ClassNode)
    this.children.push(...list)
    this.children.forEach(node => {
      node.parent = this
    })
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
  /**
   * 遍历方法
   * */
  walk (callback) {
    if (this) {
      callback(this)
    }
    this.children.length && this.children.forEach(child => {
      child.walk(callback)
    })
  }
}
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
  deleteChild (node) {
    let index = this.children.findIndex(item => item === node)
    if (index >= 0) {
      this.children.splice(index, 1)
    }
  }
  // 遍历方法
  walk () {

  }
  /**
   * 清除空节点
   * @params parent 父节点
   * @params target 待清除的节点
   * */
  dealEmptyNode (parent) {
    parent.insertChild(this.children)
    parent.deleteChild(this)
  }
  // 合并节点

}
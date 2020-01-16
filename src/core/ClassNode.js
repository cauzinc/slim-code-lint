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
   * 清除空节点，将任务推到一个待执行的队列中，不要在遍历的时候直接删除
   * @params parent 父节点
   * @params target 待清除的节点
   * */
  pushDeleteTask (parent) {
    taskQueue.push({
      parent,
      child: this
    })
  }
  /**
   * 执行删除节点的任务
   * */
  executeDeleteTask () {
    let task = taskQueue.reverse()
    task.forEach(task => {
      task.parent.insertChild(task.child.children)
      task.parent.deleteChild(task.child)
    })
    taskQueue = []
  }
  // 合并节点

}
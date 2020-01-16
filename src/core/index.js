let ClassNode = require('./ClassNode')

/**
 * 用ast dom node 来生成 classNode
 * @params node ast node
 */
function createClassNode (node) {
  let className = node.staticClass ?  node.staticClass.replace(/"|'/g,'') : ''
  // 如果当前节点没有staticClass, 但是有children, 此时我们应该将其作为空节点，留到合并阶段再进行处理
  if (!className && !node.children.length) {
    return []
  }

  let classList = className.split(' ').filter(Boolean)
  let nodeList = []
  nodeList = classList.map(clName => {
    return new ClassNode(clName, node)
  })
  if (!className) {
    nodeList = [new ClassNode('', node)]
  }
  return nodeList
}

/**
 * 递归方法，连结整颗树
 * @params clNode, 一个classNode
 * @params children ast node list
 */
function linkNodes (clNode, children) {
  // console.log('link nodes', clNode.name, children.map(item => item.staticClass).filter(Boolean))
  // 只处理element类型的节点
  let availableChild = children.filter(item => item.type === 1)
  if (!availableChild.length) {
    return
  }
  availableChild.forEach(node => {
    let nodeList = createClassNode(node)
    clNode.insertChild(nodeList)
  })
  clNode.children.forEach(node => {
    linkNodes(node, node.source.children)
  })
}

/**
 * 递归方法，清理类树
 * */
function clearNodeTree (node) {
  if (!node.children.length) {
    return
  }
  node.children.forEach(child => {
    clearNodeTree(child)
    if (!child.name) {
      child.dealEmptyNode(node)
    }
  })
}

module.exports = {
  createClassNode,
  linkNodes,
  clearNodeTree
}

let ClassNode = require('./ClassNode')

/**
 * 用ast node 来生成 classNode
 * @params node ast node
 */
function createClassNode (node) {
  let className = node.staticClass ?  node.staticClass.replace(/"|'/g,'') : ''
  if (!className) {
    return []
  }

  let classList = className.split(' ').filter(Boolean)
  let nodeList = []
  nodeList = classList.map(clName => {
    return new ClassNode(clName, node)
  })
  return nodeList
}

/**
 * 递归方法，连结整颗树
 * @params clNode, 一个classNode
 * @params children ast node list
 */
function linkNodes (clNode, children) {
  console.log('link nodes', clNode.name, children.map(item => item.staticClass).filter(Boolean))
  // 只处理element类型的节点
  let availableChild = children.filter(item => item.type === 1)
  if (!availableChild.length) {
    return
  }
  children.forEach(node => {
    let nodeList = createClassNode(node)
    clNode.insertChild(nodeList)
  })
  clNode.children.forEach(node => {
    linkNodes(node, node.source.children)
  })
}

module.exports = {
  createClassNode,
  linkNodes
}

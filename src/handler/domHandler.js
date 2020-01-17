let { createClassNode, linkNodes, clearNodeTree, executeDeleteTask } = require('../core')

/**
* 生成class tree
 * @params root ast tree 的根结点
* */
function generateDomClTree (root) {
  let clNodeTree = []
  // 第一层作为根结点
  let rootClNodeList = createClassNode(root)
  clNodeTree.push(...rootClNodeList)

  clNodeTree.forEach(node => {
    linkNodes(node, root.children)
  })

  return clNodeTree
}

/**
 * 对dom class树进行合并操作, 将相同的节点进行合并
 * */
function mergeDomTree (node) {
  let layer = node.children
  if (!layer || !layer.length) {
    return
  }
  let newLayer = []
  layer.forEach(item => {
    let sameNode = newLayer.find(t => t.name === item.name)
    if (sameNode) {
      sameNode.children.push(...item.children)
    } else {
      newLayer.push(item)
    }
  })
  node.children = newLayer
  node.children.forEach(item => mergeDomTree(item))
}

/**
 * 生成最终的树
 * */
function generateFinalClassTree (classNode) {
  clearNodeTree(classNode)
  executeDeleteTask()
}


function dealBindingClass (bindingClass) {
  // input "{ a: true }"

  let classList = []

  // output ['a']
  return classList
}

module.exports = {
  generateDomClTree,
  generateFinalClassTree,
  mergeDomTree,
  dealBindingClass
}


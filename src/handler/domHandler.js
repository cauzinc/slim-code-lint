let { createClassNode, linkNodes, clearNodeTree } = require('../core')

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
 * 生成最终的树
 * */
function generateFinalClassTree (classNode) {
  clearNodeTree(classNode)
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
  dealBindingClass
}


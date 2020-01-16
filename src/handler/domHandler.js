let { createClassNode, linkNodes } = require('../core')

/**
* 生成class tree
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

function dealBindingClass (bindingClass) {
  // input "{ a: true }"

  let classList = []

  // output ['a']
  return classList
}

module.exports = {
  generateDomClTree,
  dealBindingClass
}


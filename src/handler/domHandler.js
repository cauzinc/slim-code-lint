let { createClassNode, linkNodes } = require('../core')

function generateDomClTree (root) {
  let clNodeTree = []
  // 第一层作为根结点
  let rootClNodeList = createClassNode(root)
  clNodeTree.push(...rootClNodeList)

  clNodeTree.forEach(node => {
    linkNodes(node, root.children)
  })

  // console.log('clNodeTree', clNodeTree)
  return clNodeTree
}

// class classNode {
//   name: '',
//   redundant: Boolean,
//   children: [classNode]
// }

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


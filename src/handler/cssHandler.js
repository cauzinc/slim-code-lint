const { createClassNodeByCss, mergeClassTree } = require('../core')

function getFinalCssTree (originCssAst) {
  let classTreeList = createClassNodeByCss(originCssAst)
  classTreeList.forEach(tree => {
    mergeClassTree(tree)
  })
  return classTreeList
}

function trimCssTreeByDomTree (cssTree, domTree) {
  let cssPathList = getTreePathList(cssTree)
  let domPathList = getTreePathList(domTree)
  console.log('path list', domPathList)
}

/**
 * 获取所有叶节点的path
 * */
function getTreePathList (clNodeTree) {
  let leafNodeList = []
  let pathList = []
    clNodeTree.walk(node => {
    if (!node.children.length) {
      leafNodeList.push(node)
    }
  })
  pathList = leafNodeList.map(node => {
    let path = []
    path.push(node.name)
    let parent = node.parent
    while(parent) {
      path.push(parent.name)
      parent = parent.parent
    }
    return path
  })
  pathList = pathList.map(p => p.reverse())
  return pathList
}

module.exports = {
  getFinalCssTree,
  trimCssTreeByDomTree
}
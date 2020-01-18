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
  // console.log('css path', cssPathList)
  // console.log('----------------------')
  // console.log('dom path', domPathList)
  // console.log('----------------------')
  let redundantClassList = []
  cssPathList.forEach((path, index) => {
    // 标记每个css step对应的dom path step
    for (let i = 0; i < domPathList.length; i++) {
      let crtPath = 0
      let crtIndex = 0
      let domPath = domPathList[i]
      crtIndex = domPath.findIndex(step => path[crtPath] === step)
      crtPath++
      while (crtIndex > -1 && path[crtPath]) {
        let nextPath = domPath.slice(crtIndex)
        crtIndex = nextPath.findIndex(step => path[crtPath] === step)
        crtPath++
      }
      // 如果当前css path遍历完成，且有找到最后一个css step 对应的 dom step，那么css branch是需要的，否则就需要removed
      if (!path[crtPath] && crtIndex >= 0) {
        break
      }
      if (i === domPathList.length - 1) {
        redundantClassList.push(path)
      }
    }
  })
  return redundantClassList
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
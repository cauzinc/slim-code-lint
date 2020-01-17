const { createClassNodeByCss, mergeClassTree } = require('../core')

function getFinalCssTree (originCssAst) {
  let classTreeList = createClassNodeByCss(originCssAst)
  classTreeList.forEach(tree => {
    mergeClassTree(tree)
  })
  return classTreeList
}


module.exports = {
  getFinalCssTree
}
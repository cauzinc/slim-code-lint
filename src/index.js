const sass = require('node-sass')
const fs = require('fs')
const csstree = require('css-tree')
const { compileTemplate, compileStyle, compileStyleAsync } = require('@vue/component-compiler-utils')
const { createDefaultCompiler } = require('@vue/component-compiler')
const instance = createDefaultCompiler()
const { generateDomClTree, generateFinalClassTree } = require('./handler/domHandler')
const { getFinalCssTree, trimCssTreeByDomTree } = require('./handler/cssHandler')

const { mergeClassTree } = require('./core/index')

let compileVueFile = function (filePath) {
  return new Promise((resolve, reject) => {
    let data = fs.readFileSync(filePath).toString()

    const vueData = instance.compileToDescriptor('result.vue', data)

    // console.log('vueData', vueData)
    resolve(vueData)
  })
}

compileVueFile('./test.vue').then(data => {
  let styles = data.styles
  // 不是scoped 的style暂时先不考虑，因为有可能会把样式共用给其他component
  styles = styles.filter(item => item.scoped)
  let template = data.template

  let domClassTreeList = generateDomClTree(template.ast)
  domClassTreeList.forEach(item => {
    generateFinalClassTree(item)
    mergeClassTree(item)
  })



  let sourceCodeArr = styles.map(item => item.code)
  let cssAst = csstree.parse(sourceCodeArr[0])
  let plainCssAstObj = csstree.toPlainObject(cssAst)
  let cssTreeList = getFinalCssTree(plainCssAstObj)
  trimCssTreeByDomTree(cssTreeList[0], domClassTreeList[0])


  // console.log('primitive style', styles[0])
  console.log('--------------------------')
  // console.log('source code', sourceCodeArr[0])
  // console.log('plain obj', astTree)
})
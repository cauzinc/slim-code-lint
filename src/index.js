const fs = require('fs')
const path = require('path')
const csstree = require('css-tree')
const { createDefaultCompiler } = require('@vue/component-compiler')
const instance = createDefaultCompiler()
const { generateDomClTree, generateFinalClassTree } = require('./handler/domHandler')
const { getFinalCssTree, trimCssTreeByDomTree } = require('./handler/cssHandler')
const { printResult } = require('./utils/print')

const { mergeClassTree } = require('./core/index')
let vueArr = []
let fileDisplay = function(filePath) {
  fs.readdir(filePath,function (err,files) {
    if(err){
      console.log(err)
    }else{
      files.forEach(fileName=>{
        let filedir = path.join(filePath,fileName)
        fs.stat(filedir,function (error,stats) {
          if(error){
            console.log('获取文件失败')
          }else {
            let reg = /\.vue$/
            let isFile = stats.isFile()
            let isDirectory = stats.isDirectory()
            if (isFile && reg.test(filedir)) {
              // console.log(filedir)
              // vueArr.push(filedir)
              compileVueFile(filedir).then(obj=>{
                console.log("fileName",filedir)
                let data = obj.vueData
                let styles = data.styles
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
                let finalResult = trimCssTreeByDomTree(cssTreeList[0], domClassTreeList[0])
                printResult(finalResult)
              })
            }
            if(isDirectory){
              fileDisplay(filedir)
            }
          }
        })
      })
    }
  })
}
let filePath = path.resolve('./instance')
fileDisplay(filePath)
let compileVueFile = function (filePath) {
  return new Promise((resolve, reject) => {
    let data = fs.readFileSync(filePath).toString()
    const vueData = instance.compileToDescriptor('result.vue', data)
    let obj = {vueData:vueData,fileName:filePath}
    resolve(obj)
  })
}
// compileVueFile('./instance/BloggerCard.vue').then(obj => {
//   // console.log("fileName",obj.fileName)
//   let data = obj.vueData
//   let styles = data.styles
//   // 不是scoped 的style暂时先不考虑，因为有可能会把样式共用给其他component
//   styles = styles.filter(item => item.scoped)
//   let template = data.template
//
//   let domClassTreeList = generateDomClTree(template.ast)
//   domClassTreeList.forEach(item => {
//     generateFinalClassTree(item)
//     mergeClassTree(item)
//   })
//
//   let sourceCodeArr = styles.map(item => item.code)
//   let cssAst = csstree.parse(sourceCodeArr[0])
//   let plainCssAstObj = csstree.toPlainObject(cssAst)
//   let cssTreeList = getFinalCssTree(plainCssAstObj)
//   let finalResult = trimCssTreeByDomTree(cssTreeList[0], domClassTreeList[0])
//   printResult(finalResult)


  // console.log('primitive style', styles[0])
  // console.log('--------------------------')
  // console.log('result', finalResult)
  // console.log('source code', sourceCodeArr[0])
  // console.log('plain obj', astTree)
// })
const sass = require('node-sass')
const fs = require('fs')
const csstree = require('css-tree')
const utils = require('@vue/component-compiler-utils')
const { compileTemplate, compileStyle, compileStyleAsync } = require('@vue/component-compiler-utils')
const { createDefaultCompiler } = require('@vue/component-compiler')
// import render from './test.vue?vue&type=template'
const instance = createDefaultCompiler()

console.log('loader', utils)

let compileVueFile = function (filePath) {
  return new Promise((resolve, reject) => {
    let data = fs.readFileSync(filePath).toString()
    // console.log('on read', data)
    const vueData = instance.compileToDescriptor('result.vue', data)
    console.log('vueData', vueData)
    resolve(vueData)
  })
}


let convertFunc = function(filePath) {
  return new Promise((resolve, reject) => {
    sass.render({
      file: filePath
    }, (err, result) => {
      console.log('render result', result)
      console.log('render err', err)
      let css = result.css.toString()
      resolve(css)
      fs.writeFile('./../output/out.css', css, () => {
        console.log('scss 转换为 css后写入到out.css')
      })
    })
  })
}

compileVueFile('./test.vue')
// convertFunc('./test.scss')
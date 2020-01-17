let ClassNode = require('./ClassNode')
let taskQueue = []

/**
 * 用ast dom node 来生成 classNode
 * @params node ast node
 */
function createClassNode (node) {
  let className = node.staticClass ?  node.staticClass.replace(/"|'/g,'') : ''
  // 如果当前节点没有staticClass, 但是有children, 此时我们应该将其作为空节点，留到合并阶段再进行处理
  if (!className && !node.children.length) {
    return []
  }

  let classList = className.split(' ').filter(Boolean)
  let nodeList = []
  nodeList = classList.map(clName => {
    return new ClassNode(clName, node)
  })
  if (!className) {
    nodeList = [new ClassNode('', node)]
  }
  return nodeList
}

/**
 * 用ast css node 来生成 classNode
 * @params style sheet root node
 */
function createClassNodeByCss (styleSheetNode) {
  let cssClassTreeList = []
  let ruleList = styleSheetNode.children
  ruleList.forEach(rule => {
    let selectorTree = rule.prelude.children.filter(t => t.type === 'Selector')[0] || {}
    let selectorList = selectorTree.children
    let classList = selectorList.filter(item => item.type === 'ClassSelector')
    // 生成classNodeList
    let classNodeList = classList.map(cl => new ClassNode(cl.name))
    console.log('classList', classNodeList.map(item => item.name))
    // 组成classNodeTree
    classNodeList.length && classNodeList.reduce((acc, crtVal) => {
      if (acc && acc instanceof ClassNode) {
        acc.insertChild([crtVal])
      }
      return crtVal
    })
    let classNodeTree = classNodeList[0]
    // 如果有一样的tree要直接merge
    let sameTree = cssClassTreeList.find(item => item.name === classNodeTree.name)
    if (sameTree) {
      sameTree.children.push(...classNodeTree.children)
    } else {
      cssClassTreeList.push(classNodeTree)
    }
  })
  return cssClassTreeList
}

/**
 * 递归方法，连结整颗树
 * @params clNode, 一个classNode
 * @params children ast node list
 */
function linkNodes (clNode, children) {
  // console.log('link nodes', clNode.name, children.map(item => item.staticClass).filter(Boolean))
  // 只处理element类型的节点
  let availableChild = children.filter(item => item.type === 1)
  if (!availableChild.length) {
    return{}
  }
  availableChild.forEach(node => {
    let nodeList = createClassNode(node)
    clNode.insertChild(nodeList)
  })
  clNode.children.forEach(node => {
    linkNodes(node, node.source.children)
  })
}

/**
 * 递归方法，建立清理类树的任务
 * */
function clearNodeTree (node) {
  // console.log('clear nodes', node.name, node.children.map(item => item.name))
  if (!node.children.length) {
    return
  }
  node.children.forEach(child => {
    if (!child.name) {
      pushDeleteTask(node, child)
    }

    clearNodeTree(child)
  })
}

/**
 * 递归方法，对class树进行合并操作, 将相同的节点进行合并
 * */
function mergeClassTree (node) {
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
  node.children.forEach(item => mergeClassTree(item))
}

/**
 * 清除空节点，将任务推到一个待执行的队列中，不要在遍历的时候直接删除
 * @params parent 父节点
 * @params target 待清除的节点
 * */
function pushDeleteTask (parent, child) {
  taskQueue.push({
    parent,
    child
  })
}

/**
 * 执行删除节点的任务
 * */
function executeDeleteTask () {
  let task = taskQueue.reverse()
  task.forEach(task => {
    task.child.removedFromParent(task.parent)
  })
  taskQueue = []
}



module.exports = {
  createClassNode,
  linkNodes,
  clearNodeTree,
  executeDeleteTask,
  mergeClassTree,
  createClassNodeByCss
}

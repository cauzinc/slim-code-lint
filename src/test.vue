<template>
  <div class="container" :class="[{ 'first': false }, 'second']">
    <div class="wrapper wrapper-fixed" :class="{ 'clear-fix': true }">
      <div class="wrapper-item" :class="true ? '123' : '455'">123</div>
      <div class="wrapper-item" :class="'string'">123</div>
      <div class="wrapper-item" :class="`${ true ? '123' : '455' }`">123</div>
    </div>
    <div class="wrapper" :class="{ 'clear-fix': true }">
      <div class="wrapper-item-2">123</div>
      <div class="wrapper-item-2">123</div>
      <div class="wrapper-item-2">123</div>
    </div>
    <div class="selector">
      <span class="select-text">123</span>
      selector
    </div>
  </div>
</template>

<style lang='scss' scoped>
.container {
  width: 100px;
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: row;
    .wrapper-item {
      border: 1px solid #e8e8e8;
    }
  }

  .selector {
    display: inline-block;
    width: fit-content;
    background: #fff;
  }

  > div {
    background: red;
  }
}
</style>
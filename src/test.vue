<template>
  <div class="container" :class="[{ 'first': false }, 'second']">

    <div class="main-title">
      <div>
        <div class="flex-text">title</div>
        <div>
          <span class="tip1">
            <span class="tip">123</span>
          </span>
          <span class="tip2">
            <span class="tip">456</span>
          </span>
        </div>
      </div>
    </div>

    <div class="wrapper wrapper-fixed" :class="{ 'clear-fix': true }">
      <div class="wrapper-item">item-1</div>
      <div class="wrapper-item">item-2</div>
      <div class="wrapper-item">item-3</div>
    </div>
    <div class="wrapper">
      <div class="wrapper-item-2">sub-item-1</div>
      <div class="wrapper-item-2">sub-item-2</div>
      <div class="wrapper-item-2">sub-item-3</div>
    </div>
    <div class="selector">
      <span class="select-dot">123</span>
      <span class="select-text">123</span>
      selector
    </div>
    <div>
      <div class="wrapper">
        <div class="title">title</div>
      </div>
    </div>

  </div>
</template>

<style lang='scss' scoped>
.container {
  width: 100px;

  .group {
    .group-item {
      background: #333;
    }
  }

  .main-title {
    margin: 20px auto;
    .flex-text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .tip {
      color: #333;
    }
    .tip1 {
      font-size: 20px;
      color: #333;
    }
  }

  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: row;
    .wrapper-item {
      border: 1px solid #e8e8e8;
    }
    .wrapper-item2 {
      border: 2px solid #e8e8e8;
      .item-text {

      }
    }
  }

  .selector {
    display: inline-block;
    width: fit-content;
    background: #fff;
    .select-text {
      font-size: 14px;
      color: #eee;
      .select-dot {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
}
</style>
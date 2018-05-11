<template>
  <div class="test">
    <h1>test page</h1>
    <div class="default-card card-example">
      <p class="card-header">使用路由传递参数的例子</p>
      <div class="card-main">
        <p>接受到的值为：value = {{ data.value }}, name = {{ data.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: null
    }
  },
  onShow () {
    // console.log(this.$root.$mp.query)
    this.data = this.$root.$mp.query
  }
}
</script>

<style scoped>
.test {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-header {
  font-size: 14px;
  padding: 5px 20px;
  color: orangered;
}
.default-card {
  width: 90%;
  padding: 10px;
  border: 1rpx solid #ddd;
  box-shadow: 0 0 5px #ddd;
  border-radius: 3px;
}
.card-example {
  margin-bottom: 20px;
}
</style>

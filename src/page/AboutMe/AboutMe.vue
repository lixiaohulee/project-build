<template>
    <div class="stage">
        <div class="wrapper">
            <div class="item" v-for="(item, index) in items" :key="index.toString()" :style="init(index)">{{item}}</div>
        </div>
    </div>
</template>
<script>
export default {
  name: "AboutMe"
}
</script>
<style lang="less" scoped>
</style>


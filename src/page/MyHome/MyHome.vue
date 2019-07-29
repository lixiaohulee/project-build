<template>
    <section>hello world</section>
</template>
<script>
import {lee} from '@/math'
// lee()
import test from '@/test'
// test()
export default {
    name: 'MyHome',
    created() {
        lee()
        test()
    }
}
</script>
<style lang="less" scoped>

</style>



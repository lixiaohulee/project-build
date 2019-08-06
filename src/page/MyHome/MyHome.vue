<template>
    <section>
        <i class="iconfont">&#xe677;</i>
        <i class="iconfont">&#xe676;</i>
        <i class="iconfont">&#xe66b;</i>
        <div>{{name}}</div>
        <div>{{username}}</div>
        <button @click="handleInit">initUserName</button>
    </section>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
    name: 'MyHome',

    methods: {
        handleInit() {
            this.initUserNameAsync()
        },
        ...mapMutations({
            initUserName: 'userModule/setUsername'
        }),
        ...mapActions({
            initUserNameAsync: 'userModule/setUsername'
        })
    },
    computed: {
        ...mapState({
            name: state => state.name
        }),
        ...mapGetters({
            username: 'userModule/username'
        }) 
    }
}
</script>
<style lang="less" scoped>
section {
    transform: translateX(100px);
    transition: transform 1s linear;
    border-radius: 1px;
    // all: initial;
    color: hwb(120 44% 50%);
    break-inside: avoid;
    font-variant: small-caps;
    margin-inline-start: 10px;
}
</style>



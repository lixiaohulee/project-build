<template>
    <section>
        <div class="test">{{name}}</div>
        <div>{{username}}</div>
        <button @click="handleInit">initUserName</button>

        <div class="box">sdsd</div>
       
    </section>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
    name: 'MyHome',
    components: {
    },
    
    created() {
        this.hanldeGettestList()
    },
    methods: {
        handleInit() {
            this.initUserNameAsync()
        },
        ...mapMutations({
            initUserName: 'userModule/setUsername'
        }),
        ...mapActions({
            initUserNameAsync: 'userModule/setUsername'
        }),
        hanldeGettestList() {
        }
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
    .test {
        font-size: 13px;
    }
    .box {
        width: 160px;
        height: 100px;
        background-color: red;
        font-size: 20px;
    }
    .text {
        font-size: 20px;
    }
}
</style>



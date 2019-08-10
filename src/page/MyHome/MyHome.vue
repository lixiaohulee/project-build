<template>
    <section>
        <i class="iconfont">&#xe677;</i>
        <i class="iconfont">&#xe676;</i>
        <i class="iconfont">&#xe66b;</i>
        <div class="test">{{name}}</div>
        <div>{{username}}</div>
        <button @click="handleInit">initUserName</button>

        <div class="box">sdsd</div>
        <ui-dialog :show="true">
            <div slot="content" class="text">
                sdfsdfsadfsd
            </div>
        </ui-dialog>
        <!-- <ui-toast :show="true" :content="'sdfsdfs'"></ui-toast> -->
    </section>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import api from 'api'
import UiDialog from '~/ui-dialog'
import UiToast from '~/ui-toast'
import '../../lib/css/iconfont/iconfont.less'
export default {
    name: 'MyHome',
    components: {
        UiDialog,
        UiToast
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
            api.getTestList({}).then(res => {
                const { code, msg } = res
            })
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
    // transform: translateX(100px);
    // transition: transform 1s linear;
    // border-radius: 1px;
    // // all: initial;
    // color: hwb(120 44% 50%);
    // break-inside: avoid;
    // font-variant: small-caps;
    // margin-inline-start: 10px;
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



const state = {
    username: 'lixiaohu'
}

const mutations = {
    setUsername(state, username) {
        state.username = username
    }
}

const actions = {
    setUsername(context) {
        const timer = setTimeout(() => {
            const username = 'yangtong'
            context.commit('setUsername', username)
            clearTimeout(timer)
        }, 3000)
    }
}

const getters = {
    username: state => state.username + 'lixiaohu'
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
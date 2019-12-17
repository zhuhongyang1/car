const state = {
    show: false,
    index: 0,
}

const mutations = {
    changeShow(state, payload) {
        state.show = payload
    },
    setIndex(state, payload) {
        console.log(payload)
        state.index = payload
    },
    
}

const actions = {

}

export default {
    namespaced: true,
    state, 
    mutations,
    actions
}
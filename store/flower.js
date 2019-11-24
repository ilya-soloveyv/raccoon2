import consola from 'consola'

const state = () => ({
  flowers: [],
  flower: {}
})

const mutations = {
  setFlowers(state, flowers) {
    state.flowers = flowers
  },
  setFlower(state, flower) {
    state.flower = flower
  },
  delete(state, flower) {
    const i = state.flowers.findIndex((x) => x._id === flower._id)
    state.flowers.splice(i, 1)
  },
  update(state, flower) {
    state.flower = flower
    // state.flowers.map(function(item, index, array) {
    //   consola.log(item, index, array)
    // })
    // consola.success(flower)
    // var flower2 = state.flowers.find((x) => x._id === flower._id)
    // flower2 = flower
    // console.
    // state.flowers[i] = flower
  }
}

const actions = {
  async getFlowers({ state, commit }) {
    const flowers = await this.$axios.$post('/api/flowers')
    commit('setFlowers', flowers)
  },
  async getFlower({ state, commit }, params) {
    const flower = await this.$axios.$post('/api/flower/get', {
      _id: params.id
    })
    commit('setFlower', flower)
  },
  async delete({ state, commit }, flower) {
    const result = await this.$axios.$post('/api/flower/delete', flower)
    if (result.ok) {
      commit('delete', flower)
    }
  },
  async update({ state, commit }, flower) {
    const result = await this.$axios.$post('/api/flower/update', flower)
    consola.log(result)
    commit('update', flower)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export const home = {
  namespaced: true,
  state: {
    depositData: {},
  },

  mutations: {
    setDepositData(state, payload) {
      state.depositData = payload
    },
  },
  getters: {},
}

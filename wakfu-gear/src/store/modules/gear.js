import { equipType } from '../../model/equipType'

const state = {
  gear: {
    NECK: null,
    BELT: null,
    LEGS: null,
    CHEST: null,
    BACK: null,
    SHOULDERS: null,
    HEAD: null,
    LEFT_HAND: null,
    RIGHT_HAND: null,
    PET: null,
    ACCESSORY: null,
    COSTUME: null,
    FIRST_WEAPON: null,
    SECOND_WEAPON: null
  }
}

const getters = {
  gear: state => state.gear
}

const mutations = {
  setGear: (state, gear) => { state.gear = gear }
}

const actions = {
  async adicionarItem ({ commit, state, dispatch }, item) {
    const posicoesPossiveis = equipType.find(e => e.id === item.type).pos
    const gear = { ...state.gear }
    let colocouItem = false

    for (const i in posicoesPossiveis) {
      const posicao = posicoesPossiveis[i]
      if (!gear[posicao]) {
        gear[posicao] = item
        colocouItem = true
        break
      }
    }
    if (!colocouItem) {
      const posicao = posicoesPossiveis[0]
      gear[posicao] = item
    }
    commit('setGear', gear)
    dispatch('atributos/calcularAtributos', gear, { root: true })
  },
  async removerItem ({ commit, state, dispatch }, posicao) {
    const gear = { ...state.gear }
    gear[posicao] = null
    commit('setGear', gear)
    dispatch('atributos/calcularAtributos', gear, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
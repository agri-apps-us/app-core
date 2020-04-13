import Vuex from "vuex";

const store = ({ data, getField, updateField, calculate }) =>
  new Vuex.Store({
    state: {
      ...data,
      results: { complete: false },
    },
    mutations: {
      initializeStore (state, data) {
        this.replaceState(
          Object.assign(state, {
            ...data,
            initialized: true
          })
        )
      },
      updateResults(state, results) {
        state.results = {
          ...results,
          lastUpdated: new Date()
        }
      },
      updateField,
    },
    actions: {
      initializeStore({ commit, state }, data) {

        const { results, ...payload } = data;

        commit("initializeStore", payload);

        if (calculate && typeof calculate === 'function') {
          calculate(payload).then(results => {
            commit('updateResults', results);
          })
        }

        return Promise.resolve(state);
      },
      updateResults({ commit }, results) {
        commit("updateResults", results);
      },
    },
    getters: {
      initialized(state) {
        return state.initialized;
      },
      getField,
      results(state) {
        return state.results;
      },
      validationErrors(state) {
        return state.results && state.results.__validationErrors;
      },
    },
  });

  export default store;
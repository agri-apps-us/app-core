import Vuex from "vuex";

const store = ({ data, getField, updateField, initializeStore, updateResults }) =>
  new Vuex.Store({
    state: {
      ...data,
      results: { complete: false },
    },
    mutations: {
      initializeStore,
      updateResults: updateResults ? updateResults : (state, results) => {
        state.results = results;
        state.results.lastUpdated = new Date();
      },
      updateField,
    },
    actions: {
      initializeStore({ commit, state }, storeName) {
        commit("initializeStore", storeName);
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
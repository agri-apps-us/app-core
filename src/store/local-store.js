import makeStore from "./store";

const initializeStore = (state, storeName) => {
  if (localStorage.getItem(storeName)) {
    this.replaceState(
      Object.assign(state, {
        ...JSON.parse(localStorage.getItem(storeName)),
        initialized: true,
      })
    );
  }
  state.initialized = true;
  state.storeName = storeName;
  return true;
};

const store = ({ data, getField, updateField, calculate }) => {
  let localStore = makeStore({ data, getField, updateField, initializeStore });

  localStore.subscribe((mutation, state) => {
    if (mutation.type === "updateField") {
      localStorage.setItem(state.storeName, JSON.stringify(state));
      if (calculate && typeof calculate === "function") {
        calculate(state).then((result) => {
          store.dispatch("updateResults", result);
        });
      }
    }
  });

  return localStore;
};

export default store;

import makeStore from "./store";

const store = (storeName, { data, getField, updateField, calculate }) => {
  if (!storeName) {
    throw new Error("Missing store name argument.");
  }

  let localStore = makeStore({ data, getField, updateField, calculate });

  localStore.subscribe((mutation, state) => {
    if (mutation.type === "updateField") {
      const { initialized, ...payload } = state;
      localStorage.setItem(storeName, JSON.stringify(payload));
      if (calculate && typeof calculate === "function") {
        calculate(payload).then((result) => {
          localStore.dispatch("updateResults", result);
        });
      }
    }
  });

  return localStore;
};

export default store;

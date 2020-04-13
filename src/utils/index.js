export const arrayToObject = (fields = []) => {
  return fields.reduce((prev, path) => {
    const key = path.split(`.`).slice(-1)[0];

    if (prev[key]) {
      throw new Error(`The key \`${key}\` is already in use.`);
    }

    // eslint-disable-next-line no-param-reassign
    prev[key] = path;

    return prev;
  }, {});
};

export const callable = (ref, fn, msg) => {
  if (!ref) {
      throw new Error('implementation not found.');
  }
  if (!ref[fn] || typeof ref[fn] !== 'function') {    
    throw new Error(msg || 'method is not callable.');
  }  
}

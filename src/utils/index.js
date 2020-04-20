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

export const slugify = (str) => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return str.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

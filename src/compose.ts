
const compose = (...funcs: Function[]) => {
  if (funcs.length === 1) return funcs[0];
  return funcs.reduce((a, b) => (...args: Function[]) => (a(b(...args))));
}

export { compose }
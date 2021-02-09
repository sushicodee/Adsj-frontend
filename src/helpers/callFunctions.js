export const callFunctions = (...fns) => (...args) =>
  fns.forEach((fn) => (typeof fn === 'function' ? fn(args) : fn));

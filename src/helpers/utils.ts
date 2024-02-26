export const NOOP = () => {
  // NOOP
};

export const sleep = (timer: number) =>
  new Promise(resolve => setTimeout(resolve, timer));

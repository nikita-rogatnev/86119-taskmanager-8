export default (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

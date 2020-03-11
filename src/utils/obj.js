const includeKeys = ({ obj = {}, keys = [] }) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

export { includeKeys };

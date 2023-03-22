const logger = require('../services/loggerService');

const discoverDiff = (original, updated) => {
  let diff;
  // It means updated is a new creation
  if (!original && updated) {
    return updated;
  }
  try {
    const updatedKeys = Object.keys(updated);
    updatedKeys.forEach((key) => {
      const originalValue = original[key];
      const updatedValue = updated[key];
      if (updatedValue instanceof Array) {
        let arrayDiff;
        if (originalValue.length === updatedValue.length) {
          for (let i = 0; i < originalValue.length; i++) {
            const result = discoverDiff(originalValue[i], updatedValue[i]);
            if (result) {
              if (!arrayDiff) {
                arrayDiff = [];
              }
              arrayDiff.push(result);
            }
          }
          if (!diff) {
            diff = {};
          }
          if (arrayDiff) {
            diff[key] = arrayDiff;
          }
        } else {
          if (!diff) {
            diff = {};
          }
          diff[key] = updatedValue;
        }
      } else if (updatedValue instanceof Object) {
        const result = discoverDiff(originalValue, updatedValue);
        if (result) {
          if (!diff) {
            diff = {};
          }
          diff[key] = result;
        }
      } else if (originalValue !== updatedValue) {
        if (!diff) {
          diff = {};
        }
        diff[key] = updatedValue;
      }
    });
  } catch (error) {
    logger.error(`Error during diffrentiate the update: ${error}`);
  }
  return diff;
};

module.exports = {
  discoverDiff,
};

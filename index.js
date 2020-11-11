/**
 * Add delay to promises
 *
 * @param promises
 * @param delayIncrement
 * @returns {Promise<*>}
 */
module.exports.addDelayToPromises = function (promises, delayIncrement = 1000) {
  console.log(`Beginning addDelayToPromises with delay: ${delayIncrement} and promises: ${promises.length}`);
  let delay = 0;
  const newPromises = promises.map(promise => {
    delay += delayIncrement;
    return new Promise(resolve => setTimeout(resolve, delay)).then(() => promise);
  })
  console.log(`Finishing addDelayToPromises`);
  return newPromises;
}

/**
 * Return Attribute Value
 *
 * Return a value from an array of objects, otherwise return undefined (or empty string)
 * searchData can either be an array of objects or an object.
 *
 * @param searchData
 * @param key
 * @param useKey
 * @param returnType
 * @returns {*|undefined}
 */
module.exports.getAttValue = function (searchData, key, useKey = 'machine_name', returnType = undefined) {
  if (Array.isArray(searchData)) {
    const attribute = searchData.find(xA => xA[useKey] === key);
    // returning undefined will allow default parameters to be used when calling functions myVariable = ""
    return attribute !== undefined ? attribute.value : returnType;
  } else {
    if (searchData[useKey] === key) {
      return searchData.value;
    } else {
      return returnType;
    }
  }
}

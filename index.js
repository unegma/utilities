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
 * Returning undefined is also needed, because otherwise, sending null as a value to some api endpoints (tc) can cause problems 'can't be null'
 *
 * @param searchData
 * @param keysValue Key's Value (can also be an array Array|value), if array, will only return 1 value
 * @param useKey
 * @param returnKey
 * @param returnEmptyValue
 * @returns {*|undefined}
 */
module.exports.getAttValue = function (searchData, keysValue, useKey = 'machine_name',
                                       returnKey = 'value', returnEmptyValue = undefined) {
  if (Array.isArray(searchData)) {
    let attribute;
    if(Array.isArray(keysValue)) {
      // this section could probably be improved
      let attributes = keysValue.map(kV => {
        let d = searchData.find(xA => xA[useKey] === kV);
        return d;
      }).filter(e => e); // remove undefineds
      // if found multiple objects, only return ones where the returnKey (ie value) is not null or undefined
      attribute = attributes.find(at => {
        return (at[returnKey] !== null && at[returnKey] !== undefined);
      });
    } else {
      attribute = searchData.find(xA => xA[useKey] === keysValue);
    }
    // returning undefined will allow default parameters to be used when calling functions myVariable = ""
    return attribute !== undefined ? attribute[returnKey] : returnEmptyValue;
  } else {
    // could add in a section for checking an array of inputs for individual objects (see above)
    if (searchData[useKey] === keysValue) {
      return searchData[returnKey];
    } else {
      return returnEmptyValue;
    }
  }
}

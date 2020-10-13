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

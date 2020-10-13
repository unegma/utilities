const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const utilities = require('./index');

describe('Utilities Test', () => {

  it('should return an array of promises', async () => {
    const promises = [
      new Promise(function(resolve) {
        setTimeout(resolve(1), 100);
      }),
      new Promise(function(resolve) {
        setTimeout(resolve(2), 100);
      })
    ];
    let newPromises = utilities.addDelayToPromises(promises, 200);
    let result = await Promise.all(newPromises);
    result = result.reduce((a, b) => a + b);
    expect(result).to.equal(3);
  });

  // todo add test for actual time taken

});

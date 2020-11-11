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

  it('should return a value from an array of objects', async () => {
    const data = [
      {
        "id": 12345,
        "machine_name": "name",
        "value": "Tim",
        "type": "text"
      },
      {
        "id": 123456,
        "machine_name": "address",
        "value": "1 the street",
        "type": "text"
      }
    ];

    // result checks

    let result1 = utilities.getAttValue(data, "name");
    expect(result1).to.equal("Tim");

    let result1a = utilities.getAttValue(data, 12345, 'id');
    expect(result1a).to.equal("Tim");

    let result1b = utilities.getAttValue(data, 12345, 'id', "type");
    expect(result1b).to.equal("text");

    // error checks

    let result2a = utilities.getAttValue(data, "undefinedKey");
    expect(result2a).to.equal(undefined);

    let result2b = utilities.getAttValue(data, "undefinedKey", undefined, undefined, "");
    expect(result2b).to.equal("");

    let result2c = utilities.getAttValue(data, "");
    expect(result2c).to.equal(undefined);

    let result2d = utilities.getAttValue(data, "", undefined, undefined, "");
    expect(result2d).to.equal("");
  });

});

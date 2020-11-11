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
        "idHash": "12345",
        "machine_name": "name",
        "value": "Tim",
        "type": "text"
      },
      {
        "id": 123456,
        "idHash": "123456",
        "machine_name": "address",
        "value": "1 the street",
        "type": "text"
      }
    ];

    const data2 = {
      "id": 12345,
      "machine_name": "name",
      "value": "Tim",
      "type": "text"
    };

    // result checks

    let result1a = utilities.getAttValue(data, "name");
    expect(result1a).to.equal("Tim");

    let result1b = utilities.getAttValue(data, 12345, 'id');
    expect(result1b).to.equal("Tim");

    let result1c = utilities.getAttValue(data, 12345, 'id', "type");
    expect(result1c).to.equal("text");

    // error checks

    let result2a = utilities.getAttValue(data, "undefinedKey");
    expect(result2a).to.equal(undefined);

    let result2b = utilities.getAttValue(data, "undefinedKey", undefined, undefined, "");
    expect(result2b).to.equal("");

    let result2c = utilities.getAttValue(data, "");
    expect(result2c).to.equal(undefined);

    let result2d = utilities.getAttValue(data, "", undefined, undefined, "");
    expect(result2d).to.equal("");

    let result2e = utilities.getAttValue(data2, "name", "id");
    expect(result2e).to.equal(undefined);

    let result2f = utilities.getAttValue(data2, [9, 34], "id");
    expect(result2f).to.equal(undefined);

    let result2g = utilities.getAttValue(data2, ["9", "34"], "idHash");
    expect(result2g).to.equal(undefined);

    let result2h = utilities.getAttValue(data2, [12, 45, 123456], 'id');
    expect(result2h).to.equal(undefined);

    // array checks

    let result3a = utilities.getAttValue(data, [12345, 12], 'id');
    expect(result3a).to.equal("Tim");

    let result3b = utilities.getAttValue(data, [12, 123456], 'id');
    expect(result3b).to.equal("1 the street");

    let result3c = utilities.getAttValue(data, ["12345", "12"], 'idHash');
    expect(result3c).to.equal("Tim");

    let result3d = utilities.getAttValue(data, ["12", "12345"], 'idHash');
    expect(result3d).to.equal("Tim");

    // object checks

    let result4a = utilities.getAttValue(data2, 12345, 'id');
    expect(result4a).to.equal("Tim");

    let result4b = utilities.getAttValue(data2, "name");
    expect(result4b).to.equal("Tim");

    // probably don't need to be able to use an array on individual object, but add if needed
    // let result4c = utilities.getAttValue(data2, [12, 45, 12345], 'id');
    // expect(result4c).to.equal("Tim");

    // let result4d = utilities.getAttValue(data2, [12345, 34], 'id');
    // expect(result4d).to.equal("Tim");


    // let result4e = utilities.getAttValue(data2, ["12", "45", "123456"], 'idHash');
    // expect(result4e).to.equal("1 the street");

    // let result4f = utilities.getAttValue(data2, ["123456", "34"], 'idHash');
    // expect(result4f).to.equal("1 the street");
  });

});

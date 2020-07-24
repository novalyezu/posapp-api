const chai = require('chai');
const helper = require('../../src/helpers/index');

describe('Helper.js', () => {
  it('should return 10!', () => {
    const response = helper.fungsiTambah(4,6);
    chai.assert.equal(response, 10);
  })
})

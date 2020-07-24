const chai = require('chai');
const product = require('../../src/controllers/product');
const productModel = require('../../src/models/product');
const sinon = require('sinon');

describe('Product Controllers', () => {
  describe('getAllProduct', () => {
    it('should return all product', async () => {
      const res = {
        status: () => {
          return {
            json: sinon.stub()
          }
        },
      };
      sinon.stub(productModel, 'getAllProductModel').resolves([{ id:1, name: 'Laptop' }]);
      await product.getAllProduct({}, res);
      productModel.getAllProductModel.restore();
    })
  })
})

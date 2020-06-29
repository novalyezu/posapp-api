const helper = require('../helpers/index');
const productModel = require('../models/product');

module.exports = {
  getAllProduct: async function(request, response) {
    console.log('about');
    try {
      const result = await productModel.getAllProductModel();
      return helper.response(response, 'success', result, 200);
    } catch (error) {
      console.log(error);
      return helper.response(response, 'fail', 'Internal Server Error', 500);
    }
  },
  postProduct: async function(request, response) {
    const setData = request.body;
    setData.image = request.file ? request.file.filename : '';
    try {
      const result = await productModel.postProductModel(setData);
      return helper.response(response, 'success', result, 201);
    } catch (error) {
      console.log(error);
      return helper.response(response, 'fail', 'Internal Server Error', 500);
    }
  },
  putProduct: async function(request, response) {
    const setData = request.body;
    const id = request.params.id;
    try {
      const result = await productModel.putProductModel(setData, id);
      return helper.response(response, 'success', result, 200);
    } catch (error) {
      console.log(error);
      return helper.response(response, 'fail', 'Internal Server Error', 500);
    }
  },
  deleteProduct: async function(request, response) {
    const id = request.params.id;
    try {
      const result = await productModel.deleteProductModel(id);
      return helper.response(response, 'success', '', 200);
    } catch (error) {
      console.log(error);
      return helper.response(response, 'fail', 'Internal Server Error', 500);
    }
  }
};

const helper = require('../helpers/index');
const productModel = require('../models/product');
const joi = require('@hapi/joi');

module.exports = {
  getAllProduct: async function(request, response) {
    try {
      const result = await productModel.getAllProductModel();
      return helper.response(response, 'success', result, 200);
    } catch (error) {
      console.log(error);
      return helper.response(response, 'fail', 'Internal Server Error', 500);
    }
  },
  postProduct: async function(request, response) {
    console.log(request.file, 'controller');
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
    const schema = joi.object({
      id: joi.number().required(),
      name: joi.string().required(),
      price: joi.number().required(),
      qty: joi.number().optional().default(0)
    });
    const validate = schema.validate({ id, ...setData}, {allowUnknown: true});
    if(validate.error) {
      return helper.response(response, 'fail', validate.error.message, 400);
    }
    console.log('okokokokok')
    return helper.response(response, 'success', validate.value, 200);
    // try {
    //   const result = await productModel.putProductModel(setData, id);
    //   return helper.response(response, 'success', result, 200);
    // } catch (error) {
    //   console.log(error);
    //   return helper.response(response, 'fail', 'Internal Server Error', 500);
    // }
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

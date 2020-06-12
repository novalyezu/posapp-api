const connection = require('../helpers/mysql');

module.exports = {
  getAllProductModel: function() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products', function(error, result) {
        if (error) {
          reject(error);
        };
        resolve(result);
      });
    });
  },
  postProductModel: function(setData) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO products SET ?', setData, function(error, result) {
        if (error) {
          reject(error);
        };
        const newData = {
          id: result.insertId,
          ...setData
        };
        resolve(newData);
      });
    });
  },
  putProductModel: function(setData, id) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE products SET ? WHERE id=?', [setData, id], function(error, result) {
        if (error) {
          reject(error);
        };
        const newData = {
          id,
          ...setData
        };
        resolve(newData);
      });
    })
  },
  deleteProductModel: function(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM products WHERE id=?', id, function(error, result) {
        if (error) {
          reject(error);
        };
        resolve('');
      });
    });
  }
};

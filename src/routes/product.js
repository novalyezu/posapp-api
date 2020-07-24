const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images')
  },
  filename: function (req, file, cb) {
    const splitName = file.originalname.split('.');
    const ext = splitName.pop();
    const newName = splitName.join('-');
    cb(null, `${newName}-${Date.now()}.${ext}`);
  }
});
const upload = multer({ storage: storage });

router.get('/', productController.getAllProduct);
router.post('/', upload.single('image'), productController.postProduct);
router.put('/:id', productController.putProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;

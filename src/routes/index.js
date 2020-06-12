const express = require('express');
const router = express.Router();
const productRouter = require('./product');
const authRouter = require('./auth');

router.use('/products', productRouter);
router.use('/auth', authRouter);

module.exports = router;

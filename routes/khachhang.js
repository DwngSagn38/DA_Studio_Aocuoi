const express = require('express');
const router = express.Router();

const KhachhangModel = require('../model/khachhangs');

router.get('/', async (req, res) => {
    const khachhangs = await KhachhangModel.find();
    res.send(khachhangs)
});


module.exports = router;
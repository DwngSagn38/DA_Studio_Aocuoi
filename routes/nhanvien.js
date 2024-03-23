const express = require('express');
const router = express.Router();

const NhanVienModel = require('../model/nhanviens');

router.get('/', async (req, res) => {
    const nhanviens = await NhanVienModel.find();
    res.send(nhanviens)
});

module.exports = router;
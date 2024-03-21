const express = require('express');
const router = express.Router();

const NhanVienModel = require('../model/nhanviens');

router.get('/', async (req, res) => {

    const { username, password } = req.query;
    if (!username) {
        res.send('Chưa nhập username');
    } else {
        try {
            const nhanvien = await NhanVienModel.findOne({ username: username });
            if (!nhanvien) {
                return res.status(404).send("Không tìm thấy username người dùng");
            } else {
                if (nhanvien.password != password) {
                    return res.status(404).send("Password chưa đúng");
                }
                return res.json({
                    "status" : 200,
                    "messenge": "Login success",
                    "data" : nhanvien
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Lỗi server");
        }
    }
})

module.exports = router;
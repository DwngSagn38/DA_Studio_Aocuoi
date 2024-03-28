const express = require('express');
const router = express.Router();

const NhanVienModel = require('../model/nhanviens');

router.get('/', async (req, res) => {
    const nhanviens = await NhanVienModel.find();
    res.send(nhanviens)
});

// post - add nhân viên
router.post('/post', async (req, res) => {
    const data = req.body;
    const nhanvien = new NhanVienModel({
        fullname: data.fullname,
        username: data.username,
        password: data.password,
        email: data.email,
        address: data.address,
        phone: data.phone,
        ghiChu: data.ghiChu,
        trangThai: true,
        avatar: data.avatar,
        role: 0
    })
    const check = await NhanVienModel.findOne({username:data.username})
    if(check){
        return res
        .status(404)
        .json({ message: "Tên đăng nhập tồn tại" });
    }
    const result = await nhanvien.save();
    
    if (result) {
        res.json({
            status: 200,
            message: "Add success",
            data: result
        })
    } else {
        res.json({
            status: 400,
            message: "Add fail",
            data: []
        })
    }
})

// delete nhân viên
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const result = await NhanVienModel.deleteOne({ _id: id });
    if (result) {
        res.json({
            "status": "200",
            "messenger": "Delete success",
            "data": result
        })
    } else {
        res.json({
            "status": "400",
            "messenger": "Delete fail",
            "data": []
        })
    }
})

// update - put nhanvien
router.put('/put/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    // Sử dụng findByIdAndUpdate để tìm và cập nhật dữ liệu
    const result = await NhanVienModel.findByIdAndUpdate(id, data, { new: true });

    if (result) {
        res.json({
            status: 200,
            message: "Update success",
            data: result
        })
    } else {
        res.json({
            status: 400,
            message: "Update fail",
            data: []
        })
    }
})
module.exports = router;
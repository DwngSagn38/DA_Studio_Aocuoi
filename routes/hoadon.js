const express = require('express');
const router = express.Router();

const HoadonModel = require('../model/hoadons');

router.get('/', async (req, res) => {
    const hoadons = await HoadonModel.find();
    res.send(hoadons)
});

// post - thêm hóa đơn
router.post('/post', async (req, res) => {
    const data = req.body;
    const hoadon = new HoadonModel({
        id_NhanVien: data.id_NhanVien,
        id_KhachHang: data.id_KhachHang,
        ngayMua: data.ngayMua,
        tongTien: data.tongTien,
        trangThai: data.trangThai,
        ngayHoanThanh: data.ngayHoanThanh,
        ngayHuy: data.ngayHuy,
    })

    const result = await hoadon.save();

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


// update - update-trangthai hóa đơn
router.put('/update-trangthai/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    // Sử dụng findByIdAndUpdate để tìm và cập nhật dữ liệu
    const result = await HoadonModel.findByIdAndUpdate(id, data, { new: true });

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
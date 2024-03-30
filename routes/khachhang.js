const express = require('express');
const router = express.Router();

const KhachhangModel = require('../model/khachhangs');

router.get('/', async (req, res) => {
    const khachhangs = await KhachhangModel.find();
    res.send(khachhangs)
});


// update - put khach hang
router.put('/put/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    // Sử dụng findByIdAndUpdate để tìm và cập nhật dữ liệu
    const result = await KhachhangModel.findByIdAndUpdate(id, data, { new: true });

    if (result) {
        res.json({
            status: 200,
            msg: "Update success",
            data: result
        })
    } else {
        res.json({
            status: 400,
            msg: "Update fail",
            data: []
        })
    }
})

// delete khach hang
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const result = await KhachhangModel.deleteOne({ _id: id });
    if (result) {
        res.json({
            "status": "200",
            "msg": "Delete success",
            "data": result
        })
    } else {
        res.json({
            "status": "400",
            "msg": "Delete fail",
            "data": []
        })
    }
})


// post - add khach hang
router.post('/post', async (req, res) => {
    const data = await req.body;
    const khachhang = new KhachhangModel({
        tenKhachHang: data.tenKhachHang,
        dienThoai: data.dienThoai,
        diaChi: data.diaChi
    })

    const result = await khachhang.save();

    if (result) {
        res.json({
            status: 200,
            msg: "Add success",
            data: result
        })
    } else {
        res.json({
            status: 400,
            msg: "Add fail",
            data: []
        })
    }
})


module.exports = router;
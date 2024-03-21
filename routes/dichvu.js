const express = require('express');
const router = express.Router();

const DichVuModel = require('../model/dichvus');

// get list dich vu
router.get('/', async (req, res) => {
    const dichVus = await DichVuModel.find();
    res.send(dichVus);
});

// delete dich vu
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const result = await DichVuModel.deleteOne({ _id: id });
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

// post - add dich vu
router.post('/post', async (req, res) => {
    const data = req.body;
    const dichvu = new DichVuModel({
        tenDichVu: data.tenDichVu,
        trangThai: data.trangThai,
        moTa: data.moTa,
        giaTien: data.giaTien
    })

    const result = await dichvu.save();

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

// update - put dichvu
router.put('/put/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    // Sử dụng findByIdAndUpdate để tìm và cập nhật dữ liệu
    const result = await DichVuModel.findByIdAndUpdate(id, data, { new: true });

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
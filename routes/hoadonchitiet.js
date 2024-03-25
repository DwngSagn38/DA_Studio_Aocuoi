const express = require('express');
const router = express.Router();

const HoadonChitietModel = require('../model/hoadonchitiets');

router.get('/', async (req, res) => {
    const hoadonchitiets = await HoadonChitietModel.find();
    res.send(hoadonchitiets)
});


// post - thêm dịch vụ vào hóa đơn
router.post('/post-in-hoadon', async (req, res) => {
    const {idHoaDon} = req.query;
    const data = req.body;
    const hoadonchitiet = new HoadonChitietModel({
        id_DichVu: data.id_DichVu,
        id_HoaDon: idHoaDon,
        soLuong: data.soLuong,
        giaTien: data.giaTien,
        ghiChu: data.ghiChu,
    })

    const result = await hoadonchitiet.save();

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

// post - thêm dịch vụ 
router.post('/post', async (req, res) => {
    const data = req.body;
    const hoadonchitiet = new HoadonChitietModel({
        id_DichVu: data.id_DichVu,
        id_HoaDon: data.id_HoaDon,
        soLuong: data.soLuong,
        giaTien: data.giaTien,
        ghiChu: data.ghiChu,
    })

    const result = await hoadonchitiet.save();

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

module.exports = router;
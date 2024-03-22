const express = require('express');
const router = express.Router();

const HoadonModel = require('../model/hoadons');
const HoadonchitietModel = require('../model/hoadonchitiets');

router.get('/', (req, res) => {
    res.send('Thống kê doanh thu')
});

router.get('/doanhthu', async (req, res) => {
    const hoadons = await HoadonModel.find();

    if (hoadons.length == 0) {
        return res.send('Không có hóa đơn nào');
    }

    let Tongtien = 0;
    for (let hoadon of hoadons) {
        Tongtien += hoadon.tongTien;
    }

    res.json({
        status: 200,
        masenge: "Đây là doanh thu",
        data: Tongtien
    })
})

router.get('/doanhthu-in-date', async (req, res) => {
    const { fromDate, toDate } = req.query;

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    const ngayMua = { ngayMua: { $gte: startDate, $lte: endDate } };
    // $gte : lon hon hoac bang, $ge : lon hon
    // $lte : nho hon hoac bang, $le : nho hon

    const hoadons = await HoadonModel.find(ngayMua, "_id Tongtien")
        .populate('id_NhanVien id_KhachHang')
        .sort({ quantity: -1 }) // giam dan : -1 , tang dan : 1 
        .skip(0) // bo qua so luong row

    if (hoadons.length == 0) {
        return res.send('Không có hóa đơn nào');
    }

    let Tongtien = 0;
    for (let hoadon of hoadons) {
        Tongtien += hoadon.tongTien;
    }

    res.json({
        status: 200,
        masenge: "Đây là doanh thu",
        data: Tongtien
    })
})

module.exports = router;
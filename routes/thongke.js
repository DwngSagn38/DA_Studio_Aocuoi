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

router.get('/doanhthu-in-month', async (req, res) => {
    // Lấy năm hiện tại hoặc năm được chỉ định trong yêu cầu
    const year = req.query.year || new Date().getFullYear();

    // Tạo mảng các promise để lấy doanh thu từng tháng trong năm
    const promises = [];
    for (let month = 0; month < 12; month++) {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const ngayMua = {
            ngayMua: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
        };

        const promise = HoadonModel.aggregate([
            { $match: ngayMua },
            { $group: { _id: null, totalRevenue: { $sum: "$tongTien" } } } // Sử dụng $group để tổng hợp tổng doanh thu của các hóa đơn trong tháng
        ]).exec();

        promises.push(promise);
    }

    // Chờ tất cả các promise hoàn thành
    const monthlyRevenues = await Promise.all(promises);

    res.json({
        status: 200,
        message: `Tổng doanh thu trong năm ${year} là`,
        data: monthlyRevenues
    });
});

module.exports = router;
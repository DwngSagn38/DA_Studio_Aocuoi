const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const HoaDons = new Schema({
    id_NhanVien: { type: Schema.Types.ObjectId, ref: 'nhanvien' },
    id_KhachHang: { type: Schema.Types.ObjectId, ref: 'khachhang' },
    ngayMua:{type:Date,require:true},
    tongTien:{type:Number},
    trangThai:{type: Number, require: true},
    ngayHoanThanh: {type: Date, require: true},
    ngayHuy: {type: Date, require: true}
},{
    timestamps:true
}) 
module.exports=mongoose.model('hoadon',HoaDons)
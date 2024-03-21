const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const HoaDons = new Schema({
    id_NhanVien: { type: Schema.Types.ObjectId, ref: 'nhanvien' },
    id_KhachHang: { type: Schema.Types.ObjectId, ref: 'khachhang' },
    ngayMua:{type:Date,required:true},
    tongTien:{type:Number}
},{
    timestamps:true
}) 
module.exports=mongoose.model('hoadon',HoaDons)
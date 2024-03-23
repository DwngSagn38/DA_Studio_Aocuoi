const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NhanVienModel = new Schema({
    fullname : {type: String, require: true},
    username : {type: String, require: true, unique : true},
    password : {type: String, require: true},
    email : {type: String, require: true, unique : true},
    address : {type: String, require: true},
    phone : {type: String, require: true, unique: true, maxlength : true},
    ghiChu : {type: String},
    trangThai: {type: Boolean}
})

module.exports = mongoose.model("nhanvien",NhanVienModel);
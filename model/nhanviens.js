const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NhanVienModel = new Schema({
    fullname : {type: String, require: true},
    username : {type: String, require: true},
    password : {type: String, require: true},
    email : {type: String, require: true},
    address : {type: String, require: true},
    phone : {type: String, require: true, maxlength : 10},
    ghiChu : {type: String},
    role : {type: Number, default: 0},
    trangThai: {type: Boolean},
    avatar : {type: String}
})

module.exports = mongoose.model("nhanvien",NhanVienModel);
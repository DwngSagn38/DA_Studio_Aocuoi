const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DichVuModel = new Schema({
    tenDichVu : {type: String, require: true},
    trangThai : {type: Boolean, require: true},
    moTa: {type: String, require: true},
    giaTien: {type: Number, require: true}
})

module.exports = mongoose.model('dichvu',DichVuModel);
const mongoose = require("mongoose");


// vanh = mongodb+srv://anhvtvph42837:<password>@cluster0.qdt1hvt.mongodb.net/
const uri = "mongodb+srv://anhvtvph42837:crnbDZH96wcxtP08@cluster0.qdt1hvt.mongodb.net/studio_aocuoi"


const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log('connect success')
    }catch(err){
        console.log(err);
        console.log('connect fail')
    }
}

module.exports = {connect}
const mongoose = require("mongoose");

// Vanh
// const uri = "mongodb+srv://anhvtvph42837:crnbDZH96wcxtP08@cluster0.qdt1hvt.mongodb.net/studio_aocuoi" 
// Sang 
const uri = "mongodb+srv://shallot38hk:62WWpx8QQGvpyzTk@cluster0.4vigwt9.mongodb.net/studio_aocuoi" 


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
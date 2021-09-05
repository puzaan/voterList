const mongoose = require('mongoose')
const colors = require('colors');

// for connecting our project to database

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            
        });
        console.log(`MongoDB Connected ${conn.connection.host}`.cyan.bold)
        
    } catch (err) {
        console.error(`Error: ${err.message}`.red);
        process.exit(1);
        
    }
}
module.exports = connectDB
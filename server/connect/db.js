import mongoose from 'mongoose'

const connectDB = (uri) => {
    return mongoose.connectDB(uri)
}

module.exports = connectDB 
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    }

})

module.exports = mongoose.model("employees",employeeSchema)

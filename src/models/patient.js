const mongoose = require("mongoose")



const patientSchema = new mongoose.Schema({
    full_name: String,
    room_number: Number,
    bed_number: Number,
    time_to_live: String
})


module.exports = new mongoose.model("patient_list", patientSchema)

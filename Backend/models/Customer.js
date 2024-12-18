const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    customerId: { type: String, unique: true },
});

module.exports = mongoose.model('Customer', CustomerSchema);

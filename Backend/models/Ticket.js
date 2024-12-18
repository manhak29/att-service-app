const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    issue: { type: String, required: true },
    status: { type: String, default: 'open' },
    dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', TicketSchema);

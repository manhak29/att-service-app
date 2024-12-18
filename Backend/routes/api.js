const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Ticket = require('../models/Ticket');

// Get all customers
router.get('/customers', async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
});

// Add a new customer
router.post('/customers', async (req, res) => {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.json(newCustomer);
});

// Create a new ticket
router.post('/tickets', async (req, res) => {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.json(newTicket);
});

// Get tickets by customer ID
router.get('/tickets/:customerId', async (req, res) => {
    const tickets = await Ticket.find({ customerId: req.params.customerId });
    res.json(tickets);
});

module.exports = router;

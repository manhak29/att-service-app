const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/api');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); 

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/att_service', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

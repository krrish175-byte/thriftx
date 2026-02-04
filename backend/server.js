const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config({ path: '../.env' }); // Load env vars from root or specific .env file if needed. adjusting path as .env might be in root or backend. 
// Assuming .env is in campus-thriftx root based on structure
require('dotenv').config({ path: path.join(__dirname, '../.env') });


const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.get('/', (req, res) => res.send('Campus ThriftX API Running'));

// Define Routes Placeholders (to be implemented)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/admin', require('./routes/admin'));

// app.use('/api/payment', require('./routes/payment'));

const http = require('http');
const { Server } = require("socket.io");
const Chat = require('./models/Chat');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Update this with frontend URL in production
        methods: ["GET", "POST"]
    }
});

// Socket.io Logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_order', (orderId) => {
        socket.join(orderId);
        console.log(`User joined order room: ${orderId}`);
    });

    socket.on('send_message', async ({ orderId, senderId, message }) => {
        try {
            // Save to DB
            const newChat = new Chat({
                orderId,
                sender: senderId,
                message
            });
            await newChat.save();

            // Emit to room
            io.to(orderId).emit('receive_message', newChat);
        } catch (err) {
            console.error('Chat Error:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const socketio = require('socket.io');
require('dotenv').config();

// CONNECT TO MONGODB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// CREATE SERVER
const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

// CONNECT SOCKET.IO, MAKE EMIT TO CLIENT & LISTEN TO EMIT
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('deleteProducts', () => {
    console.log('supprimé');
    io.emit('serverEmit');
  });

  socket.on('addProducts', ({
    name, type, price, rating, warranty_years, available,
  }) => {
    console.log(name, type, price, rating, warranty_years, available);
    io.emit('serverEmit');
  });

  socket.on('modifyProducts', () => {
    console.log('Produits modifiés');
    io.emit('serverEmit');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// USE CORS FOR NO PROBLEM BETWEEN DIFFERENT DOMAIN & SERVERS
app.use(cors());
app.use(express.json());

// ROUTES
const productsRouter = require('./routes/products');
const route = require('./routes/route');

app.use('/products', productsRouter);
app.use('/', route);

// FOR PRODUCTION
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

server.listen(port, () => {
  console.log(`Server is runnig on port: ${port}`);
});

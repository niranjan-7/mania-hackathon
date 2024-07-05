const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
});

app.set('io', io);

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', taskRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { io };

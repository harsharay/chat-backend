const express = require('express');
const {Server} = require('socket.io')
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
const port = 5000;

const server = http.createServer(app)

server.listen(port, () => console.log('Listening to 5000'))

app.get('/', (req,res) => {
    res.send("Welcome to the home page")
})

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})   

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}}`)
    socket.on('disconnect', () => {
        console.log('user disconnected')
        // const user = allUsers.find((user) => user.id == socket.id);
        // if (user?.username) {
        //     allUsers = leaveRoom(socket.id, allUsers);
        //     socket.to(chatRoom).emit('chatroom_users', allUsers);
        //     socket.to(chatRoom).emit('receive_message', {
        //         message: `${user.username} has disconnected from the chat.`,
        //     });
        // }
    })

    // Send message
    socket.on('send-message', messageData => {
        io.emit('receive-message', messageData, socket.id);
    })
})
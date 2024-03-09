require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const userRoute = require('./routes/userRoute');
app.use(express.urlencoded({ extended: true }))
app.use('/',userRoute);


const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/Public'))

app.get('/',(req,res) =>{
   
    res.sendFile(__dirname + '/index.html')
}) 

const io = require('socket.io')(http)
// var users = {};

// io.on('connection',(socket) =>{
//     socket.on("new-user-joined",(username)=>{
//         users[socket.id] = username
//         console.log(users,'connected..')
//         socket.broadcast.emit('user-connected',username)
//         io.emit("users-list",users)
//         socket.on('message',(msg) =>{
//         socket.broadcast.emit('message',msg)
//     })

//     socket.on('disconnect',()=>{
//         socket.broadcast.emit('user-disconnected',user = users[socket.id])
//         delete users[socket.id]
//         io.emit("users-list",users)
//     })
//     })
// })


/*
<!-- 
<%=
                if(users.length > 0){
                    %>for(let i = 0; i < users.length; i++){
                        %>
                        <ul style="display: block; list-style: none;">
                            <li class="cursor-pointer">
                                <img src="<%='http://localhost:3000/' + users[i]['image'] %>" alt="" width="40px" height="40px" border-radius="50%"> 
                             <%= users[i]['name'] %>
                            </li>
                        </ul>
                        <%
                    }
                }
            %>



 -->



*/

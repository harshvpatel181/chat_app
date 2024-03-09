const socket = io('http://localhost:3000');

let username;

do{
    username = prompt('please enter your name')
}while(!username)

let user_msg = document.querySelector('#input-text')
let btnSend = document.querySelector('#btnsend')
let userLists = document.querySelector('.users-list')
let userCounts = document.querySelector('.user-counts')
let messageArea = document.querySelector('.chats')
let chatWindow = document.querySelector('.chat-window')

socket.emit("new-user-joined",username)

socket.on('user-connected',(socket_name)=>{
    userJoinLeft(socket_name,'joined')
})

function userJoinLeft(name,status){
    let div = document.createElement('div')
    div.classList.add('user-join')
    let content = `<p><b>${name}</b> ${status} the chat</p>`;
    div.innerHTML=content;
    messageArea.appendChild(div)
    scrollToBottom()
}

socket.on('user-disconnected',(user)=>{
    userJoinLeft(user,'Left')
    scrollToBottom()
})

socket.on('users-list',(users)=>{
    userLists.innerHTML="";
    users_arr = Object.values(users)
    for(i=0;i<users_arr.length;i++){
        let p = document.createElement('p');
        p.innerHTML = users_arr[i];
        userLists.appendChild(p);
        scrollToBottom()
        
    }
    userCounts.innerHTML = users_arr.length;
})

user_msg.addEventListener('keyup', (e) => {
    if (e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

btnSend.addEventListener('click', () => {
    let data = {
        user: username,
        message : user_msg.value
    }
    if(user_msg.value!=''){
        appendMessage(data,'outgoing')
        socket.emit('message',data)
        user_msg.value = '';
        scrollToBottom()
    }
})

function sendMessage (message){
    let msg = {
        user: username,
        message : message.trim()
    }
    //append
    appendMessage(msg,'outgoing')
    user_msg.value = ''
    scrollToBottom()

    // send to server
    socket.emit('message', msg)
}
 
function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
        <h5> ${ msg.user}</h5>
        <p> ${ msg.message}</p>
    `
    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv)
    scrollToBottom()
}

//Recieve message
socket.on('message', (msg) =>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom (){
    messageArea.scrollTop = messageArea.scrollHeight
}
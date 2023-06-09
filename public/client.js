const socket=io()
let name;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message_area') 
do {
    name=prompt('please enter your name:')
} while (!name);

textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user: name,
        message: message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value=''
    socket.emit('message',msg)
}
function appendMessage(msg ,type)                   
{
    let maindiv=document.createElement('div')
    let className = type
    maindiv.classList.add(className,'message')
    let markup=` 
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    maindiv.innerHTML=markup
    messageArea.appendChild(maindiv)
}

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
})
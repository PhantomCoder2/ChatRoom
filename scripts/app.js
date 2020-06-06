//dom queries 
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateMsg = document.querySelector('.update-msg');
const newNameForm = document.querySelector('.new-name');
const rooms = document.querySelector('.chat-rooms');
const roomTitle=document.querySelector('.room-title');
const general ='<span class="badge badge-primary">#General 👌🏻Chat Room</span>';
const gaming ='<span class="badge badge-light">#Gaming 🎮 Chat Room</span>';
const music ='<span class="badge badge-danger">#Studies 📚Chat Room</span>';
const animes ='<span class="badge badge-success">#Animes 🥳Chat Room</span>';
let firstLoad= true;
//add new chat 
newChatForm.addEventListener('submit',e =>{
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
  .then(()=> newChatForm.reset())
  .catch((err)=> console.log(err));
});
//update username 
newNameForm.addEventListener('submit',e =>{
  e.preventDefault();
  //take the value and update it
  const newName= newNameForm.name.value.trim();
  chatroom.updateName(newName);
  //reset the name bar
  newNameForm.reset();
  //show the update msg
  updateMsg.innerHTML = `Chat Name Updated to <span class="text-warning font-weight-bold">${newName}</span>`;
  setTimeout(()=> updateMsg.innerText =``,3000); 
});

//update ROOM
rooms.addEventListener('click', e=>{
   if(e.target.tagName === 'BUTTON'){
     chatui.clear();
     chatroom.updateRoom(e.target.getAttribute('id'));
     chatroom.getChats(chat => chatui.render(chat));

    switch(e.target.getAttribute('id')){
      case "general":
        html=`${general}`;
        break;
      case "gaming":
        html=`${gaming}`;
        break;
      case "music":
        html=`${music}`;
        break;
      case "animes":
        html=`${anime}`;
        break;    
    }

     if(firstLoad)
     {
       newChatForm.classList.remove('d-none');
       newChatForm.classList.add('animated','fadeIn','faster');
       newNameForm.classList.remove('d-none');
       newNameForm.classList.add('animated','fadeIn','delay-1s','faster');
       firstLoad =false; 
     }
     roomTitle.innerHTML = html;
   }
});


//LocalStorage for the name
const username= localStorage.username? localStorage.username : 'anonymous';

//class instances
const chatui = new chatUI(chatList);
const chatroom = new Chatroom('',username);


//get chats 
chatroom.getChats(data => chatui.render(data));
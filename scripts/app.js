//dom queries 
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateMsg = document.querySelector('.update-msg');
const newNameForm = document.querySelector('.new-name');
const rooms = document.querySelector('.chat-rooms');

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
  //take the value and update itchatroom.getChats(chat => chatUI.render(chat));
  const newName= newNameForm.name.value.trim();
  chatroom.updateName(newName);
  //reset the name bar
  newNameForm.reset();
  //show the update msg
  updateMsg.innerText = `Your name was updated to ${newName}`;
  setTimeout(()=> updateMsg.innerText =``,3000); 
});

//update ROOM
rooms.addEventListener('click', e=>{
   if(e.target.tagName === 'BUTTON'){
     chatui.clear();
     chatroom.updateRoom(e.target.getAttribute('id'));
     chatroom.getChats(chat => chatui.render(chat));
   }
});


//LocalStorage for the name
const username= localStorage.username? localStorage.username : 'anonymous';

//class instances
const chatui = new chatUI(chatList);
const chatroom = new Chatroom('general',username);


//get chats 
chatroom.getChats(data => chatui.render(data));
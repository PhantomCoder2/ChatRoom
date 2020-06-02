class Chatroom{
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chat1= db.collection('chat1');
        this.unsub;
    }

    async addChat(message){
        const now = new Date();
        const chat = {
            message,
            username:this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
    const response = await this.chat1.add(chat);
    return response;
    }
    getChats(callback){
      this.unsub=this.chat1
      .where('room','==',this.room)
      .orderBy('created_at')  //taking 1 room and printing its data
      .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change =>{
            if(change.type === 'added'){
                callback(change.doc.data());
            }
          });
      });
    }
    updateName(username){
        this.username=username;
        localStorage.setItem('username',username);
    }
    updateRoom(room){
    this.room=room;
    console.log('room updated');
    if(this.unsub){
        this.unsub();
    }
    }
}

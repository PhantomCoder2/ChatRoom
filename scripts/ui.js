class chatUI{
    constructor(list){
        this.list = list;
    }
    clear(){
      this.list.innerHTML = '';
    }
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix:true }
            );
        const html= `
          <li class="list-group-item chat-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</div>
          </li>
        `;
       this.list.innerHTML +=html;
       const items= document.querySelectorAll('.chat-item');
       const last = items[items.length-1];
       last.scrollIntoView();
    }
}
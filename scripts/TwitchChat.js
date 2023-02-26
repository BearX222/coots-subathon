export default class TwitchChat{
    constructor(element){
        this.element = element;
        this.messages = [];
    }

    addMessage(name, text){
        let message = document.createElement("div");
        message.classList.add("message");
        
        message.innerHTML = `<span class="user" style="color: ${CHAT_COLORS_LIST_GLOBAL[name.charCodeAt(0)]};">${name}: </span>${text}`;
        
        this.element.appendChild(message);

        this.messages.push({name: name, color: CHAT_COLORS_LIST_GLOBAL[name.charCodeAt(0)], text, text});
        this.element.scrollTo(0, this.element.scrollHeight);
    }
}
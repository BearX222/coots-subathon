import './style.css';
import './chat.css';
import './carMinigame.css';
import TwitchChat from './scripts/TwitchChat';
import CarMinigame from './scripts/CarMinigame';

document.querySelector("#start-game").addEventListener("click", ()=>{
    startGame();
});
document.querySelector("#display-credits").addEventListener("click", ()=>{
    displayCredits();
});
document.querySelector("#display-menu").addEventListener("click", ()=>{
    displayMenu();
});
document.querySelector("#exit-to-menu").addEventListener("click", ()=>{
    carMinigame.endGame();
    document.querySelector("#game").style.display = "none";
    document.querySelector("#audio-player").src = "./assets/audio/HappySong.mp3";
    document.querySelector("#audio-player").play();
    document.querySelector("#chat").innerHTML = "";
    displayMenu();
});

const audioClickListener = ()=>{
    document.querySelector("#audio-player").play();
    document.removeEventListener("mousedown", audioClickListener);
}

document.addEventListener("mousedown", audioClickListener);

let carMinigame;

function startGame(){
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#game").style.display = "flex";
    document.querySelector("#credits").style.display = "none";

    var subs = 1;
    var viewers = 1;
    
    const twitchChat = new TwitchChat(document.querySelector("#chat"));
    
    const startTime = Date.now();
    let elapsedTime = "00:00";
    
    // Update counters
    setInterval(()=>{
        const timeNow = Date.now();
        const elapsed = new Date(timeNow - startTime);
    
        const formated = String(elapsed.getMinutes()).padStart(2, "0") + ":" + String(elapsed.getSeconds()).padStart(2, "0");
        elapsedTime = formated;

        subs += subs * (0.0001 + Math.random() * 0.0199);
        viewers += viewers * (0.0005 + Math.random() * 0.0345);
    
        document.querySelector("#global-time-counter").innerText = elapsedTime;
        document.querySelector("#global-subs-counter").innerText = Math.floor(subs);
        document.querySelector("#global-viewers-counter").innerText = Math.floor(viewers);
    }, 1000);
    
    function addMessageInChat(){
        setTimeout(()=>{
            twitchChat.addMessage(USER_NAME_LIST_GLOBAL[Math.floor(Math.random() * USER_NAME_LIST_GLOBAL.length)], GOOD_CHAT_LIST_GLOBAL[Math.floor(Math.random() * GOOD_CHAT_LIST_GLOBAL.length)]);
            addMessageInChat();
        }, Math.max( 500, (30000 - (Math.floor(viewers) * 10)) ) );
    }
    addMessageInChat();
    
    
    carMinigame = new CarMinigame(document.querySelector("#minigames-display"));
    
    // setTimeout(()=>{
    //     carMinigame.endGame();
    // }, 5000);
}

function displayCredits(){
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#game").style.display = "none";
    document.querySelector("#credits").style.display = "flex";
}
function displayMenu(){
    document.querySelector("#menu").style.display = "block";
    document.querySelector("#game").style.display = "none";
    document.querySelector("#credits").style.display = "none";
}
export default class CarMinigame{
    constructor(element){
        this.element = element;
        this.carPosition = 2;
        this.pickupFrame = 0;
        this.score = 0;
        this.lives = 3;
        this.item = 0;
        this.createScene();
        
        setTimeout(()=>{
            this.spawnItem();
        }, 5000);

        document.addEventListener("keypress", (e)=>{
            this.keyHandler(e);
        });

        this.itemInterval = setInterval(()=>{
            this.updateItem();
        }, 500);
    }

    createScene(){
        const wrapper = document.createElement("div");
        wrapper.classList.add("carminigame");

        const road = document.createElement("img");
        road.classList.add("road");
        road.src = "./assets/images/carMinigame-road.gif";

        this.pickup = document.createElement("img");
        this.pickup.id = "pickup";
        this.pickup.dataset.xpos = "2";
        this.pickup.src = "./assets/images/pickup/pickup0.png";
        this.animatePickup();

        this.coin = document.createElement("img");
        this.coin.id = "coin";
        this.coin.classList.add("item");
        this.coin.src = "./assets/images/gold.png";
        this.coin.style.display = "none";
        
        this.rock = document.createElement("img");
        this.rock.id = "rock";
        this.rock.classList.add("item");
        this.rock.src = "./assets/images/rock.png";
        this.rock.style.display = "none";

        this.scoreCounter = document.createElement("div");
        this.scoreCounter.classList.add("score");
        this.scoreCounter.innerText = "SCORE: " + this.score;
        
        this.livesCounter = document.createElement("div");
        this.livesCounter.classList.add("lives");
        this.livesCounter.innerText = "LIVES: " + this.lives;

        let clouds = [];
        for(let i = 0; i < 5; i++){
            let cloud = document.createElement("img");
            cloud.src = "./assets/images/cloud.png";
            cloud.classList.add("cloud");
            cloud.style.top = Math.floor(Math.random() * 31) + "%";
            cloud.style.left = Math.floor(Math.random() * 100) + "%";
            cloud.style.height = (Math.floor(Math.random() * 5) + 8) + "%";
            clouds.push(cloud);
        }

        let buttons = document.createElement("div");
        buttons.classList.add("buttons");
        buttons.innerHTML = "<img src='./assets/images/buttons/buttonA.png'> <img src='./assets/images/buttons/buttonD.png'>";

        wrapper.appendChild(road);
        wrapper.appendChild(this.pickup);
        wrapper.appendChild(this.scoreCounter);
        wrapper.appendChild(this.livesCounter);
        wrapper.appendChild(this.coin);
        wrapper.appendChild(this.rock);
        clouds.forEach(e => {
            wrapper.appendChild(e);
        });
        wrapper.appendChild(buttons);
        this.wrapper = wrapper;
        this.element.appendChild(wrapper);

        document.querySelector("#audio-player").src = "./assets/audio/CarRide.mp3";
        document.querySelector("#audio-player").play();
    }

    animatePickup(){
        this.pickupInterval = setInterval(()=>{
            if (this.pickupFrame < 3){
                this.pickupFrame++;
            }else{
                this.pickupFrame = 0;
            }
            this.pickup.src = `./assets/images/pickup/pickup${this.pickupFrame}.png`;
        }, 100);
    }

    keyHandler(e){
        if((e.key == "a" || e.key == "A") && this.carPosition > 1){
            this.carPosition--;
            this.pickup.dataset.xpos = this.carPosition;
        }
        if((e.key == "d" || e.key == "D") && this.carPosition < 3){
            this.carPosition++;
            this.pickup.dataset.xpos = this.carPosition;
        }
    }

    spawnItem(){
        if(this.item == 0){
            this.item = 1;
            this.coin.dataset.xpos = Math.floor(Math.random() * 3) + 1;
            this.coin.dataset.ypos = 1;
            this.coin.style.display = "block";
        }else{
            this.item = 0;
            this.rock.dataset.xpos = Math.floor(Math.random() * 3) + 1;
            this.rock.dataset.ypos = 1;
            this.rock.style.display = "block";
        }
    }

    updateItem(){
        if(this.item == 1){
            if(this.coin.dataset.ypos <= 3){
                this.coin.dataset.ypos++;
            }
            if(this.coin.dataset.ypos == 4){
                if(this.carPosition == this.coin.dataset.xpos){
                    this.score++;
                    this.scoreCounter.innerText = "SCORE: " + this.score;

                    document.querySelector("#audio-effects").src = "./assets/audio/coin.wav";
                    document.querySelector("#audio-effects").play();
                }

                this.coin.style.display = "none";
                this.coin.dataset.ypos = 1;

                this.spawnItem();
            }
        }
        else{
            if(this.rock.dataset.ypos <= 3){
                this.rock.dataset.ypos++;
            }
            if(this.rock.dataset.ypos == 3){
                if(this.carPosition == this.rock.dataset.xpos){
                    this.lives--;
                    this.livesCounter.innerText = "LIVES: " + this.lives;

                    document.querySelector("#audio-effects").src = "./assets/audio/rock.wav";
                    document.querySelector("#audio-effects").play();

                    if(this.lives <= 0){
                        this.gameOver();
                    }
                }

                this.rock.style.display = "none";
                this.rock.dataset.ypos = 1;

                this.spawnItem();
            }
        }
    }

    gameOver(){
        clearInterval(this.itemInterval);
        clearInterval(this.pickupInterval);
        const text = document.createElement("div");
        text.classList.add("game-over");
        text.innerText = "GAME OVER!";
        this.wrapper.appendChild(text);
        document.querySelector("#audio-player").pause();
        this.coin.style.display = "none";
        this.rock.style.display = "none";
        this.coin.src = "";
        this.rock.src = "";
        setTimeout(()=>{
            this.endGame();
            this.carPosition = 2;
            this.pickupFrame = 0;
            this.score = 0;
            this.lives = 3;
            this.item = 0;
            this.createScene();
            
            setTimeout(()=>{
                this.spawnItem();
            }, 5000);

            this.itemInterval = setInterval(()=>{
                this.updateItem();
            }, 500);
        }, 5000);
        // setTimeout(()=>{
        //     this.endGame();
        // }, 5000);
    }

    endGame(){
        clearInterval(this.itemInterval);
        clearInterval(this.pickupInterval);
        document.querySelector("#audio-player").src = "./assets/audio/CarRide.mp3";
        document.querySelector("#audio-player").pause();
        this.element.innerHTML = "";
    }
}
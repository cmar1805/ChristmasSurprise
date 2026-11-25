const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const count = document.getElementById("count");
const messageBox = document.getElementById("messageBox");
const snowContainer = document.getElementById("snow-container");
const giftDialog = document.getElementById("giftDialog");
const continueBtn = document.getElementById("continueBtn");

let giftsCollected = 0;
let gameStarted = false;
let gameComplete = false;
let playerX = 50;
let playerY = 50;

const messages = [
    "❤️ Gracias por llegar a mi vida",
    "✨ Tu sonrisa ilumina mis días",
    "🎄 Cada momento contigo es especial",
    "🌟 Eres mi estrella favorita",
    "💖 Gracias por compartir tu tiempo conmigo",
    "🎁 Tu felicidad significa mucho para mí",
    "❄️ Mi lugar favorito es contigo",
    "🩷 Haces mi mundo más bonito",
    "🌌 Entre millones de estrellas siempre te elegiría",
    "❤️ Te amo muchísimo"
];

const gifts = [
    {x:100,y:100},
    {x:300,y:80},
    {x:600,y:120},
    {x:750,y:250},
    {x:850,y:500},
    {x:500,y:300},
    {x:150,y:450},
    {x:400,y:520},
    {x:650,y:400},
    {x:900,y:100}
];

function startGame() {
    if (gameStarted) {
        return;
    }

    gameStarted = true;
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    createGifts();
    createSnow();
}

startBtn.addEventListener("click", startGame);
continueBtn.addEventListener("click", closeGiftDialog);

function createGifts(){

    gifts.forEach(position => {

        const gift = document.createElement("div");

        gift.classList.add("gift");
        gift.setAttribute("role", "img");
        gift.setAttribute("aria-label", "Regalo navideño");

        gift.style.left = position.x + "px";
        gift.style.top = position.y + "px";

        gameArea.appendChild(gift);
    });
}

document.addEventListener("keydown", (event) => {
    if (!gameStarted) {
        startGame();
        return;
    }

    if (gameComplete) {
        return;
    }

    if (!giftDialog.classList.contains("hidden")) {
        if (event.key === "Escape") {
            closeGiftDialog();
        }
        return;
    }

    const directions = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        w: [0, -1],
        a: [-1, 0],
        s: [0, 1],
        d: [1, 0]
    };
    const direction = directions[event.key] || directions[event.key.toLowerCase()];

    if (!direction) {
        return;
    }

    event.preventDefault();
    const speed = 15;
    playerX = Math.max(0, Math.min(950, playerX + direction[0] * speed));
    playerY = Math.max(0, Math.min(550, playerY + direction[1] * speed));

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    checkCollisions();
});

function checkCollisions(){

    const allGifts = document.querySelectorAll(".gift");

    allGifts.forEach(gift => {

        const giftRect = gift.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if(
            playerRect.left < giftRect.right &&
            playerRect.right > giftRect.left &&
            playerRect.top < giftRect.bottom &&
            playerRect.bottom > giftRect.top
        ){

            gift.remove();

            createHeart(gift.offsetLeft, gift.offsetTop);

            giftsCollected++;
            count.textContent = giftsCollected;

            if(giftsCollected === 10){
                gameComplete = true;
                setTimeout(() => {
                    showFinalScreen();
                }, 700);
            } else {
                openGiftDialog(messages[giftsCollected - 1]);
            }
        }
    });
}

function openGiftDialog(message) {
    messageBox.textContent = message;
    giftDialog.classList.remove("hidden");
    continueBtn.focus();
}

function closeGiftDialog() {
    giftDialog.classList.add("hidden");
    gameArea.focus();
}

function showFinalScreen() {
    document.body.classList.add("ending-body");
    document.body.innerHTML = `
        <main class="ending-screen">
            <img class="scene-art ending-art" src="village-scene.svg" alt="" aria-hidden="true">
            <svg class="ending-couple" viewBox="0 0 96 84" shape-rendering="crispEdges" aria-hidden="true">
                <path d="M7 84v-19h7V51h8V36h7V24h7V17h20v7h5v17h-5v13h7v14h8v13h-7v10H17v-6z" fill="#422b4b"/>
                <path d="M11 61h26v17H11z" fill="#8f3f62"/>
                <path d="M19 30h19v20H19z" fill="#d99b82"/>
                <path d="M16 27h7V17h24v7h6v9h-7v-5H22v8h-6z" fill="#bd435e"/>
                <path d="M19 19h27v4H19z" fill="#f4d5dc"/>
                <path d="M26 39h3v3h-3zm9 0h3v3h-3z" fill="#3a2b47"/>
                <path d="M48 84v-16h7V53h7V37h7V26h7V19h20v7h5v17h-5v14h6v15h-7v12H56v-6z" fill="#302d4d"/>
                <path d="M57 62h29v17H57z" fill="#3d547b"/>
                <path d="M67 30h19v20H67z" fill="#c98f7d"/>
                <path d="M63 27h7V17h25v7h5v10h-8v-5H70v8h-7z" fill="#45436f"/>
                <path d="M70 19h25v4H70z" fill="#d4d7f5"/>
                <path d="M73 39h3v3h-3zm9 0h3v3h-3z" fill="#302840"/>
                <path d="M39 52h18v5H39z" fill="#ff91ad"/>
            </svg>
            <section class="ending-card">
                <p class="ending-kicker">La magia de la Navidad</p>
                <h1>¡Feliz Navidad<br>mi amor!</h1>
                <p>Has encontrado todos los regalos,<br>pero el mejor regalo de todos...<br>eres tú.</p>
                <div class="ending-divider" aria-hidden="true">✧</div>
                <p>Gracias por cada momento,<br>cada sonrisa y por hacer mi vida<br>más especial.</p>
                <p class="ending-love">Te amo muchísimo <span aria-hidden="true">♥</span></p>
                <p class="ending-signoff">Con amor,<br><strong>Carlos</strong></p>
                <p class="ending-promise">Entre millones de estrellas,<br>siempre te elegiría a ti.</p>
            </section>
        </main>
    `;
}

function createSnow(){

    setInterval(()=>{

        const snowflake =
        document.createElement("div");

        snowflake.classList.add("snowflake");

        snowflake.textContent = "❄";

        snowflake.style.left =
        Math.random() * 1000 + "px";

        snowflake.style.animationDuration =
        (Math.random() * 4 + 3) + "s";

        snowContainer.appendChild(snowflake);

        setTimeout(()=>{
            snowflake.remove();
        },7000);

    },150);

}

function createHeart(x,y){

    const heart =
    document.createElement("div");

    heart.classList.add("heart");

    heart.textContent = "❤️";

    heart.style.left = x + "px";
    heart.style.top = y + "px";

    gameArea.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },1500);
}
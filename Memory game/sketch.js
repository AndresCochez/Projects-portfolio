let img1;
let img2;
let img3;
let img4;
let img5;
let mode;
let players = [];
let timer;
let gameover = false;
let points = 0;
let button = null;

// Hier worden de afbeeldingen mee geladen
function preload(){
    img1 = loadImage("Images/startscherm.png");
    img2 = loadImage("Images/gamescherm.png");
    img3 = loadImage("Images/gameoverscherm.png");
    img4 = loadImage("Images/vangnet.png");
    img5 = loadImage("Images/memory.png");
}

function setup() {
    createCanvas(400, 600); // Canvas wordt aangemaakt

    timer = new Timer(); 
    players.push(new Player());

    mode = 0; 
}

function draw() {
    clear();
    // Dit is de modus als er nog niet op het toetsenbord of muis is geklikt 
    if (mode == 0) {
        image(img1, 0, 0, img1.width * 2/3, img1.height * 2/3);
    }

    // Als er één keer op de muis geklikt wordt, dan komen de memory cards op het scherm
    if (mode == 1) {
        image(img5, 0, 0, img5.width * 2/3, img5.height * 2/3);
    }
    
    // Als er twee keer op de muis geklikt wordt, dan start het spel
    if (mode >= 2) {
        image(img2, 0, 0, img2.width * 2/3, img2.height * 2/3);

        if(!gameover) {
            // Timer wordt weergegeven
            timer.display();
            timer.update();

            // Zolang er naar de juiste kant geklikt wordt, blijven er nieuwe elementen komen
            for (let i = 0; i < players.length; i++) {
                if(players[i]) {
                    players[i].display();
                    if(!players[i].activePlayer) {
                        players[i].spawn();
                    }

                    else if(players[i].chosenDirection){
                        players[i].transform(players[i].direction);
                    }
                } 
            }

            // Hiermee worden de punten op het scherm weergegeven en enkele getekende elementen
            textSize(50);
            fill(30);
            text(points, 185, 200);
            image(img4, 0, 0, img4.width * 2/3, img4.height * 2/3);
        }

        else {
            noLoop();
            // Button wordt aangemaakt en getekend
            button = createButton('Restart');
            button.mousePressed(restart);
            // Gameoverscherm komt tevoorschijn en het aantal behaalde punten 
            image(img3, 0, 0, img3.width * 2/3, img3.height * 2/3);
            fill(0);
            textSize(25);
            text(points, 250, 340);
        }
    }
}

// Hierdoor kunnen we met de pijltjes op ons toetsenbord kiezen of de elementen naar links of rechts moeten gaan
function keyPressed() {
    if(players.length < 3) {
        if(keyCode === LEFT_ARROW) {
            players[0].move("left");  
        }
        else if(keyCode === RIGHT_ARROW) {
            players[0].move("right");
        }
    }
}

// Functie die ervoor zorgt dat de mode telkens met 1 verhoogt als er op de muis geklikt wordt
function mousePressed(){
    mode++;
}

// Hierbij wordt er gezegd wat er moet gebeuren als we opnieuw willen spelen en op de button klikken
let restart = () => {
    points = 0;
    players = [];
    players.push(new Player());
    timer.speed = 0;
    gameover = false;
    button.remove();
    loop();
}

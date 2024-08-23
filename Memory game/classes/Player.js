// klasse voor de bewegende elementen (vlieg, kakje)
class Player {
    constructor() {
        this.lengthPlayer = 50;
        this.x = width / 2;
        this.y = this.lengthPlayer;
        this.velocity = 20;
        this.activePlayer = false;
        this.chosenDirection = false;

        // dit zorgt ervoor dat we niet steeds hetzelfde bewegend element krijgen
        this.direction = random(this.lengthPlayer) > 20 ? "left" : "right"; 

        // hier worden de bewegende elementen getekend en weten we naar welke kant het element moet
        this.display = () => {
            rectMode(CENTER);
            noStroke();

            if (this.direction == "left") {
                fill(41, 19, 14);
                ellipse(this.x, this.y, 50, 25);
                ellipse(this.x, this.y - 12, 35, 20);
                ellipse(this.x, this.y - 22, 20, 15);
            }
            else {
                fill(255);
                ellipse(this.x - 25, this.y, 40, 20);
                ellipse(this.x + 25, this.y, 40, 20);
                fill(0);
                ellipse(this.x, this.y, 20, 25);
            }
        }

        // hierdoor kunnen/gaan de bewegende elementen naar beneden
        this.spawn = () => {
            if (this.y < height / 2) {
                this.y += this.velocity;
            }
            else {
                this.activePlayer = true;
            }
        }

        // hierdoor kunnen/gaan de bewegende naar een bepaalde richting (links of rechts)
        this.transform = (x) => {
            if (x == "left") {
                if (this.x < height - 75) {
                    this.x += this.velocity / 2;
                }
            }

            else {
                if (this.x > 75) {
                    this.x -= this.velocity / 2;
                }
            }
        }

        // hierdoor weten we wat er gebeurt als de bewegende elementen naar de juiste en foute kant worden geplaatst
        this.move = (direction) => {
            if (direction != this.direction) {
                gameover = true;
            }

            else {
                timer.speed = 0;
                this.chosenDirection = true;
                players.unshift(new Player());
                players.splice(2, 1);
                points++;
            }
        }
    }
}
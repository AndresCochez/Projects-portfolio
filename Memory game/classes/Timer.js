// klasse voor de timer 
class Timer {
    constructor() {
        this.x = width / 2;
        this.y = 25;
        this.lengthTimer = 200;
        this.speed = 0;

        // hier wordt de timer getekend
        this.display = () => {
            strokeWeight(4);
            stroke(0);
            fill(255);
            rectMode(CENTER);
            rect(this.x, this.y, this.lengthTimer, this.lengthTimer / 20);
            noStroke();
            fill(0);
            rectMode(CORNER);
            rect(this.x - this.lengthTimer / 2, this.y - this.lengthTimer / 20 / 2, this.speed, this.lengthTimer / 20);
        }

        // hier wort de snelheid bepaalt van de timer
        this.update = () => {
            if (this.speed < 200) {
                if (frameCount % 10 == 0) {
                    this.speed += 10;
                }
            }

            else {
                gameover = true;
            }
        }
    }
}
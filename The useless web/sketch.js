document.addEventListener('DOMContentLoaded', () => {
    const numberOfFlies = 5; // Aantal vliegen
    const safeDistance = 100; // Afstand die vliegen proberen te behouden van de muis
    const minDistanceBetweenFlies = 80; // Minimale afstand tussen vliegen
    const flySize = 40; // Grootte van elke vlieg
    const margin = flySize; // Randmarge om vliegen weg te houden van de randen
    const cornerRemovalThreshold = 50; // Afstand vanaf de linkerbovenhoek om vliegen te verwijderen
    const gameArea = document.getElementById('game-area');

    // SVG code for the fly
    const flySVG = `
        <svg id="Laag_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.08 39.87">
            <defs>
                <style>
                    .cls-1 {
                        fill: #a4d8dd;
                    }
                    .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9, .cls-10, .cls-11, .cls-12 {
                        stroke: #000;
                        stroke-miterlimit: 10;
                    }
                    .cls-1, .cls-3, .cls-7, .cls-8 {
                        stroke-width: 1.1px;
                    }
                    .cls-2 {
                        stroke-width: .16px;
                    }
                    .cls-2, .cls-4, .cls-5, .cls-6, .cls-13, .cls-8, .cls-9, .cls-10, .cls-11, .cls-12 {
                        fill: #1a1a1a;
                    }
                    .cls-3 {
                        fill: none;
                    }
                    .cls-4 {
                        stroke-width: .16px;
                    }
                    .cls-5 {
                        stroke-width: .22px;
                    }
                    .cls-6 {
                        stroke-width: .19px;
                    }
                    .cls-7 {
                        fill: #d4df7e;
                    }
                    .cls-9 {
                        stroke-width: .21px;
                    }
                    .cls-10 {
                        stroke-width: .21px;
                    }
                    .cls-11 {
                        stroke-width: .2px;
                    }
                    .cls-12 {
                        stroke-width: .22px;
                    }
                </style>
            </defs>
            <path class="cls-8" d="M21.64,4.93l-1.75-2.23c-.36-.46-1.06-.47-1.44-.02l-1.84,2.23-.17,5.35h5.83l-.64-5.33Z"/>
            <path class="cls-7" d="M21.09,9.69s-1.17-5.37,1.15-4.74c5.67,1.55.93,6.49.93,6.49"/>
            <path class="cls-7" d="M17.32,9.69s1.17-5.37-1.15-4.74c-5.67,1.55-.93,6.49-.93,6.49"/>
            <path class="cls-13" d="M25.02,30.17c-6.82,20.15-11.78,0-11.78,0l4.08-4.96,3.65.02,4.05,4.93Z"/>
            <path class="cls-13" d="M24.34,14.52s-4.98-11.02-10.45,0h10.45Z"/>
            <path class="cls-8" d="M13.32,14.52l3.3,10.7s2.54,1.72,5.02,0l3.3-10.7"/>
            <path class="cls-1" d="M13.32,14.52S-2.11,31.14,3.08,35.14s13.05-8.7,13.05-8.7c0,0,4.07-8.07-2.81-11.92Z"/>
            <path class="cls-1" d="M24.94,14.52s15.43,16.62,10.24,20.62-13.05-8.7-13.05-8.7c0,0-4.07-8.07,2.81-11.92Z"/>
            <path class="cls-3" d="M.2,21.39l4-1.61,1.96-4.71,7.15-.56s.32-.74.9-1.66c.06-.1.13-.2.19-.3,1.85-2.78,5.84-6.63,10.53,1.96l7.18.7,1.89,4.57,3.86,1.61"/>
            <polyline class="cls-3" points="14.31 12.71 8.34 9.35 9.67 2.92 6.28 .46"/>
            <polyline class="cls-3" points="23.85 12.71 29.78 9.25 28.31 2.78 31.95 .46"/>
            <path class="cls-3" d="M13.24,30.4s4.98,20.09,11.78,0"/>
            <line class="cls-5" x1="13.39" y1="15.04" x2="13.57" y2="29.99"/>
            <line class="cls-12" x1="24.93" y1="15.32" x2="25.12" y2="29.99"/>
            <line class="cls-12" x1="27.13" y1="17.75" x2="27.31" y2="32.42"/>
            <line class="cls-12" x1="22.64" y1="16.62" x2="22.82" y2="27.47"/>
            <line class="cls-12" x1="29.32" y1="19.74" x2="29.51" y2="34.42"/>
            <line class="cls-12" x1="31.52" y1="22.42" x2="31.71" y2="35.9"/>
            <line class="cls-12" x1="33.72" y1="25.82" x2="33.91" y2="35.91"/>
            <line class="cls-12" x1="11.19" y1="17.12" x2="11.38" y2="32.59"/>
            <line class="cls-12" x1="8.99" y1="20.12" x2="9.18" y2="34.79"/>
            <line class="cls-12" x1="6.79" y1="22.42" x2="6.98" y2="35.43"/>
            <line class="cls-12" x1="4.6" y1="25.58" x2="4.78" y2="35.9"/>
            <line class="cls-12" x1="15.59" y1="16.35" x2="15.77" y2="26.91"/>
            <line class="cls-12" x1="13.24" y1="30.65" x2="1.94" y2="30.84"/>
            <line class="cls-12" x1="36.14" y1="30.56" x2="24.84" y2="30.74"/>
            <line class="cls-12" x1="36.14" y1="32.85" x2="27.89" y2="33.03"/>
            <line class="cls-12" x1="11.19" y1="32.85" x2="2.35" y2="33.03"/>
            <line class="cls-12" x1="34.57" y1="28.45" x2="23.26" y2="28.64"/>
            <line class="cls-12" x1="33.7" y1="26.25" x2="22.4" y2="26.44"/>
            <line class="cls-12" x1="32.25" y1="24.06" x2="20.95" y2="24.24"/>
            <line class="cls-10" x1="31.15" y1="21.86" x2="20.54" y2="22.05"/>
            <line class="cls-11" x1="29.67" y1="19.66" x2="20.77" y2="19.85"/>
            <line class="cls-2" x1="28.02" y1="17.46" x2="21.78" y2="17.65"/>
            <line class="cls-12" x1="14.34" y1="28.36" x2="3.04" y2="28.55"/>
            <line class="cls-12" x1="15.84" y1="26.16" x2="4.53" y2="26.35"/>
            <line class="cls-12" x1="17.52" y1="23.87" x2="6.21" y2="24.06"/>
            <line class="cls-9" x1="17.52" y1="21.58" x2="7.21" y2="21.77"/>
            <line class="cls-6" x1="17.32" y1="19.34" x2="8.99" y2="19.52"/>
            <line class="cls-4" x1="16.58" y1="17.65" x2="10.79" y2="17.84"/>
        </svg>
    `;

    // Vliegen genereren
    for (let i = 0; i < numberOfFlies; i++) {
        const fly = document.createElement('div');
        fly.classList.add('fly');
        fly.innerHTML = flySVG; // Add the SVG code to the fly element
        gameArea.appendChild(fly);
        positionFlyRandomly(fly);
    }

    const flies = document.querySelectorAll('.fly');

    // Verwijder vliegen in de linkerbovenhoek
    function removeFliesInCorner() {
        flies.forEach(fly => {
            const flyRect = fly.getBoundingClientRect();
            const flyCenterX = flyRect.left + flyRect.width / 2;
            const flyCenterY = flyRect.top + flyRect.height / 2;

            if (flyCenterX < cornerRemovalThreshold && flyCenterY < cornerRemovalThreshold) {
                fly.remove();
            }
        });
    }

    document.addEventListener('mousemove', (e) => {
        flies.forEach(fly => {
            const flyRect = fly.getBoundingClientRect();
            const flyCenterX = flyRect.left + flyRect.width / 2;
            const flyCenterY = flyRect.top + flyRect.height / 2;

            const dx = flyCenterX - e.clientX;
            const dy = flyCenterY - e.clientY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < safeDistance) {
                // Verplaats de vlieg zodat deze op veilige afstand blijft
                const angle = Math.atan2(dy, dx);
                const moveX = Math.cos(angle) * safeDistance;
                const moveY = Math.sin(angle) * safeDistance;

                // Nieuwe positie berekenen, rekening houdend met de randen van het scherm
                let newX = Math.max(margin, Math.min(window.innerWidth - flyRect.width - margin, e.clientX + moveX - flyRect.width / 2));
                let newY = Math.max(margin, Math.min(window.innerHeight - flyRect.height - margin, e.clientY + moveY - flyRect.height / 2));

                // Controleer op overlap met andere vliegen
                flies.forEach(otherFly => {
                    if (otherFly !== fly) {
                        const otherRect = otherFly.getBoundingClientRect();
                        const otherCenterX = otherRect.left + otherRect.width / 2;
                        const otherCenterY = otherRect.top + otherRect.height / 2;

                        const otherDx = newX + flyRect.width / 2 - otherCenterX;
                        const otherDy = newY + flyRect.height / 2 - otherCenterY;
                        const otherDistance = Math.sqrt(otherDx * otherDx + otherDy * otherDy);

                        if (otherDistance < minDistanceBetweenFlies) {
                            // Beweeg de vlieg verder weg om overlap te vermijden
                            const avoidanceAngle = Math.atan2(otherDy, otherDx);
                            newX += Math.cos(avoidanceAngle) * (minDistanceBetweenFlies - otherDistance);
                            newY += Math.sin(avoidanceAngle) * (minDistanceBetweenFlies - otherDistance);
                        }
                    }
                });

                fly.style.left = `${newX}px`;
                fly.style.top = `${newY}px`;
            }
        });
    });

    // Regelmatige controle op vliegen in de hoek
    setInterval(removeFliesInCorner, 100);

    // Optioneel, start een initieel controle om de hoek te controleren bij het laden
    removeFliesInCorner();
});

function positionFlyRandomly(fly) {
    const flySize = 40; // Assumed size of the fly (should match the actual size used)
    const margin = flySize; // Margin around the screen to prevent flies from spawning at the edge

    const maxWidth = window.innerWidth - flySize - margin;
    const maxHeight = window.innerHeight - flySize - margin;

    let randomX, randomY;
    let overlapping;

    do {
        overlapping = false;
        // Ensure the flies do not start too close to the edges
        randomX = Math.random() * maxWidth + margin;
        randomY = Math.random() * maxHeight + margin;

        // Check for overlap with existing flies
        document.querySelectorAll('.fly').forEach(otherFly => {
            if (otherFly !== fly) {
                const otherRect = otherFly.getBoundingClientRect();
                const otherCenterX = otherRect.left + otherRect.width / 2;
                const otherCenterY = otherRect.top + otherRect.height / 2;

                const dx = randomX + flySize / 2 - otherCenterX;
                const dy = randomY + flySize / 2 - otherCenterY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) { // Use the same min distance as defined earlier
                    overlapping = true;
                }
            }
        });
    } while (overlapping);

    fly.style.left = `${randomX}px`;
    fly.style.top = `${randomY}px`;
}

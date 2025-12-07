const slots = document.querySelectorAll('.slot');
const button = document.querySelector('.button');
const scoreDisplay = document.getElementById('score');

let score = 100; // starting score

const shapes = ['square', 'circle', 'triangle', 'star'];

button.addEventListener('click', () => {

    if (score <= 0) {
        button.style.opacity = "0.4";
        button.style.pointerEvents = "none";
        return;
    }

    score -= 1;

    let generatedShapes = [];

    slots.forEach(slot => {
        slot.innerHTML = '';

        const shapeDiv = document.createElement('div');
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        shapeDiv.classList.add(randomShape);

        generatedShapes.push(randomShape);
        slot.appendChild(shapeDiv);
    });

    const allMatch = generatedShapes.every(shape => shape === generatedShapes[0]);

    if (allMatch) {
        score += 30;   // reward for win
        winAnimation(); 
    }

    scoreDisplay.textContent = score;

    if (score <= 0) {
        button.style.opacity = "0.4";
        button.style.pointerEvents = "none";
    }

function winAnimation() { 
    scoreDisplay.classList.add('win');
    const container = document.querySelector('.container');
    container.classList.add('container-win');

    setTimeout(() => {
        scoreDisplay.classList.remove('win');
        container.classList.remove('container-win');
    }, 1500);
}

});



const slots = document.querySelectorAll('.slot');
const button = document.querySelector('.button');
const scoreDisplay = document.getElementById('score');

let score = 50;
const shapes = ['square', 'circle', 'triangle', 'star'];

button.addEventListener('click', () => {
    if (score <= 0) return;

    // Disable button while shapes appear
    button.style.pointerEvents = "none";
    button.style.opacity = "0.4";

    score -= 1; // subtract 1 immediately
    scoreDisplay.textContent = score;

    let generatedShapes = [];
    const delay = 700; // 0.7 seconds per slot
    const clearDelay = 500; // 0.3 seconds slot stays empty

    slots.forEach((slot, index) => {
        setTimeout(() => {
            // Clear the slot first
            slot.innerHTML = '';

            // Wait a short delay before showing the new shape
            setTimeout(() => {
                const shapeDiv = document.createElement('div');
                const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
                shapeDiv.classList.add(randomShape);
                slot.appendChild(shapeDiv);

                generatedShapes.push(randomShape);

                // After last slot is updated, check for win
                if (index === slots.length - 1) {
                    const allMatch = generatedShapes.every(shape => shape === generatedShapes[0]);
                    if (allMatch) {
                        score += 20;
                        scoreDisplay.textContent = score;
                        winAnimation();
                    }

                    // Re-enable button after all shapes appear
                    button.style.pointerEvents = "auto";
                    button.style.opacity = "1";

                    if (score <= 0) {
                        button.style.pointerEvents = "none";
                        button.style.opacity = "0.4";
                    }
                }
            }, clearDelay); // delay before adding new shape

        }, delay * index);
    });

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

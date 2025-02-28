const car = document.getElementById("car");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
let score = 0;
let isGameOver = false;

// Move the car left and right
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveCar(-15);
    } else if (event.key === "ArrowRight") {
        moveCar(15);
    }
});

// Move the car function
function moveCar(direction) {
    const carPosition = car.getBoundingClientRect();
    const newPosition = carPosition.left + direction;

    if (newPosition >= 0 && newPosition <= 250) { // 250 = 300 (largura do container) - 50 (largura do carro)
        car.style.left = newPosition + "px";
    }
}

// Generate obstacle
function generateObstacle() {
    let obstaclePosition = Math.random() * 250; // 250 = 300 (largura do container) - 50 (largura do obstáculo)
    obstacle.style.left = obstaclePosition + "px";
    obstacle.style.top = "-100px"; // Começa fora da tela

    let obstacleInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(obstacleInterval);
            return;
        }

        let obstacleRect = obstacle.getBoundingClientRect();
        let carRect = car.getBoundingClientRect();

        // Move the obstacle down
        obstacle.style.top = obstacleRect.top + 5 + "px";

        // Check for collision
        if (
            obstacleRect.bottom >= carRect.top &&
            obstacleRect.top <= carRect.bottom &&
            obstacleRect.right >= carRect.left &&
            obstacleRect.left <= carRect.right
        ) {
            clearInterval(obstacleInterval);
            alert("Game Over! Sua pontuação: " + score);
            isGameOver = true;
        }

        // Reset obstacle and increase score
        if (obstacleRect.top > 500) {
            obstacle.style.top = "-100px";
            score++;
            scoreDisplay.innerText = score;
        }
    }, 100);
}

// Start the game
generateObstacle();
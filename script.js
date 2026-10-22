document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("gameContainer");
    const pointsEarnedSpan = document.getElementById("pointsEarned");

    const GRID_SIZE = 20;
    const TOTAL_PIXELS = GRID_SIZE * GRID_SIZE;

    for (let i = 1; i <= TOTAL_PIXELS; i++) {
        const pixel = document.createElement("div");
        pixel.id = `pixel${i}`;
        pixel.className = "pixel";
        gameContainer.appendChild(pixel);
    }

    let score = 0;
    let direction = "RIGHT";
    let snake = [1];
    let foodIndex = null;
    let gameInterval = null;

    function renderSnake() {
        snake.forEach((index) => {
            const pixel = document.getElementById(`pixel${index}`);
            if (pixel) {
                pixel.classList.add("snakeBodyPixel");
            }
        });
    }

    function generateFood() {
        if (foodIndex) {
            const oldFood = document.getElementById(`pixel${foodIndex}`);
            if (oldFood) oldFood.classList.remove("food");
        }

        let newFoodIndex;
        do {
            newFoodIndex = Math.floor(Math.random() * TOTAL_PIXELS) + 1;
        } while (snake.includes(newFoodIndex));

        foodIndex = newFoodIndex;
        const foodPixel = document.getElementById(`pixel${foodIndex}`);
        if (foodPixel) {
            foodPixel.classList.add("food");
        }
    }

    function initGame() {
        score = 0;
        pointsEarnedSpan.textContent = score;
        direction = "RIGHT";
        snake = [1];

        for (let i = 1; i <= TOTAL_PIXELS; i++) {
            const px = document.getElementById(`pixel${i}`);
            px.className = "pixel";
        }

        renderSnake();
        generateFood();

        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(moveSnake, 100);
    }

    function moveSnake() {
        const head = snake[0];
        let newHead;

        const row = Math.ceil(head / GRID_SIZE);
        const col = ((head - 1) % GRID_SIZE) + 1;

        if (direction === "RIGHT") {
            newHead = col === GRID_SIZE ? (row - 1) * GRID_SIZE + 1 : head + 1;
        } else if (direction === "LEFT") {
            newHead = col === 1 ? row * GRID_SIZE : head - 1;
        } else if (direction === "UP") {
            newHead = row === 1 ? (GRID_SIZE - 1) * GRID_SIZE + col : head - GRID_SIZE;
        } else if (direction === "DOWN") {
            newHead = row === GRID_SIZE ? col : head + GRID_SIZE;
        }

        if (snake.includes(newHead)) {
            alert("Game Over! Restarting...");
            initGame();
            return;
        }

        snake.unshift(newHead);
        const newHeadPixel = document.getElementById(`pixel${newHead}`);
        if (newHeadPixel) {
            newHeadPixel.classList.add("snakeBodyPixel");
        }

        if (newHead === foodIndex) {
            score++;
            pointsEarnedSpan.textContent = score;
            generateFood();
        } else {
            const tail = snake.pop();
            const tailPixel = document.getElementById(`pixel${tail}`);
            if (tailPixel) {
                tailPixel.classList.remove("snakeBodyPixel");
            }
        }
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && direction !== "DOWN") {
            direction = "UP";
        } else if (e.key === "ArrowDown" && direction !== "UP") {
            direction = "DOWN";
        } else if (e.key === "ArrowLeft" && direction !== "RIGHT") {
            direction = "LEFT";
        } else if (e.key === "ArrowRight" && direction !== "LEFT") {
            direction = "RIGHT";
        }
    });

    initGame();
});
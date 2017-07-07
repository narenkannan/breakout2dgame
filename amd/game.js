define('game', ['canvas','ball'], function (area,ball) {

    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (area.canvas.width - paddleWidth) / 2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 5;
    var brickColumnCount = 3;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var score = 0;
    var lives = 3;

    var bricks = [];
    for (c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = true;
        }
        else if (e.keyCode == 37) {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - area.canvas.offsetLeft;
        if (relativeX > 0 && relativeX < area.canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }
    function collisionDetection() {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status == 1) {
                    if (area.x > b.x && area.x < b.x + brickWidth && area.y > b.y && area.y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if (score == brickRowCount * brickColumnCount) {
                            alert("YOU WIN, CONGRATS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }


    function drawPaddle() {
        area.ctx.beginPath();
        area.ctx.rect(paddleX, area.canvas.height - paddleHeight, paddleWidth, paddleHeight);
        area.ctx.fillStyle = "#0095DD";
        area.ctx.fill();
        area.ctx.closePath();
    }
    function drawBricks() {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    area.ctx.beginPath();
                    area.ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    area.ctx.fillStyle = "#0095DD";
                    area.ctx.fill();
                    area.ctx.closePath();
                }
            }
        }
    }
    function drawScore() {
        area.ctx.font = "16px Arial";
        area.ctx.fillStyle = "#0095DD";
        area.ctx.fillText("Score: " + score, 8, 20);
    }
    function drawLives() {
        area.ctx.font = "16px Arial";
        area.ctx.fillStyle = "#0095DD";
        area.ctx.fillText("Lives: " + lives, area.canvas.width - 65, 20);
    }

    function draw() {
        area.ctx.clearRect(0, 0, area.canvas.width, area.canvas.height);
        drawBricks();
        ball.drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();

        if (area.x + dx > area.canvas.width - ball.ballRadius || area.x + dx < ball.ballRadius) {
            dx = -dx;
        }
        if (area.y + dy < ball.ballRadius) {
            dy = -dy;
        }
        else if (area.y + dy > area.canvas.height - ball.ballRadius) {
            if (area.x > paddleX && area.x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if (!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    area.x = area.canvas.width / 2;
                    area.y = area.canvas.height - 30;
                    dx = 3;
                    dy = -3;
                    paddleX = (area.canvas.width - paddleWidth) / 2;
                }
            }
        }

        if (rightPressed && paddleX < area.canvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        area.x += dx;
        area.y += dy;
        requestAnimationFrame(draw);
    }

    return {draw};
});
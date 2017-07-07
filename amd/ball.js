define('ball', ['canvas'], function (area) {

    var ballRadius = 10;

    function drawBall() {
        area.ctx.beginPath();
        area.ctx.arc(area.x, area.y, ballRadius, 0, Math.PI * 2);
        area.ctx.fillStyle = "#0095DD";
        area.ctx.fill();
        area.ctx.closePath();
    }

    return { ballRadius, drawBall };
})
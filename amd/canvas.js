
define('canvas', [], function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width / 2;
    var y = canvas.height - 30;

    return {
        canvas, ctx, x, y
    }
});
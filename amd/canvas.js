
define('canvas', [], function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    return {
        canvas, ctx
    }
});
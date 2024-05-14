var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth - 25;
canvas.height = window.innerHeight - 100;

var ctx = canvas.getContext("2d");

var text_color = "#ededee";
var primary_color = "#5c57b2";
var secondary_color = "#423e70";

let selectedPoint = null;

function main() {
    A = {
        x: window.innerWidth / 4,
        y: window.innerHeight / 4,
    };

    B = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    };

    initialDraw();

    canvas.addEventListener("mousedown", doMouseDown);
    canvas.addEventListener("mousemove", doMouseMove);
    canvas.addEventListener("mouseup", doMouseUp);
}

function doMouseDown(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    if (distance(mouseX, mouseY, A.x, A.y) < 25) {
        selectedPoint = A;
    } else if (distance(mouseX, mouseY, B.x, B.y) < 25) {
        selectedPoint = B;
    }
}

function doMouseMove(event) {
    if (selectedPoint) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        selectedPoint.x = mouseX;
        selectedPoint.y = mouseY;
        initialDraw(true);
    }
}

function doMouseUp() {
    selectedPoint = null;
}

function initialDraw(selected) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_line(A.x, A.y, B.x, B.y);
    draw_point(A.x, A.y, 25, "A");
    draw_point(B.x, B.y, 25, "B");
    display_distance(A.x, A.y, B.x, B.y);
}

function distance(x1, y1, x2, y2) {
    x = x2 - x1;
    y = y2 - y1;
    return Math.sqrt(x * x + y * y);
}

function display_distance(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.fillStyle = text_color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "30px Arial";
    ctx.fillText("Distance", canvas.width / 2, canvas.height / 1.25);
    ctx.fillStyle = primary_color;
    ctx.fillText(
        Math.round(distance(x1, y1, x2, y2)),
        canvas.width / 2,
        canvas.height / 1.18
    );
}

function draw_point(x, y, r, letter, color = primary_color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = text_color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 1;
    ctx.font = "20px Arial";
    ctx.fillText(letter, x, y);
}

function draw_line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = secondary_color;
    ctx.lineWidth = 1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

main();
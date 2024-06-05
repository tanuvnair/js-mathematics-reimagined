const ctx = myCanvas.getContext("2d");

const offset = {
    x: myCanvas.width / 2,
    y: myCanvas.height / 2,
};

const point = {
    x: 90,
    y: 120,
};

ctx.translate(offset.x, offset.y);

update();
document.onmousemove = (event) => {
    point.x = event.x - offset.x;
    point.y = event.y - offset.y;

    update();
};

function update() {
    ctx.clearRect(-offset.x, -offset.y, myCanvas.width, myCanvas.height);

    drawCoordinateSystem();

    const { mag, dir } = toPolar(point);
    const same = toCartesian({mag, dir});

    drawArrow(point);
}

function drawArrow(tip, color = "white", size = 50) {
    const {dir, mag} = toPolar(tip);

    const v1 = {dir: dir + Math.PI*0.8, mag: size / 2};
    const p1 = toCartesian(v1);
    const t1 = add(p1, tip);

    const v2 = {dir: dir - Math.PI*0.8, mag: size / 2};
    const p2= toCartesian(v2);
    const t2 = add(p2, tip);

    // Draws arrow line
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(tip.x, tip.y);
    ctx.strokeStyle = color;
    ctx.stroke();

    // Draws arrow head
    ctx.beginPath();
    ctx.moveTo(tip.x, tip.y);
    ctx.lineTo(t1.x, t1.y);
    ctx.lineTo(t2.x, t2.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}

function add(p1, p2) {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y,
    }
}

function toCartesian({mag, dir}) {
    return {
        x: Math.cos(dir) * mag,
        y: Math.sin(dir) * mag,
    };
}

function toPolar({ x, y }) {
    return {
        mag: magnitude({ x, y }),
        dir: direction({ x, y }),
    };
}

function direction({ x, y }) {
    // Returns the angle of the right triangle.
    // Math.atan gives us an angle between (-90 degrees, 90 degrees).
    // Math.atan2 gives us an angle between (-180 degrees, 180 degrees).
    // In Math.atan2 we don't use a ratio, we specify each value seperately.
    return Math.atan2(y, x);
}

function distance(x1, y1, x2, y2) {
    x = x2 - x1;
    y = y2 - y1;

    return Math.sqrt(x * x + y * y);
}

function magnitude({ x, y }) {
    return distance(0, 0, x, y);
}

function drawCoordinateSystem() {
    ctx.beginPath();
    ctx.moveTo(-offset.x, 0);
    ctx.lineTo(myCanvas.width - offset.x, 0);
    ctx.moveTo(0, -offset.y);
    ctx.lineTo(0, myCanvas.height - offset.y);
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function drawPoint(loc, size = 10, color = "white") {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(loc.x, loc.y, size / 2, 0, Math.PI * 2);
    ctx.fill();
}

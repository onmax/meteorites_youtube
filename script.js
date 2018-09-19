const canvas = document.querySelector('.container canvas');

const ctx = canvas.getContext('2d');
ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--primary');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;


// ctx.globalCompositeOperation = 'multiply';
let isDrawing = false;
let firstX, lastX = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return; // stop the fn from running when they are not moused down
    ctx.beginPath();
    // start from

    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    [firstX, firstY] = [e.offsetX, e.offsetY];
});

function endDraw() {
    if (!isDrawing) {
        return;
    }
    isDrawing = false;

    // In the y axis, we substract 540 minus Y, because Y is in top. 
    // See: https://www.w3schools.com/graphics/canvas_coordinates.asp
    let line = {
        pointA: {
            x: firstX,
            y: 540 - firstY
        },
        pointB: {
            x: lastX,
            y: 540 - lastY
        }
    }
    var degrees = Math.atan2(line.pointA.y - line.pointB.y, line.pointA.x - line.pointB.x) * 180 * -1 / Math.PI;
    // d(line)
    const a = Math.abs(line.pointA.y -  line.pointB.y);
    const b = Math.abs(line.pointB.x -  line.pointA.x);
    const hypotenuse =  Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
    if(hypotenuse < 20){
        console.log('Linea muy corta');
    }
    console.log(degrees);
    if(Math.abs(degrees) <= 22.5){
        console.log('Horizontal hacia la izquierda')
    }else if(degrees > 0 && degrees <= 67.5){
        console.log('Arriba hacia izquierda')
    } else if(degrees < 0 && degrees >= -67.5){
        console.log('Abajo hacia la izquierda')
    }else if(degrees > 0 && degrees <= 112.5){
        console.log('Vertical hacia arriba')
    } else if(degrees < 0 && degrees >= -112.5){
        console.log('Vertical hacia abajo')
    }else if(degrees > 0 && degrees <= 157.5){
        console.log('Arriba hacia derecha')
    } else if(degrees < 0 && degrees >= -157.5){
        console.log('Abajo hacia la derecha')
    }else{
        console.log('Horizontal hacia la derecha')
    }
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => endDraw());
canvas.addEventListener('mouseout', () => endDraw());

const getSlope = line => (line.pointA.y - line.pointB.y) / (line.pointA.x  - line.pointB.x)

function d(line) {
    const pointC = {
        x: line.pointA.x,
        y: line.pointB.y
    }

    console.log( (a / hypotenuse));
    const degrees = Math.asin(a / hypotenuse);
    console.log(degrees);
}

function handleButton() {
    document.querySelector('.container canvas').classList.toggle('hide');
}


let seeStar = document.querySelector('#seeStar');
seeStar.addEventListener('click', handleButton)

function changeColor(color) {
    let newColor = color.rgba.toString();
    var html = document.querySelector(':root');
    html.style.cssText = `--primary: rgba(${newColor})`;
    ctx.strokeStyle = color.hex.substring(0, 7);
}

new Picker({
    parent: document.querySelector('.color'),
    popup: 'right',
    color: getComputedStyle(document.body).getPropertyValue('--primary'),
    alpha: false,
    onChange: (c) => changeColor(c)
});
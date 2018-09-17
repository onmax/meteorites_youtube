const canvas = document.querySelector('.container canvas');

const ctx = canvas.getContext('2d');
ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--primary');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

// ctx.globalCompositeOperation = 'multiply';
let isDrawing = false;
let firstX, lastX = 0;
let firstY, lastY = 0;
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
    let line = {
        beginning: {
            x: firstX,
            y: firstY
        },
        ending: {
            x: lastX,
            y: lastY
        }
    }
    console.log(line);
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => endDraw());
canvas.addEventListener('mouseout', () => endDraw());


function handleButton() {
    document.querySelector('.container canvas').classList.toggle('hide');
}


let seeStar = document.querySelector('#seeStar');
seeStar.addEventListener('click', handleButton)

function changeColor(color) {
    let newColor = color.rgba.toString();
    var html = document.querySelector(':root');
    html.style.cssText = `--primary: rgba(${newColor})`;
    ctx.strokeStyle = '#' + color.hex.substring(1, 7);
}

new Picker({
    parent: document.querySelector('.color'),
    popup: 'right',
    color: getComputedStyle(document.body).getPropertyValue('--primary'),
    alpha: false,
    onChange: (c) => changeColor(c)
});
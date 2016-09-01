var canvas;
var intervalTime = 10;
var message = 'Yeah, RIP.';
var clicks = 0;

function start() {
    var clip1 = document.getElementById('clip1');
    var clip2 = document.getElementById('clip2');

    clip2.addEventListener('playing', function() { clip1.pause(); });
    clip2.addEventListener('ended', function() { clip1.play() });
    clip1.setAttribute('loop', true);

    canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    var text = new BounceText();

    canvas.addEventListener('click', function() {
        clicks++;
        clip2.play();
        text.stop();
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        text = new BounceText();
    });
}

function BounceText () {
    var ctx = canvas.getContext('2d');

    ctx.font = (canvas.width / 10) + 'px Courier';
    ctx.fillStyle = 'Goldenrod';
    var textSize = ctx.measureText(message);
    var textWidth = textSize.width;
    var textHeight = textSize.width / 10; // this could be better

    var speed = 1 + clicks;
    var x = random((textWidth / 10), canvas.width - (textWidth + (textWidth / 10)));
    var y = random(textHeight + (textHeight / 10), canvas.height - (textHeight / 10));
    var xv = random(1, speed) * (random(0, 1) ? 1 : -1);
    var yv = random(1, speed) * (random(0, 1) ? 1 : -1);

    ctx.shadowOffsetX = -0.2 * xv;
    ctx.shadowOffsetY = -0.2 * yv;
    ctx.shadowBlur = 2;
    ctx.shadowColor = random(0, 1) ? 'White' : 'Black';

    ctx.fillText(message, x, y);

    var interval = setInterval(function() {
        if (x + textWidth >= canvas.width || x <= 0) {
            xv = -xv;
            ctx.shadowOffsetX = -0.2 * xv;
        }
        if (y >= canvas.height || y - textHeight <= 0) {
            yv = -yv;
            ctx.shadowOffsetY = -0.2 * yv;
        }

        x += xv;
        y += yv;

        ctx.fillText(message, x, y);
        // console.log(x, y, xv, yv);
        
    }, intervalTime);

    return {
        stop: function () {
            clearInterval(interval);
        }
    }
}

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = start;

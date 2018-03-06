var intervalTime = 10;
var message = 'Yeah, RIP.';
var logging = false;

function start() {
    var canvas;
    var text;
    var clips = new Clips();

    canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    text = new BounceText(canvas.getContext('2d'));

    canvas.addEventListener('click', function() {
        clips.toggle();
        text.stop();
        text.start();
    });

    text.start();
}

function BounceText(ctx) {
    var speed = 1;
    var intervalId;

    ctx.font = (ctx.canvas.width / 10) + 'px Courier';
    ctx.fillStyle = 'Goldenrod';
    ctx.shadowBlur = 2;
    
    var textSize = ctx.measureText(message);
    var textWidth = textSize.width;
    var textHeight = textSize.width / 10;
    var x = random((textWidth / 10), ctx.canvas.width - (textWidth + (textWidth / 10)));
    var y = random(textHeight + (textHeight / 10), ctx.canvas.height - (textHeight / 10));
    
    return {
        start: function() {
            var vx = random(1, speed) * (random(0, 1) ? 1 : -1);
            var vy = random(1, speed) * (random(0, 1) ? 1 : -1);
            var shadowMode = random(0, 10);

            ctx.shadowOffsetX = -0.2 * vx;
            ctx.shadowOffsetY = -0.2 * vy;
            ctx.shadowColor = random(0, 1) ? 'White' : 'Black'

            intervalId = setInterval(function() {
                if (x + textWidth >= ctx.canvas.width || x <= 0) {
                    vx = -vx;
                    ctx.shadowOffsetX = -0.2 * vx;
                    if (shadowMode % 2) ctx.shadowColor = random(0, 1) ? 'White' : 'Black';
                }
                if (y >= ctx.canvas.height || y - textHeight <= 0) {
                    vy = -vy;
                    ctx.shadowOffsetY = -0.2 * vy;
                    if (shadowMode % 2) ctx.shadowColor = random(0, 1) ? 'White' : 'Black';
                }
        
                x += vx;
                y += vy;
                if (shadowMode === 0) ctx.shadowColor = random(0, 1) ? 'White' : 'Black';

                ctx.fillText(message, x, y);
                if (logging) console.log(x, y, vx, vy);
            }, intervalTime);
        },
        stop: function() {
            clearInterval(intervalId);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            speed++;
        }
    }
}

function Clips() {
    var clip1 = document.getElementById('clip1');
    var clip2 = document.getElementById('clip2');
    var playing = false;

    clip1.addEventListener('playing', function() { playing = true; });
    clip1.addEventListener('pause', function() { playing = false });
    clip1.setAttribute('loop', true);

    return {
        toggle: function() {
            if (playing) {
                clip1.pause();
                clip2.play();
            } else {
                clip1.play();
            }
        }
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = start;

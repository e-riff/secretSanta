var snow = {

    wind: 2,
    maxXrange: 100,
    minXrange: 10,
    maxSpeed: 3,
    minSpeed: 1,
    color: "rgb(237, 139, 139)",
    char: "maria",
    maxSize: 20,
    minSize: 8,

    flakes: [],
    WIDTH: 0,
    HEIGHT: 0,

    init: function (nb) {
        var o = this,
            frag = document.createDocumentFragment();
        o.getSize();

        for (var i = 0; i < nb; i++) {
            var flake = {
                x: o.random(o.WIDTH),
                y: - o.maxSize,
                xrange: o.minXrange + o.random(o.maxXrange - o.minXrange),
                yspeed: o.minSpeed + o.random(o.maxSpeed - o.minSpeed, 100),
                life: 0,
                size: o.minSize + o.random(o.maxSize - o.minSize),
                html: document.createElement("span")
            };

            flake.html.style.position = "absolute";
            flake.html.style.top = flake.y + "px";
            flake.html.style.left = flake.x + "px";
            flake.html.style.fontSize = flake.size + "px";
            flake.html.style.color = o.color;
            flake.html.classList.add('truc');
            flake.html.appendChild(document.createTextNode(o.char));

            frag.appendChild(flake.html);
            o.flakes.push(flake);
        }

        document.body.appendChild(frag);
        o.animate();

        window.onresize = function () { o.getSize(); };
    },

    animate: function () {
        var o = this;
        for (var i = 0, c = o.flakes.length; i < c; i++) {
            var flake = o.flakes[i],
                top = flake.y + flake.yspeed,
                left = flake.x + Math.sin(flake.life) * flake.xrange + o.wind;
            if (top < o.HEIGHT - flake.size - 10 && left < o.WIDTH - flake.size && left > 0) {
                flake.html.style.top = top + "px";
                flake.html.style.left = left + "px";
                flake.y = top;
                flake.x += o.wind;
                flake.life += .01;
            }
            else {
                flake.html.style.top = -o.maxSize + "px";
                flake.x = o.random(o.WIDTH);
                flake.y = -o.maxSize;
                flake.html.style.left = flake.x + "px";
                flake.life = 0;
            }
        }
        setTimeout(function () {
            o.animate();
        }, 20);
    },

    random: function (range, num) {
        var num = num ? num : 1;
        return Math.floor(Math.random() * (range + 1) * num) / num;
    },

    getSize: function () {
        this.WIDTH = document.body.clientWidth - 100 || window.innerWidth;
        this.HEIGHT = document.body.clientHeight - 100 || window.innerHeight;
    }

};



// a key map of allowed keys
var allowedKeys = {
    77: 'm',
    65: 'a',
    82: 'r',
    73: 'i',
};

// the 'official' Konami Code sequence
var konamiCode = ['m', 'a', 'r', 'i', 'a'];

// a variable to remember the 'position' the user has reached so far.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function (e) {
    // get the value of the key code from the key map
    var key = allowedKeys[e.keyCode];
    // get the value of the required key from the konami code
    var requiredKey = konamiCode[konamiCodePosition];

    // compare the key with the required key
    if (key == requiredKey) {

        // move to the next key in the konami code sequence
        konamiCodePosition++;

        // if the last key is reached, activate cheats
        if (konamiCodePosition == konamiCode.length) {
            activateCheats();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

function activateCheats() {
    alert("Joyeux Noël");
}

const boules = document.getElementsByClassName("boule");
let color = [1, "yellow", "red", "green", "blue", "brown", "violet"]
for (let boule of boules) {
    boule.addEventListener("click", function () {
        color[0]++;
        if (color[0] > 6) {
            color[0] = 1
        }
        for (let boule2 of boules) {
            boule2.style.color = color[color[0]];
        }
    });
}

const lapins = document.getElementsByClassName("lapin");
const miaou = document.getElementById("miaou");
let couikcouik = 0;
for (let lapin of lapins) {
    lapin.addEventListener("click", function () {
        console.log(couikcouik);
        if (couikcouik == 0) {
            couikcouik++;
            miaou.style.display = "initial";
        }
        else if (couikcouik == 1) {
            couikcouik++;
            miaou.innerHTML = " euuuh, non";
        }
        else if (couikcouik == 2) {
            couikcouik++;
            miaou.innerHTML = " wouf wouf ?";
        }
        else if (couikcouik == 3) {
            couikcouik++;
            miaou.innerHTML = " (non plus)";
        }
        else if (couikcouik == 4) {
            couikcouik = 0
            miaou.innerHTML = "miaaou";
            miaou.style.display = "none";
        }
    })
};


function reload() {
    document.body.style.display = "initial";
    alert("t'as tout cassé !")
}


const oups = document.getElementById("oups");
oups.addEventListener("click", function () {
    document.body.style.display = "none";
    setTimeout(reload, 3000);
});


var cible = new Date('December 25, 2022 00:00:00');
var time = parseInt(cible.getTime() / 1000, 10);

function decompte() {
    var aujourdhui = new Date();
    time_tmp = parseInt(aujourdhui.getTime() / 1000, 10);
    restant = time - time_tmp;

    jour = parseInt((restant / (60 * 60 * 24)), 10);
    heure = parseInt((restant / (60 * 60) - jour * 24), 10);
    minute = parseInt((restant / 60 - jour * 24 * 60 - heure * 60), 10);
    seconde = parseInt((restant - jour * 24 * 60 * 60 - heure * 60 * 60 - minute * 60), 10);

    document.getElementById('jours').innerHTML = " " + jour + " dodos, ";
    document.getElementById('heures').innerHTML = " " + heure + " heures, ";
    document.getElementById('minutes').innerHTML = " " + minute + " minutes, ";
    document.getElementById('secondes').innerHTML = " " + seconde + " secondes";

    if (time_tmp < time)
        setTimeout(decompte, 1000);
    else {
        cible.setFullYear(cible.getFullYear + 1);
    }
}
decompte();

document.getElementById("decompteNoel").addEventListener("click", function () {
    document.getElementById("decompte").style.display = "flex";
});

const flocons = document.getElementById("flocons");
let isSnowfalinkg = false;
flocons.addEventListener("click", function () {
    if (!isSnowfalinkg) {
        snow.wind = 5;
        const floconsSpan = document.querySelectorAll("span.truc");
        for (let flocon of floconsSpan) {
            flocon.innerHTML = "*";
            isSnowfalinkg = true;
        }
    } else {
        snow.wind = 1;
        const floconsSpan = document.querySelectorAll("span.truc");
        for (let flocon of floconsSpan) {
            flocon.innerHTML = "maria";
            isSnowfalinkg = false;
        }
    }
});
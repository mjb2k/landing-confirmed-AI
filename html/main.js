// Copyright of Matthew Boyer, 2022, all rights reserved.

// global scope variables
var engine;
var render;
var runner = Matter.Runner.create();
var player;
var level;
var objects = [];
var objective; // a single body that is considered the objective
var overlay

// create the engine and render.
function init() {
    engine = Matter.Engine.create();
    var canvas = document.getElementById("canvas");
    render = Matter.Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: window.innerWidth, 
            height: window.innerHeight,
            hasBounds: true
        }
    });
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

        overlay = document.createElement('canvas'),
        context = overlay.getContext('2d');

        overlay.width = render.canvas.width;
        overlay.height = render.canvas.height;

        document.body.appendChild(overlay);


    addPlayer();
    addLevel();
}

function addPlayer() {
    player = new Player(0, 1400);
}

function addLevel() {
    level = new Level1();
}

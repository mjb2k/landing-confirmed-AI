// Copyright of Matthew Boyer, 2022, all rights reserved.

// global scope variables
var engine;
var render;
var runner = Matter.Runner.create();
var player;
var level;
var objects = [];
var objective; // a single body that is considered the objective

// create the engine and render.
function init() {
    engine = Matter.Engine.create();
    render = Matter.Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth, 
            height: window.innerHeight,
            hasBounds: true
        }
    });
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    addLevel();
    addPlayer();
}

function addPlayer() {
    player = new Player(400, 200);
}

function addGround() {
    level = new Level1();
}

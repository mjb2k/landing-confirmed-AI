// Copyright of Matthew Boyer, 2022, all rights reserved.

// global scope variables
var engine;
var render;
var runner = Matter.Runner.create();
var players = []; // population
var level;
var objects = [];
var objective; // a single body that is considered the objective
const d = new Date();
var starTime = d.getTime();

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


    addLevel();
    for (i =0; i < 100; i++)
        players.push(addPlayer());
    
}

function addPlayer() {
    player = new Player(0, 1400);
}

function addLevel() {
    level = new Level1();
}

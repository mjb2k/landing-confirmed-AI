// Copyright of Matthew Boyer, 2022, all rights reserved.

// global scope variables
var engine;
var render;
var player;
var controller;
var model;
var memory;
var runner = Matter.Runner.create();
var level;
var objects = [];
var objective; // a single body that is considered the objective
const d = new Date();
var startTime = d.getTime();

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
    addPlayer();
    addController();
}

function addPlayer() {
    player = new Player(0, 1400);
}

function addLevel() {
    level = new Level1();
}

function addController() {
    model = new Model(3, 9, 3, 100);
    memory =  new Memory(5000);
    console.log(model);
    controller = new Controller(player, model, memory);
}

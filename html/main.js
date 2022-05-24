// Copyright of Matthew Boyer, 2022, all rights reserved.

// global scope variables
var engine;
var render;
var player;
var ground;
var runner = Matter.Runner.create();
var events;

// create the engine and render.
function init() {
    engine = Matter.Engine.create();
    render = Matter.Render.create({
        element: document.body,
        engine:engine
    });
    Matter.Runner.run(render);
    Matter.Runner.run(runner, engine);


    addGround();
}

function addPlayer() {
    player = new Player(400, 200);
}

function addGround() {
    ground = Matter.Bodies.rectangle(400,600,810,60, {isStatic: true});
    Matter.World.add(engine.world, [ground]);
}

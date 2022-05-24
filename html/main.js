// Copyright of Matthew Boyer, 2022, all rights reserved.

// global scope variables
var engine;
var render;
var player;
var ground;

// create the engine and render.
function init() {
    console.log("init");
    engine = Matter.Engine.create();
    render = Matter.Render.create({
        element: document.body,
        engine: engine
    });
    Matter.Runner.run(engine);
    Matter.Render.run(render);

    addGround();
}

function addPlayer() {
    player = new Player(400, 200);
}

function addGround() {
    ground = Matter.Bodies.rectangle(400,600,810,60, {isStatic: true});
    Matter.World.add(engine.world, [ground]);
}

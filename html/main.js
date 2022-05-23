// global scope variables
var engine;
var render;
var player;

// create the engine and render.
function init() {
    engine = Matter.Engine.create();
    render = Matter.Render.create({
        element: document.body,
        engine:engine
    });
    Matter.Runner.run(engine);
    Matter.Render.run(render);

    addGround();
}

function addBody() {
    player = new Player(400, 200);
}

function addGround() {
    var ground = Matter.Bodies.rectangle(400,600,810,60, {isStatic: true});
    Matter.World.add(engine.world, [ground]);
}

function moveBodyA() {
    //console.log("A");
    player.leftThrust();
}

function moveBodyD() {
    //console.log("D");
    player.rightThrust();
}

function moveBodyAD() {
    //console.log("AD");
    player.fullThrust();
}
// global scope variables
var engine;
var render;
var boxA;

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
    var boxB = Matter.Bodies.rectangle(400, 200, 80, 80);
    var boxTR = Matter.Bodies.rectangle(438, 242, 10, 5);
    var boxTL = Matter.Bodies.rectangle(362, 242, 10, 5);

    boxA = Matter.Body.create({parts: [boxB, boxTR, boxTL]});
    Matter.World.add(engine.world, [boxA]);
}

function addGround() {
    var ground = Matter.Bodies.rectangle(400,600,810,60, {isStatic: true});
    Matter.World.add(engine.world, [ground]);
}

function moveBodyD(bodyToMove) {
    console.log(bodyToMove.angle)
    console.log({x: Math.sin(bodyToMove.angle)*.05, y:-1*Math.cos(bodyToMove.angle)*.05})
    Matter.Body.applyForce(bodyToMove, bodyToMove.parts[2].position, {x: Math.sin(bodyToMove.angle)*.05, y:-1*Math.cos(bodyToMove.angle)*.05});
}

function moveBodyA(bodyToMove) {
    console.log(bodyToMove.angle)
    console.log({x: Math.sin(bodyToMove.angle)*.05, y:-1*Math.cos(bodyToMove.angle)*.05})
    Matter.Body.applyForce(bodyToMove, bodyToMove.parts[3].position, {x: Math.sin(bodyToMove.angle)*.05, y:-1*Math.cos(bodyToMove.angle)*.05});
}
var Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2StaticBody = Box2D.Dynamics.b2Body.b2_staticBody;
var b2DynamicBody = Box2D.Dynamics.b2Body.b2_dynamicBody;
var b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint;
var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
var b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint;
var b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;
var b2FilterData = Box2D.Dynamics.b2FilterData;
var b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint;
var b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;
var b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint;
var b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;

var SCALE = 30;
var stage, debug, world;

function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    debug = document.getElementById('debug');
    

    setupWorld();
    debug.addEventListener("click", makeRectangle);

    createjs.Ticker.addEventListener("tick", tick);
    
}

function setupWorld() {
    world = new b2World(new Vec2(0, 10), true);


    // defines physical properties.
    var fixDef = new b2FixtureDef();
    fixDef.density = 1;
    fixDef.friction = 0.5;
    // make ground
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2StaticBody;
    bodyDef.position.x = 400/SCALE; // these are set at the center
    bodyDef.position.y = 600/SCALE;
    // sets shape and size
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(400/SCALE, 20/SCALE);

    // adds the groud to the world
    world.CreateBody(bodyDef).CreateFixture(fixDef);

    // setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(debug.getContext('2d'));
    debugDraw.SetDrawScale(SCALE);
    debugDraw.SetFillAlpha(.5);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
}

function tick() {
    stage.update();
    world.DrawDebugData();
    world.Step(1/60, 10, 10);
    world.ClearForces();
}

function makeCircle() {
    var c = new Circle();
    stage.addChild(c.view);
}

function makeRectangle() {
    var c = new Rectangle(50, 50);
    stage.addChild(c.rect);
}

function handleClick() {
    console.log("CLICKED");
}
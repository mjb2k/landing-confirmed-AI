// Copyright of Matthew Boyer, 2022, all rights reserved.

/* 
    this class file consists of the player, its properties, and its
    commands.
*/

class Player {
    constructor(startPosX, startPosY) {
        // these define the players body parts
        this.mainBody = Matter.Bodies.rectangle(startPosX, startPosY, 32, 129);;
        this.thrusterBody = Matter.Bodies.rectangle(startPosX, startPosY+73, 32, 17); 
        this.leftGear = Matter.Bodies.rectangle(startPosX+21, startPosY+70, 6, 57);
        this.rightGear = Matter.Bodies.rectangle(startPosX-21, startPosY+70, 6, 57);

        // set the angle of the gears
        Matter.Body.setAngle(this.leftGear, -1*Math.PI/4);
        Matter.Body.setAngle(this.rightGear, Math.PI/4);

        // this defines the players compound body
        this.fullBody = Matter.Body.create({parts: [this.mainBody, this.thrusterBody, this.leftGear, this.rightGear]});;
        this.fm = this.fullBody.mass * .01; // magnify the force.

        // this adds the player to the world
        Matter.World.add(engine.world, [this.fullBody]);
    }

    leftThrust() {
        // DEBUG:
        //console.log(this.fullBody.angle)
        //console.log({x: Math.sin(this.fullBody.angle)*.05, y:-1*Math.cos(this.fullBody.angle)*.05})
        
        // position of left thruster = parts[2].position - some vector 
        var leftThrusterPosition = Matter.Vector.add(this.fullBody.parts[2].position, {x: -8, y: 0})
        Matter.Body.applyForce(this.fullBody, leftThrusterPosition, {x: Math.sin(this.fullBody.angle)*this.fm, y:-1*Math.cos(this.fullBody.angle)*this.fm});
    }

    rightThrust() {
        // DEBUG:
        //console.log(this.fullBody.angle)
        //console.log({x: Math.sin(this.fullBody.angle)*.05, y:-1*Math.cos(this.fullBody.angle)*.05})
        //console.log(this.fullBody.parts[2].position);

        // position of right thruster = parts[2].position - some vector 
        var rightThrusterPosition = Matter.Vector.add(this.fullBody.parts[2].position, {x: 8, y: 0})
        Matter.Body.applyForce(this.fullBody, rightThrusterPosition, {x: Math.sin(this.fullBody.angle)*this.fm, y:-1*Math.cos(this.fullBody.angle)*this.fm});
    }

    fullThrust() {
        // position of thrusters = parts[2].position
        var thrustersPosition = this.fullBody.parts[2].position
        Matter.Body.applyForce(this.fullBody, thrustersPosition, {x: Math.sin(this.fullBody.angle)*this.fm, y:-1*Math.cos(this.fullBody.angle)*this.fm});
    }


}
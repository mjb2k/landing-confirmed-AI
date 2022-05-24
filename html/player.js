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
        this.leftGear = Matter.Bodies.rectangle(startPosX-21, startPosY+70, 6, 57);
        this.rightGear = Matter.Bodies.rectangle(startPosX+21, startPosY+70, 6, 57);

        // set the angle of the gears
        Matter.Body.setAngle(this.leftGear, Math.PI/4);
        Matter.Body.setAngle(this.rightGear, -1*Math.PI/4);

        // this defines the players compound body
        this.fullBody = Matter.Body.create({
            parts: [this.mainBody, this.thrusterBody, this.leftGear, this.rightGear]
        });
        this.fullBody.collisionFilter.group = -1; // prevent collisions with debugged raytracing lines
        //this.fullBody.isStatic = false;
        this.fm = this.fullBody.mass * .01; // magnify the force.

        // this adds the player to the world
        Matter.World.add(engine.world, [this.fullBody]);
    }

    // send force from center-left of thruster position.
    leftThrust() {
        // DEBUG:
        //console.log(this.fullBody.angle)
        //console.log({x: Math.sin(this.fullBody.angle)*.05, y:-1*Math.cos(this.fullBody.angle)*.05})
        
        // position of left thruster = parts[2].position - some vector 
        var leftThrusterPosition = Matter.Vector.add(this.fullBody.parts[2].position, {x: -8, y: 0})
        Matter.Body.applyForce(this.fullBody, leftThrusterPosition, {x: Math.sin(this.fullBody.angle)*this.fm, y:-1*Math.cos(this.fullBody.angle)*this.fm});
    }

    // send force from center-right of thruster position.
    rightThrust() {
        // DEBUG:
        //console.log(this.fullBody.angle)
        //console.log({x: Math.sin(this.fullBody.angle)*.05, y:-1*Math.cos(this.fullBody.angle)*.05})
        //console.log(this.fullBody.parts[2].position);

        // position of right thruster = parts[2].position - some vector 
        var rightThrusterPosition = Matter.Vector.add(this.fullBody.parts[2].position, {x: 8, y: 0})
        Matter.Body.applyForce(this.fullBody, rightThrusterPosition, {x: Math.sin(this.fullBody.angle)*this.fm, y:-1*Math.cos(this.fullBody.angle)*this.fm});
    }

    // send force from center of thruster position.
    fullThrust() {
        // position of thrusters = parts[2].position
        var thrustersPosition = this.fullBody.parts[2].position
        Matter.Body.applyForce(this.fullBody, thrustersPosition, {x: Math.sin(this.fullBody.angle)*this.fm, y:-1*Math.cos(this.fullBody.angle)*this.fm});
    }

    // detects the distance from objects to the center of the thruster body.
    // raycast() is a good script I found (credit to Technostalgic for that one) to
    // calculate the distance a ray travels outward from the center of the thrusters to
    // an object (effectively coming out of its "bottom")
    thrusterDelta() {
        // first we need to calculate a position the line ends at from the thrusters body to
        // 1000 pixels away in the opposite direction the body is facing.
        var ang = this.fullBody.angle;
        var thrusterPos = this.fullBody.parts[2].position
        var endPos = {x: thrusterPos.x + -1*Math.sin(ang)*1000, y:thrusterPos.y + Math.cos(ang)*1000}
        
        // call raycast to get a list of ray collided bodies.
        var rays = raycast([ground], thrusterPos, endPos, true);

        if (rays.length > 0) {
            // the first body is the closest one
            var collidedPoint = rays[0].point;
            // now we need to calculate the distance of this ray.
            // this simply does sqrt( (x2-x1)^2 + (y2-y1)^2)
            var dist = Matter.Vector.magnitude(Matter.Vector.sub(collidedPoint, thrusterPos));

            // this part is debugging to visualize the raytracing lines
            //var midpoint = Matter.Vector.mult(Matter.Vector.add(collidedPoint, thrusterPos), .5);
            //this.drawDebugLine(midpoint.x, midpoint.y, ang, dist);
            return dist;
        }
        else { // if we get nothing (no bodies close enough) we'll return -1
            return -1;
        }
    }

    // debug tool to draw the raylines (they are done by matter.js but have no meaningful physical properties)
    drawDebugLine(x, y, angle, length) {
        var ctx = Matter.Bodies.rectangle(x, y, 2, length);
        ctx.isStatic = true;
        ctx.collisionFilter.group = -1; // prevent collisions with player
        Matter.Body.setAngle(ctx, angle);
        Matter.World.add(engine.world, [ctx]);
    }


    // lifts gears up smoothly around rotation point.
    retractGears() {
        aroundPoint(this.rightGear, -1*Math.PI/180, this.fullBody.position);
        aroundPoint(this.leftGear, Math.PI/180, this.fullBody.position);
    }

    // lowers gears smoothly around rotation point.
    extendGears() {
        aroundPoint(this.rightGear, Math.PI/180, this.fullBody.position);
        aroundPoint(this.leftGear, -1*Math.PI/180, this.fullBody.position);
    }

}
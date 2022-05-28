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
        this.leftGear = Matter.Bodies.rectangle(startPosX-30, startPosY+70, 6, 50);
        this.leftGear.mass = 0;
        this.rightGear = Matter.Bodies.rectangle(startPosX+30, startPosY+70, 6, 50);
        this.rightGear.mass = 0;

        // these are points that we apply forces/rotations on the players body,
        // since these will be fixed on the body it's simply easier to do it like this then to calculate the points
        // when we execute these forces.
        this.leftPivotPoint = Matter.Bodies.circle(this.mainBody.position.x-15, this.mainBody.position.y+55, 1);
        this.rightPivotPoint = Matter.Bodies.circle(this.mainBody.position.x+15, this.mainBody.position.y+55, 1);
        var tempLP = Matter.Vector.add(this.thrusterBody.position, {x: -8, y: 0})
        var tempRP = Matter.Vector.add(this.thrusterBody.position, {x: 8, y: 0})
        this.leftThrusterPoint = Matter.Bodies.circle(
            tempLP.x, 
            tempLP.y, 1);
        this.rightThrusterPoint = Matter.Bodies.circle(
            tempRP.x, 
            tempRP.y, 1);

        // set the angle of the gears
        Matter.Body.setAngle(this.leftGear, Math.PI/4);
        Matter.Body.setAngle(this.rightGear, -1*Math.PI/4);

        // parts array
        this.parts = [this.mainBody, this.thrusterBody, 
            this.leftGear, this.rightGear, 
            this.leftPivotPoint, this.rightPivotPoint,
            this.leftThrusterPoint, this.rightThrusterPoint]

        // this defines the players compound body
        this.fullBody = Matter.Body.create({
            parts: this.parts
        });


        // these are attributes that are relevant to the player but aren't bodies
        this.fullBody.collisionFilter.group = -1; // prevent collisions with debugged raytracing lines
        this.fullBody.isStatic = false;
        this.fm = this.fullBody.mass * .01; // magnify the force.
        this.preVelocity = {x: 0, y:0}


        // this adds the player to the world
        Matter.World.add(engine.world, [this.fullBody]);
    }

    updatePreVelocity() {
        this.preVelocity =  {x: this.fullBody.velocity.x, y: this.fullBody.velocity.y};
    }

    // send force from center-left of thruster position.
    leftThrust() {
        Matter.Body.applyForce(this.fullBody, this.leftThrusterPoint.position, {x: Math.sin(this.fullBody.angle)*this.fm/6, y:-1*Math.cos(this.fullBody.angle)*this.fm/6});
    }

    // send force from center-right of thruster position.
    rightThrust() {
        Matter.Body.applyForce(this.fullBody, this.rightThrusterPoint.position, {x: Math.sin(this.fullBody.angle)*this.fm/6, y:-1*Math.cos(this.fullBody.angle)*this.fm/6});
    }

    // send force from center of thruster position.
    fullThrust() {
        Matter.Body.applyForce(this.fullBody, this.thrusterBody.position, {x: Math.sin(this.fullBody.angle)*this.fm/3, y:-1*Math.cos(this.fullBody.angle)*this.fm/3});
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
        
        var leftPos = {x: thrusterPos.x + -1*Math.cos(ang)*1000, y:thrusterPos.y + -1*Math.sin(ang)*1000}
        var rightPos = {x: thrusterPos.x + Math.cos(ang)*1000, y:thrusterPos.y + Math.sin(ang)*1000}

        // call raycast to get a list of ray collided bodies.
        var downRay = raycast([ground], thrusterPos, endPos, true);
        var leftRay = raycast([ground], thrusterPos, leftPos, true);
        var rightRay = raycast([ground], thrusterPos, rightPos, true);

        // stuff for the below statements
        var collidedPoint;
        var dist;
        var midpoint;
        var distance = 1000
        

        if (downRay.length > 0) {
            // the first body is the closest one
            collidedPoint = downRay[0].point;
            // now we need to calculate the distance of this ray.
            // this simply does sqrt( (x2-x1)^2 + (y2-y1)^2)
            dist = Matter.Vector.magnitude(Matter.Vector.sub(collidedPoint, thrusterPos));
            // this part is debugging to visualize the raytracing lines
            midpoint = Matter.Vector.mult(Matter.Vector.add(collidedPoint, thrusterPos), .5);
            //this.drawDebugLine(midpoint.x, midpoint.y, ang, dist);
            distance = dist;
        }
        if (leftRay.length > 0) {
            collidedPoint = leftRay[0].point;
            dist = Matter.Vector.magnitude(Matter.Vector.sub(collidedPoint, thrusterPos));
            midpoint = Matter.Vector.mult(Matter.Vector.add(collidedPoint, thrusterPos), .5);
            //this.drawDebugLine(midpoint.x, midpoint.y, ang-Math.PI/2, dist);
            if (dist < distance) distance = dist;
        }
        if (rightRay.length > 0) {
            collidedPoint = rightRay[0].point;
            dist = Matter.Vector.magnitude(Matter.Vector.sub(collidedPoint, thrusterPos));
            midpoint = Matter.Vector.mult(Matter.Vector.add(collidedPoint, thrusterPos), .5);
            //this.drawDebugLine(midpoint.x, midpoint.y, ang+Math.PI/2, dist);
            if (dist < distance) distance = dist;
        }

        if (distance != 1000) return distance;
        else return -1;

    }


    // debug tool to draw the raylines (they are done by matter.js but have no meaningful physical properties)
    drawDebugLine(x, y, angle, length) {
        var ctx = Matter.Bodies.rectangle(x, y, 2, length);
        ctx.isStatic = true;
        ctx.collisionFilter.group = -1; // prevent collisions with player
        Matter.Body.setAngle(ctx, angle);
        Matter.World.add(engine.world, [ctx]);
    }

    // draws a debugCircle to visualize rotation point.
    drawDebugCircle(x, y) {
        var ctx = Matter.Bodies.circle(x, y, 1);
        ctx.isStatic = true;
        ctx.collisionFilter.group = -1; // prevent collisions with player
        Matter.World.add(engine.world, [ctx]);
    }

    // lifts gears up smoothly around two pivotPoints
    retractGears() {
        /*
        // we need to calculate the point at which to rotate around, 
        // which depends on position and angle of the fullBody.
        var lPoint = this.mainBody.position,
            rPoint = this.mainBody.position;
        // the attack angle is the direction we will set our rotation point
        var attackAngle = Math.PI - .266;
        // these set the point at which our rotation points need to travel to from
        // the center position in order to constantly rotate about a fixed point on the body.
        var ldx = {x: Math.sin(-1*attackAngle)*57.01, y: -1*Math.cos(attackAngle)*57.01}
        var rdx = {x: Math.sin(attackAngle)*57.01, y: -1*Math.cos(attackAngle)*57.01}

        // rotation points travel to their respective "joints"
        lPoint = Matter.Vector.add(lPoint, ldx);
        rPoint = Matter.Vector.add(rPoint, rdx);
        // DEBUG: draw joint!
        this.drawDebugCircle(rPoint.x, rPoint.y);
        */
        
        // commence rotation!
        aroundPoint(this.leftGear, 3*Math.PI/180, this.leftPivotPoint.position);
        aroundPoint(this.rightGear, -3*Math.PI/180, this.rightPivotPoint.position);
    }

    // lowers gears smoothly around rotation point.
    extendGears() {
        /*
        // we need to calculate the point at which to rotate around, 
        // which depends on position and angle of the fullBody.
        var lPoint = this.mainBody.position,
            rPoint = this.mainBody.position;
        // the attack angle is the direction we will set our rotation point
        // it is relative to the angle that the mainBody is currently facing!
        var attackAngle = this.mainBody.angle + (Math.PI - .266);
        // these set the point at which our rotation points need to travel to from
        // the center position in order to constantly rotate about a fixed point on the body.
        var ldx = {x: Math.sin(-1*attackAngle)*57.01, y: -1*Math.cos(attackAngle)*57.01}
        var rdx = {x: Math.sin(attackAngle)*57.01, y: -1*Math.cos(attackAngle)*57.01}

        // rotation points travel to their respective "joints"
        lPoint = Matter.Vector.add(lPoint, ldx);
        rPoint = Matter.Vector.add(rPoint, rdx);
        // DEBUG: draw joint!
        this.drawDebugCircle(rPoint.x, rPoint.y);
        */
        
        // commence rotation!
        aroundPoint(this.leftGear, -10*Math.PI/180, this.leftPivotPoint.position);
        aroundPoint(this.rightGear, 10*Math.PI/180, this.rightPivotPoint.position);
    }

    // this will make the left gear fall off the player.
    removeLeftGear() {
        this.parts.splice(this.parts.indexOf(this.leftGear), 1);
        this.parts.splice(this.parts.indexOf(this.leftPivotPoint), 1);
    }
    removeRightGear() {
        this.parts.splice(this.parts.indexOf(this.rightGear), 1);
        this.parts.splice(this.parts.indexOf(this.rightPivotPoint), 1);
    }
}
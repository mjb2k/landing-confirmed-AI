// Copyright of Matthew Boyer 2022, all rights reserved

/*
    The very first (and possibly last) level I'll design for this
    The level will be very simple, a small platform for the player to spawn on,
    a small platform for the objective, and a few obstacles in the way that 
    rotate in a circle.

                _+_ victory!

        -   -  obstacles
    
    _^_ start position
*/


class Level1 {
    constructor() {
        // define the parts of the body
        this.spawnPlatform = Matter.Bodies.rectangle(0, 10000, 500, 5);
        objects.push(this.spawnPlatform);
        this.obstacle1 = Matter.Bodies.rectangle(1000, 8500, 250, 250);
        objects.push(this.obstacle1);
        this.obstacle2 = Matter.Bodies.rectangle(1500, 8500, 250, 250);
        objects.push(this.obstacle2);
        this.winPlatform = Matter.Bodies.rectangle(2500, 7000, 500, 5);
        objects.push(this.winPlatform);
        objective = this.winPlatform;

        // add these to the world
        Matter.World.add(engine.world, [
            this.spawnPlatform, 
            this.obstacle1,
            this.obstacle2,
            this.winPlatform
        ]);
    }

    // after every frame this is called to update the level
    update() {
        // rotate the obstacles 6 degrees per frame (1 RPS)
        Matter.Body.rotate(this.obstacle1, 6*Math.PI/180);
        Matter.Body.rotate(this.obstacle2, -6*Math.PI/180);
    }
}
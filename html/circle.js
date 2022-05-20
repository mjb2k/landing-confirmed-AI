(function(window) {

    function Circle() {
        this.view = new createjs.Bitmap("images/soccer.png"); 
        this.view.regX = this.view.regY = 50;

        // defines physical properties.
        var fixDef = new b2FixtureDef();
        fixDef.density = 5;
        fixDef.friction = 0.5;
        fixDef.restitution = .8;
        // make circle
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2DynamicBody;
        bodyDef.position.x = Math.random()*800 / SCALE; // these are set at the center
        bodyDef.position.y = 0;
        // sets shape and size
        fixDef.shape = new b2CircleShape(50/SCALE);

        // adds the circle to the world
        this.view.body = world.CreateBody(bodyDef); // holds the box2d body.
        this.view.body.CreateFixture(fixDef); // when we call tick function we have easy reference to box2d body
        this.view.onTick = tick;
    }

    // updates canvas, with environment parameter
    function tick(e) {
        // when we "getPosition" we get the box2d meter position, not pixels (like everything before)
        this.x = this.body.GetPosition().x * SCALE;
        this.y = this.body.GetPosition().y * SCALE;
        this.rotation = this.body.GetAngle() * (180/Math.pi); // converts rotation into degrees

    }

    window.Circle = Circle;
})(window);
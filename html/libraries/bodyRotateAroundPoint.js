// Copyright of Matthew Boyer 2022, all rights reserved

// this is mostly taken from matter.js composite rotate feature,
// but I had a special need to apply it to a single body, not all of them.
// so I crafted this method to do this.
// might submit a PR with this later.


/**
     * Rotates a body by a given angle about the given point, without imparting any angular velocity.
     * @method rotate
     * @param {composite} body
     * @param {number} rotation
     * @param {vector} point
     */
 function aroundPoint(body, rotation, point) {
    var cos = Math.cos(rotation),
        sin = Math.sin(rotation),
        dx = body.position.x - point.x,
        dy = body.position.y - point.y;

    Matter.Body.setPosition(body, {
        x: point.x + (dx * cos - dy * sin),
        y: point.y + (dx * sin + dy * cos)
    });
    
    Matter.Body.rotate(body, rotation);

    return body;
}

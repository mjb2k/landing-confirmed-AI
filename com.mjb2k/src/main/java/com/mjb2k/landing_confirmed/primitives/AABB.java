package com.mjb2k.landing_confirmed.primitives;

import javax.vecmath.Vector2d;

public class AABB {
	public Vector2d center;
    public Vector2d halfsize;

    public AABB(Vector2d center, Vector2d halfsize) {
        this.center = center;
        this.halfsize = halfsize;
    }
    
    // determines if our boxes have collided.
    public boolean Overlaps(AABB other)
    {
        if ( Math.abs(center.x - other.center.x) > 
        	halfsize.x + other.halfsize.x ) return false;
        if ( Math.abs(center.y - other.center.y) > 
        	halfsize.y + other.halfsize.y ) return false;
        return true;
    }
}

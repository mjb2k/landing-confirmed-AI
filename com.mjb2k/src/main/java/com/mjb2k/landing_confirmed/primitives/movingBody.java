package com.mjb2k.landing_confirmed.primitives;

import javax.vecmath.Vector2d;
import com.mjb2k.landing_confirmed.primitives.AABB;

public class movingBody {
	public Vector2d oldPosition;
    public Vector2d currentPosition;
    public Vector2d oldSpeed;
    public Vector2d currentSpeed;

    public AABB mainBody;
    public Vector2d mainBodyOffset; 
    
    public void updateFrame() {
        oldPosition = currentPosition;
        oldSpeed = currentSpeed;

        // change position by delta-time*speed
        currentPosition.add(currentSpeed); 
        
        // update the body
        mainBody.center.add(currentPosition);
        mainBody.center.add(mainBodyOffset);
    }
}

package com.mjb2k.landing_confirmed.player;

import javax.vecmath.Vector2d;
import com.mjb2k.landing_confirmed.primitives.*;

public class player extends movingBody {
    // the player only has two controls, can be pressed at same time.
    public enum input {
    	leftThrust,
    	rightThurst
    }
    // player states
    public enum playerState {
    	lT, // left thrust only
    	rT, // right thrust only
    	bT, // both thrusters
    	dead, // player is dead
    	landed, // player resting on ground (no movement)
    	win // player has won.
    }
    
    public playerState currentState = playerState.landed;
    public Vector2d leftThruster;
    public Vector2d rightThruster;
    // these below will indicate to us if the landing gears are detached.
    public boolean lDetached;
    public boolean rDetached;
    public boolean bDetached;
    
    public void CharacterUpdate()
    {
        switch (currentState)
        {
            case landed: // no movement for player
            	leftThruster.set(0, 0);
            	rightThruster.set(0, 0);
            case lT: // left thrust
            	if lDetached {
            		
            	}
            	else if rDetached {
            		
            	}
            	else if bDetached {
            		
            	}
            	else { // both landing gears are attached
            		// random numbers for now until we figure out the speed
            		// at which how fast the thrusters go and the angles
            		// they create.
            		leftThruster.set(45, 90);
            	}
            	
            	
        }
    }
    
    
    
}

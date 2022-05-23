# landing-confirmed-AI
Personal project to introduce me to physics and evolutionary AI

# Background

Landing confirmed is a 2D-platformer mobile game that I've been playing off-and-on since what must be 2016. 
It's one of my favorite mobile games out there and I think it's underappreciated.
I also thought it would be an interesting idea to delve into AI, that is, build an AI to beat the game.

# Requirements

The game is relatively simple, but that doesn't mean it won't be hard to implement.

We'll need to develop these two things:
1. The player
2. A level designer (or just levels)
3. An evolutionary AI

# The Player

The Player Wins by landing on the designated platform for XX amount of seconds

here are some things that need to be known about the player:
1. The players center of mass (COM) can change based on how many landing gears it has on it (and can even shift to the left or right if there is only one landing gear).
2. The player has two thrusters that are slightly offset from the COM and can change the angle direction of the ship (similar to a sled being pushed on the left side on ice). If both are on at the same time, they will create a net force directly at the COM.
3. The landing gears must extract/retract when the player is closer/far from the ground.
4. If the landing gears touch the ground too hard then they should detach from the player, and fall to the ground (as well as be a physical object the player can touch).
5. If one of the landing gears detaches, the other should detach after a few seconds.
6. If the players body hit any foreign (non-attached) object then the player dies.
7. If the players thrusters hit the ground above a certain force the player dies.
8. The player dies if they exceed 100 m/s.
9. The player dies if they exceed 400 meters from the objective.

# The AI

We're not totally sure how this is going to work yet, it's something I've never done before, but I look forward to exploring this genre of CS.

Here are some ideas I think the AI will need:
1. Evolutionary, so it must be able to learn by playing the game and dying
2. We'll need to come up with metrics to tell the AI what button it should press ("A", "D", or both)
    - these will tell the player how to fly
    - 1: delta V of the player towards nearby obstacles (re-orient and slow down if we're going to fly in an obstacle)
    - 2: orientation towards nearby obstacles (we want to point away from them so we can slow down)
    - 3: these need to consider the objective as a priority (IE, we don't want to turn away from the objective)
3. We'll also need to come up with a mutation algorithm, basically telling the AI what success is
    - 1: time it takes the player to win
    - 2: survivability (does the player win)?
    - 3: distance from objective at end of round
3. I would also like to add an ability to add our own players into the generational output so the AI can learn from human interaction (and hopefully improve my scores).
4. more to come...


# The levels

As we're using matter.js at this point, we can simply hand craft the levels with specific box elements (or lines).
We may want to make an editor for this, but if not it shouldn't be to hard.

the only thing special about the levels is where the player starts, and where the player needs to land.

The player starting somewhere should be relatively simple, as it's just a position on the board.

The objective is a small platform that if the players thruster body comes within a certain y-distance the player will begin 
a countdown to win, if the countdown reaches 0 the player wins, and anything else that happens is irrelevant.

We also need a means of panning to the player, because levels can grow larger than the screen size, we need a method to
center the camera on our player.




I plan on completing this by July 20th, 2022, an ambitious time frame, but hopefully I can get it done.


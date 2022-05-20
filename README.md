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
2. A level designer
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
2. We'll need to come up with metrics to tell the AI what we define "success" as.
3. I would also like to add an ability to add our own players into the generational output so the AI can learn from human interaction (and hopefully improve my scores).
4. There's a lot more requirements that will be necessary, but I first have to make the game to figure this out.

I plan on completing this by July 20th, 2022, an ambitious time frame, but hopefully I can get it done.


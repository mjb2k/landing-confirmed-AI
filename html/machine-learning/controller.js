/*
This file will consist of the Deep-Q learning
algorithm to control the player.

Important stuff for the player to know:
There are only three actions a player can do
- leftThrust
- rightThrust
- fullThrust (both left and right)

We want to reward the player based on two things:
1. if it wins the game we reward
2. the closer it gets to the objective
3. the faster it gets to the objective

The way Deep Q-Learning works is as follows:
1. Game starts and the Q-value is randomly initialized
2. agent collects current state (calculated based on our stuff)
3. agent executes action based on said state
4. After this, the AI is rewarded and updates its Q value based on
the bellman equation
5. repeat steps 3-4 until game over

We want to minimize the lost

https://towardsdatascience.com/how-to-teach-an-ai-to-play-games-deep-reinforcement-learning-28f9b920440a
https://github.com/maurock/snake-ga/blob/master/DQN.py
*/

class Controller {
    constructor(player) {
        this.player = player;
        this.state = [];
        this.reward = 0;

    }

    /*
        Returns the state of the player
        Represented by X values:
        1. Orientation (angle)
        2. Velocity
        3. Distance to objective
        4. Time
        5. Danger close to objects above
        6. Danger close to objects left
        7. Danger close to objects right
        8. Danger close to objects upleft
        9. Danger close to objects upright
    */
    getState() {
        this.state =
                [
                    this.player.mainBody.angle, 
                    this.player.mainBody.velocity,
                    this.player.distanceToObjective(),
                    d.getTime() - startTime
                ]
        var a = this.player.mainBodyDelta();
        for (var i=0; i<5; i++) {
            this.state.push(a[i]); 
        }
    }


    /*
    The reward score will be based from 0-1
    Rewards is as follows:
    1. -X the distance the player is to the objective
    2. -X the time the player took to reach the objective
    3. +X if the player wins
    4. -X if the player dies
    */
    setReward() {
        if (this.player.dead) {
            this.reward -= .1;
        }
        if (this.player.wintime > 1.5) {
            this.reward += .25;
        }
        this.reward -= this.player.distanceToObjective()/10000;
        this.reward -= (d.getTime() - startTime)/60;
    }

    /*
        Here we take the state and calculate what our next move should be
        We have three options, both thrust, left, or right.
    */
    move() {
         //var rand = Math.random();
         //if (rand < .5) this.player.leftThrust();
         //if (rand > .5) this.player.rightThrust();
    }
}
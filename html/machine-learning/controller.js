/*
    This file will consist of the Deep-Q learning
    algorithm to control the player.

    Important stuff for the player to know:
    There are only three actions a player can do
    - leftThrust
    - rightThrust
    - fullThrust (both left and right)

    We want to reward the player based on two things:
    1. if it wins the game
    We punish the player based on:
    1. if it dies
    2. how far away from the objective it is (regressive)
    3. how much time it takes (regressive)

    The way Deep Q-Learning works is as follows:
    1. Game starts and the Q-value is randomly initialized
    2. agent collects current state (calculated based on our stuff)
    3. agent executes action based on said state
    4. After this, the AI is rewarded and updates its Q value based on
    the bellman equation
    5. repeat steps 3-4 until game over

    We want to minimize the lost

    This works with a neural network to figure out what it should do rather than a Q-table
    The inputs are the state (the 9 values we provide) and the output is the actions defined above
    Our problem is building the neurons in the network, I have no clue how to do that.
*/

class Controller {
    constructor(player, model, memory) {
        
        this.player = player;
        this.state; // needs to be a tensor from tf
        this.reward = 0;
        this.model = model;
        this.memory = memory;
        this.action;
        this.epsilon = 1;
        
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
        var state =
                [
                    this.player.fullBody.angle, 
                    this.player.fullBody.velocity,
                    this.player.distanceToObjective(),
                    d.getTime() - startTime
                ]
        var a = this.player.mainBodyDelta();
        for (var i=0; i<5; i++) {
            state.push(a[i]); 
        }
        this.state = tf.tensor([state]);
    }


    /*
        The reward score will be based from 0-1
        Rewards is as follows:
        1. +X the distance the player is to the objective
        2. -X the time the player took to reach the objective
        3. +X if the player wins
        4. -X if the player dies
    */
    setReward() {
        if (this.player.dead) {
            this.reward = -1;
        }
        if (this.player.wintime > 1.5) { //player wins
            this.reward = 1;
        }
        // the player earns more rewards the closer it is to the objective
        this.reward = (10000 - this.player.distanceToObjective())/10000;
        console.log(this.reward);
    }


    /*
        Once we are fed from chooseAction we will execute the action we decided on.
    */
    move() {
        // there's a 10% chance we get a random action.
        var value = this.model.chooseAction(this.state, this.epsilon);
        this.action = value;
        if (value == -1) this.player.leftThrust();
        else if (value == 0) this.player.fullThrust();
        else if (value == 1) this.player.rightThrust();
    }


    /*
        This is where the controller will store into memory its results
        and predict what it should do next
    */
    async replay() {
        // Sample from memory
        const batch = this.memory.sample(this.model.batchSize);
        const states = batch.map(([state, , , ]) => state);
        const nextStates = batch.map(
            ([, , , nextState]) => nextState ? nextState : tf.zeros([this.model.numStates])
        );
        // Predict the values of each action at each state
        const qsa = states.map((state) => this.model.predict(state));
        // Predict the values of each action at each next state
        const qsad = nextStates.map((nextState) => this.model.predict(nextState));

        let x = new Array();
        let y = new Array();

        // Update the states rewards with the discounted next states rewards
        batch.forEach(
            ([state, action, reward, nextState], index) => {
                const currentQ = qsa[index];
                currentQ[action] = nextState ? reward + this.discountRate * qsad[index].max().dataSync() : reward;
                x.push(state.dataSync());
                y.push(currentQ.dataSync());
            }
        );

        // Clean unused tensors
        qsa.forEach((state) => state.dispose());
        qsad.forEach((state) => state.dispose());

        // Reshape the batches to be fed to the network
        x = tf.tensor2d(x, [x.length, this.model.numStates])
        y = tf.tensor2d(y, [y.length, this.model.numActions])

        // Learn the Q(s, a) values given associated discounted rewards
        await this.model.train(x, y);

        x.dispose();
        y.dispose();
    }
}
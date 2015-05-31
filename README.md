
<h2>Single Player</h2>
The original version uses only JavaScript to create and manipulate game objects, with JQuery to handle key presses. All the entities are created at the beginning of the game, and there is a loop to continually draw the game, as well as a listener that triggers on key presses and updates the game accordingly.

This rudimentary version was created in a few hours, but an idea struck me: this is a simple enough concept, why can't it support more than one player?

<h2>Multiplayer</h2>

My first challenge was to make sure any number of clients were manipulating the same version of the game. I solved this by use the singleton design pattern in ```BrainEatersGame.cs```, which not only makes sure there's only one instance of the game, but also locks the thread while the game is being created.

From there, I use JSON to pass the game object into the client, where there's an animation loop, and logic to update the game instance. 

My next challenge is to put all this in the context of a Player controlling the Pac-man, and eventually to add multiple players, each with his or her own client.

<h2>Flavor</h2>

Brain Eaters is an immersive adventure in which YOU, the player, play the part of Pac-man, a cursed prince reduced disembodied mouth trying desperately to survive. You must dodge the minecraft zombies and collect the mushrooms. If you collect all ten, the malicious curse is broken and the game ends. But if you encounter a zombie, it eats your soul and you are sent through the aether back from whence you started. Also your death count increments. Use either the arrow keys or WSAD to control your character.

The Brain Eaters concept is accredited to Stephen Walther.

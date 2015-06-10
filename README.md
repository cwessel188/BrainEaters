
This project started out as a weekend assignment, which resulted in the single player version of the game. I had the idea to include multiplayer support, and the project grew from there.

<h2>Brain Eaters: Multiplayer</h2>
To start with, I had a JavaScript only single player version of the game. My first priority was to move all the game logic into a serverside Game Engine and Game object. The Game contains the board, a list of the current players. The Game Engine controls things like adding players and how the players and zombies move on the board.

The Game object itself is a thread safe singleton, which means there will only ever be exactly 1 instance created.

The game board is stored as a 2D array with characters representing each location and the entity present. 

I'm using a SignalR Hub to allow the Game Engine to manipulate the array, and also allow each client to draw the game in real time. 

Each client can access the game object, and locally draws the game board, which allows the use of different sprites on each client. Each client also has control over only it's player.

As of 5.31:
 - each client (open a new Chrom window) now has it's own sprite. 
 - the game can handle up to 10 unique clients
 - players are tied to the client ID, which means the same window can't create multiple players

Currently working on:
 - rewriting the MovePlayer method to work with any number of players
 - improving the user interface to allow for selection of sprites and inputting of names

What's Next:
 - handling collisions between game entities
 - adding a chat feature
 - improving the visuals
 - hosting on Azure
 - making the game mechanics more complex (adding walls, more sophisticated zombie movement)

<h2>The Single Player Game</h2>
[Link to single player version is on the bottom of the game]

The original version uses only JavaScript to create and manipulate game objects, with JQuery to handle key presses. All the entities are created at the beginning of the game, and there is a loop to continually draw the game, as well as a listener that triggers on key presses and updates the game accordingly.

This rudimentary version was created in a few hours, and I kept it as a reference for how I wanted the end product to behave.

<h2>Flavor</h2>

Brain Eaters is an immersive adventure in which YOU, the player, play the part of Pac-man, a cursed prince reduced disembodied mouth trying desperately to survive. You must dodge the minecraft zombies and collect the mushrooms. If you collect all ten, the malicious curse is broken and the game ends. But if you encounter a zombie, it eats your soul and you are sent through the aether back from whence you started. Also your death count increments. Use either the arrow keys or WSAD to control your character.

The Brain Eaters concept is accredited to Stephen Walther.

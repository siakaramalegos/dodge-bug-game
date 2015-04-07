Dodge Bug
===============================
Play the live version of this game [here](http://siakaramalegos.github.io/dodge-bug-game/index.html).

This game was Project 3 in the [Udacity Front-End Nanodegree](https://www.udacity.com/course/nd001) program. We had to create a Frogger-like game using provided visual assets and a game loop engine. The objectives were to better understand JavaScript's object-oriented programming features as well as working with canvas in HTML5.

##How to Play the Game
###Overview
In this game you have a Player and Enemies (Bugs). The goal of the player is to increase their score by reaching the water and collecting gems, without colliding into any one of the enemies.

###Movement
- The player can move left, right, up and down using the keyboard's arrow keys.
- The enemies move in varying speeds on the paved block portion of the scene.

###Lives
Players have 3 lives, represented by hearts in the upper right-hand corner.  Once a the player collides with an enemy, the player loses a life and is put back in the starting location.  Play continues until the lives run out, at which point the game is over.

###Points & Levels
Players receive 2 points for every gem and 2 points each time they reach the water.

The player levels up every 10 points in score.  Each new level adds another layer of complexity - either a new enemy, a new gem, or a new obstacle.

###Restarting the Game
Play again by refreshing the browser window.
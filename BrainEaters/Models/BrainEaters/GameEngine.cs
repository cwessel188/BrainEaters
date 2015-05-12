using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BrainEaters.Models
{
    public class GameEngine
    {
        public BrainEatersGame LoadGame(int boardLength, int boardWidth, int cellWidth, int numZombies, int numFood)
        {
            var rand = new Random();
            int numCellColumns = boardLength / cellWidth;
            int numCellRows = boardWidth / cellWidth;

            var game = new BrainEatersGame();
            // make the array
            game.GameArray = new char [numCellColumns, numCellRows];
            
            // add the zombies
            for (int i = 0; i < numZombies; i++)
            {
                game.GameArray[rand.Next(numCellColumns), rand.Next(numCellRows)] = 'z';
            }

            // add the food
            for (int i = 0; i < numFood; i++)
            {
                game.GameArray[rand.Next(numCellColumns), rand.Next(numCellRows)] = 'f';
            }

            return game;
        }
    }
}
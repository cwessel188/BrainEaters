using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BrainEaters.Models
{
    /// <summary>
    /// A singleton BrainEatersGame
    /// </summary>
    public sealed class BrainEatersGame
    {
        // a single instance of the class
        private static volatile BrainEatersGame _instance = null;

        // object to prevent multiple threads from creating new instances
        // prevents deadlocking
        private static object syncRoot = new object();
        
        // private constructor
        private BrainEatersGame() {
            // TODO pass dimensions to constructor
            //(500, 500, 50, 10, 10)
            int boardWidth = 800;
            int boardHeight = 500;
            int cellWidth = 50;
            // int numZombies = 10;
            // int numFood = 10;

            var rand = new Random();
            NumberCellCols = boardWidth / cellWidth;
            NumberCellRows = boardHeight / cellWidth;

            //    var game = new BrainEatersGame();
            CellWidth = cellWidth;
            // make the array
            GameArray = new char[NumberCellCols, NumberCellRows];

            // fill array with empty spaces (empty array?)
            for (int i = 0; i < NumberCellCols; i++)
            {
                for (int j = 0; j < NumberCellRows; j++)
                {
                    GameArray[i, j] = '-';
                }
            }

            /*
             * For now, I'm removing these entities and creating a more 'tag' based game.
             * This code is here for when I want to add I back in.
            // add the zombies */
            //for (int i = 0; i < numZombies; i++)
            //{
            //    GameArray[rand.Next(numCellColumns), rand.Next(numCellRows)] = 'z';
            //}

            /*
            // add the food
            for (int i = 0; i < numFood; i++)
            {
                GameArray[rand.Next(numCellColumns), rand.Next(numCellRows)] = 'f';
            }
            */

            // 10 player maximum
            Players = new List<Player>();


        }

        public static BrainEatersGame Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (syncRoot)
                    {
                        if (_instance == null)
                        {
                            _instance = new BrainEatersGame();
                        }
                    }
                }
                return _instance;
            }
        }

        public char[,] GameArray { get; set; }
        public List<Player> Players { get; set; }
        public Player HighlightedPlayer { get; set; }
        public int CellWidth { get; set; }
        public int NumberCellRows { get; set; }
        public int NumberCellCols { get; set; }
    }
}
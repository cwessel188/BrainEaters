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
            int boardLength = 500;
            int boardWidth = 500;
            int cellWidth = 50;
            int numZombies = 10;
            int numFood = 10;

            var rand = new Random();
            int numCellColumns = boardLength / cellWidth;
            int numCellRows = boardWidth / cellWidth;

            //    var game = new BrainEatersGame();
            CellWidth = cellWidth;
            // make the array
            GameArray = new char[numCellColumns, numCellRows];

            // add the zombies
            for (int i = 0; i < numZombies; i++)
            {
                GameArray[rand.Next(numCellColumns), rand.Next(numCellRows)] = 'z';
            }

            // add the food
            for (int i = 0; i < numFood; i++)
            {
                GameArray[rand.Next(numCellColumns), rand.Next(numCellRows)] = 'f';
            }

            // 4 player maximum
            Players = new Player[4];

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
        public Player[] Players { get; set; }
        public int CellWidth { get; set; }
    }
}
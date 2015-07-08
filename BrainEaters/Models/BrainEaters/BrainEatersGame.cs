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
            int boardWidth = 500;
            int boardHeight = 500;
            CellWidth = 50;
            // int numZombies = 10;
            // int numFood = 10;

            var rand = new Random();
            NumberCellCols = boardWidth / CellWidth;
            NumberCellRows = boardHeight / CellWidth;

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
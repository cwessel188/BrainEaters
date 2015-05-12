using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BrainEaters.Models
{
    public class BrainEatersGame
    {
        public char[,] GameArray { get; set; }
        public Player[] Players { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BrainEaters.Models
{
    public class Player
    {
        public char Id { get; set; }
        public string Name { get; set; }
        public int FoodCount { get; set; }
        public int DeathCount { get; set; }
    }
}

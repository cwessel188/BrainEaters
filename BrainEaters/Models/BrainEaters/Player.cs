using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BrainEaters.Models
{
    public class Player
    {
        public string Id { get; set; }
        public char PlrChar { get; set; }
        public string Name { get; set; }
        public int FoodCount { get; set; }
        public int DeathCount { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BrainEaters.Models
{
    public class Player
    {
        public Player()
        {
            Xcoor = 0;
            Ycoor = 0;
        }
        public string Id { get; set; }
        public string ConnectionId { get; set; }
        public char PlrChar { get; set; }
        public string Name { get; set; }
        public int Xcoor { get; set; }
        public int Ycoor { get; set; }
        public string Color { get; set; }
    }
}

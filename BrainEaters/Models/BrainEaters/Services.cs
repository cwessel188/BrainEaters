using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BrainEaters.Models.BrainEaters
{
    public class Services
    {

        internal static Player GetPlayerById(BrainEatersGame game, string id)
        {
            return game.Players.Find(p => p.Id == id);
        }


        internal static string RandomColor()
        {
            var rnd = new Random();
            return "#" + 
                (rnd.Next(240) + 16).ToString("X") +
                (rnd.Next(240) + 16).ToString("X") +
                (rnd.Next(240) + 16).ToString("X");
        }

    }
}
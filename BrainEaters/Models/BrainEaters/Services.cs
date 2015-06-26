using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BrainEaters.Models.BrainEaters
{
    public class Services
    {

        internal static string RandomColor()
        {
            var rnd = new Random();
            return "#" + rnd.Next(256).ToString("X") + rnd.Next(256).ToString("X") + rnd.Next(256).ToString("X");
        }

    }
}
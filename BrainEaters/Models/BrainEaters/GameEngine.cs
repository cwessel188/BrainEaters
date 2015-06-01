using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace BrainEaters.Models
{
    public static class GameEngine
    {
        /// <summary>
        /// Adds a player, represented by a char, to the upper left of the GameArray
        /// </summary>
        /// <param name="playerName">the name of the player</param>
        public static void AddPlayer(string Id, string playerName)
        {
            // TODO add player names

            var Plr = new Player();
            Plr.Name = playerName;
            Plr.PlrChar = (char) (BrainEatersGame.Instance.Players.Count + 48);
            Plr.Id = Id;

            BrainEatersGame.Instance.Players.Add(Plr);

            // add player to upper left of game
            BrainEatersGame.Instance.GameArray[0, 0] = Plr.PlrChar;
        }

        /// <summary>
        /// Moves the player inside the GameArray according to arrow keys or WSAD
        /// </summary>
        /// <param name="keyCode">the key pressed</param>
        public static void MovePlayer(string PlayerId, int keyCode)
        {
            var plr = BrainEatersGame.Instance.Players.Find(p => p.Id == PlayerId); // TODO player id
            var plrChar = plr.PlrChar;
            var x = -1;
            var y = -1;
            char chr;
            // find the plr
            for (int i = 0; i < 10; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    chr = BrainEatersGame.Instance.GameArray[i, j];
                    if (chr == plrChar)
                    {
                        x = i;
                        y = j;
                        // x and y are now the coordinates of the player
                        break;
                    }
                }
                if (x >= 0) { break; } // player found
            }
            

            switch (keyCode)
            {
                // short circuiting prevents using (65 || 37)
                case 65: // A or left
                case 37:
                    if (x > 0)
                    {
                        BrainEatersGame.Instance.GameArray[x, y] = '-';
                        x--;
                        BrainEatersGame.Instance.GameArray[x, y] = plrChar;
                    }
                    break;
                case 68: // D or right
                case 39:
                    if (x < BrainEatersGame.Instance.GameArray.GetUpperBound(0))
                    {
                        BrainEatersGame.Instance.GameArray[x, y] = '-';
                        x++;
                        BrainEatersGame.Instance.GameArray[x, y] = plrChar;
                    }
                    break;
                case 87: // W or up
                case 38:
                    if (y > 0)
                    {
                        BrainEatersGame.Instance.GameArray[x, y] = '-';
                        y--;
                        BrainEatersGame.Instance.GameArray[x, y] = plrChar;
                    }
                    break;
                case 83: // S or down
                case 40:
                    if (y < BrainEatersGame.Instance.GameArray.GetUpperBound(1))
                    {
                        BrainEatersGame.Instance.GameArray[x, y] = '-';
                        y++;
                        BrainEatersGame.Instance.GameArray[x, y] = plrChar;
                    }
                    break;
            }
        }
    }
}
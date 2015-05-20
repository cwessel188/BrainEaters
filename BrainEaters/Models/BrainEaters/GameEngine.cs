using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace BrainEaters.Models
{
    public static class GameEngine
    {

        public static bool AddPlayer(string playerName)
        {
            var player = new Player();
            player.Name = playerName;
            player.Id = '0';

            BrainEatersGame.Instance.Players[0] = (player);

            // add player to upper left of game
            BrainEatersGame.Instance.GameArray[0, 0] = '0';
            return true;
        }

        public static void MovePlayer(int keyCode)
        {
            var plr = BrainEatersGame.Instance.Players[0];
            var plrChar = plr.Id;
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
                        break;
                    }
                }
                if (x >= 0) { break; }
            }

            switch (keyCode)
            {
                // short circuiting prevents using (65 || 37)
                case 65: // A or left
                case 37:
                    if (x > 0)
                    {
                        BrainEatersGame.Instance.GameArray[x, y] = '\0';
                        x--;
                        BrainEatersGame.Instance.GameArray[x, y] = '0';
                    }
                    break;
                case 68: // D or right
                case 39:
                    if (x < BrainEatersGame.Instance.GameArray.GetUpperBound(0))
                    {
                        BrainEatersGame.Instance.GameArray[x, y] = '\0';
                        x++;
                        BrainEatersGame.Instance.GameArray[x, y] = '0';
                    }
                    break;
                case 87: // W or up
                case 38:
                    if (y > 0)
                    {
                        BrainEatersGame.Instance.GameArray[x, y] = '\0';
                        y--;
                        BrainEatersGame.Instance.GameArray[x, y] = '0';
                    }
                    break;
                case 83: // S or down
                case 40:
                    if (y < BrainEatersGame.Instance.GameArray.GetUpperBound(1))
                    {
                        BrainEatersGame.Instance.GameArray[x, y] = 'z';
                        y++;
                        BrainEatersGame.Instance.GameArray[x, y] = '0';
                    }
                    break;
            }
        }
    }
}
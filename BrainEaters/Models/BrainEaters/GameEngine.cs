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
        internal static void AddPlayer(string Id, string playerName)
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


        internal static void RemovePlayer(Player player)
        {
            bool isPresent = BrainEatersGame.Instance.Players.Contains(player);

            if (isPresent)
            {
                BrainEatersGame.Instance.Players.Remove(player);
                Trace.WriteLine("player {0} removed.", player.Id);
            }
            else
            {
                // TODO figure out a better way to handle this.
                throw new KeyNotFoundException();
            }

        }

        /// <summary>
        /// Moves the player inside the GameArray according to arrow keys or WSAD
        /// </summary>
        /// <param name="keyCode">the key pressed</param>
        public static void MovePlayer(string PlayerId, int keyCode)
        {

            var plr = BrainEatersGame.Instance.Players.Find(p => p.Id == PlayerId);
            var plrChar = plr.PlrChar;
            int x;
            int y;
            FindEntity(plrChar, out x, out y);
            

            switch (keyCode)
            {
                // short circuiting stops me from using (65 || 37)
                case 65: // A or left
                case 37:
                    MoveLeft(plrChar, x, y);
                    break;
                case 68: // D or right
                case 39:
                    MoveRight(plrChar, x, y);
                    break;
                case 87: // W or up
                case 38:
                    MoveNorth(plrChar, x, y);
                    break;
                case 83: // S or down
                case 40:
                    MoveSouth(plrChar, x, y);
                    break;
            }
        }

        
         
        /// <summary>
        /// Finds a player in the array
        /// </summary>
        /// <param name="PlayerId"></param>
        /// <param name="plrChar">the unique char representing the player in the GameArray</param>
        /// <param name="x">the player's X coordinate, -1 if not found</param>
        /// <param name="y">the player's Y coordinate, -1 if not found</param>
        private static void FindEntity(char entityChar, out int x, out int y)
        {
           
            x = -1;
            y = -1;
            char chr;
            // find the plr
            for (int i = 0; i < 10; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    chr = BrainEatersGame.Instance.GameArray[i, j];
                    if (chr == entityChar)
                    {
                        x = i;
                        y = j;
                        // x and y are now the coordinates of the player
                        break;
                    }
                }
                if (x >= 0) { break; } // player found
            }
        }

        /// <summary>
        /// moves an entity to the left one cell,
        /// replaces the current location with an empty tile.
        /// </summary>
        /// <param name="entityChar">the character representation of the entity to be moved.</param>
        /// <param name="x">current x-coor of the thing</param>
        /// <param name="y">current y-coor of the thing</param>
        private static void MoveLeft(char entityChar, int x, int y)
        {
            if (x > 0) // to prevent moving off the grid.
            {
                BrainEatersGame.Instance.GameArray[x, y] = '-';
                x--;
                BrainEatersGame.Instance.GameArray[x, y] = entityChar;
            }
        }

        /// <summary>
        /// moves an entity to the right one cell,
        /// replaces the current location with an empty tile.
        /// </summary>
        /// <param name="entityChar">the character representation of the entity to be moved.</param>
        /// <param name="x">current x-coor of the thing</param>
        /// <param name="y">current y-coor of the thing</param>
        private static void MoveRight(char entityChar, int x, int y)
        {
            if (x < BrainEatersGame.Instance.GameArray.GetUpperBound(0))
            {
                BrainEatersGame.Instance.GameArray[x, y] = '-';
                x++;
                BrainEatersGame.Instance.GameArray[x, y] = entityChar;
            }
        }

        /// <summary>
        /// moves an entity north one cell,
        /// replaces the current location with an empty tile.
        /// </summary>
        /// <param name="entityChar">the character representation of the entity to be moved.</param>
        /// <param name="x">current x-coor of the thing</param>
        /// <param name="y">current y-coor of the thing</param>
        private static void MoveNorth(char entityChar, int x, int y)
        {
            if (y > 0)
            {
                BrainEatersGame.Instance.GameArray[x, y] = '-';
                y--;
                BrainEatersGame.Instance.GameArray[x, y] = entityChar;
            }
        }

        /// <summary>
        /// moves an entity down one cell,
        /// replaces the current location with an empty tile.
        /// </summary>
        /// <param name="entityChar">the character representation of the entity to be moved.</param>
        /// <param name="x">current x-coor of the thing</param>
        /// <param name="y">current y-coor of the thing</param>
        private static void MoveSouth(char entityChar, int x, int y)
        {
            if (y < BrainEatersGame.Instance.GameArray.GetUpperBound(1))
            {
                BrainEatersGame.Instance.GameArray[x, y] = '-';
                y++;
                BrainEatersGame.Instance.GameArray[x, y] = entityChar;
            }
        }
    }
}
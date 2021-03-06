﻿using BrainEaters.Models.BrainEaters;
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
        /// Creates a player and adds his PlrChar to the board
        /// </summary>
        /// <param name="playerName">the name of the player</param>
        internal static void AddPlayer(string CxnId, string playerName, string color)
        {

            var game = BrainEatersGame.Instance;
            var Plr = new Player();
            Plr.Name = playerName;
            Plr.PlrChar = (char)(game.Players.Count + 48);
            Plr.Id = CxnId;
            Plr.ConnectionId = CxnId;

            Plr.Color = color == "" ? Services.RandomColor() : color;

            game.Players.Add(Plr);

            // add player to upper left of game
            BrainEatersGame.Instance.GameArray[0, 0] = Plr.PlrChar;

            if (game.HighlightedPlayer == null)
            {
                game.HighlightedPlayer = Plr;
            }
        }

        /// <summary>
        /// Removes the Player from the PlayerList, and the Plrchar from the board
        /// </summary>
        /// <param name="CxnId">the connection Id of the player's client</param>
        internal static void RemovePlayer(Player player)
        {
            var game = BrainEatersGame.Instance;

            if (player != null)
            {
                // remove player from playerlist
                game.Players.Remove(player);
                // reset highlitedPlayer
                if (game.HighlightedPlayer == player)
                {
                    game.HighlightedPlayer = game.Players.LastOrDefault();
                }

                // remove plrChar from board
                int x, y = 0;
                if (FindEntity(player.PlrChar, out x, out y))
                {
                    game.GameArray[x, y] = '-';
                }


            }
            else
            {
                // TODO figure out a way to handle this.
            }

        }

        /// <summary>
        /// Moves the player inside the GameArray according to arrow keys or WSAD
        /// </summary>
        /// <param name="keyCode">the key pressed</param>
        public static void MovePlayer(string PlayerId, int keyCode)
        {
            var game = BrainEatersGame.Instance;
            var player = Services.GetPlayerById(game, PlayerId);

            switch (keyCode)
            {
                // short circuiting stops me from using (65 || 37)
                case 65: // A or left
                case 37:
                    if (player.Xcoor > 0)
                    {
                        player.Xcoor--;
                    }
                    break;
                case 68: // D or right
                case 39:
                    if (player.Xcoor < game.NumberCellCols - 1)
                    {
                        player.Xcoor++;
                    }
                    break;
                case 87: // W or up
                case 38:
                    if (player.Ycoor > 0)
                    {
                        player.Ycoor--;
                    }
                    break;
                case 83: // S or down
                case 40:
                    if (player.Ycoor < game.NumberCellRows - 1)
                    {
                        player.Ycoor++;
                    }
                    break;
            }

            HandleCollisions(game, player);
        }

        private static void HandleCollisions(BrainEatersGame game, Player player)
        {
            // check all players
            foreach (var otherplayer in game.Players)
            {
                // use short circuiting to do multiple checks at once
                if (player != otherplayer &&
                    (otherplayer.Xcoor == player.Xcoor && otherplayer.Ycoor == player.Ycoor))
                    {   // collision
                        if (player == game.HighlightedPlayer)
                        {
                            game.HighlightedPlayer = otherplayer;
                            return;
                        }
                        if (otherplayer == game.HighlightedPlayer)
                        {
                            game.HighlightedPlayer = player;
                            return;
                        }
                    }
            }
        }


        /// <summary>
        /// Finds the first instance of the char in the array
        /// </summary>
        /// <param name="PlayerId"></param>
        /// <param name="plrChar">the unique char representing the player in the GameArray</param>
        /// <param name="x">the player's X coordinate, -1 if not found</param>
        /// <param name="y">the player's Y coordinate, -1 if not found</param>
        private static bool FindEntity(char entityChar, out int x, out int y)
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
                        // x and y are now the coordinates of the char
                        break;
                    }
                }
                if (x >= 0) { break; } // char found
            }
            return (x != -1) ? true : false;
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

        /// <summary>
        /// VERY primitive reset function
        /// </summary>
        public static void ResetPlayers()
        {
            BrainEatersGame.Instance.Players = new List<Player>();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Diagnostics;
using BrainEaters.Models;

namespace BrainEaters.Hubs
{
    public class BrainEatersHub : Hub
    {
        private BrainEatersGame _game { get; set; }
        public BrainEatersHub()
        {
            _game = BrainEatersGame.Instance;
        }

        /// <summary>
        /// Calls the send message function in each [chat] client
        /// </summary>
        /// <param name="message">The message to be sent</param>
        public void SendMessage(string message) // server message
        {
            //SignalRUpdateGame.DoSomething() //C# methods from C# class
            Clients.All.SendMessage(message); // client message
        }

        /// <summary>
        /// Moves the player and calls each client to update it's game
        /// </summary>
        /// <param name="KyyCode"></param>
        public void KeyPressed(int KeyCode) 
        {
            GameEngine.MovePlayer(KeyCode);
            Clients.All.UpdateGame(_game);
        }

        /// <summary>
        /// Tells the client to update it's game. Not sure if needed.
        /// </summary>
        public void RequestGameState()
        {
            Clients.All.UpdateGame(_game);
        }

        /// <summary>
        /// Adds a player to the game
        /// Should be called once by each client
        /// </summary>
        /// <param name="name">The name provided by the client</param>
        public void AddPlayer(string Name)
        {

            var NewPlayerId = _game.Players.Count + 1;
            GameEngine.AddPlayer(NewPlayerId, Name);
            Clients.Caller.UpdateGame(_game);
        }
    }
}
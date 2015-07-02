using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Diagnostics;
using BrainEaters.Models;
using System.Threading.Tasks;
using BrainEaters.Models.BrainEaters;

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

            var Plr = BrainEatersGame.Instance.Players.Find(p => p.ConnectionId == Context.ConnectionId);
            Clients.All.PostMessage(Plr, message); 
        }

        /// <summary>
        /// Moves the player and calls each client to update it's game
        /// </summary>
        /// <param name="KeyCode"></param>
        public void KeyPressed(int KeyCode) 
        {
            GameEngine.MovePlayer(Context.ConnectionId, KeyCode);
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
            // TODO add a line to the chat when a player logs in or out. 
            var NewPlayerId = Context.ConnectionId;
            GameEngine.AddPlayer(NewPlayerId, Name);
            Clients.Caller.SetupGame(_game);
            Clients.Others.PostServerMessage(Name + " has joined the game.");
            Clients.Caller.PostServerMessage("Welcome to BrainEaters! You can chat with online users and play tag! Use WSAD or the arrow keys to control the game.");
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var plr = Services.GetPlayerById(_game, Context.ConnectionId);
            // For example: in a chat application, mark the user as offline, 
            // delete the association between the current connection id and user name.
            GameEngine.RemovePlayer(plr);
            Clients.All.UpdateGame(_game);

            Clients.All.PostServerMessage(plr.Name + " has left the game.");

            return base.OnDisconnected(stopCalled);
        }

    }
}
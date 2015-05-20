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
        public void SendMessage(string message) // server message
        {
            //SignalRUpdateGame.DoSomething()//C# methods from C# class
            Clients.All.SendMessage(message); // client message
        }

        public void KeyPressed(int keyCode) // server message
        {
            GameEngine.MovePlayer(keyCode);
            Clients.Caller.UpdateGame(_game);
        }

        public void RequestGameState()
        {
            Clients.Caller.UpdateGame(_game);
        }

        public void AddPlayer(string name)
        {
            GameEngine.AddPlayer(name);
            // add player to upper left of game
            Clients.Caller.UpdateGame(_game);
        }
    }
}
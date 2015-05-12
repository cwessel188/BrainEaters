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
        private BrainEatersGame game { get; set; }
        public BrainEatersHub()
        {
            var engine = new GameEngine();
            game = engine.LoadGame(500, 500, 50, 10, 10);
        }
        public void SendMessage(string message) // server message
        {
            //SignalRUpdateGame.DoSomething()//C# methods from C# class
            Clients.All.SendMessage(message); // client message
        }

        public void KeyPressed(int keyCode) // server message
        {
            Clients.All.KeyPressed(keyCode); // client message
        }

        public void SignalRUpdateGame(Object[] entities) // JSON here 
        {
            Trace.WriteLine("hit server");
            Clients.All.SignalRUpdateGame(entities); // more JSON
        }
    }
}
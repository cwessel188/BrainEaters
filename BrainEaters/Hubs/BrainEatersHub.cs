using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Diagnostics;

namespace BrainEaters.Hubs
{
    public class BrainEatersHub : Hub
    {
        public void SendMessage(string message) // server message
        {
            Clients.All.SendMessage(message); // client message
        }

        public void KeyPressed(int keyCode) // server message
        {
            Clients.All.KeyPressed(keyCode); // client message
        }

        public void SignalRUpdateGame(Object[] entities)
        {
            Clients.All.SignalRUpdateGame(entities); // client message
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace BrainEaters.Hubs
{
    public class BrainEatersHub : Hub
    {
        public void SendMessage(string message) // server message
        {
            Clients.All.SendMessage(message); // client message
        }
    }
}
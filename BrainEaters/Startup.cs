using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(BrainEaters.Startup))]

namespace BrainEaters
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // ConfigureAuth(app); because fuck Owin

            // add SignalR mapping
            app.MapSignalR();
        }
    }
}

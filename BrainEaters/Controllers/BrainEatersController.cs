using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BrainEaters.Controllers
{
    public class BrainEatersController : Controller
    {
        // GET: BrainEaters
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Chat()
        {
            return View();
        }
    }
}

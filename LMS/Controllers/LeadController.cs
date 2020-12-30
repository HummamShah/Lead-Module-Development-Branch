using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LMS.Controllers
{
    public class LeadController : Controller
    {
        // GET: Lead
        [Authorize(Roles = "Lead_Sales")]
        public ActionResult Index()
        {
            return View();
        }
        [Authorize(Roles = "Lead_Sales")]
        public ActionResult Add()
        {
            return View();
        }

        [Authorize(Roles = "Lead_Sales")]
        public ActionResult Detail()
        {
            return View();
        }

        [Authorize(Roles = "Lead_Sales")]
        public ActionResult Edit()
        {
            return View();
        }
    }
}
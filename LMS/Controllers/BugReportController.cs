using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LMS.Controllers
{
    public class BugReportController : Controller
    {
        // GET: BugReport
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult Add()
        {
            return View();
        }
    }
}
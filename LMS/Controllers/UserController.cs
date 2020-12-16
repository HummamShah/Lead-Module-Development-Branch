using LMS.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LMS.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        [Authorize(Roles = "Admin,SuperAdmin")]
        public ActionResult Index()
        {
            return View();
        }
        [Authorize(Roles = "Admin")]
        public ActionResult Add()
        {
            return View();
        }
        [Authorize(Roles ="SuperAdmin")]
        public ActionResult AddAdmin()
        {
            return View();
        }
    }
}
using LMS.Models.Feature.Lead;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using LMS.Models.Enums;

namespace LMS.Controllers.Api
{
    public class LeadApiController : ApiController
    {
        [HttpGet]
        public object GetListData()
        {
            var temp = new GetListingRequest();
            if (!User.IsInRole(Roles.Admin) && !User.IsInRole(Roles.SuperAdmin))
            {
                temp.UserId = User.Identity.GetUserId();
            }
            
            var result = temp.RunRequest(temp);
            return result;
        }
        [HttpPost]
        public object AddLead([FromBody] AddLeadRequest req) //If not working remove frombody
        {
            req.UserId = User.Identity.GetUserId();
            req.CreatedBy = User.Identity.Name;
            var result = req.RunRequest(req);
            return result;
        }
    }
}
using LMS.Models.Feature.Lead;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace LMS.Controllers.Api
{
    public class LeadApiController : ApiController
    {
        //[HttpGet]
        //public object GetListData()
        //{
        //    var temp = new GetListingRequest();
        //    var result = temp.RunRequest();
        //    return result;
        //}
        [HttpPost]
        public object AddLead([FromBody] AddLeadRequest req) //If not working remove frombody
        {
            req.CreatedBy = User.Identity.Name;
            var result = req.RunRequest(req);
            return result;
        }
    }
}
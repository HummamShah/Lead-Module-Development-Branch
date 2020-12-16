using LMS.Models.Feature.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LMS.Controllers.Api
{
    public class CompanyApiController : ApiController
    {
        // GET api/<controller>
        [HttpGet]
        public object GetListData()
        {
            var temp = new GetListingRequest();
            var result = temp.RunRequest();
            return result;
        }
        [HttpPost]
        public object AddCompany([FromBody] AddCompanyRequest req) //If not working remove frombody
        {
            req.CreatedBy = User.Identity.Name;
            var result = req.RunRequest(req);
            return result;
        }
        [HttpGet]
        public object GetCompany([FromUri] GetCompanyRequest req)
        {
            var result = req.RunRequest(req);
            return result;
        }
        [HttpPost]
        public object EditCompany(AddCompanyRequest req) 
        {
            req.CreatedBy = User.Identity.Name;
            var result = req.RunRequest(req);
            return result;
        }
    }
}
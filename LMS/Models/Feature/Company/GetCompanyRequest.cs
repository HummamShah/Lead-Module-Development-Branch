using LMS.Models.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LMS.Models.Feature.Company
{

    public class GetCompanyRequest
    {
		private Sharptel_Lms_DbEntities _dbContext = new Sharptel_Lms_DbEntities();
		public int Id { get; set; }
		public object RunRequest(GetCompanyRequest req)
		{
			var response = new GetCompanyResponse();
			var Data = _dbContext.Company.Where(x=>x.Id == req.Id).FirstOrDefault();
			response.Id = Data.Id;
			response.Name = Data.Name;
			response.Description = Data.Description;
			response.Address = Data.Address;
			response.Contact = Data.Contact;
			response.Email = Data.Email;
			response.CreatedAt = Data.CreatedAt;
			response.CreatedBy = Data.CreatedBy;
			response.UpdatedAt = Data.UpdatedAt;
			response.UpdatedBy = Data.UpdatedBy;
			
			return response;
		
	}
}
    public class GetCompanyResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
		public string UpdatedBy { get; set; }
		public DateTime? UpdatedAt { get; set; }

	}
}
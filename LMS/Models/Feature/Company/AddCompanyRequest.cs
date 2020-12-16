using LMS.Models.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LMS.Models.Feature.Company
{
  
	public class AddCompanyResponse
	{
		public bool IsVendorAdded { get; set; }
		public IEnumerable<string> ValidationErrors { get; set; }
	}
	public class AddCompanyRequest
	{
		private Sharptel_Lms_DbEntities _dbContext = new Sharptel_Lms_DbEntities();
		
		public string Name { get; set; }
		public string Description { get; set; }
		public string Email { get; set; }
		public string Address { get; set; }
		public string Contact { get; set; }
		public string CreatedBy { get; set; }
		public DateTime? CreatedAt { get; set; }

		public object RunRequest(AddCompanyRequest request)
		{
			var response = new AddCompanyResponse();
			var Company = new LMS.Models.EntityModel.Company();
			Company.CreatedAt = DateTime.Today;
			Company.CreatedBy = request.CreatedBy;
			Company.Description = request.Description;
			Company.Name = request.Name;
			Company.Address = request.Address;
			Company.Email = request.Email;
			Company.Contact = request.Contact;
			Company.HasBranches = false; // initially setting company with no branches
			var result = _dbContext.Company.Add(Company);
			_dbContext.SaveChanges();
			return response;
		}
	}
}
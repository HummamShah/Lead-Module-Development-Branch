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
		public int? ParentCompanyId { get; set; }
		public bool? IsBranch { get; set; }
		public string Address { get; set; }
		public string Contact { get; set; }
		public int? MOCId { get; set; }
		public int? BOT { get; set; }
		public int? CompanyAlternateContact { get; set; }
		public string Website { get; set; }
		public int? Area { get; set; }
		public int? City { get; set; }
		public int? NOE { get; set; } //Number of Employees
		public int? NoBracnhOffices { get; set; } //Number of Employees
		public int? BusinessIndustry { get; set; }
		public string NTN { get; set; }
		public string CurrentItPlatform { get; set; }
		public string FuturePlanOFExtention { get; set; }
		public int? CUDS { get; set; }
		public int? CUDSService { get; set; }
		public string CUDSOtherService { get; set; }
		public int NoLinks { get; set; }
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
			Company.IsBranch = request.IsBranch;
            if (Company.IsBranch == false)
            {
				Company.IsParent = true;
            }
            if (Company.IsBranch == true)
            {
				Company.IsParent = false;
				Company.ParentCompanyId = request.ParentCompanyId;
			}
			var result = _dbContext.Company.Add(Company);
			_dbContext.SaveChanges();
			return response;
		}
	}
}
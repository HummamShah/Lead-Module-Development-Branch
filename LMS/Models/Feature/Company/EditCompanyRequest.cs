using LMS.Models.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LMS.Models.Feature.Company
{
   
	public class EditCompanyResponse
	{
		public bool IsVendorAdded { get; set; }
		public IEnumerable<string> ValidationErrors { get; set; }
	}
	public class EditCompanyRequest
	{
		private Sharptel_Lms_DbEntities _dbContext = new Sharptel_Lms_DbEntities();
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string Email { get; set; }
		public string Address { get; set; }
		public string Contact { get; set; }
		public int? ParentCompanyId { get; set; }
		public bool? IsBranch { get; set; }
		public string UpdatedBy { get; set; }
		public DateTime? UpdatedAt { get; set; }

		public object RunRequest(EditCompanyRequest request)
		{
			var response = new EditCompanyResponse();
			var Company = _dbContext.Company.FirstOrDefault(x=>x.Id == request.Id);
			Company.UpdatedAt = DateTime.Today;
			Company.UpdatedBy = request.UpdatedBy;
			Company.Description = request.Description;
			Company.Name = request.Name;
			Company.Address = request.Address;
			Company.Email = request.Email;
			Company.Contact = request.Contact;
			
			if (request.IsBranch == false && Company.IsBranch==true)
			{
				//Company.IsParent = true;
				Company.ParentCompanyId = null;
				Company.IsBranch = request.IsBranch;
			}
            if (request.IsBranch == false)
            {
				Company.IsParent = true;
			}
			if (request.IsBranch == true)
			{
				Company.IsParent = false;
				Company.ParentCompanyId = request.ParentCompanyId;
			}
			_dbContext.SaveChanges();
			return response;
		}
	}
}
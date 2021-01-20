using LMS.Models.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LMS.Models.Feature.Lead
{
    
	public class AddQuotationResponse
	{
		public bool IsVendorAdded { get; set; }
		public IEnumerable<string> ValidationErrors { get; set; }
	}
	public class AddQuotationRequest
	{
		private Sharptel_Lms_DbEntities _dbContext = new Sharptel_Lms_DbEntities();

		public int LeadId { get; set; }
		public decimal? Quotation { get; set; }
		public int QuotationStatus { get; set; }
		public string QuotationRemarks { get; set; }
		public object RunRequest(AddQuotationRequest request)
		{
			var response = new AddQuotationResponse();
			var Lead = _dbContext.Lead.Where(x => x.Id == request.LeadId).FirstOrDefault() ;
			Lead.Quotation = request.Quotation;
			Lead.QuotationStatus = request.QuotationStatus;
			Lead.QuotationRemarks = request.QuotationRemarks;
			_dbContext.SaveChanges();
			return response;
		}
	}
}
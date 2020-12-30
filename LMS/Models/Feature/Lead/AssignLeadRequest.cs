using LMS.Models.EntityModel;
using LMS.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LMS.Models.Feature.Lead
{
	public class AssignLeadResponse
	{
		public bool IsUserAssigned { get; set; }
		public IEnumerable<string> ValidationErrors { get; set; }
	}
	public class AssignLeadRequest
	{
		private Sharptel_Lms_DbEntities _dbContext = new Sharptel_Lms_DbEntities();

		public int Id { get; set; }
		public string Type { get; set; }
		public int AssignedUserId { get; set; }
		

		public object RunRequest(AssignLeadRequest request)
		{
			var response = new AssignLeadResponse();
			var Lead = _dbContext.Lead.Where(x => x.Id == request.Id).FirstOrDefault();
            if (request.Type == AssigningType.Lead.ToString())
            {
				Lead.AssignedToId = request.AssignedUserId;
				Lead.LeadAssignedOn = DateTime.Now;
            }
            if (request.Type == AssigningType.PMD.ToString())
            {
				Lead.PmdAssignedOn = DateTime.Now;
				Lead.AssignedPmdId = request.AssignedUserId;
            }
			if (request.Type == AssigningType.PreSale.ToString())
			{
				Lead.PresaleAssignedOn = DateTime.Now;
				Lead.AssignedPreSaleId = request.AssignedUserId;
			}
			
			_dbContext.SaveChanges();
			return response;
		}
	}
}
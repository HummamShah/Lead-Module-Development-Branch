using LMS.Models.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LMS.Models.Feature.User
{
  
	public class GetAgentsForAssignmentResponse
	{
		public List<AgentsDropdownData> Data { get; set; }
	}
	public class AgentsDropdownData
	{
		public int Id { get; set; }
		public string Name { get; set; }

	}
	public class GetAgentsForAssignmentRequest
	{
		private Sharptel_Lms_DbEntities _dbContext = new Sharptel_Lms_DbEntities();
		public string Type { get; set; }
		public object RunRequest(GetAgentsForAssignmentRequest req)
		{
			var response = new GetAgentsForAssignmentResponse();
			response.Data = new List<AgentsDropdownData>();
			//TODO set data  according to type = pmd,presale,lead
			var Data = _dbContext.Agent;
			foreach (var d in Data)
			{
				var temp = new AgentsDropdownData();
				temp.Id = d.Id;
				temp.Name = d.FisrtName + " " + d.LastName;
				response.Data.Add(temp);
			}
			return response;
		}
	}
}
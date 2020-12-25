using LMS.Models.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LMS.Models.Feature.Company
{
	public class GetCompaniesDropdownResponse
	{
		public List<GetCompaniesDropdownData> Data { get; set; }
	}
	public class GetCompaniesDropdownData
	{
		public int Id { get; set; }
		public string Name { get; set; }

	}
	public class GetCompaniesDropdownRequest
	{
		private Sharptel_Lms_DbEntities _dbContext = new Sharptel_Lms_DbEntities();
		public object RunRequest()
		{
			var response = new GetCompaniesDropdownResponse();
			response.Data = new List<GetCompaniesDropdownData>();
			var Data = _dbContext.Company;
			foreach (var d in Data)
			{
				var temp = new GetCompaniesDropdownData();
				temp.Id = d.Id;
				temp.Name = d.Name;
				response.Data.Add(temp);
			}
			return response;
		}
	}
}
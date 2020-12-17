using LMS.Models.EntityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LMS.Models.Feature.Department
{
 
	public class GetDepartmentsDropdownResponse
	{
		public List<DepartmentDropDownData> Data { get; set; }
	}
	public class DepartmentDropDownData
	{
		public int Id { get; set; }
		public string Name { get; set; }

	}
	public class GetDepartmentsDropdownRequest
	{
		private Sharptel_Lms_DbEntities _dbContext = new Sharptel_Lms_DbEntities();
		public object RunRequest()
		{
			var response = new GetDepartmentsDropdownResponse();
			response.Data = new List<DepartmentDropDownData>();
			var Data = _dbContext.Department;
			foreach (var d in Data)
			{
				var temp = new DepartmentDropDownData();
				temp.Id = d.Id;
				temp.Name = d.Name;
				response.Data.Add(temp);
			}
			return response;
		}
	}
}
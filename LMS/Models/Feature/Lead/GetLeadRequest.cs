﻿using LMS.Models.EntityModel;
using LMS.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LMS.Models.Feature.Lead
{


	public class GetLeadRequest
	{
		private Sharptel_Lms_DbEntities _dbContext = new Sharptel_Lms_DbEntities();

		public int Id { get; set; }

		public object RunRequest(GetLeadRequest req)
		{
			var response = new GetLeadResponse();
			var Data = _dbContext.Lead.Where(x => x.Id == req.Id).FirstOrDefault();
			response.Id = Data.Id;
			response.Name = Data.Name;
			response.CompanyId = Data.CompanyId.Value;
			if (Data.CompanyId.HasValue)
			{
				response.CompanyName = Data.Company.Name;
			}
			response.Description = Data.Description;
			response.Address = Data.Address;
			response.Contact = Data.Contact;
			response.Email = Data.Email;
			response.CreatedAt = Data.CreatedAt;
			response.CreatedBy = Data.CreatedBy;
			response.UpdatedAt = Data.UpdatedAt;
			response.UpdatedBy = Data.UpdatedBy;
			response.Budget = Data.Budget;
			response.EstimatedClosingDate = Data.EstimatedClosingDate;
			response.Comments = Data.Comments;
			response.CompanyAlternateContact = Data.AlternateNumber;
			if (Data.AssignedToId.HasValue)
			{
				response.AssignedToName = Data.AssignedTo.FisrtName + Data.AssignedTo.LastName;
				response.AssignedToId = Data.AssignedToId;
				response.AssignedOn = Data.LeadAssignedOn;

			}

			if (Data.AssignedPmdId.HasValue)
			{
				response.AssingnedPmdName = Data.AssignedPMD.FisrtName +" " + Data.AssignedPMD.LastName;
				response.AssignedPmdId = Data.AssignedPmdId;
				response.PmdAssignedOn = Data.PmdAssignedOn;


			}
			if (Data.AssignedPreSaleId.HasValue)
			{
				response.AssignedPreSaleName = Data.AssignedPreSale.FisrtName + " " +  Data.AssignedPreSale.LastName;
				response.AssignedPreSaleId = Data.AssignedPreSaleId;
				response.PreSaleAssignedOn = Data.PresaleAssignedOn;

			}
			if (Data.Domain != null)
			{
				response.Domain = Data.Domain;
				response.DomainName = ((Domain)Data.Domain.Value).ToString();
			}
			if (Data.ModeOfCommunication != null)
			{
				response.MOCId = Data.ModeOfCommunication;
				response.MOCName = ((ModeOfCommunication)Data.ModeOfCommunication.Value).ToString();
			}
			if (Data.BusinessOperationTime.HasValue)
			{
				response.BOTEnum = ((BusinessOperationTime)Data.BusinessOperationTime.Value).ToString();
				response.BOT = Data.BusinessOperationTime;
			}
			if (Data.City.HasValue)
			{
				response.City = Data.City;
				response.CityEnum = ((City)Data.City.Value).ToString();
			}

			if (Data.LeadStatus.HasValue)
			{
				response.LeadStatus = Data.LeadStatus.Value;
				response.LeadStatusEnum = ((LeadStatus)Data.LeadStatus.Value).ToString();
			}
			if (Data.PmdStatus.HasValue)
			{
				response.PmdStatus = Data.PmdStatus.Value;
				response.PmdStatusEnum = ((PmdStatus)Data.PmdStatus.Value).ToString();
			}
			if (Data.QuotationStatus.HasValue)
			{
				response.QuotationStatus = Data.QuotationStatus.Value;
				response.QuotationStatusEnum = ((QuotationStatus)Data.QuotationStatus.Value).ToString();
			}

			if (Data.Area.HasValue)
			{
				response.Area = Data.Area;
				response.AreaEnum = ((Area)Data.Area.Value).ToString();
			}
			if (Data.NoEmployee.HasValue)
			{
				response.NOE = Data.NoEmployee;
				response.NOEEnum = ((NumberOfEmployeed)Data.NoEmployee.Value).ToString();
			}
			if (Data.BusinessIndustry.HasValue)
			{
				response.BusinessIndustry = Data.BusinessIndustry;
				response.BusinessIndustryEnum = ((BusinessSegmentation)Data.BusinessIndustry.Value).ToString();
			}
			if (Data.CUDS.HasValue)
			{
				response.CUDS = Data.CUDS;
				response.CUDSEnum = ((DataServices)Data.CUDS.Value).ToString();
			}
			if (Data.CUDSService.HasValue)
			{
				response.CUDSService = Data.CUDSService;
				if (Data.CUDS == (int)DataServices.WiWax)
				{
					response.CUDSServiceEnum = ((WiWax)Data.CUDSService.Value).ToString();
				}
				if (Data.CUDS == (int)DataServices.Fiber)
				{
					response.CUDSServiceEnum = ((Fiber)Data.CUDSService.Value).ToString();
				}
				if (Data.CUDS == (int)DataServices.VSAT)
				{
					response.CUDSServiceEnum = ((VSAT)Data.CUDSService.Value).ToString();
				}
				if (Data.CUDS == (int)DataServices.DSL)
				{
					response.CUDSServiceEnum = ((DSL)Data.CUDSService.Value).ToString();
				}
				if (Data.CUDS == (int)DataServices.Other)
				{
					response.CUDSServiceEnum = Data.CUDSOtherService;//((DSL)Data.CUDSService.Value).ToString();
				}
			}
			response.IsEsisting = Data.IsEsisting;
			response.HasTriedOurServie = Data.HasTriedOurServie;
			response.NTN = Data.NTN;
			response.IsApproved = Data.IsApproved;
			response.ContactPersonName = Data.ContactPersonName;
			response.ContactPersonNumber = Data.ContactPersonNumber;
			response.NoBracnhOffices = Data.NumberOfBranchOffices;
			response.Website = Data.Website;
			response.CurrentItPlatform = Data.CurrentItPlatform;
			response.NoLinks = Data.NoLinks;

			return response;
		}

		public class GetLeadResponse
		{
			public int Id { get; set; }
			public int CompanyId { get; set; }
			public string CompanyName { get; set; }
			public string Name { get; set; }
			public string ContactPersonName {get; set;}
			public string CompanyAlternateContact { get; set; }
			public string ContactPersonNumber { get; set; }
			public string Description { get; set; }
			public int? City { get; set; }
			public string CityEnum { get; set; }
			public string Website { get; set; }
			public string Email { get; set; }
			public string Address { get; set; }
			public int? NoBracnhOffices { get; set; }
			public string Contact { get; set; }
			public int? Domain { get; set; }
			public string NTN { get; set; }
			public string DomainName { get; set; }
			public int? MOCId { get; set; }
			public string MOCName { get; set; }
			public int? BOT { get; set; }
			public string BOTEnum { get; set; }
			public decimal? Budget { get; set; }
			public DateTime? EstimatedClosingDate { get; set; }
			public string Comments { get; set; }
			public int? NOE { get; set; } //Number of Employees may be change it to string
			public string NOEEnum { get; set; }
			public string CurrentItPlatform { get; set; }
			public int? BusinessIndustry { get; set; }
			public string BusinessIndustryEnum { get; set; }
			public int? CUDS { get; set; }
			public string CUDSEnum { get; set; }
			public int? CUDSService { get; set; }
			public string CUDSServiceEnum { get; set; }
			public string CUDSOtherService{ get; set;}
			public int? NoLinks { get; set; }
			public int? AssignedToId { get; set; }
			public string AssignedToName { get; set; }
			public DateTime? AssignedOn { get; set; }
			public int? AssignedPmdId { get; set; }
			public string AssingnedPmdName { get; set; }
			public int? AssignedPreSaleId { get; set; }
			public string AssignedPreSaleName { get; set; }
			public bool? HasTriedOurServie { get; set; }
			public int LeadStatus { get; set; }
			public string LeadStatusEnum { get; set; }
			public int? PmdStatus { get; set; }
			public string PmdStatusEnum { get; set; }
			public int QuotationStatus { get; set; }
			public string QuotationStatusEnum { get; set; }
			public bool? IsApproved { get; set; }
			public bool? IsEsisting { get; set; }
			public DateTime? PmdAssignedOn { get; set; }
			public DateTime? PreSaleAssignedOn { get; set; }
			public int? Area { get; set; }
			public string AreaEnum { get; set; }
			public string CreatedBy { get; set; }
			public DateTime? CreatedAt { get; set; }
			public string UpdatedBy { get; set; }
			public DateTime? UpdatedAt { get; set; }

		}
	}
}
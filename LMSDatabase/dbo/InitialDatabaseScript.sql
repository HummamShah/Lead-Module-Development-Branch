﻿
CREATE TABLE [dbo].[AspNetRoles] (
    [Id]   NVARCHAR (128) NOT NULL,
    [Name] NVARCHAR (256) NOT NULL,
    CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [dbo].[AspNetUsers] (
    [Id]                   NVARCHAR (128) NOT NULL,
    [Email]                NVARCHAR (256) NULL,
    [EmailConfirmed]       BIT            NOT NULL,
    [PasswordHash]         NVARCHAR (MAX) NULL,
    [SecurityStamp]        NVARCHAR (MAX) NULL,
    [PhoneNumber]          NVARCHAR (MAX) NULL,
    [PhoneNumberConfirmed] BIT            NOT NULL,
    [TwoFactorEnabled]     BIT            NOT NULL,
    [LockoutEndDateUtc]    DATETIME       NULL,
    [LockoutEnabled]       BIT            NOT NULL,
    [AccessFailedCount]    INT            NOT NULL,
    [UserName]             NVARCHAR (256) NOT NULL,
    CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED ([Id] ASC)
);
CREATE TABLE [dbo].[AspNetUserRoles] (
    [UserId] NVARCHAR (128) NOT NULL,
    [RoleId] NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK_dbo.AspNetUserRoles] PRIMARY KEY CLUSTERED ([UserId] ASC, [RoleId] ASC),
    CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [dbo].[AspNetUserLogins] (
    [LoginProvider] NVARCHAR (128) NOT NULL,
    [ProviderKey]   NVARCHAR (128) NOT NULL,
    [UserId]        NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK_dbo.AspNetUserLogins] PRIMARY KEY CLUSTERED ([LoginProvider] ASC, [ProviderKey] ASC, [UserId] ASC),
    CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [dbo].[AspNetUserClaims] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [UserId]     NVARCHAR (128) NOT NULL,
    [ClaimType]  NVARCHAR (MAX) NULL,
    [ClaimValue] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_dbo.AspNetUserClaims] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [dbo].[Company]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[Name] nvarchar (max) ,
	[IsBranch] bit,
	[IsParent] bit,
	[ParentCompanyId] int,
	[Latitude] float,
	[Longitude] float,
	[Address] nvarchar(max),
	[Contact]  nvarchar (max) ,
	[Email]  nvarchar (max) ,
	[Description] nvarchar(max),
	[ModeOfCommunication] int,
	[BusinessOperationTime] int,
	[AlternateNumber] nvarchar(max),
	[Website] nvarchar(max),
	[Area] int,
	[City] int,
	[NoEmployee] int,
	[BusinessIndustry] int,
	[CurrentItPlatform] nvarchar(max),
	[CUDS]int,
	[CUDSService] int,
	[CUDSOtherService] nvarchar(max),
	[NoLinks] int,
	[NTN] nvarchar(max),
	[NumberOfBranchOffices] int,
	[CreatedAt] Datetime ,
	[UpdatedAt] Datetime ,
	[CreatedBy] nvarchar(max),
	[UpdatedBy] nvarchar(max),
    Constraint [FK_Company_ParentCompany] foreign key ([ParentCompanyId]) References [dbo].[Company] ([Id]),
)
CREATE TABLE [dbo].[CompanyBranches]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[CompanyId] int,
	[BranchName] nvarchar(max),
	[BranchCode] nvarchar(max),
	[Latitude] float,
	[Longitude] float,
	[Address] nvarchar(max),
	Constraint [FK_Agent_Company] foreign key ([CompanyId]) References [dbo].[Company] ([Id]),
)
CREATE TABLE [dbo].[Department]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[Name] nvarchar(max),
	[Description] nvarchar(max),
	[CreatedBy] nvarchar(max),
	[CreatedAt] DateTime,
	[UpdatedBy] nvarchar(max),
	[UpdatedAt] DateTime,
)

CREATE TABLE [dbo].[Agent]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[UserId] nvarchar(128),
	[UserName] nvarchar(max),
    [FisrtName] nvarchar(max),
	[LastName] nvarchar(max),
	[Contact1] nvarchar(max),
	[Contact2] nvarchar(max),
	[Address] nvarchar(max),
	[Designation] int,
	[DepartmentId] int,
	[Email] nvarchar(max),
	[ImageUrl] nvarchar(max),
	[IsActive] bit,
	[SuperVisorId] int,
	[IsSupervisor] bit,
	[HasSupervisor] bit,
	[CreatedBy] nvarchar(max),
	[CreatedAt] DateTime,
	[UpdatedBy] nvarchar(max),
	[UpdatedAt] DateTime,
	Constraint [FK_Agent_User] foreign key ([UserId]) References [dbo].[AspNetUsers] ([Id]),
	Constraint [FK_Agent_Agent] foreign key ([SuperVisorId]) References [dbo].[Agent] ([Id]),
	Constraint [FK_Agent_Department] foreign key ([DepartmentId]) References [dbo].[Department] ([Id])
)

CREATE TABLE [dbo].[Employee]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[Name] nvarchar (max) ,
	[CompanyId] int,
	[Contact1] nvarchar(max),
	[Contact2] nvarchar(max),
	[Email] nvarchar(max),
	[Description] nvarchar(max),
	[CreatedAt] Datetime ,
	[UpdatedAt] Datetime ,
	[CreatedBy] nvarchar(max),
	[UpdatedBy] nvarchar(max),
    Constraint [FK_Emp_Comp] foreign key ([CompanyId]) References [dbo].[Company] ([Id])
)
CREATE TABLE [dbo].[Lead]
(
	[AgentId] int not null default(0),
    [Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[CompanyName] nvarchar(max),
	[ContactPersonName] nvarchar(max),
	[ContactPersonNumber] nvarchar(max),
	[ContactPersonEmail] nvarchar(max),
	[ContactPersonTitle] nvarchar(max),
	[ContactPersonDepartment] nvarchar(max),
	[CompanyId] int,
	[Name] nvarchar(max),
	[Domain] int,
	[Address] nvarchar(max),
	[Contact]  nvarchar (max) ,
	[Email]  nvarchar (max) ,
	[AlternateNumber] nvarchar(max),
	[Website] nvarchar(max),
	[Area] int,
	[City] int,
	[Description] nvarchar(max),
	[ModeOfCommunication] int,
	[BusinessOperationTime] int,
	[NoEmployee] int,
	[BusinessIndustry] int,
	[CurrentItPlatform] nvarchar(max),
	[CUDS]int,
	[CUDSService] int,
	[CUDSOtherService] nvarchar(max),
	[NoLinks] int,
	[NTN] nvarchar(max),
	[NumberOfBranchOffices] int,
	[EstimatedClosingDate] datetime,
	[IsEsisting] bit,
	[HasTriedOurServie] bit,
	[Comments] nvarchar(max),
	[Budget] decimal(18,3),
	
	[AssignedPmdId] int,
	[PmdAssignedOn] DateTime,
	[PresaleAssignedOn] DateTime,
	[LeadAssignedOn] DateTime,
	[AssignedPreSaleId] int,
	[AssignedToId] int,
	[LeadRemarks] nvarchar(max),
	[LeadStatus] int,
	[PmdStatus] int,
	[PmdRemarks] nvarchar(max),
	[QuotationStatus] int,
	[QuotationRemarks] nvarchar(max),
	[IsApproved] bit,
	[AdminRemarks] nvarchar(max),
	
	
	[CreatedBy] nvarchar(max),
	[CreatedAt] DateTime,
	[UpdatedBy] nvarchar(max),
	[UpdatedAt] DateTime,
	Constraint [FK_Lead_Company] foreign key ([CompanyId]) References [dbo].[Company] ([Id]),
	Constraint [FK_Lead_Agent_PMD] foreign key ([AssignedPmdId]) References [dbo].[Agent] ([Id]),
	Constraint [FK_Lead_Agent_PreSale] foreign key ([AssignedPreSaleId]) References [dbo].[Agent] ([Id]),
	Constraint [FK_Lead_Agent_Lead] foreign key ([AssignedToId]) References [dbo].[Agent] ([Id]),
	Constraint [FK_Lead_Agent_Creator] foreign key ([AgentId]) References [dbo].[Agent] ([Id]),
)
CREATE TABLE [dbo].[Vendor]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[Name] nvarchar(max),
	[Type] int,
	[Description] nvarchar(max),
	[CreatedBy] nvarchar(max),
	[CreatedAt] DateTime,
	[UpdatedBy] nvarchar(max),
	[UpdatedAt] DateTime,
)
CREATE TABLE [dbo].[PmdDetails]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[LeadId] int,
	[VendorId] int,
	[OTC] decimal(18,3),
	[MRC] decimal(18,3),
	[Bandwidth] nvarchar(max),
	[Remarks] nvarchar(max),
    [CreatedBy] nvarchar(max),
	[CreatedAt] DateTime,
	[UpdatedBy] nvarchar(max),
	[UpdatedAt] DateTime,
	Constraint [FK_PMD_Leads] foreign key ([LeadId]) References [dbo].[Lead] ([Id]),
	Constraint [FK_PMD_Vendor] foreign key ([VendorId]) References [dbo].[Vendor] ([Id])
)



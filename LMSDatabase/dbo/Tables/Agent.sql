﻿CREATE TABLE [dbo].[Agent]
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
	[CreatedBy] nvarchar(max),
	[CreatedAt] DateTime,
	[UpdatedBy] nvarchar(max),
	[UpdatedAt] DateTime,
	Constraint [FK_Agent_User] foreign key ([UserId]) References [dbo].[AspNetUsers] ([Id]),
	Constraint [FK_Agent_Department] foreign key ([DepartmentId]) References [dbo].[Department] ([Id])
)
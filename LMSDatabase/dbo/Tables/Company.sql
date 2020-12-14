CREATE TABLE [dbo].[Company]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[Name] nvarchar (max) ,
	[HasBranches] bit,
	[Latitude] float,
	[Longitude] float,
	[Address] nvarchar(max),
	[Contact]  nvarchar (max) ,
	[Email]  nvarchar (max) ,
	[Description] nvarchar(max),
	[CreatedAt] Datetime ,
	[UpdatedAt] Datetime ,
	[CreatedBy] nvarchar(max),
	[UpdatedBy] nvarchar(max)
)

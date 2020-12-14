CREATE TABLE [dbo].[Notification]
(
	[Id] INT NOT NULL PRIMARY KEY Identity(1,1),
	[AgentId] int,
	[Content] nvarchar(max),
	[IsActive] bit,
	[CreatedBy] nvarchar(max),
	[CreatedAt] DateTime,
	[UpdatedBy] nvarchar(max),
	[UpdatedAt] DateTime,
	Constraint [FK_Notification_Agent] foreign key ([AgentId]) References [dbo].[Agent] ([Id])
)

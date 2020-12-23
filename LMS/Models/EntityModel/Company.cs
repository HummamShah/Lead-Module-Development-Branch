//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LMS.Models.EntityModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class Company
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Company()
        {
            this.CompanyBranches = new HashSet<CompanyBranches>();
            this.ParentCompanies = new HashSet<Company>();
            this.Employee = new HashSet<Employee>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<bool> IsBranch { get; set; }
        public Nullable<bool> IsParent { get; set; }
        public Nullable<int> ParentCompanyId { get; set; }
        public Nullable<double> Latitude { get; set; }
        public Nullable<double> Longitude { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<int> ModeOfCommunication { get; set; }
        public Nullable<int> BusinessOperationTime { get; set; }
        public string AlternateNumber { get; set; }
        public string Website { get; set; }
        public Nullable<int> Area { get; set; }
        public Nullable<int> City { get; set; }
        public Nullable<int> NoEmployee { get; set; }
        public Nullable<int> BusinessIndustry { get; set; }
        public string CurrentItPlatform { get; set; }
        public Nullable<int> CUDS { get; set; }
        public Nullable<int> CUDSService { get; set; }
        public string CUDSOtherService { get; set; }
        public Nullable<int> NoLinks { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CompanyBranches> CompanyBranches { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Company> ParentCompanies { get; set; }
        public virtual Company ParentCompany { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Employee> Employee { get; set; }
    }
}

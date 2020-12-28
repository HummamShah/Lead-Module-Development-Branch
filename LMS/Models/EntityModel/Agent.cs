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
    
    public partial class Agent
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Agent()
        {
            this.Agent1 = new HashSet<Agent>();
            this.Lead = new HashSet<Lead>();
            this.Lead1 = new HashSet<Lead>();
            this.Lead2 = new HashSet<Lead>();
            this.Lead3 = new HashSet<Lead>();
        }
    
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string FisrtName { get; set; }
        public string LastName { get; set; }
        public string Contact1 { get; set; }
        public string Contact2 { get; set; }
        public string Address { get; set; }
        public Nullable<int> Designation { get; set; }
        public Nullable<int> DepartmentId { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<int> SuperVisorId { get; set; }
        public Nullable<bool> IsSupervisor { get; set; }
        public Nullable<bool> HasSupervisor { get; set; }
    
        public virtual Department Department { get; set; }
        public virtual AspNetUsers AspNetUsers { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Agent> Agent1 { get; set; }
        public virtual Agent Agent2 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Lead> Lead { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Lead> Lead1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Lead> Lead2 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Lead> Lead3 { get; set; }
    }
}

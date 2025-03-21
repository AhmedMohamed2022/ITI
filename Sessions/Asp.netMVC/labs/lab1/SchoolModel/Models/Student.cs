using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolModel.Models
{
    public class Student
    {
        
            public int Id { get; set; }
            public string? Name { get; set; }
            public DateTime? DateOfBirth { get; set; }
            public string? Email { get; set; }
            public string? Phone { get; set; }
            public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
            public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
        
            
    }
    public class StudentConfiguration : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.HasKey(s => s.Id);
        }
    }

}

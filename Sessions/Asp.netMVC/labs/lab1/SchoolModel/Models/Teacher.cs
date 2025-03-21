using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolModel.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Subject { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
    }
    public class TeacherConfiguration : IEntityTypeConfiguration<Teacher>
    {
        public void Configure(EntityTypeBuilder<Teacher> builder)
        {
            builder.HasKey(t => t.Id);

      
        }
    }
}

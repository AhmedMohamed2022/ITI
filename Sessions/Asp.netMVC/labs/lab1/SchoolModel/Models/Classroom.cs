using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolModel.Models
{
    public class Classroom
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Capacity { get; set; }
        public string? Location { get; set; }
        public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
    }
    public class ClassroomConfiguration : IEntityTypeConfiguration<Classroom>
    {
        public void Configure(EntityTypeBuilder<Classroom> builder)
        {
            builder.HasKey(cr => cr.Id);

            //builder.HasOne(e => e.Student)
            //    .WithMany(s => s.Enrollments)
            //    .HasForeignKey(e => e.StudentId);
        }
    }
}

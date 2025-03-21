using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolModel.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Credits { get; set; }
        public int? TeacherId { get; set; }
        public virtual Teacher? Teacher { get; set; }
        public int? ClassroomId { get; set; }
        public virtual Classroom? Classroom { get; set; }
        public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
        public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
    }
    public class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasKey(c => c.Id);

            builder.HasOne(c => c.Teacher)
                .WithMany(t => t.Courses)
                .HasForeignKey(c => c.TeacherId);

            builder.HasOne(c => c.Classroom)
                .WithMany(cr => cr.Courses)
                .HasForeignKey(c => c.ClassroomId);

        }
    }
}

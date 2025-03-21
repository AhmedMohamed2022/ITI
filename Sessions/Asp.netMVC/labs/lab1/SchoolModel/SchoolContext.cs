using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SchoolModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolModel
{
    public class SchoolContext: IdentityDbContext<User>
    {
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Student> Students{ get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Course> Courses  { get; set; }
        public DbSet<Classroom> classrooms{ get; set; }
        public DbSet<Attendance> Attendances { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //MultipleActiveResultSets = True
            optionsBuilder.UseLazyLoadingProxies().UseSqlServer("Data Source=localhost\\SQL2022; Initial Catalog=SchoolDB; Integrated Security=True; TrustServerCertificate=True;");
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new StudentConfiguration());
            builder.ApplyConfiguration(new TeacherConfiguration());
            builder.ApplyConfiguration(new CourseConfiguration());
            builder.ApplyConfiguration(new EnrollmentConfiguration());
            builder.ApplyConfiguration(new ClassroomConfiguration());
            builder.ApplyConfiguration(new AttendanceConfiguration());

            builder.DataSeedingMethod();

            base.OnModelCreating(builder);
        }
    }
}

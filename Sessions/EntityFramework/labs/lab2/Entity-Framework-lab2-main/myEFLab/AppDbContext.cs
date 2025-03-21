using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class AppDbContext : DbContext
{
    public DbSet<Student> Students { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }
    public DbSet<Attendance> Attendance { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Classroom> Classrooms { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseInMemoryDatabase("TestDatabase");
    // protected override void OnConfiguring(DbContextOptionsBuilder options)
    // => options.UseSqlite("Data Source=school.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>()
            .HasMany(std => std.Enrollments)
            .WithOne(enrl => enrl.Student)
            .HasForeignKey(enrl => enrl.StudentId);

        modelBuilder.Entity<Course>()
            .HasMany(crs => crs.Enrollments)
            .WithOne(enrl => enrl.Course)
            .HasForeignKey(enrl => enrl.CourseId);

        modelBuilder.Entity<Student>()
            .HasMany(std => std.Attendances)
            .WithOne(attnd => attnd.Student)
            .HasForeignKey(attnd => attnd.StudentId);

        modelBuilder.Entity<Course>()
            .HasMany(crs => crs.Attendances)
            .WithOne(attnd => attnd.Course)
            .HasForeignKey(attnd => attnd.CourseId);

        modelBuilder.Entity<Teacher>()
            .HasMany(tchr => tchr.Courses)
            .WithOne(crs => crs.Teacher)
            .HasForeignKey(crs => crs.TeacherId);

        modelBuilder.Entity<Classroom>()
            .HasMany(clsrom => clsrom.Courses)
            .WithOne(crs => crs.Classroom)
            .HasForeignKey(crs => crs.ClassroomId);

        base.OnModelCreating(modelBuilder);
    }
}

public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
}

public class Course
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Credits { get; set; }
    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
    public int TeacherId {get;set;}
    public Teacher Teacher {get;set;}
    public int ClassroomId {get;set;}
    public Classroom Classroom {get;set;}
}
public class Teacher
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Subject { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public ICollection<Course> Courses { get; set; } = new List<Course>();
}
public class Classroom
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Capacity { get; set; }
    public string Location { get; set; }
    public ICollection<Course> Courses { get; set; } = new List<Course>();
}
public class Enrollment
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public Student Student { get; set; }
    public string Grade { get; set; }
    public int CourseId { get; set; }
    public Course Course { get; set; }
}
public class Attendance
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public Student Student { get; set; }
    public int CourseId { get; set; }
    public Course Course { get; set; }

    public DateTime Date { get; set; }
    public bool IsPresent { get; set; }
}

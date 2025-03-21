using System;
using System.Linq;

class Program
{
    static void Main()
    {
        using var db = new AppDbContext();

        // Create a new student
        var student = new Student
        {
            Name = "Ahmed",
            DateOfBirth = new DateTime(2002, 5, 2),
            Email = "ahmed@gmail.com",
            Phone = "011545694"
        };

        // Create a new teacher
        var teacher = new Teacher
        {
            Name = "Mr. Ahmed",
            Subject = "C# Programming",
            Email = "mrahmed@gmail.com",
            Phone = "011545694"
        };
        db.Teachers.Add(teacher);
        db.SaveChanges(); // Save to get the ID

        // Create a classroom
        var classroom = new Classroom
        {
            Name = "Classroom 1",
            Capacity = 25,
            Location = "ITI Aswan"
        };
        db.Classrooms.Add(classroom);
        db.SaveChanges(); // Save to get the ID

        // Create a new course
        var course = new Course
        {
            Name = "C# Programming",
            Credits = 3,
            TeacherId = teacher.Id, // Assign teacher
            ClassroomId = classroom.Id // Assign classroom
        };

        // Create an enrollment (linking student to course)
        var enrollment = new Enrollment
        {
            Student = student,
            Course = course,
            Grade = "A"
        };

        // Create attendance
        var attendance = new Attendance
        {
            Student = student,
            Course = course,
            Date = new DateTime(2025, 3, 8),
            IsPresent = true
        };

        // Add another course
        var course2 = new Course
        {
            Name = "Database Systems",
            Credits = 4,
            TeacherId = teacher.Id,
            ClassroomId = classroom.Id
        };

        // Enroll the student in a second course
        var enrollment2 = new Enrollment { Student = student, Course = course2, Grade = "B+" };

        // Add to database
        db.Students.Add(student);
        db.Courses.Add(course);
        db.Courses.Add(course2);
        db.Enrollments.Add(enrollment);
        db.Enrollments.Add(enrollment2);
        db.Attendance.Add(attendance);
        db.SaveChanges();

        Console.WriteLine("✅ Data added successfully!\n");

        // Read and verify relationships
        var enrolledStudents = db.Students.ToList();
        var availableCourses = db.Courses.ToList();
        
        foreach (var s in enrolledStudents)
        {
            Console.WriteLine($"📌 Student: {s.Name} (Email: {s.Email})");

            foreach (var enrl in db.Enrollments.Where(e => e.StudentId == s.Id).ToList())
            {
                var enrolledCourse = db.Courses.FirstOrDefault(c => c.Id == enrl.CourseId);
                Console.WriteLine($"  - 📚 Enrolled in: {enrolledCourse?.Name}, Grade: {enrl.Grade}");
            }

            foreach (var attnd in db.Attendance.Where(att => att.StudentId == s.Id).ToList())
            {
                Console.WriteLine($"  - 🎓 Attended: {attnd.Date.ToShortDateString()}, Present: {attnd.IsPresent}");
            }
        }

        foreach (var courseObj in availableCourses)
        {
            var assignedTeacher = db.Teachers.FirstOrDefault(t => t.Id == courseObj.TeacherId);
            var assignedClassroom = db.Classrooms.FirstOrDefault(c => c.Id == courseObj.ClassroomId);

            Console.WriteLine($"📖 Course: {courseObj.Name} (Credits: {courseObj.Credits})");
            Console.WriteLine($"   - 🧑‍🏫 Teacher: {assignedTeacher?.Name} ({assignedTeacher?.Subject})");
            Console.WriteLine($"   - 🏫 Classroom: {assignedClassroom?.Name} (Capacity: {assignedClassroom?.Capacity})");
        }
    }
}

using SchoolModel.Models;
using System.ComponentModel.DataAnnotations;


namespace StudentViewModel
{
    public class AddStudentViewModel
    {
        [Required(ErrorMessage ="Must Enter Student Name")]
        [StringLength(100,MinimumLength =3,ErrorMessage ="Name must be between 3 and 100 letters")]
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }= DateTime.Now;
        [Required(ErrorMessage = "Must Enter Student Email")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 100 letters")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Must Enter Student Phone")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 100 letters")]
        public string Phone { get; set; }
        //public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
        //public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
    }
    
}

using SchoolModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentViewModel
{
    public static class StudentExt
    {
        public static Student ToModel(this AddStudentViewModel viewModel)
        {
            return new Student
            {
                Name = viewModel.Name,
                Email = viewModel.Email,
                Phone = viewModel.Phone
            };
        }
        public static StudentDetailsViewModel ToDetailsModel(this Student student)
        {
            return new StudentDetailsViewModel
            {
                
                Name = student.Name ??"no name",
                Email = student.Email??"no Emali"
               
            };
        }
    }
}

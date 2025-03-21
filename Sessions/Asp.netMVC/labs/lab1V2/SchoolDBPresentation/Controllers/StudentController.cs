using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SchoolModel;
using SchoolModel.Models;
using StudentViewModel;
using Shool.Managers;

namespace SchoolDBPresentation.Controllers
{
    public class StudentController : Controller
    {
        private StudentManager studentManager;
        public StudentController()
        {
            studentManager = new StudentManager();
        }
        [HttpGet]
        public IActionResult AddStudent()
        {
            return View();
        }
        [HttpPost]
        public IActionResult AddStudent(AddStudentViewModel viewModel)
        {
            if(ModelState.IsValid)
            {
               studentManager.Add(viewModel.ToModel());
              
            }
            return View();
        }
        public IActionResult index()
        {
            return View();
        }
        public IActionResult ViewAllStudents()
        {
            var list = studentManager.Get().Select(s => s.ToDetailsModel()).ToList();
            return View(list);
        }
        public IActionResult SearchForStudent(string searchText="",int pageNum=1,int pageSize=4)
        {
            var list = studentManager.Search(searchText: searchText, pageNumber: pageNum, pageSize: pageSize);
            return View(list);
        }
  
    }
}

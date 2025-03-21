using Microsoft.AspNetCore.Mvc;
using SchoolModel;
using SchoolModel.Models;

namespace SchoolDBPresentation.Controllers
{
    public class CourseController : Controller
    {
        private SchoolContext schoolConxt = new SchoolContext();

        public IActionResult Course()
        {

            return View();
        }
        public IActionResult ViewCourses()
        {
        var list = schoolConxt.Courses.ToList();

            return View(list);
        }
        [HttpGet]
        public IActionResult AddCourse()
        {
            return View();
        }
        [HttpPost]
        public IActionResult AddCourse(Course course)
        {
            schoolConxt.Courses.Add(course);
            schoolConxt.SaveChanges();
            return RedirectToAction("ViewCourses");
        }
        [HttpGet]
        public IActionResult EditCourse(int id)
        {
            var TargetCourse=schoolConxt.Courses.FirstOrDefault(c => c.Id == id);
            return View(TargetCourse);
        }
        [HttpPost]
        public IActionResult EditCourse(Course course)
        {
            schoolConxt.Courses.Update(course);
            schoolConxt.SaveChanges();
            return RedirectToAction("ViewCourses");
        }
        [HttpPost]
        public IActionResult DeleteCourse(int id)
        {
            var TargetCourseToDelete=schoolConxt.Courses.FirstOrDefault(c => c.Id == id);
            if (TargetCourseToDelete == null)
                return NotFound();
            schoolConxt.Courses.Remove(TargetCourseToDelete);
            schoolConxt.SaveChanges();           
            return RedirectToAction("ViewCourses");
        }
    }
}

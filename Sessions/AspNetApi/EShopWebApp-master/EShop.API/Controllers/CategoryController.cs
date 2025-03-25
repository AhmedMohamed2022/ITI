using EF_Core.Models;
using EShop.Manegers;
using EShop.ViewModels;
using EShop.ViewModels.Category;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EShop.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private CategoryManager CategoryManager;
        public CategoryController(CategoryManager categoryManager)
        {
            CategoryManager = categoryManager;
        }
        [Route("List")]
        public IActionResult List()
        {     
            var CategoryList = CategoryManager.GetList().Select(i=> new CategoryViewModel
            {
                Id= i.Id,
                Name = i.Name,
                Description = i.Description
            }
            ).ToList();
            return Ok(new { cateogrylist = CategoryList});
        }
        [HttpPost]
        [Route("Add")]
        public IActionResult Add(AddCategoryViewModel model)
        {

            CategoryManager.Add(model.ToModel());
            return Ok("Category Added successfully");
        }
    }
}

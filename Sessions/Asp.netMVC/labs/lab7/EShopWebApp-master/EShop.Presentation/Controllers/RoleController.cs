using EShop.Manegers;
using EShop.ViewModels;
using EShop.ViewModels.Role;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace EShop.Presentation.Controllers
{
    public class RoleController : Controller
    {
        private IdentityRoleManager IdentityRoleManager;
        public RoleController(IdentityRoleManager identityRoleManager)
        {
            IdentityRoleManager = identityRoleManager;
        }

        [HttpGet]
        public IActionResult Add()
        {
            var RolesList = GetRoles();
            return View(RolesList);
        }
        [HttpPost]
        public async Task<IActionResult> Add(string roleName)
        {
            var Roles = GetRoles();
            if (roleName.IsNullOrEmpty())
            {
                ViewBag.Valid = 0;
                return View(Roles);
                
            }
            else
            {

                var res = await IdentityRoleManager.Add(roleName);

                if (res.Succeeded)
                {
                    ViewBag.Valid = 1;
                }
                else
                {
                    ViewBag.Valid = 2;
                }
                return View(Roles);
            }
        }
        //[HttpPost]
        //public IActionResult Delete(DeleteRoleViewModel model)
        //{
        //    IdentityRoleManager.Delete(new IdentityRole { Name = model.Name});
        //    return View();
        //}

        public List<AddRoleViewModel> GetRoles()
        {
            return IdentityRoleManager.GetList().Select(r => new AddRoleViewModel { Id = r.Id, Name = r.Name }).ToList();
        }
    }
}

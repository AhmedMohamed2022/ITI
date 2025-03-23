using System.Security.Claims;
using EF_Core.Models;
using EShop.Manegers;
using EShop.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace EShop.Presentation.Controllers
{
    public class AccountController : Controller
    {
        public AccountManager AccountManager;
        public IdentityRoleManager IdentityRoleManager;
        public AccountController(AccountManager accountManager,IdentityRoleManager identityRoleManager) 
        {
            AccountManager = accountManager;
            IdentityRoleManager = identityRoleManager;
        }
        [HttpGet]
        public IActionResult Register()
        {
            var RolesList = GetRolesList();
            ViewData["Roles"] = RolesList;
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Register(UserRegisterViewModel userRegisterViewModel)
        {
            var RolesList = GetRolesList();
            ViewData["Roles"] = RolesList;
            if (ModelState.IsValid)
            {
                var result= await AccountManager.Register(userRegisterViewModel);
                if (result.Succeeded)
                {
                    return RedirectToAction("SignIn");
                }
                else
                {
                    foreach(var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                    return View();
                }
            }
            return View();
        }
        [HttpGet]
        public IActionResult SignIn()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> SignIn(UserSignInViewModel userSignInViewModel)
        {
            if (ModelState.IsValid)
            {
                var result =await AccountManager.SignIn(userSignInViewModel);
                if(result.Succeeded)
                {
                    var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;
                    if(role=="Vendor")
                    {
                        return RedirectToAction("List", "Category");
                    }

                    //FormsAuthentication.SetAuthCookie(userSignInViewModel.Method, false);
                    return RedirectToAction("Index", "Home");
                }
                else if(result.IsLockedOut||result.IsNotAllowed)
                {
                    ModelState.AddModelError("", "Try Again after 12 sec");
                }
                else
                {
                    ModelState.AddModelError("", "Email or password is not correct");
                }
                return View();
            }
            return View();
        }
        //[HttpGet]
        //public IActionResult SignOut()
        //{
       
        //    //FormsAuthentication.SignOut();
        //    //Session.Abandon(); // it will clear the session at the end of request
                  

        //    return View("Index","Home");
        //}
        public List<SelectListItem> GetRolesList()
        {
            return IdentityRoleManager.GetList(r => r.Name != "Admin").Select(r=> new SelectListItem(r.Name,r.Name)).ToList();
        }
        

    }
}

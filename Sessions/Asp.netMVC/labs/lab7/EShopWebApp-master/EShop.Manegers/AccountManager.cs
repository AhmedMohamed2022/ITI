using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EF_Core;
using EF_Core.Models;
using EShop.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace EShop.Manegers
{
    public class AccountManager:BaseManager<User>
    {
        private UserManager<User> UserManager;
        private SignInManager<User> SignInManager;
        private EShopContext Context;
        public AccountManager(EShopContext context,UserManager<User> _userManager,SignInManager<User> _signInManager) : base(context) 
        { 
            UserManager = _userManager;
            SignInManager = _signInManager;
            Context = context;
        }
        public async Task<IdentityResult>  Register(UserRegisterViewModel model)
        {
             var res= await UserManager.CreateAsync(model.toModel(), model.Password);
            if(res.Succeeded)
            {
                User user = await UserManager.FindByNameAsync(model.UserName);
                res=await UserManager.AddToRoleAsync(user, model.Role);
                if(res.Succeeded)
                {
                    if(model.Role=="Vendor")
                    {
                        Context.Vendors.Add(new Vendor { UserId=user.Id});
                        Context.SaveChanges();
                    }
                    else if(model.Role=="Client")
                    {
                        Context.Clients.Add(new Client { UserId = user.Id });
                        Context.SaveChanges();
                    }
                }
            }
            return res;
        }
        public async Task<SignInResult> SignIn(UserSignInViewModel model)
        {
            var user=await UserManager.FindByEmailAsync(model.Method);
            if (user != null)
            {
                return await SignInManager.PasswordSignInAsync(user, model.Password, true, true);
            }
            else
            {
                return await SignInManager.PasswordSignInAsync(model.Method, model.Password,true,true);
            }
        }
    }
}

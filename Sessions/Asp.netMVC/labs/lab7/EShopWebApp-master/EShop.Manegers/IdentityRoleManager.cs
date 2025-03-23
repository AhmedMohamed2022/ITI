using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EF_Core;
using EShop.ViewModels.Role;
using Microsoft.AspNetCore.Identity;

namespace EShop.Manegers
{
    public class IdentityRoleManager:BaseManager<IdentityRole>
    {
        private RoleManager<IdentityRole> RoleManager;
        public IdentityRoleManager(EShopContext _context,RoleManager<IdentityRole> _roleManager):base(_context) 
        {
            RoleManager = _roleManager;
        }
        public async Task<IdentityResult> Add(string roleName)
        {
           return await RoleManager.CreateAsync(new IdentityRole { Name = roleName });
        }
        //public void Delete(DeleteRoleViewModel model)
        //{
        //    RoleManager.DeleteAsync()
        //}
    }
}

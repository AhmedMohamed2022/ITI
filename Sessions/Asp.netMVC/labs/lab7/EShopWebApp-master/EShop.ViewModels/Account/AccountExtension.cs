using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EF_Core.Models;

namespace EShop.ViewModels
{
    public static class AccountExtension
    {
        public static User toModel(this UserRegisterViewModel viewModel)
        {
            return new User

            {
                UserName = viewModel.UserName,
                Email = viewModel.Email,
                PhoneNumber = viewModel.PhoneNumber
            };
        }
    }
}

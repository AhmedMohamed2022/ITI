using EF_Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.ViewModels
{
    public static class CartItemExt
    {
        public static CartItem ToModel(this CartItemVM cartItemVM)
        {
            return new CartItem
            {
                ProductID = cartItemVM.ID,
                ClientId = cartItemVM.ClientId,
                Quantity = cartItemVM.Quantity
            };
        }
    }
}

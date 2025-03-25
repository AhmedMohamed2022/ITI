using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EF_Core;
using EF_Core.Models;
using EShop.ViewModels.Cart;

namespace EShop.Manegers
{
    public class CartItemManager:BaseManager<CartItem>
    {
        private EShopContext Context;
        public CartItemManager(EShopContext context):base(context)
        {
            Context = context;
        }
        public void Add(CartItemVM model)
        {
            Context.Add(model);
        }
    }
}

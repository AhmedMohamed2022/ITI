using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.ViewModels.Cart
{
    public class CartItemVM
    {
        public int ID { get; set; }
        public int? Quantity { get; set; }
        public int ProductId { get; set; }
        public string ClientId { get; set; }
    }
}

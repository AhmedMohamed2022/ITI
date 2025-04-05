using EShop.Manegers;
using EShop.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EShop.API.Controllers
{
    [ApiController]
    [Route("api/{Controller}")]
    public class CartItemController : Controller
    {
        private CartItemManager CartItemManager;
        private ProductManager ProductManager;
        public CartItemController(CartItemManager cartItemManager,ProductManager productManager)
        {
            CartItemManager = cartItemManager;
            ProductManager = productManager;
        }
        [Authorize(Roles="Client")]
        [HttpPost("AddToCart/{productId}")]
        public IActionResult AddToCart(int productId)
        {
            var ClientId = User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;
            var CartItemVm = new CartItemVM { ProductId = productId, ClientId = ClientId };
            CartItemManager.Add(CartItemVm.ToModel());
            return Ok("added to cart");
            
        }
        [EnableCors("AllowAll")]

        [HttpPost("ProductList")]
        public IActionResult ProductList()
        {
            var ClientId = User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;
            var Product = CartItemManager.GetList().Select(c => new CartItemVM
            {
                ProductId=c.ProductID,
                ClientId=c.ClientId
            }).ToList();
            return Ok(new { list = Product });
        }
    }
}

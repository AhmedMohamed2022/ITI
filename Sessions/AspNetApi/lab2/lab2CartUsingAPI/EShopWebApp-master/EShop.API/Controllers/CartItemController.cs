using EShop.Manegers;
using EShop.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EShop.API.Controllers
{
    [ApiController]
    [Route("api/{Controller}")]
    public class CartItemController : Controller
    {
        private CartItemManager CartItemManager;
        public CartItemController(CartItemManager cartItemManager)
        {
            CartItemManager = cartItemManager;
        }
        [Authorize("Client")]
        [HttpPost("AddToCart")]
        public IActionResult AddToCart(int productId)
        {
            var ClientId = User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;
            var CartItemVm = new CartItemVM { ProductId = productId, ClientId = ClientId };
            CartItemManager.Add(CartItemVm.ToModel());
            return Ok("added to cart");
            
        }
    }
}

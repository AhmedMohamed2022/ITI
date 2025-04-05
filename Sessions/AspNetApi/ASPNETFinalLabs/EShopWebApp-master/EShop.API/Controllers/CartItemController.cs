using EShop.Manegers;
using EShop.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EShop.API.Controllers
{
    //[ApiController]
    //[Route("api/{Controller}")]
    //public class CartItemController : Controller
    //{
    //    private CartItemManager CartItemManager;
    //    private ProductManager ProductManager;
    //    public CartItemController(CartItemManager cartItemManager,ProductManager productManager)
    //    {
    //        CartItemManager = cartItemManager;
    //        ProductManager = productManager;
    //    }
    //    [Authorize(Roles="Client")]
    //    [HttpPost("AddToCart/{productId}")]
    //    public IActionResult AddToCart(int productId)
    //    {
    //        var ClientId = User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;
    //        var CartItemVm = new CartItemVM { ProductId = productId, ClientId = ClientId };
    //        CartItemManager.Add(CartItemVm.ToModel());
    //        return Ok("added to cart");

    //    }
    //    [EnableCors("AllowAll")]

    //    [HttpPost("ProductList")]
    //    public IActionResult ProductList()
    //    {
    //        if (!User.Identity.IsAuthenticated)
    //        {
    //            return Unauthorized("User is not authenticated.");
    //        }
    //        var ClientId = User.Claims.FirstOrDefault(i => i.Type == ClaimTypes.NameIdentifier).Value;
    //        var Product = CartItemManager.GetList(c=>c.ClientId==ClientId).Select(c => new CartItemVM
    //        {
    //            ProductId=c.ProductID,
    //            ClientId=c.ClientId
    //        }).ToList();
    //        return Ok(new { list = Product });
    //    }
    //}
    [ApiController]
    [Route("api/[controller]")]
    public class CartItemController : Controller
    {
        private CartItemManager CartItemManager;
        private ProductManager ProductManager;

        public CartItemController(CartItemManager cartItemManager, ProductManager productManager)
        {
            CartItemManager = cartItemManager;
            ProductManager = productManager;
        }

        [Authorize(Roles = "Client")]
        [HttpPost("AddToCart/{productId}")]
        public IActionResult AddToCart(int productId)
        {
            var ClientId = User.Claims.FirstOrDefault(i => i.Type == ClaimTypes.NameIdentifier)?.Value;
            if (ClientId == null) return Unauthorized("User ID not found.");

            var CartItemVm = new CartItemVM { ProductId = productId, ClientId = ClientId };
            CartItemManager.Add(CartItemVm.ToModel());
            return Ok("added to cart");
        }

        [Authorize(Roles = "Client")]
        [HttpPost("ProductList")]
        public IActionResult ProductList()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized("User is not authenticated.");
            }

            var ClientId = User.Claims.FirstOrDefault(i => i.Type == ClaimTypes.NameIdentifier)?.Value;
            if (ClientId == null) return Unauthorized("User ID not found.");

            var Product = CartItemManager.GetList(c => c.ClientId == ClientId)
                .Select(c => new CartItemVM
                {
                    ProductId = c.ProductID,
                    ClientId = c.ClientId
                }).ToList();

            return Ok(new { list = Product });
        }
    }

}

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Store.data;
using Store.Hubs;
using Store.Models;

namespace Store.Controllers
{
    public class ProductController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<QuantityHub> quantityHub;
        private readonly IHubContext<CommentsHub> commentshub;

        public ProductController(AppDbContext context, IHubContext<QuantityHub> _quantityHub, IHubContext<CommentsHub> _commentshub)
        {
            _context = context;
            quantityHub = _quantityHub;
            commentshub = _commentshub;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return View(await _context.Products.ToListAsync());
        }
        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var product = await _context.Products.Include(p => p.Comments).FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return View(product);
        }

        [HttpPost ]
        [Route("Buy")]
        public async Task<IActionResult> BuyNow(int productId, int quantity)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null || product.Quantity < quantity)
                return NotFound();

            product.Quantity -= quantity;
            await _context.SaveChangesAsync();

            await quantityHub.Clients.All.SendAsync("UpdateProductQuantity", productId, product.Quantity);
            return RedirectToAction("Index");
        }
        [HttpPost]
        [Route("SendComment")]
        public async Task<IActionResult> SendComment ([FromBody] MessegeContent msg)
        {
            var comment = new Comments
            {
                Author = msg.author,
                Text = msg.text,
                ProductId = msg.productId
            };
            _context.Comments.Add(comment);
            _context.SaveChanges();
            // Notify all clients (you can later add product-based filtering)
            await commentshub.Clients.All.SendAsync("ReceiveComment",msg);
            return RedirectToAction("Details", "Product", new { id = msg.productId });
        }
    }
}

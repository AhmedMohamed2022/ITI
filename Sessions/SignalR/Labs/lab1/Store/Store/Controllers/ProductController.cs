using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.data;
using Store.Models;

namespace Store.Controllers
{
    public class ProductController : Controller
    {
        private readonly AppDbContext _context;
        public ProductController(AppDbContext context)
        {
            _context = context;
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
    }
}

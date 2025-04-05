using System.Diagnostics;
using EShop.Manegers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace EShop.Presentation.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private CategoryManager CategoryManager;
    private ProductManager ProductManager;
    private CartItemManager CartItemManager;

    public HomeController(ILogger<HomeController> logger, CategoryManager categoryManager, ProductManager productManager,CartItemManager cartItemManager)
    {
        _logger = logger;
        CategoryManager = categoryManager;
        ProductManager = productManager;
        CartItemManager = cartItemManager;
    }

    public IActionResult Index(string searchText = "", decimal price = 0, int categoryId = 0, string vendorId = "", int pageNumber = 1, int pageSize = 3)
    {
        ViewData["CategoriesList"] = GetCategories();
        var list = ProductManager.Search(categoryId: categoryId, vendorId: vendorId,
                 searchText: searchText, price: price, pageNumber: pageNumber, pageSize: pageSize);
        return View(list);
    }

    public IActionResult Privacy()
    {
        return View();
    }
    private List<SelectListItem> GetCategories()
    {
        return CategoryManager.Get()
.Select(cat => new SelectListItem(cat.Name, cat.Id.ToString())).ToList();
    }
    public IActionResult AddToCart(int prodId=0,string clientId="")
    {
        CartItemManager.Add(prodId);
        return View();
    }

}

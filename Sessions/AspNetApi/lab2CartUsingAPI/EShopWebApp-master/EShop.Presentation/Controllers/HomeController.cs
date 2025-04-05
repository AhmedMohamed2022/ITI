using System.Diagnostics;
using System.Security.Claims;
using EF_Core.Models;
using EShop.Manegers;
using EShop.ViewModels;
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
    [HttpPost]
    public IActionResult AddToCart(int productId)
    {
        var ClientId= User.Claims.First(i=> i.Type==ClaimTypes.NameIdentifier).Value;
        var CartItemVm = new CartItemVM { ProductId = productId, ClientId = ClientId };
        CartItemManager.Add(CartItemVm.ToModel());
        return View(CartItemVm);
    }

}

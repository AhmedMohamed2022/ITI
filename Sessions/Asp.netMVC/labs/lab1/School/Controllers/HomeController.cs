using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Models.Context;
using School.Models;

namespace School.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private AppDbContext appcontext = new AppContext();
    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

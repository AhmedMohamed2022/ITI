﻿using Microsoft.AspNetCore.Mvc;

namespace EShop.Presentation.Areas.Admin.Controllers
{
    [Area("admin")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

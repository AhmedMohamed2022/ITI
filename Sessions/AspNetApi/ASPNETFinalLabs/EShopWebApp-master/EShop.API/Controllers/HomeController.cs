using Microsoft.AspNetCore.Mvc;

namespace EShop.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        [Route("index")]
       public IActionResult Index()
        {
            return Ok(new {home="welcom to api"});
        }
    }
}

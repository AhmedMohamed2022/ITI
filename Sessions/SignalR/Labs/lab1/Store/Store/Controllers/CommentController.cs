using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Store.data;
using Store.Hubs;
using Store.Models;

namespace Store.Controllers
{
    public class CommentController : Controller
    {
        //private readonly AppDbContext _context;
        //private readonly IHubContext<CommentsHub> commentshub;
        //public CommentController(AppDbContext context,IHubContext<CommentsHub> _commentshub)
        //{
        //    _context = context;
        //    commentshub = _commentshub;
        //}
        //[HttpPost]
        //public async Task<IActionResult> SendComment(string author, string text, int productId)
        //{
        //    var comment = new Comments
        //    {
        //        Author = author,
        //        Text = text,
        //        ProductId = productId
        //    };
        //    _context.Comments.Add(comment);
        //    _context.SaveChanges();
        //    // Notify all clients (you can later add product-based filtering)
        //    await commentshub.Clients.All.SendAsync("ReceiveComment", productId, author, text);
        //    return  RedirectToAction("Details","Product", new { id = productId });
        //}
        
    }
}

using Microsoft.AspNetCore.SignalR;
using Store.data;
using Store.Models;

namespace Store.Hubs
{
    public class CommentsHub:Hub
    {
        private readonly AppDbContext _context;

        public CommentsHub(AppDbContext context)
        {
            _context = context;
        }
        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("NewClient Connected");
        }

        public async Task SendComment(string author, string text, int productId)
        {
            var comment = new Comments
            {
                Author = author,
                Text = text,
                ProductId = productId
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            // Notify all clients (you can later add product-based filtering)
            await Clients.All.SendAsync("ReceiveComment", productId, author, text);
        }
    }
}

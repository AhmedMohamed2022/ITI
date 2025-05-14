using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Store.data;

namespace Store.Hubs
{
    public class QuantityHub: Hub
    {
        private readonly AppDbContext _context;
        public QuantityHub(AppDbContext context)
        {
            _context = context;
        }
        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("NewClient Connected");
        }
   
       
        public async Task BuyProduct(int productId, int quantity)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null || product.Quantity < quantity)
                return;

            product.Quantity -= quantity;
            await _context.SaveChangesAsync();

            await Clients.All.SendAsync("UpdateProductQuantity", productId, product.Quantity);
        }

    }
}

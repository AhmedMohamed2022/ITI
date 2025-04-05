using Microsoft.AspNetCore.Mvc;
using Grpc.Net.Client;
using System.Collections.Generic;
using PaymentService;
using InventoryService;

namespace ITIStore.API.Controllers
{
    public class Order
    {
        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public List<OrderItem> Products { get; set; }
    }

    public class OrderItem
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    [ApiController]
    [Route("api/orders")]
    public class OrderController : Controller
    {
        private static readonly List<Order> Orders = new();
        private readonly Inventory.InventoryClient _inventoryClient;
        private readonly Payment.PaymentClient _paymentClient;

        // Use constructor injection
        public OrderController(
            Inventory.InventoryClient inventoryClient,
            Payment.PaymentClient paymentClient)
        {
            _inventoryClient = inventoryClient;
            _paymentClient = paymentClient;
        }


        [HttpPost]
        public IActionResult PlaceOrder([FromBody] Order order)
        {
            order.OrderId = Orders.Count + 1;
            Orders.Add(order);

            // Deduct from inventory
            foreach (var item in order.Products)
            {
                var request = new DeductRequest { ProductId = item.ProductId, Quantity = item.Quantity };
                if (_inventoryClient.Deduct(request).Success == false)
                    return Ok(new { Message = "Deduction Failed" });
            }

            // Process payment
            var paymentRequest = new PaymentRequest { ClientId = order.ClientId, Amount = 100 };
            if (_paymentClient.Pay(paymentRequest).Success == true)
                return Ok(new { Message = "Order placed successfully!", order.OrderId });
            else
                return Ok(new { Message = "Order Failed" });
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
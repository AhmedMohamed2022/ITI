using Grpc.Core;
using ITIStore.API;
using ITIStore.API.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace ITIStore.API.Services
{
    public class OrderService : Order.OrderBase
    {
        private readonly OrderController _orderController;

        public OrderService(OrderController orderController)
        {
            _orderController = orderController;
        }

        public override Task<PlaceOrderResponse> PlaceOrder(PlaceOrderRequest request, ServerCallContext context)
        {
            var order = new Controllers.Order
            {
                ClientId = request.ClientId,
                Products = request.Products.Select(p => new Controllers.OrderItem
                {
                    ProductId = p.ProductId,
                    Quantity = p.Quantity
                }).ToList()
            };

            var result = _orderController.PlaceOrder(order) as OkObjectResult;
            if (result?.Value is not null)
            {
                dynamic response = result.Value;
                return Task.FromResult(new PlaceOrderResponse
                {
                    Message = response.Message?.ToString() ?? "Unknown result",
                    OrderId = response.OrderId ?? 0
                });
            }

            return Task.FromResult(new PlaceOrderResponse
            {
                Message = "Error processing order",
                OrderId = 0
            });
        }
    }
}
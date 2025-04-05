using Grpc.Core;
using System.Collections.Generic;
using System.Threading.Tasks;
using InventoryService;

namespace ITIStore.InventoryService
{
    public class InventoryServiceImpl : Inventory.InventoryBase
    {
        private static readonly Dictionary<int, int> Stock = new()
    {
        { 1000, 5 }, // Product 1000 has 5 items
        { 1001, 10 } // Product 1001 has 10 items
    };

        public override Task<DeductResponse> Deduct(DeductRequest request, ServerCallContext context)
        {
            if (Stock.ContainsKey(request.ProductId) && Stock[request.ProductId] >= request.Quantity)
            {
                Stock[request.ProductId] -= request.Quantity;
                return Task.FromResult(new DeductResponse { Success = true });
            }

            return Task.FromResult(new DeductResponse { Success = false });
        }
    }

}
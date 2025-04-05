using Grpc.Core;
using System.Collections.Generic;
using System.Threading.Tasks;
using PaymentService;

namespace PaymentService
{
    public class PaymentServiceImpl : Payment.PaymentBase
{
    private static readonly Dictionary<int, float> Balances = new()
    {
        { 1, 2000 }, // Client 1 has 2000 LE
        { 2, 500 }   // Client 2 has 500 LE
    };

    public override Task<PaymentResponse> Pay(PaymentRequest request, ServerCallContext context)
    {
        if (Balances.ContainsKey(request.ClientId) && Balances[request.ClientId] >= request.Amount)
        {
            Balances[request.ClientId] -= request.Amount;
            return Task.FromResult(new PaymentResponse { Success = true });
        }

        return Task.FromResult(new PaymentResponse { Success = false });
    }
}
    }
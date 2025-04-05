using PaymentService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddGrpc();

// Configure the HTTP request pipeline.
var app = builder.Build();
app.MapGrpcService<PaymentServiceImpl>();
app.MapGet("/", () => "Payment gRPC is running...");

app.UseStaticFiles(); // Add this line
app.MapFallbackToFile("index.html"); // Add this line
app.Run();

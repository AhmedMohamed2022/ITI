using InventoryService;
using ITIStore.API.Controllers;
using ITIStore.API.Services;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using PaymentService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddGrpc();
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<OrderController>();
// Add after builder.Services.AddGrpc()

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5001, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
    });
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
// Add after builder.Services.AddGrpc()
builder.Services.AddGrpcClient<Inventory.InventoryClient>(o =>
{
    o.Address = new Uri("http://localhost:5234");
});
builder.Services.AddGrpcClient<Payment.PaymentClient>(o =>
{
    o.Address = new Uri("http://localhost:5228");
});

var app = builder.Build();
app.UseCors("AllowAll");
app.UseGrpcWeb();
app.MapGrpcService<OrderService>().EnableGrpcWeb();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapControllers();
app.UseStaticFiles();
app.MapFallbackToFile("index.html"); // For SPA routing


app.Run();

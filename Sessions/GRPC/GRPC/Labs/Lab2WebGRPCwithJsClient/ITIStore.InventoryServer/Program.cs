using ITIStore.InventoryService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGrpc();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<InventoryServiceImpl>();
app.MapGet("/", () => "Inventory gRPC is running...");
app.Run();


using EF_Core;
using EF_Core.Models;
using EShop.Manegers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//DI Container
builder.Services.AddControllers();

builder.Services.AddDbContext<EShopContext>
    (i => i.UseLazyLoadingProxies()
    .UseSqlServer(builder.Configuration.GetConnectionString("MyDB")));
builder.Services.AddIdentity<User,IdentityRole>().AddEntityFrameworkStores<EShopContext>();

builder.Services.AddScoped(typeof(ProductManager));
builder.Services.AddScoped(typeof(CategoryManager));
builder.Services.AddScoped(typeof(RoleManager));

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=index}"
    );
//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=index}"
//    );
app.Run();

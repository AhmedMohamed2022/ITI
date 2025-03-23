using EF_Core;
using EF_Core.Models;
using EShop.Manegers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


//DI Containers
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<EShopContext>(i =>
i.UseLazyLoadingProxies()
.UseSqlServer(builder.Configuration.GetConnectionString("MyDB")));
//builder.Services.AddScoped(typeof(EShopContext));
builder.Services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<EShopContext>();
builder.Services.AddScoped(typeof(ProductManager));
builder.Services.AddScoped(typeof(CategoryManager));
builder.Services.AddScoped(typeof(AccountManager));
builder.Services.AddScoped(typeof(IdentityRoleManager));

var app = builder.Build();

app.UseRouting();

app.UseStaticFiles();//Force WWWRoot

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=index}");

app.Run();

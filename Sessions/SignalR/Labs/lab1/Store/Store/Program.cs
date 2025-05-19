using Microsoft.EntityFrameworkCore;
using Store.data;
using Store.Hubs;

namespace Store
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddSignalR();
            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            //builder.Services.AddCors(options =>
            //{
            //    options.AddDefaultPolicy(policy =>
            //    {
            //        policy.AllowAnyMethod() // Replace with your React app URL
            //              .AllowAnyHeader()
            //              .SetIsOriginAllowed(url =>
            //              {
            //                  if (url == "")
            //                  {
            //                      return true;
            //                  }
            //                  return false;
            //              }).AllowCredentials();
            //    });
             
            //});

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();
            app.UseCors(policy => policy
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(_ => true)
                .AllowCredentials());
            app.MapHub<CommentsHub>("/commentsHub");
            app.MapHub<QuantityHub>("/quantityHub"); 

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Product}/{action=Index}/{id?}");

            app.Run();
        }
    }
}

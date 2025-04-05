using EF_Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;

namespace EShop.API
{
    public class GeneralExceptionFilter:ExceptionFilterAttribute
    {
        private string path =
             Directory.GetCurrentDirectory() + "/Logs/" + DateTime.Today.ToString("dd-MM-yyyy");
        public override void OnException(ExceptionContext context)
        {

            #region Logging 
            string User = context.HttpContext.User.Claims.Any() ?
                    context.HttpContext.User.Claims.FirstOrDefault(i => i.Type == ClaimTypes.NameIdentifier).Value
                    : "Guest";
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append($"On {DateTime.Now}");
            stringBuilder.Append(Environment.NewLine);
            stringBuilder.Append($"User {User}");
            stringBuilder.Append(Environment.NewLine);
            stringBuilder.Append($"Error {context.Exception.Message}");
            stringBuilder.Append(Environment.NewLine);
            stringBuilder.Append($"Details {context.Exception.StackTrace}");

            File.AppendAllText(path, stringBuilder.ToString());
            #endregion


            #region Send Mail 
            var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525)
            {
                Credentials = new NetworkCredential("07a438a6cc297b", "****bf7a"),
                EnableSsl = true
            };
            client.Send("from@example.com", "to@example.com", "Genaral Exception Filter", stringBuilder.ToString());

            #endregion

            context.ExceptionHandled = true;
            context.Result = new JsonResult(new APIResult<string>
            {
                Message = "Sorry Someting wrong happand!!!",
                Success = false,
                Status = 500,
                Data = ""
            });
        }
    }
}

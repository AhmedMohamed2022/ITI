using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.ViewModels
{
    public class UserRegisterViewModel
    {
        [Required(ErrorMessage ="this Field is required")]
        [StringLength(100,MinimumLength =3,ErrorMessage ="this field value must have value between 3 and 100")]
        public string  UserName { get; set; }

        [Required(ErrorMessage = "this Field is required")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "this field value must have value between 3 and 100")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required(ErrorMessage = "this Field is required")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "this field value must have value between 3 and 100")]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
        [Required(ErrorMessage = "this Field is required")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "this field value must have value between 3 and 100")]
        [DataType(DataType.Password)]
        [Compare("ConfirmPassword")]
        public string Password { get; set; }
        [Required(ErrorMessage = "this Field is required")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "this field value must have value between 3 and 100")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage ="This field is required")]
        public string Role { get; set; }
    }
}

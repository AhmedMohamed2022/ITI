using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolModel.Models
{
    public class User: IdentityUser
    {
        public virtual Teacher? Teacher { get; set; }
        public virtual Student? Student { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using SchoolModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolModel
{
    public static class DataSeeding
    {
        public static void DataSeedingMethod(this ModelBuilder builder)
        {
            builder.Entity<Course>()
                .HasData(
                    new Course { Id = 1, Name = "EF", Credits = 3 },
                    new Course { Id = 2, Name = "ASPMVC", Credits = 3 }
                );
        }
    }
}
